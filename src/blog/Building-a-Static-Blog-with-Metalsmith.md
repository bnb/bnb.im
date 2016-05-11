---
title: Building a Static Blog with Metalsmith
slug: Building-a-Static-Blog-with-Metalsmith
cover: true
tags:
  - Metalsmith
  - blog
  - build
  - node
  - static
  - site
  - generator
programming: true
posted: "December 11, 2015 at 9:10AM"
date: 2015-12-11 00:09:10
---

# What is Metalsmith?
Metalsmith is a platform. It's a platform that allows the developer to plug and play modules - these modules can be anything from compilers for SASS, to Markdown to HTML transformers, to Gulp aides, to just about any other content processing a web developer needs.

We're going to use it to make a statically presented blog - Metalsmith is excellent for this, to the point that it can mimic Wintersmith or Jekyll, which can be a huge benefit. That's awesome, but we're going a different path: rolling our own, completely custom blog, with a few additional website functions.

# Getting Started
To get started with Metalsmith, we're going to need to create a local directory where our project can live, and set it to the current active directory. Let's do that:

```bash
$ mkdir metalsmith-blog && cd metalsmith-blog
```

We need to initialize our repository with an npm `package.json`. I am going to throw the `--yes` flag in there, so we don't need to worry about the initial values of the content of `package.json`.

```bash
$ npm init --yes
```

Now, we're going to need to install Metalsmith. We're going to save Metalsmith with the npm flag `--save-dev` -- the same goes for all the other plugins we are using for our blog. This command automatically adds a module to the `devDependencies` object in our `package.json`. Why? Doing this allows us to install modules only when we're in a development environment. We're always in a development environment with Metalsmith, until we are finished and ready to publish our Wintersmith project to the web.

```bash
$ npm install metalsmith --save-dev
```

Now we have a foundation for our metalsmith project!

## Setting up the site

### package.json
You should open `package.json`, and change the value in `"main"` to `"build.js"`, or whatever you want to call it. I call it `build` because we're going to run it every time we want to rebuild the static Metalsmith files in the `build` directory.

```diff
-  "main": "index.js",
+  "main": "build.js",
```

Feel free to edit any of the information in `package.json` to reflect the scope of your project. If you're going to publish the actual project, not just the build result, to somewhere like GitHub, having this information filled out makes things a lot easier for managing the codebase.

### build.js
Go ahead and create a `build.js` file in your `metalsmith` directory, and open it in your text editor of choice. Let's add the basics of a Metalsmith project to it:

```js
var metalsmith = require('metalsmith');

metalsmith(__dirname)
  .build(function(err) {
    if(err) throw err;
  });
```

In this code, we're requiring the Metalsmith module from `node_modules` (which we downloaded earlier via `npm install metalsmith --save-dev`) and assigning it to a variable named `metalsmith`. We call the Metalsmith module's main function, and pass `__dirname`. Finally, we call the Metalsmith module's `build` function, which initiates the build process.5



# Installing dependencies

There are several dozen Metalsmith modules that are useful to accomplish a variety of tasks within Metalsmith. A good number of them are for writing and publishing, which is what we're looking to use. Here's the list of the Modules we're going to use from that list:

