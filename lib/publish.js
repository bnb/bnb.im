// `npm run publish`: publish posts to ATProto with sequoia, rebuild the site so
// the new atUris land in the HTML, then commit and push for GitHub Pages
const { execFileSync, spawnSync } = require('child_process')
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const { contentDir, outputDir, publicationUri } = require('../sequoia.json')

const root = path.join(__dirname, '..')
const dryRun = process.argv.includes('--dry-run')

const run = (cmd, args) => execFileSync(cmd, args, { cwd: root, stdio: 'inherit' })
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim()

function fail (message) {
  console.error(`\n[publish] ${message}`)
  process.exit(1)
}

function readPosts () {
  return fs.readdirSync(path.join(root, contentDir))
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(root, contentDir, file)
      const raw = fs.readFileSync(filePath, 'utf8')
      return { file: path.relative(root, filePath), slug: file.slice(0, -3), raw, data: matter(raw).data }
    })
    .filter((post) => !post.data.draft)
}

// bail before touching the PDS if the push at the end is going to fail anyway
const branch = git('branch', '--show-current')
if (branch !== 'main') fail(`On "${branch}", but GitHub Pages deploys from main.`)
git('fetch', '--quiet')
if (git('rev-list', '--count', 'HEAD..@{u}') !== '0') fail('main is behind origin. Pull first.')

// publish has to run before the build: it writes atUri into the frontmatter of
// new posts, and the layout reads it from there to render the link tags
run('npx', ['sequoia', 'publish', ...(dryRun ? ['--dry-run'] : [])])
if (dryRun) process.exit(0)

// sequoia exits 0 even when a post fails, so check its state against every post
const state = JSON.parse(fs.readFileSync(path.join(root, '.sequoia-state.json'), 'utf8'))
const unpublished = readPosts().filter(({ file, raw, data }) => {
  const entry = state.posts[file]
  const hash = crypto.createHash('sha256').update(raw).digest('hex')
  return !data.atUri || !entry || entry.atUri !== data.atUri || entry.contentHash !== hash
})
if (unpublished.length) fail(`Not published to ATProto: ${unpublished.map((post) => post.file).join(', ')}`)

run('npm', ['run', 'build'])

const missingTags = readPosts().filter(({ slug, data }) => {
  const html = fs.readFileSync(path.join(root, outputDir, 'posts', slug, 'index.html'), 'utf8')
  return !html.includes(`rel="site.standard.document" href="${data.atUri}"`)
})
if (missingTags.length) fail(`Built HTML is missing its site.standard.document tag: ${missingTags.map((post) => post.slug).join(', ')}`)

const wellKnown = fs.readFileSync(path.join(root, outputDir, '.well-known', 'site.standard.publication'), 'utf8').trim()
if (wellKnown !== publicationUri) fail(`${outputDir}/.well-known/site.standard.publication doesn't match sequoia.json.`)

git('add', '-A')
if (spawnSync('git', ['diff', '--cached', '--quiet'], { cwd: root }).status !== 0) {
  run('git', ['status', '--short'])
  run('git', ['commit', '--quiet', '-m', 'chore: publish'])
}

if (git('rev-list', '--count', '@{u}..HEAD') !== '0') {
  run('git', ['push'])
} else {
  console.log('\n[publish] Nothing to push. Everything is already live.')
}
