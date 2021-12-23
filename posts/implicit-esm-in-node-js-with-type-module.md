---
title: "Implicit ESM in Node.js with \"type\": \"module\""
layout: post
description: "A brief article on the usage of \"type\": \"module\" in package.json to have .js files parsed as ECMAScript Modules (ESM)."
date: 2021-06-16
tags: 
  - post
  - node
  - webdev
  - javascript
  - beginner
series: "esm-in-node-js"
part: "2"
---
Continuing the Node.js ESM content, I'd like to talk about the comparitively straightforward alternative to [using .mjs](https://dev.to/bnb/explicit-esm-in-node-js-with-mjs-3ooh) to get your Node.js applications to run as ECMAScript Modules (ESM) rather than CommonJS: including `"type": "module"` in your `package.json`.<!-- excerpt -->

## Usage of `"type": "module"`

Let's assume we've started with the following `package.json` for a zero (production) dependency application:

```
{
  "name": "apollo-lunar-module",
  "version": "0.0.1",
  "description": "A simple, fast, nice lunar lander module",
  "main": "index.js",
  "scripts": {
    "lint": "standard"
  },
  "author": "Tierney Cyren <hello@bnb.im> (https://bnb.im/)",
  "license": "MIT",
  "devDependencies": {
    "standard": "^16.0.3"
  }
}
```

To have implicit ESM - that is, have our `.js` files parsed as ESM - we' need to make the following change:

```diff
{
  "name": "apollo-lunar-module",
  "version": "0.0.1",
  "description": "A simple, fast, nice lunar lander module",
  "main": "index.js",
+ "type": "module",
  "scripts": {
    "lint": "standard"
  },
  "author": "Tierney Cyren <hello@bnb.im> (https://bnb.im/)",
  "license": "MIT",
  "devDependencies": {
    "standard": "^16.0.3"
  }
}
```

This _specifically_ tells Node.js to parse your `.js` files under this `package.json` as ESM. Otherwise, by default (or when you use `"type": "commonjs"`), Node.js will parse your `.js` files as CommonJS. There's a few things to note:

Node.js specifically looks for the _closest_ `package.json` to determine whether or not to parse `.js` as ESM or CommonJS.

"_Closest_" is important here. If there's a `package.json` that's _closer_ to `.js` files than your project's `package.json`, and it _does not_ have `"type": "module"` (or a [dual export][dual export], which is out of the scope of this post), CommonJS will be used for those `.js` files. The most common/obvious example of this is the code within your `/node_modules/` that may not be ESM, and shouldn't be parsed as such.

Further, it's worth noting that explicitly using `.cjs` overrides `"type": "module"`. This is extremely useful if you're converting a codebase from CommonJS to ESM.

## Why `"type": "module"`?

### The Quick Answer

For you, the user, the straightforward answer to this is that using `"type": "module"` is a better developer experience than having to explicitly use `.mjs` in every single JavaScript file in your project if you're going to have a non-trivial number of files.

### The Answer With More Context

Using `"type": "module"` is often going to be a better developer experience for maintainers for a number of reasons:

- It minimizes manual changes and potential mistakes, allowing a single line of text to control parsing.
- It makes migrating from CommonJS to ESM easier.
  - It depends on how you'd like to do it, but one strategy is to chunk out work of converting your applications to ESM one bit at a time by setting `"type": "module"` and converting all the CommonJS code to use the `.cjs` file extension.
- It allows ecosystem tooling to quickly determine if your projects are using ESM or not.
  - Note that JSON modules (and therefore importing `package.json`) are only supported behind the `--experimental-json-modules` flag. It does seem that necessary proposals to streamline this seem to be making pretty decent progress through the relevant standards processes.



[.mjs]: https://dev.to/bnb/explicit-esm-in-node-js-with-mjs-3ooh
[dual export]: https://nodejs.org/api/packages.html#packages_dual_commonjs_es_module_packages