* [Metalsmith Markdown](https://github.com/segmentio/metalsmith-markdown)
* [Metalsmith Prism](https://github.com/Availity/metalsmith-prism)
* [Metalsmith Assets](https://github.com/treygriffith/metalsmith-assets)
* [Metalsmith Collections](https://github.com/segmentio/metalsmith-collections)
* [Metalsmith Layouts](https://github.com/superwolff/metalsmith-layouts)

Additionally, we need to install Handlebars as our templating engine.
* [Handlebars](https://github.com/wycats/handlebars.js)

Let's install these packages and save them as `devDependencies` in `package.json`.

```js
$ npm install metalsmith-markdown --save-dev
$ npm install metalsmith-prism --save-dev
$ npm install metalsmith-assets --save-dev
$ npm install metalsmith-collections --save-dev
$ npm install metalsmith-layouts --save-dev
$ npm install handlebars --save-dev
```
# Authoring build.js
Let's build our `build.js` file, using the above plugins. Each plugin call is annotated below, so we can understand what they're doing. Here it is:

```js
var metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var prism       = require('metalsmith-prism');
var assets      = require('metalsmith-assets');
var collections = require('metalsmith-collections');
var layouts     = require('metalsmith-layouts');


// DEBUG Function
// Uncomment to console.log() at every .use() step for fine-grain debugging
//
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
  .use(collections({ // Collections - use these to categorize different types of pages.
    'blog-post': { // We're only using a blog-post type of page for now.
      'sort-by': 'date', // Organizes posts by the `date` front-matter.
      'reverse': true, // Reverse chronological order (newest first).
      'refer'  : false // Adds a reference to the next post in the series.
    }
  }))
  .use(layouts({ //Layouts plugin
    engine: "handlebars", // Use Handlebars.
    partials: "partials" // Partials are in the "partials" directory.
  }))
  .build(function(err) { // Can we build it? Yes we can!
    if(err) throw err; // This throws all errors.
  });
```

# Directory Structure.
Now that we've got our `build.js` in place, we need to build the directory structure that it scaffolds. Create each of these folders and files in their respective places:

```bash
| assets
|-- css
|---- main.css
|---- normalize.css # Found here: https://necolas.github.io/normalize.css/
|---- blog-post.css
|---- index.css
|---- prism.css # Pick your style and download the CSS here: http://prismjs.com/
| layouts
|-- blog-post.hbs
|-- index.hbs
| partials
|-- header.hbs
|-- html-head.hbs
| src
|-- posts
|---- hello.md
|-- blog.md
| build.js
```


# Templates: index.hbs &amp; blog-post.hbs

Templates are the foundation for content in our Metalsmith blog. Both the index file and all blog posts are routed through their respective templates, which produces our site with the structure we want.

Our index file allows us to list all our posts in one place, where someone interested in looking at our writing can find all of it.

The current implementation is only title, date, and two vector scrolls that have been exported to view on the page. There are a ton of other [Metalsmith plugins](http://metalsmith.io) that can help you further build your index - excerpts, pagination, tagging, and many others are available. Metalsmith is an incredibly simple plug-and-play tool, so it won't be hard to integrate other features you may want.

Here's our **index.hbs**, with functionality commented where appropriate:

```html
<!DOCTYPE html>
<html class="blog-index">
{{> html-head }}  <!-- A partial - this will be explained in the next section! -->

<body>
    {{> header }} <!-- A partial - this will be explained in the next section! -->

    <div id="main">
        <div class="container">

            <ul class="blog-list">
                {{#each collections.blog-post}} <!-- A Handlebars iterative function. -->
                    {{#if title}} <!-- If a post has a title element, it will be listed. -->
                      <div class="humongous {{#unless cover-img}}no-cover{{/unless}}" {{#if cover-img}}style="background-image: {{cover-img}};"{{/if}}><!-- Two handlebars helpers that test for a background-image in each humongous element. -->
                        <img src="./assets/img/vector-scroll-top.png" alt="" class="grayscale">
                          <a href="./blog/posts/{{ slug }}.html"><h1 class="hello">{{title}}</h1></a> <!-- Slug is a property of each document's metadata, called front-matter. See the section on front matter below. -->
                          <span class="datetime"><time>{{posted}}</time></span>
                          <img src="./assets/img/vector-scroll-bottom.png" alt="" class="grayscale">
                      </div>
                    {{/if}}
                {{/each}}
            </ul>

        </div>
    </div>
</body>
</html>

```

Our implementation of our blog post page uses a humongous element, and then prints the contents of the Markdown file after it has been converted to HTML by `metalsmith-markdown`.

Here's our `blog-post.hbs` template:

```html
<!DOCTYPE html>
<html>
{{> html-head }}

<body>
    {{> header }}

    <div id="main">
        <div class="container">

            <article>

                <div class="humongous {{#unless cover-img}}no-cover{{/unless}}" {{#if cover-img}}style="background-image: {{cover-img}};"{{/if}}>
                    <h1 class="hello">{{title}}</h1>
                    <span class="datetime"><time>{{posted}}</time></span>
                </div>
                <div class="content">
                 {{{ contents }}}
                </div>

            </article>
;
        </div>
    </div>

</body>
</html>
```



# Partials: html-head and header
Partials in Handlebars are snippets of code that you can reuse in multiple places within your project - including them is simple - use the following syntax to do so:

```html
{{> partial-name }}
```

`partial-name` would be the filename of the partial located in the `partials/` directory in the project root. The inclusion of partials will be noted when they are used in the handlebars layouts.

This is our `html-head.hbs` partial, which defines the `head` HTML element in all our pages:

```html
<head>
    <meta http-equiv="Content-Type"  content="text/html; charset=utf-8">
    <meta charset="utf-8"/>

    <title>{{#if title}}{{ title }} | {{/if}}&amp;! (bnb, bang, bitandbang)</title> <!-- Title of the page -->

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="icon" href="../favicon.ico"> <!-- Add your favicon -->

    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css"> <!-- Icon font for navbar. -->
    <link rel="stylesheet" href="http://brick.a.ssl.fastly.net/TeX+Gyre+Heros:400,700:f/Source+Serif+Pro:400/Playfair+Display:700i/Alegreya:400i,700i"> <!-- serif/sans serif typography -->

    {{#if collection}}
      <link rel="stylesheet" href="../assets/css/{{collection}}.css"> <!-- Call custom CSS for collection type, if there is a collection attribute on the metadata (front-matter) for the page. -->
    {{/if}}

    <link rel="stylesheet" href="../assets/css/normalize.css"> <!-- normalize all the styles! -->
    <link rel="stylesheet" href="../assets/css/prism.css"> <!-- Add Prism theme. -->
    <link rel="stylesheet" href="../assets/css/main.css"> <!-- Use main css attributes. -->
</head>
```

Additionally, we are defining a `header` partial element that will be consistent across all our pages, including the index, blog post, and any other pages you may create.

Here's our `header.hbs` partial:
```html
<header class="top"> <!-- Header element -->
  <div class="headerContainer">
    <nav>
      <ul> <!-- List the social media icons with links using Font Awesome icons -->
        <li><a href="http://"><i class="fa fa-paragraph"></i></a></li>
        <li><a href="https://"><i class="fa fa-chevron-up"></i></a></li>
        <li><a href="https://"><i class="fa fa-github-alt"></i></a></li>
        <li><a href="https://"><i class="fa fa-eye-slash"></i></a></li>
      </ul>
    </nav>

    <a href="/">
      <a href="../{{ path }}/index.html"><h1 class="logo">bnb</h1></a> <!-- Link the logo back to the index of the site. -->
    </a>
  </div>
</header>

```


# src: content management
We're almost done building our blog! The only thing that's left is **our content**. Our content lives in the `src/` (shorthand for "source") directory. The content comes in two forms: the core file (_index.md_), which simply calls the `index.hbs` template with no actual markup of its own, and content files (_post-title.md_), whose content iteratively gets piped into the `blog-post.hbs` template.

## Learning src: front-matter
Front-matter is an important tool in Metalsmith. It is metadata content put at the top of your source files that help Metalsmith plugins and Handlebars (or other templating engines) templates parse the content of your site correctly.

Here's an example of front-matter:

```html
---
title: A Short List of Excellent JavaScript Podcasts
layout: blog-post.hbs
collection: blog-post
slug: A-Short-List-of-Excellent-JavaScript-Podcasts
posted: "April 12, 2014 at 8:13PM"
date: 2014-04-12 20:13:00
---
```

Each of the items listed here gives data to one plugin or another. `title` gets used when `{{ title }}` is called in Handlebars. `layout` determines what layout the document is applied to. `collection` is an organizer of content. `slug` is used to create links to individual posts in the index. `posted` is a human-readable date that we display on both the `index` and the `blog-post` templates. And `date` is a machine-readable date that is for standardized record keeping and search engine crawling.

## src: index.md

```html
---
title: bnb
layout: index.hbs
collection: index
---
&nbsp;
```

As you can see, its content is only a non-breaking space. This is because we define all the generated markup in the `index.hbs` layout, and don't need content to be inserted from this file.

## src: <post-name>.md

The strategy of no internal content is the opposite of files in our `src/post/` directory. They include similar, but more detailed, front-matter. The difference is that to make a new post, you write below the front-matter in Markdown. Let's take a look at one of my personal blog entries:

```html
---
title: A Short List of Excellent JavaScript Podcasts
layout: blog-post.hbs
collection: blog-post
slug: A-Short-List-of-Excellent-JavaScript-Podcasts
posted: "April 12, 2014 at 8:13PM"
date: 2014-04-12 20:13:00
---

JavaScript is wonderful. I know I'm always keen to hear what's new in JS or related technologies. Podcasts on the topic are an excellent way to have a good time while learning about JS.

Below is a list of my favorite podcasts on JS in no particular order. You should check a few of them out to see which ones you like; there's always at least one gem-of-a-podcast for everybody. Have you found yours?

### [The JavaScript Show](http://javascriptshow.com/)

The JavaScript Show is a podcast that covers a lot of JS-related news. The hosts talk about a variety of topics within JS; it is an excellent way to get JS news.

### [JavaScript Jabber](http://javascriptjabber.com/)

JavaScript Jabber is an extremely active and well-loved podcast. The crew focuses mainly on one topic per podcast, which is an interesting and beneficial format for a code podcast.

### [Changelog](http://thechangelog.com/)

Changelog is a member-supported blog that also has a podcast. While it's not solely about JavaScript, the topic comes up frequently enough to be added here. Excellent podcast and excellent community.

### [Build Podcast](http://build-podcast.com/)

The Build Podcast, like Changelog, isn't completely focused on JavaScript, but JS is discussed frequently enough. Like Jabber, the show focuses mainly on one topic per episode in a short, digestible format.

### [NodeUp](http://nodeup.com/)

NodeUp is the go-to podcast for Node discussion. They have intelligent discussion on the various topics that Node encompasses, with various JS teams that the hosts interview. Highly recommended.

### [Ember Watch Podcast List](http://emberwatch.com/podcasts.html)

While not a specific podcast, this site links to various episodes of podcasts that are on the topic of Ember. A very interesting idea for a website, as well as a very useful one.

```

As you can see, the front-matter is defined and provides useful information that is utilized throughout the site. Below the front-matter is simple content, which is translated into the body of your blog post. So, we've got content! Now we need to style.


# Assets: CSS
The blog's CSS assets are important. They create the visual structure of your blog, which is an important factor in getting readers. This part can be largely changed by you to fit your stylistic views - the code presented here is a working example of how it _can_ be done, but not exclusively _how_ it should be done. You get to be creative here - you've got the templates, partials, and content. Make it yours!

Here's how I wrote my base **main.css** file:

```css
* {
    box-sizing: border-box;
}

.clearfix {
    clear: both;
}

.right {
    float: right;
}

.left {
    float: left;
}

a {
    color: #bbb;
    transition: color 0.5s;
    text-decoration: none;
}

a:hover {
    color: #b13737;
    transition: color 0.5s;
}

small, p, a {
  font-family: 'Source Serif Pro';
    font-style: normal;
    font-weight: 400;
}

.content pre {
    width: 100%;
}

.content pre code {
    max-width: 800px;
    max-height: 600px;
    margin: 1em auto;
    padding: 1em 0;
    display: block;
    overflow: scroll;
}

.em {
    font-weight: bold;
    color: #b13737;
    transition: all 0.15s;
}

.em:hover {
    transition: all 0.15s;
    border-bottom: 2px solid #b13737;
}

.inline {
    display: inline-block;
    vertical-align: top;
}

.half { /* Or thereabouts */
    width: 49.8%;
}

h1 {
  padding: 2em 0 1.7em 0;
  font-family: 'TeX Gyre Heros';
    font-style: normal;
    font-weight: 700;
  border-bottom: none;
}

h2 {
    padding: 1.7em 0 1.5em 0;
    font-family: 'Tex Gyre Heros';
    font-style: normal;
    font-weight: 400;
}

h3 {
  padding: 1.5em 0 1.3em 0;
  font-family: 'TeX Gyre Heros';
    font-style: normal;
    font-weight: 700;
}

.content li {
  list-style:inside;
  color: #888;
}

.content li a {
  color: #888;
  text-decoration: underline;
}

blockquote {
    background-color: #f6f6f6;
    border-top: 8px solid #efefef;
    font-family: "Alegreya";
    font-style: italic;
    font-weight: 400;
    font-size: 1.6em;
}

blockquote strong {
    background-color: #f6f6f6;
    border-top: 8px solid #efefef;
    font-family: "Alegreya";
    font-style: italic;
    font-weight: 700;
    font-size: 1em;
}

blockquote a {
    font-family: "Alegreya";
    font-style: italic;
    font-weight: 400;
    font-size: 1em;
}

@media screen and (max-width: 543px) {
    blockquote {
        width: inherit;
    }
}

```

Next, I filled out my **index.css** file:

```css
/* Components */

/* Component: .top (top navigation) */
header.top {
    padding: 15px 20%;
}

header.top .headerContainer {
    max-width: 1000px;
    content: "";
    clear: both;
}

header.top h1 {
    margin: 0;
    display: inline;
    border: 2px solid #b13737;
    text-decoration: none;
    background: transparent;
    color: #b13737;
    text-transform: lowercase;
    padding: 5px 10px;
    transition: background 0.5s, color 0.5s;
}

header.top h1:hover {
    border: 2px solid #b13737;
    background: #b13737;
    color: #fff;
    transition: background 0.5s, color 0.5s;
}

header.top ul {
    margin: 10px;
    padding: 0;
    float: right;
}

header.top li {
    display: inline;
    padding: 0 5px;
    font-size: 1.3rem;
}


/* Component: humongous */

.humongous {
    border-top: 1px solid #e9e9e9;
    border-bottom: 1px solid #e9e9e9;
    background-color: #f6f6f6;
    text-align: center;
    padding: 125px 10px 100px;
}

.humongous .hello {
    margin-top: 20px;
    margin-bottom: 3px;
    font-size: 3rem;
}

.humongous h1 {
  text-transform: uppercase;
}

/* End components */



/* Custom: blog-index */
.blog-index .content {
      padding: 0.25em 0;
      margin-top: 2em;
}

.blog-index .content p, .content h1 {
      max-width: 800px;
      margin: 0 auto;
}

.blog-index .humongous:not(:nth-of-type(2n)) {
  background-color: #fff;
}

.blog-index .grayscale {
  max-width: 200px;
  margin: 0 auto;
  padding: 0;
  display: block;
}

.blog-index .humongous h1.hello {
  font-size: 2.25em;
  margin: 0 auto;
  padding: 0.25em;
  max-width: 800px;
}

.blog-index ul {
  margin: 0;
  padding: 0;
}

.blog-index .datetime {
  padding: 0 0 1em 0;
  display: block;
}

/* End components */



/* Custom: blog-index */
.blog-index .content {
      padding: 0.25em 0;
      margin-top: 2em;
}

.blog-index .content p, .content h1 {
      max-width: 800px;
      margin: 0 auto;
}

.blog-index .humongous:not(:nth-of-type(2n)) {
  background-color: #fff;
}

.blog-index .grayscale {
  max-width: 200px;
  margin: 0 auto;
  padding: 0;
  display: block;
}

.blog-index .humongous h1.hello {
  font-size: 2.25em;
  margin: 0 auto;
  padding: 0.25em;
  max-width: 800px;
}

.blog-index ul {
  margin: 0;
  padding: 0;
}

.blog-index .datetime {
  padding: 0 0 1em 0;
  display: block;
}
```

Finally, I wrote my **blog-post.css** fie:

```css
/* Custom */
.content {
      padding: 0.25em 0;
      margin-top: 2em;
}

.content p, .content h1, .content h2, .content h3, .content h4, .content h5, .content h6, .content blockquote, .content li {
      max-width: 800px;
      margin: 0 auto;
}

/* Component: .top (top navigation) */
header.top {
    padding: 15px 20%;
}

header.top .headerContainer {
    max-width: 1000px;
    content: "";
    clear: both;
}

header.top h1 {
    margin: 0;
    display: inline;
    border: 2px solid #b13737;
    text-decoration: none;
    background: transparent;
    color: #b13737;
    text-transform: lowercase;
    padding: 5px 10px;
    transition: background 0.5s, color 0.5s;
}

header.top h1:hover {
    border: 2px solid #b13737;
    background: #b13737;
    color: #fff;
    transition: background 0.5s, color 0.5s;
}

header.top ul {
    margin: 10px;
    padding: 0;
    float: right;
}

header.top li {
    display: inline;
    padding: 0 5px;
    font-size: 1.3rem;
}

/* Component: humongous */

.humongous {
    border-top: 1px solid #e9e9e9;
    border-bottom: 1px solid #e9e9e9;
    background-color: #f6f6f6;
    text-align: center;
    padding: 125px 10px 100px;
}

.humongous .hello {
    margin-top: 20px;
    margin-bottom: 3px;
    font-size: 3.5em;
}

```

And, with that, we have built a blog.



# Conclusion
Metalsmith is an extremely powerful tool for building websites. It's plug-and-play capability leaves the implementation of the site up to the creator. This is one of my favorite features, as it allows me to create my site the way I want it with precision accuracy.

There's no end to what you can do with Metalsmith - you now have an idea of how to develop a site with it, and I think you can tweak it to match your idea of a perfect website with just a bit of work.
