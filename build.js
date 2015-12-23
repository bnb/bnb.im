var metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var prism       = require('metalsmith-prism');
var assets      = require('metalsmith-assets');
var collections = require('metalsmith-collections');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var snippet     = require('./metalsmith-code-snippet');


// DEBUG Function
// var plugin = function(files, metalsmith, done) {
//     console.log(files);
//     done();
// };
//
// USAGE:
//  .use(plugin)


metalsmith(__dirname)
  .use(markdown({ // Convert Markdown to HTML, using smartypants, GitHub markdown, and table syntax.
    smartypants: true,
    gfm: true,
    tables: true,
    langPrefix: 'language-' //For Prism's use.
  }))
  .use(prism()) //Make the code syntax highlighting work.
  .use(assets({ // Compiles assets from working directory to build directory.
    source: './assets', // relative to the working directory
    destination: './assets' // relative to the build directory
  }))
  .use(snippet())
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
  .use(layouts({ //Layouts plugin
    engine: "handlebars", // Use Handlebars.
    partials: "partials" // Partials are in the "partials" directory.
  }))
  .build(function(err) {
    if(err) throw err;
  });
