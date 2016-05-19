var metalsmith    = require('metalsmith');

// Metalsmith meta
// var ifttt         = require("metalsmith-if")


// Content Meta
var assets        = require('metalsmith-assets');
var cleanCSS      = require('metalsmith-clean-css');
var collections   = require('metalsmith-collections');
var layouts       = require('metalsmith-layouts');
var validate      = require('metalsmith-validate');
var fileMetadata  = require('metalsmith-filemetadata');

// Display/content
var markdown      = require('metalsmith-markdown')
var prism         = require('metalsmith-prism');
var wordcount     = require("metalsmith-word-count");
// var snippet       = require('./metalsmith-code-snippet');


// Begin Build System

// DEBUG Function
// var plugin = function(files, metalsmith, done) {
//     console.log(files);
//     done();
// };
//
// USAGE:
//  .use(plugin)


metalsmith(__dirname)
    .use(fileMetadata([
      {
        pattern: "blog/*",
        metadata: {
          "root": "../",
          "layout": "post.hbs",
          "collection": "posts"
        }
      },
      {
        pattern: "code/*",
        metadata: {
          "root": "../",
          "layout": "snippet.hbs",
          "collection": "snippets"
        }
      }
    ]))
    .use(validate([ //Validate source files metadata before building anything!
      {
        pattern: 'blog/*',
        metadata: {
            tags: true
        }
      },
      {
        pattern: 'code/*',
        metadata: {
            description: true
        }
      },
      {
        pattern: 'code/*' && 'blog/*',
        metadata: {
          root: {
            exists: true,
            type: 'String'
          },
          title: {
            exists: true,
            type: 'String'
          },
          layout: {
            exists: true,
            type: 'String'
          },
          collection: {
            exists: true,
            type: 'String'
          },
          slug: {
            exists: true,
            type: 'String'
          },
          date: {
            exists: true
            //, pattern: match 2014-10-27 22:09:14
          }
        }
      }
    ]))
    .use(markdown({
        smartypants: true,
        gfm: true,
        tables: true,
        langPrefix: 'language-' //For Prism's use.
    }))
    .use(prism())
    .use(wordcount({
      metaKeyCount: "wordCount",
      metaKeyReadingTime: "readingTime"
    }))
    .use(assets({
        source: './assets',
        destination: './assets'
    }))
    .use(cleanCSS({
      files: 'build/assets/css/**/*.css'
    }))
    //.use(snippet()) // PERSONAL USE
    .use(collections({ // Collections - use these to categorize different types of pages.
      'posts': {
        'sort-by': 'date', // Organizes posts by the `date` front-matter.
        'reverse': true, // Reverse chronological order (newest first).
        'refer'  : false // Adds a reference to the next post in the series.
      },
      // 'snippets': {
      //   'sort-by': 'date', // Organizes posts by the `date` front-matter.
      //   'reverse': true, // Reverse chronological order (newest first).
      //   'refer'  : false // Adds a reference to the next post in the series.
      // }
    }))
    .use(layouts({
      engine: "handlebars", // Use Handlebars.
      partials: "partials" // Partials are in the "partials" directory.
    }))
    .build(function(err){
        if(err) throw(err)
    });
