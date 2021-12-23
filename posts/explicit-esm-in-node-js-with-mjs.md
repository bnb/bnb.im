---
title: Explicit ESM in Node.js with .mjs
layout: post
description: A brief explainer on the usage of .mjs and .cjs in Node.js.
date: 2021-06-16
tags:
  - post
  - node
  - webdev
  - javascript
  - beginner
series: "esm-in-node-js"
part: "1"
---
A while ago, Node.js introduced support for ECMAScript Modules (ESM). ESM is the **standardized** modules implementation that's been built-in to JavaScript. This differs rather significantly from CommonJS (CJS), which is the module system that Node.js has shipped with for over a decade that make them _relatively_ incompatible.<!-- excerpt -->

There are a number of different components of Node.js that have been intentionally structured to allow you to use **standard** (as in, how the ECMAScript Specification defines it) ESM by default and extend/augment that experience if you'd like to.

Today, I want to get into one of the baisc elements of ESM in Node.js: the `.mjs` and `.cjs` extensions.

## Why `.mjs` (and `.cjs`)? 

### The Quick Answer

The straightforward answer to this is that having different file extensions allows you to be explicit in how you want to run your code - `.mjs` will always be run as ESM, `.cjs` will always be run as CommonJS.

### The Answer With Context

Because of the differences in how ESM and CommonJS work, Node.js runs them differently by default. This results in the runtime needing an indicator about which way you want to run your code - as ESM or as CommonJS.

There's three different ways that this indicator could be expressed: explicitly, implicitly, and by default.

To not break over a decade of projects and over a million modules that are expecting to Just Work, the default the project landed on was CommonJS - sensible, especially when you consider millions of lines of code and multitudes of applications already running in this way.

The way to _explicitly_ assert that the code you're running is ESM and should be run as such is to just use the `.mjs` file extension (which, if you're concerned, is also supported in web browsers as long as the `Content-Type: text/javascript` header is sent and is actually [recommended by V8][V8]). The official overview of this is documented in the [determining module system][packages-documentation] section of the Node.js Packages documentation.

When you use `.mjs`, Node.js _knows_ that you've written ESM and will parse your JavaScript as such. The same is true for `.cjs` - Node.js _knows_ that `.cjs` should run as CommonJS, and will parse your JavaScript as CommonJS.


[V8]: https://v8.dev/features/modules#mjs
[packages-documentation]: https://nodejs.org/api/packages.html#packages_determining_module_system