const { DateTime } = require("luxon")
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const pluginRss = require("@11ty/eleventy-plugin-rss")
const markdownIt = require("markdown-it")
const markdownItAnchor = require("markdown-it-anchor")
const seriesData = require("./data/seriesData.json")


// config largely taken from https://github.com/11ty/eleventy-base-blog/blob/master/.eleventy.js
module.exports = function(eleventyConfig) {
  // set up Syntax Highlighting plugin
  eleventyConfig.addPlugin(pluginSyntaxHighlight)

  const pluginEmbedTweet = require("eleventy-plugin-embed-tweet")
  eleventyConfig.addPlugin(pluginEmbedTweet)

  // set up RSS feed
  eleventyConfig.addPlugin(pluginRss)

  // Alias `layout: post` to `layout: layouts/post.njk`
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk")

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
  })

    // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd')
  })

    // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if(!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if( n < 0 ) {
      return array.slice(n)
    }

    return array.slice(0, n)
  })

  // Return the smallest number argument
  eleventyConfig.addFilter("min", (...numbers) => {
    return Math.min.apply(null, numbers)
  })

  eleventyConfig.addFilter("toHTML", str => {
    return new markdownIt(markdownOptions).renderInline(str)
  })

  // enable front matter parsing for excerpts
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    // Optional, default is "---"
    excerpt_separator: "<!-- excerpt -->"
  })

  eleventyConfig.addCollection("series", (collection) => {
    // get all posts in chronological order
    const posts = collection.getSortedByDate()

    // this will store the mapping from series to lists of posts; it can be a
    // regular object if you prefer
    const mapping = new Map()

    // loop over the posts
    for (const post of posts) {
      // get any series data for the current post, and store the date for later
      const { series, description, date, title, part } = post.data

      // ignore anything with no series data
      if (series === undefined) {
        continue
      }

      // if we haven’t seen this series before, create a new entry in the mapping
      // (i.e. take the description from the first post we encounter)
      if (!mapping.has(series)) {
        mapping.set(series, {
          title: seriesData[series].title,
          posts: [],
          description: seriesData[series].seriesDescription,
          date,
        })
      }

      // get the entry for this series
      const existing = mapping.get(series)

      // add the current post to the list
      existing.posts.push({
        title: title,
        description: description, 
        date: date,
        url: post.url,
        part: part
      })

      // update the date so we always have the date from the latest post
      existing.date = date
    }

    // now to collect series containing more than one post as an array that
    // Eleventy can paginate
    const normalized = []

    // loop over the mapping (`k` is the series title)
    for (const [slug, { title, posts, description, date }] of mapping.entries()) {
      if (posts.length > 1) {
        // add any series with multiple posts to the new array
        normalized.push({ slug, title, posts, description, date })
      }
    }

    // return the array
    return normalized
  })

  // Copy the `img` and `css` folders to the output
  eleventyConfig.addPassthroughCopy("css")
  eleventyConfig.addPassthroughCopy("img")

  // Customize Markdown library and settings:
  const markdownOptions = {
    html: true,
    breaks: true,
    linkify: true
  }
  let markdownLibrary = markdownIt(markdownOptions).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: "after",
      class: "direct-link",
      symbol: "#",
      level: [1,2,3,4],
    }),
    slugify: eleventyConfig.getFilter("slug")
  });
  eleventyConfig.setLibrary("md", markdownLibrary);

  return {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],

    // -----------------------------------------------------------------
    // If your site deploys to a subdirectory, change `pathPrefix`.
    // Don’t worry about leading and trailing slashes, we normalize these.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`

    // Optional (default is shown)
    pathPrefix: "/",
    // -----------------------------------------------------------------

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: "njk",

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: "njk",

    // Opt-out of pre-processing global data JSON files: (default: `liquid`)
    dataTemplateEngine: false,

    // These are all optional (defaults are shown):
    dir: {
      input: ".",
      includes: "includes",
      data: "data",
      output: "docs"
    }
  }
}