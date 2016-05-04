var extname = require('path').extname;
var cheerio = require('cheerio');

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * A Metalsmith plugin to extract an excerpt from Markdown files.
 *
 * @param {Object} options
 * @return {Function}
 */

function plugin(options){
  return function(files, metalsmith, done){
    setImmediate(done);
    Object.keys(files).forEach(function(file){
      if (!html(file)) return;
      var data = files[file];

      if (typeof data.snippet === 'string' && data.excerpt.length) {
        return; // don't mutate data
      }

      var $ = cheerio.load(data.contents.toString());
      var snip = $('pre').first();
      data.snippet = $.html(snip).trim();
    });
  };
}

/**
 * Check if a `file` is markdown.
 *
 * @param {String} file
 * @return {Boolean}
 */

function html(file){
  return /\.html?/.test(extname(file));
}
