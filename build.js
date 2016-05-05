var metalsmith  = require('metalsmith');

//Metalsmith meta
var ifttt       = require("metalsmith-if")

//Content Meta
var assets      = require('metalsmith-assets');
var cleanCSS    = require('metalsmith-clean-css');
var collections = require('metalsmith-collections');
var layouts     = require('metalsmith-layouts');

//Display/rendering
var markdown    = require('metalsmith-markdown')
var snippet     = require('./metalsmith-code-snippet');
var prism       = require('metalsmith-prism');
var wordcount   = require("metalsmith-word-count");


// Begin Build System

var options = {};

options.beautify = true;
options.watch = false;

// DEBUG Function
// var plugin = function(files, metalsmith, done) {
//     console.log(files);
//     done();
// };
//
// USAGE:
//  .use(plugin)

metalsmith(__dirname)
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
    .use(snippet()) // PERSONAL USE
    .use(collections({ // Collections - use these to categorize different types of pages.
      'blog-post': {
        'sort-by': 'date', // Organizes posts by the `date` front-matter.
        'reverse': true, // Reverse chronological order (newest first).
        'refer'  : false // Adds a reference to the next post in the series.
      },
      'code-post': {
        'sort-by': 'date', // Organizes posts by the `date` front-matter.
        'reverse': true, // Reverse chronological order (newest first).
        'refer'  : false // Adds a reference to the next post in the series.
      }
    }))
    .use(layouts({
      engine: "handlebars", // Use Handlebars.
      partials: "partials" // Partials are in the "partials" directory.
    }))
    .build(function(err){
        if(err) throw(err)
    });
