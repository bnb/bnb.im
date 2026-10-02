const fs = require('fs')
const path = require('path')
const { DateTime } = require('luxon')

const API = 'https://public.api.bsky.app/xrpc'
const CACHE_DIR = path.join(__dirname, '..', '.cache', 'bluesky')
const CACHE_MAX_AGE = 24 * 60 * 60 * 1000

// a paragraph holding nothing but a bare bsky.app post url, which is what
// markdown-it's linkify turns a url on its own line into. links with custom
// text (`[like this](https://bsky.app/...)`) are left alone.
const STANDALONE_POST_LINK = /<p>\s*<a href="(https:\/\/bsky\.app\/profile\/([^"/]+)\/post\/([a-z0-9]+))\/?">\1\/?<\/a>\s*<\/p>/g

// the same bare url in an excerpt's markdown, along with the blank lines
// around it. the miniBlueskyEmbeds filter swaps it for MINI_POST_LINK, which
// the transform then fills in with a pared-down embed.
const STANDALONE_POST_LINE = /\n*^[ \t]*(https:\/\/bsky\.app\/profile\/[^/\s]+\/post\/[a-z0-9]+)\/?[ \t]*$\n*/gm
const MINI_POST_LINK = /<a class="bsky-embed-mini" href="(https:\/\/bsky\.app\/profile\/([^"/]+)\/post\/([a-z0-9]+))">[^<]*<\/a>/g

// labels Bluesky's own embed respects: the author asked not to be shown to
// logged-out viewers, or the media shouldn't be shown without a click-through
const NO_UNAUTHENTICATED = '!no-unauthenticated'
const SENSITIVE_LABELS = new Set(['porn', 'sexual', 'nudity', 'graphic-media', 'gore'])

const BUTTERFLY = '<svg viewBox="0 0 600 530" width="24" height="21" aria-hidden="true"><path d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0174-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z"/></svg>'

const escapeHtml = (str = '') => String(str).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
})[char])

const isHttpUrl = (url) => /^https?:\/\//i.test(url || '')

const hasLabel = (labels = [], test) => labels.some((label) => test(label.val))

const optedOut = (post) => hasLabel(post.author.labels, (val) => val === NO_UNAUTHENTICATED) ||
  hasLabel(post.labels, (val) => val === NO_UNAUTHENTICATED)

const isSensitive = (post) => hasLabel(post.labels, (val) => SENSITIVE_LABELS.has(val))

const profileUrl = (author) => `https://bsky.app/profile/${author.handle === 'handle.invalid' ? author.did : author.handle}`

// at://did/app.bsky.feed.post/rkey → https://bsky.app/profile/handle/post/rkey
const postUrl = (author, uri) => `${profileUrl(author)}/post/${uri.split('/').pop()}`

const formatDate = (iso) => DateTime.fromISO(iso, { zone: 'utc' }).toFormat('dd LLL yyyy')

// one fetch per post per build, even when watch mode rebuilds repeatedly
const threads = new Map()

function getThread (actor, rkey) {
  const key = `${actor}/${rkey}`
  if (!threads.has(key)) {
    threads.set(key, fetchThread(actor, rkey).catch((error) => {
      threads.delete(key)
      throw error
    }))
  }
  return threads.get(key)
}

// fetch a post (and its parent, for reply context) from the public AppView,
// caching it in the gitignored .cache directory. a stale cache is used if the
// network is down, but a post the API says is gone stays gone.
async function fetchThread (actor, rkey) {
  const cachePath = path.join(CACHE_DIR, `${actor.replace(/[^\w.-]/g, '_')}-${rkey}.json`)
  const cached = fs.existsSync(cachePath) ? JSON.parse(fs.readFileSync(cachePath, 'utf8')) : null

  if (cached && Date.now() - cached.fetchedAt < CACHE_MAX_AGE) {
    return cached.thread
  }

  const params = new URLSearchParams({
    uri: `at://${actor}/app.bsky.feed.post/${rkey}`,
    depth: 0,
    parentHeight: 1
  })

  let response
  try {
    response = await fetch(`${API}/app.bsky.feed.getPostThread?${params}`)
  } catch (error) {
    if (cached) {
      console.warn(`[bluesky-embed] Fetching ${actor}/${rkey} failed, using cached copy: ${error.message}`)
      return cached.thread
    }
    throw error
  }

  const body = await response.json().catch(() => ({}))
  if (!response.ok) {
    if (body.error === 'NotFound') {
      fs.rmSync(cachePath, { force: true })
    } else if (cached) {
      console.warn(`[bluesky-embed] Fetching ${actor}/${rkey} failed, using cached copy: ${response.status}`)
      return cached.thread
    }
    throw new Error(`${response.status} ${body.message || body.error || ''}`.trim())
  }

  fs.mkdirSync(CACHE_DIR, { recursive: true })
  fs.writeFileSync(cachePath, JSON.stringify({ fetchedAt: Date.now(), thread: body.thread }))
  return body.thread
}

