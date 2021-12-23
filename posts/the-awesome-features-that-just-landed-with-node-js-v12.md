---
title: The Awesome Features that Just Landed with Node.js v12
layout: post
description: Node.js v12.0.0 just shipped! Let's take a look at what's new.
date: 2019-04-25
tags: 
  - post
  - node
  - javascript
  - webdev,
  - opensource
---
This week, we saw the release of Node.js v12, the next Node.js release line that will become LTS. I wanted to go through the various posts that went out and the changelog and condense the information into an easily consumable digest of what's new in Node.js v12.x to share with everyone. 💖<!-- excerpt -->

## The 🔥 Changes

Let's dig into some of the most important and remarkable changes that have landed in v12.0.0!

### New ES Modules, who dis

With the release of Node.js v12.0.0, we see the introduction of a new implementation of ES Modules in Node.js. 🎉

> **Note:** ES Modules features are still **Experimental** and as such should _not_ be used in production code until they are finalized.

At release, this new implementation has replaced the previous implementation behind the `--experimental-modules` flag. This is intended to help get the new implementation out there and tested so the project can get feedback. If all goes well (🤞), this can ship unflagged once Node.js v12 goes LTS in October!

Up front, I want to say this is going to be a tl;dr. If you're interested in a deeper dive into the new hotness around ESM in Node.js, please check out the blog post by [the Modules Team](https://medium.com/@nodejs/announcing-a-new-experimental-modules-1be8d2d6c2ff) on Medium. 

#### Previous implementation

Many of the previous implementation's features carried over. This includes ES2015 `import` statements, various kinds of `export`, Node.js `export` support on all core modules, WIP imports for CommonJS, **very** WIP loader API, and explicit ESM parsing if the `.mjs` file extension is present.

#### New implementation features

These features are 100% new with the enhancements the Modules Team has been working on, and are available behind the `--experimental-modules` flag in Node.js v12.0.0.

- Import and export syntax in `.js` files
  - there was lots of feedback that Node.js needs to provide a way to use import/export in `.js` files.
  - Two different solutions were implemented for this (keep reading!)
- Support for `"type": "module"` in `package.json`
  - If this is detected, Node.js will treat _all_ `.js` files in your project as ES Modules.
  - If you still have CommonJS files, you can rename them with the `.cjs` file extension, which will tell Node.js to parse them as CommonJS explicitly
  - An `--input-type` flag for cases like `--eval` and STDIN


#### Current WIP Features

These features are currently being worked on by the Modules team and are either implemented but are likely going to change _or_ are being worked on but did not ship in Node.js v12.0.0.

- JSON imports
  - Currently does not work, but is being actively worked on.
- import and require interop
  - ️️⚠️ The Modules Team has requested that you do not publish ES Modules that can be used in Node.js until it's been resolved. I assume that modules published before this is resolved will likely break.
- Module Loaders
  - ⚠️  Very WIP
  - A first implementation of the `--loader` API has shipped, but it's going to be improved upon and, as such, _change_.
- A simpler way to `require` in ES Modules code.
  - The current implementation is a bit heavy-handed. The Modules team is working on lowering the barrier.
- Package path maps
  - This would allow for less verbose imports in certain situations
- Automatic entry point module type detection
    - Effectively, static analysis that would allow Node.js to figure out if a module is a CommonJS module or an ES Module.

#### Quick ESM Examples

If you're interested in seeing what ESM in Node.js looks like, you can check out two repos I pushed out yesterday:

- [simple-esm](https://github.com/bnb/simple-esm) – an example of what ESM in Node.js looks like with the current ESM implementation
- [simple-esm-usage](https://github.com/bnb/simple-esm-usage) – an example of how you could use ESM modules from npm in Node.js if the current implementation were to ship unchanged (it's going to be changing, so this is more theory than practice)

I'm planning to keep these repos (and the version of simple-esm published to npm) both up-to-date as the ESM implementation changes both for my own understanding and as a community resource to have a minimum viable example of ESM in Node.js.

### V8 7.4

This release included a major **V8 upgrade**, jumping forward several releases to the most recent version of V8 at time of release. This upgrade includes a plethora of really fantastic enhancements. I'm personally most interested in [Zero-cost Async Stack Traces](https://v8.dev/blog/v8-release-72#async-stack-traces), but there are a plethora of additional enhancements that are better outlined by Mathias Bynens from the V8 team:

https://twitter.com/mathias/status/1120700101637353473

### TLS 1.3

Next up, we have **official TLS 1.3 support**. This is an incredible improvement to previous TLS versions, and I'm super excited that it's now supported in a release line that'll be going LTS! Thankfully, this is a backward compatible change thanks to the underlying implementation in OpenSSL 1.1.1. Additionally, it's mentioned [in the PR](https://github.com/nodejs/node/pull/26209) that it should be backported to other LTS release lines.

If you're curious about the awesome parts of TLS 1.3, I recommend this [blog post](https://www.ietf.org/blog/tls13/) from the IETF.

### Worker Threads

This is the first LTS release line that will include the currently-experimental work on Worker Threads. This release has removed the need to run Worker Threads with a flag, hopefully lowering the barrier to more widespread usage of the tool for parallelizing work in Node.js.

If you're interested in trying out Worker Threads today, there are a few resources you can use to get started:

- [Using worker_threads in Node.js](https://medium.com/@Trott/using-worker-threads-in-node-js-80494136dbb6)
- [Simple bidirectional messaging in Node.js Worker Threads](https://hackernoon.com/simple-bidirectional-messaging-in-node-js-worker-threads-7fe41de22e3c)
- [Node.js multithreading: What are Worker Threads and why do they matter?](https://blog.logrocket.com/node-js-multithreading-what-are-worker-threads-and-why-do-they-matter-48ab102f8b10)
- [Official Node.js Worker Threads Docs](https://nodejs.org/api/worker_threads.html)

### Built-in Heap Snapshotting

In this release, we also see built-in heap snapshotting adapted from the [heapdump module](https://www.npmjs.com/package/heapdump) on npm. This is exposed via `v8.getHeapSnapshot()` and returns a readable stream. 

## Other Notable Changes and Improvements

- Core Dependencies: 
  - Upgraded to OpenSSL [1.1.1b](https://www.openssl.org/news/cl111.txt) ([nodejs/node#26327](https://github.com/nodejs/node/pull/26327))
  - Upgraded to ICU 63 ([nodejs/node#25852](https://github.com/nodejs/node/pull/25852))
    - There is also currently an [open PR](https://github.com/nodejs/node/pull/27361) to further update to ICU 64.2
- Node.js has started using [llhttp](https://github.com/nodejs/llhttp) as its default parser ([nodejs/node#24730](https://github.com/nodejs/node/issues/24730))
- Invalid `main` entries in `package.json` will now throw an error ([nodejs/node#26823](https://github.com/nodejs/node/pull/26823))
- `node --debug` is now EOL – use `node --inspect` instead ([nodejs/node#25828](https://github.com/nodejs/node/pull/25828))
- TLS 1.0 and 1.1 are now disabled by default ([nodejs/node#23814](https://github.com/nodejs/node/pull/23814))


## Fin

Hopefully this overview of the new release is helpful to you! If you've got any questions about the new features that've shipped, when you can start expecting to use ESM in Node.js, or anything else about Node.js v12 I'm happy to be a resource for you to hopefully find the answers you're looking for!