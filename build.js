var metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var prism       = require('metalsmith-prism');
var assets      = require('metalsmith-assets');
var uncss       = require('metalsmith-uncss');
var cleanCSS    = require('metalsmith-clean-css');
var collections = require('metalsmith-collections');
var layouts     = require('metalsmith-layouts');
var watch       = require('metalsmith-watch');
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
  /*.use(uncss({
        css: ['bootstrap.css','app.css'],   // CSS files to run through UnCSS
        html: ['index.html','test.html'],   // HTML files to test the CSS files against
        output: 'uncss-output.css',         // output CSS filename
        basepath: 'styles',                 // optional base path where all your css files are stored
        removeOriginal: true,               // remove original CSS files from the build
        uncss: {                            // uncss options - passed directly to UnCSS
            ignore: ['.added-at-runtime','#do-not-remove']
        }
    }))*/
  .use(cleanCSS({ // NEW
    files: 'assets/css/**/*.css'
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
  .use(watch({
      paths: {
        "assets/**/*": true,
        "layouts/**/*": "**/*.hbs",
        "partials/**/*": "**/*.hbs",
        "${source}/**/*.md": true,
      }
    }))
  .build(function(err) {
    if(err) throw err;
  });