function facetHref (features = []) {
  for (const feature of features) {
    switch (feature.$type) {
      case 'app.bsky.richtext.facet#link':
        if (isHttpUrl(feature.uri)) {
          return feature.uri
        }
        break
      case 'app.bsky.richtext.facet#mention':
        return `https://bsky.app/profile/${feature.did}`
      case 'app.bsky.richtext.facet#tag':
        return `https://bsky.app/hashtag/${encodeURIComponent(feature.tag)}`
    }
  }
}

// facet offsets index into the UTF-8 bytes of the text, not the JS string
function renderRichText (text = '', facets = []) {
  const bytes = Buffer.from(text, 'utf8')
  const slice = (start, end) => escapeHtml(bytes.subarray(start, end).toString('utf8'))
  const sorted = facets
    .filter((facet) => facet.index)
    .sort((a, b) => a.index.byteStart - b.index.byteStart)

  let html = ''
  let cursor = 0
  for (const { index: { byteStart, byteEnd }, features } of sorted) {
    const href = facetHref(features)
    if (!href || byteStart < cursor || byteEnd <= byteStart || byteEnd > bytes.length) {
      continue
    }
    html += slice(cursor, byteStart) + `<a href="${escapeHtml(href)}">${slice(byteStart, byteEnd)}</a>`
    cursor = byteEnd
  }
  return html + slice(cursor)
}

const notice = (text, href) => href
  ? `<a class="bsky-embed-notice" href="${escapeHtml(href)}">${escapeHtml(text)}</a>`
  : `<p class="bsky-embed-notice">${escapeHtml(text)}</p>`

function renderImages (images) {
  const items = images.map((image) => {
    const { width, height } = image.aspectRatio || {}
    const size = width && height ? ` width="${width}" height="${height}"` : ''
    return `<a href="${escapeHtml(image.fullsize)}"><img src="${escapeHtml(image.thumb)}" alt="${escapeHtml(image.alt)}"${size} loading="lazy"></a>`
  })
  return `<div class="bsky-embed-images" data-count="${images.length}">${items.join('')}</div>`
}

// 5+ photos show as a carousel in the app; a scroll-snapping strip does the
// same job here without any JS
function renderGallery (items, href) {
  const slides = items.map((item) => {
    const { width, height } = item.aspectRatio || {}
    const size = width && height ? ` width="${width}" height="${height}"` : ''
    return `<a href="${escapeHtml(item.fullsize || href)}"><img src="${escapeHtml(item.thumbnail)}" alt="${escapeHtml(item.alt)}"${size} loading="lazy"></a>`
  })
  return `<div class="bsky-embed-gallery">${slides.join('')}</div>`
}

// HLS playlists don't play natively outside Safari, so link a poster frame
// to the post instead of shipping a video player
function renderVideo (video, href) {
  return `<a class="bsky-embed-video" href="${escapeHtml(href)}" aria-label="Watch video on Bluesky">` +
    `<img src="${escapeHtml(video.thumbnail)}" alt="${escapeHtml(video.alt || '')}" loading="lazy">` +
    '<span class="bsky-embed-play" aria-hidden="true"></span></a>'
}

function renderExternal ({ uri, title, description, thumb }) {
  if (!isHttpUrl(uri)) {
    return ''
  }
  const domain = new URL(uri).hostname.replace(/^www\./, '')
  return `<a class="bsky-embed-external" href="${escapeHtml(uri)}">` +
    (thumb ? `<img src="${escapeHtml(thumb)}" alt="" loading="lazy">` : '') +
    '<span class="bsky-embed-external-body">' +
    `<span class="bsky-embed-external-domain">${escapeHtml(domain)}</span>` +
    `<strong>${escapeHtml(title || uri)}</strong>` +
    (description ? `<span class="bsky-embed-external-description">${escapeHtml(description)}</span>` : '') +
    '</span></a>'
}

// images, video, and link cards, on their own or alongside a quote
function renderMedia (embed, href) {
  switch (embed && embed.$type) {
    case 'app.bsky.embed.images#view':
      return renderImages(embed.images)
    case 'app.bsky.embed.gallery#view':
      return renderGallery(embed.items, href)
    case 'app.bsky.embed.video#view':
      return renderVideo(embed, href)
    case 'app.bsky.embed.external#view':
      return renderExternal(embed.external)
    case 'app.bsky.embed.recordWithMedia#view':
      return renderMedia(embed.media, href)
    default:
      return ''
  }
}

const renderCard = (title, subtitle, href) => `<a class="bsky-embed-external" href="${escapeHtml(href)}">` +
  `<span class="bsky-embed-external-body"><strong>${escapeHtml(title)}</strong>` +
  `<span class="bsky-embed-external-domain">${escapeHtml(subtitle)}</span></span></a>`

// the thing a post quotes: usually another post, but feeds, lists, and
// starter packs can be quoted too
function renderRecord (record) {
  const rkey = (record.uri || '').split('/').pop()

  switch (record.$type) {
    case 'app.bsky.embed.record#viewRecord': {
      const href = postUrl(record.author, record.uri)
      if (optedOut(record)) {
        return notice('The author of the quoted post has requested their posts not be displayed on external sites.', href)
      }
      const { author, value } = record
      const media = isSensitive(record)
        ? notice('Media hidden: sensitive content. View on Bluesky.', href)
        : renderMedia((record.embeds || [])[0], href)
      return '<div class="bsky-embed-quote">' +
        `<a class="bsky-embed-quote-header" href="${escapeHtml(href)}">` +
        (author.avatar ? `<img class="bsky-embed-avatar" src="${escapeHtml(author.avatar)}" alt="" width="20" height="20" loading="lazy">` : '') +
        `<strong class="bsky-embed-name">${escapeHtml(author.displayName || author.handle)}</strong>` +
        `<span class="bsky-embed-handle">@${escapeHtml(author.handle)} · <time datetime="${escapeHtml(value.createdAt)}">${formatDate(value.createdAt)}</time></span></a>` +
        (value.text ? `<p class="bsky-embed-text">${renderRichText(value.text, value.facets)}</p>` : '') +
        media +
        '</div>'
    }
    case 'app.bsky.embed.record#viewNotFound':
      return notice('Quoted post not found, it may have been deleted.')
    case 'app.bsky.embed.record#viewBlocked':
      return notice('Quoted post is unavailable.')
    case 'app.bsky.embed.record#viewDetached':
      return notice('Quoted post removed by its author.')
    case 'app.bsky.feed.defs#generatorView':
      return renderCard(record.displayName, `Feed by @${record.creator.handle}`, `${profileUrl(record.creator)}/feed/${rkey}`)
    case 'app.bsky.graph.defs#listView':
      return renderCard(record.name, `List by @${record.creator.handle}`, `${profileUrl(record.creator)}/lists/${rkey}`)
    case 'app.bsky.graph.defs#starterPackViewBasic':
      return renderCard(record.record.name, `Starter pack by @${record.creator.handle}`, `https://bsky.app/starter-pack/${record.creator.handle}/${rkey}`)
    default:
      return ''
  }
}

function renderEmbed (embed, href) {
  switch (embed && embed.$type) {
    case 'app.bsky.embed.record#view':
      return renderRecord(embed.record)
    case 'app.bsky.embed.recordWithMedia#view':
      return renderMedia(embed.media, href) + renderRecord(embed.record.record)
    default:
      return renderMedia(embed, href)
  }
}

function renderReplyContext (parent) {
  const post = parent && parent.post
  if (!post || optedOut(post)) {
    return ''
  }
  return `<p class="bsky-embed-context">Replying to <a href="${escapeHtml(profileUrl(post.author))}">@${escapeHtml(post.author.handle)}</a></p>`
}

// returns null when the post shouldn't be embedded, so the link stays a link
function renderPost (thread) {
  if (!thread || thread.$type !== 'app.bsky.feed.defs#threadViewPost' || optedOut(thread.post)) {
    return null
  }

  const { post, parent } = thread
  const { author, record } = post
  const href = postUrl(author, post.uri)
  const embed = isSensitive(post)
    ? notice('Media hidden: sensitive content. View on Bluesky.', href)
    : renderEmbed(post.embed, href)

  return `<blockquote class="bsky-embed" cite="${escapeHtml(href)}">` +
    '<div class="bsky-embed-header">' +
    `<a class="bsky-embed-author" href="${escapeHtml(profileUrl(author))}">` +
    (author.avatar ? `<img class="bsky-embed-avatar" src="${escapeHtml(author.avatar)}" alt="" width="44" height="44" loading="lazy">` : '<span class="bsky-embed-avatar"></span>') +
    '<span class="bsky-embed-names">' +
    `<strong class="bsky-embed-name">${escapeHtml(author.displayName || author.handle)}</strong>` +
    `<span class="bsky-embed-handle">@${escapeHtml(author.handle)}</span>` +
    '</span></a>' +
    `<a class="bsky-embed-logo" href="${escapeHtml(href)}" aria-label="View on Bluesky">${BUTTERFLY}</a>` +
    '</div>' +
    renderReplyContext(parent) +
    (record.text ? `<p class="bsky-embed-text">${renderRichText(record.text, record.facets)}</p>` : '') +
    embed +
    '<footer class="bsky-embed-footer">' +
    `<a href="${escapeHtml(href)}"><time datetime="${escapeHtml(record.createdAt)}">${formatDate(record.createdAt)}</time></a>` +
    `<a href="${escapeHtml(href)}">View on Bluesky</a>` +
    '</footer></blockquote>'
}

// the excerpt-sized version on the index: just the words and who said them,
// no avatar, media, or quoted posts
function renderMiniPost (thread) {
  if (!thread || thread.$type !== 'app.bsky.feed.defs#threadViewPost' || optedOut(thread.post)) {
    return null
  }

  const { author, record, uri } = thread.post
  const href = postUrl(author, uri)

  return `<blockquote class="bsky-embed-mini" cite="${escapeHtml(href)}">` +
    (record.text ? `<span class="bsky-embed-mini-text">${escapeHtml(record.text)}</span>` : '') +
    `<a class="bsky-embed-mini-meta" href="${escapeHtml(href)}">@${escapeHtml(author.handle)} on Bluesky · ` +
    `<time datetime="${escapeHtml(record.createdAt)}">${formatDate(record.createdAt)}</time></a>` +
    '</blockquote>'
}

async function replacePostLinks (html, pattern, render) {
  const matches = [...html.matchAll(pattern)]
  if (matches.length === 0) {
    return html
  }

  const embeds = await Promise.all(matches.map(async ([, url, actor, rkey]) => {
    try {
      const embed = render(await getThread(actor, rkey))
      if (!embed) {
        console.warn(`[bluesky-embed] ${url} can't be shown on external sites, leaving it as a link`)
      }
      return embed
    } catch (error) {
      console.warn(`[bluesky-embed] Couldn't embed ${url}, leaving it as a link: ${error.message}`)
      return null
    }
  }))

  let i = 0
  return html.replace(pattern, (match) => embeds[i++] || match)
}

async function embedBlueskyPosts (html) {
  html = await replacePostLinks(html, STANDALONE_POST_LINK, renderPost)
  return replacePostLinks(html, MINI_POST_LINK, renderMiniPost)
}

// turns a bare bsky.app post link on its own line into a static embed at
// build time: no third-party script or iframe, styled by css/main.css
module.exports = function (eleventyConfig) {
  eleventyConfig.addTransform('bluesky-embed', async function (content, outputPath) {
    if (!outputPath || !outputPath.endsWith('.html')) {
      return content
    }
    return embedBlueskyPosts(content)
  })

  // excerpts on the index get a mini embed instead of the full card. the
  // placeholder's text is what shows if the post can't be fetched.
  eleventyConfig.addFilter('miniBlueskyEmbeds', (markdown = '') => markdown
    .replace(STANDALONE_POST_LINE, (match, url) => `<a class="bsky-embed-mini" href="${url}">View post on Bluesky</a>`)
    .trim())
}
