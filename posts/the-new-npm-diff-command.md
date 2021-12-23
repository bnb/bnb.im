---
title: 'The New npm diff Command'
layout: post
published: true
description: In a recent release, the npm CLI shipped a new command - npm diff - that's extremely useful for inspecting Node.js and JavaScript modules published to the npm registry. This is a relatively detailed primer on that command.
date: 2021-04-02
tags:
  - post
  - javascript
  - webdev
  - beginners
  - node
---
With the recent [release of npm@7](https://github.blog/2021-02-02-npm-7-is-now-generally-available/), we've gotten a few neat new features in npm.

One of the ones that I imagine can go under the radar for most folks is the `npm diff` command. It's a relatively... advanced command that has immense potential utility.<!-- excerpt -->

## Preface

There's a few things we should establish as baseline assumptions before digging in.

First, I'm going to be talking about a "local version" and a "remote version".

The local version will be a module in your current working directory - so, if I wanted to diff my local `liblice` module with the remote published version, I'd need to have that on disk and either have it as my current working directory or pass it as a path to the command. For the sake of this article, we're going to assume anytime we're diffing a local version it's in the current working directory.

The remote version will be one that's on your default registry. For the vast majority of folks, this will be the default npm registry (a.k.a. <https://registry.npmjs.com>). However, if you're trying to diff a module published to an alternative registry (say, an internal corporate registry) or if you've changed your default registry to a mirror or internal cache, that would be the registry the remote version would be checking. This is some super nice flexibility that comes free with the diff command that enables some pretty nice theoretical advanced workflows.

## Diffing the Local Version with the Latest Remote Version

The raw command will diff the local version of a module with the remote version. This is particularly useful for module maintainers, contributors, and those floating local patches on a module (to patch a security vulnerability, for example).

```bash
npm diff
```

This will output _all_ differences between the local version and the remote version. With a single change (replacing `pass` with `return`) in README.md to use a better word, here's an example of what output would look like:

```diff
$ npm diff
diff --git a/README.md b/README.md
index v1.1.0..v1.1.0 100644
--- a/README.md
+++ b/README.md
@@ -10,7 +10,7 @@
 
 ## Usage
 
-temporalts can pass all Node.js LTS release line temporal information, or the temporal information for a _specific_ release line.
+temporalts can return all Node.js LTS release line temporal information, or the temporal information for a _specific_ release line.
 
 ### `temporalts()`
```

## Diffing Individual Local File(s) with the Latest Remote Version

If you've made more than a single tiny change to your module, diffing a single file from the local version with the remote version.

```bash
# the general structure
npm diff [...paths]

# specific examples
npm diff README.md
npm diff /lib/handler.js
npm diff SECURITY.md /public/index.html
```

Instead of getting a diff for all files, you'll only get diffs for any paths you passed. If you passed a single path, you'll get a single diff; if you passed multiple, you'll get multiple.

This functionality can be _particularly_ useful in a handful of cases: generating changelogs, checking how something works in the currently published version, or even as a prepublish check to make sure you're only shipping changes you intended to ship.

## Diffing Local Version with a Specific Remote Version

Similar to [Diffing the Local Version with the Latest Remote Version](#diffing-the-local-version-with-the-latest-remote-version), you can diff your local version of a module with the remote version, but with any specific version. 

```bash
npm diff --diff=<version>
```

As an example, here's an excerpt from running `npm diff --diff=1.0.1` on [temporalts@1.1.0](https://npm.im/temporalts). There's a single version between these two - v1.0.1 was _also_ published, and we're able to compare what we _currently_ have with a _previous_ version that's not `@latest`. There's a few uses for this, like checking what's changed in a module while upgrading, changelog authoring, or pre-publish change validation (especially if you're using `files` in package.json to limit which files you're publishing).

We can also diff _forward_ - for example, if I were to publish `temporalts@2.0.0`, I'd be able to diff between v1.1.0 and v2.0.0. This is useful, particularly if you're looking forward for upgrades or at pre-release versions.

```diff
$ npm diff --diff==1.0.0                                                                                
diff --git a/examples/12.js b/examples/12.js
deleted file mode 100644
index v1.0.0..v1.1.0 
--- a/examples/12.js
+++ b/examples/12.js
@@ -1,12 +0,0 @@
-const temporalts = require('../')
-
-async function prettyPrint () {
-  const version = 'v12'
-  const data = await temporalts(version)
-
-  console.log()
-  console.log(`We are ${data.currentPercentOfLTSLifeSpanWithoutDecimal}% through the lifespan of the Node.js ${version} LTS release line.\n${data.currentPercentOfLTSLifeSpanAsProgressBar} `)
-  console.log()
-}
-
-prettyPrint()
\ No newline at end of file
diff --git a/helpers/fetchSchedule.js b/helpers/fetchSchedule.js
index v1.0.0..v1.1.0 100644
--- a/helpers/fetchSchedule.js
+++ b/helpers/fetchSchedule.js
@@ -12,4 +12,4 @@
   }
 }
 
-module.exports = fetchSchedule
+module.exports.fetchSchedule = fetchSchedule
diff --git a/index.js b/index.js
index v1.0.0..v1.1.0 100644
--- a/index.js
+++ b/index.js
@@ -1,3 +1,3 @@
-const lts = require('exports/lts.js')
+const lts = require('./exports/lts.js')

[... more file diffs, dropped for length]
```

## Diffing Individual Local File(s) with a Specific Remote Version

As an extension of [Diffing Local Version with a Specific Remote Version](), you can also pass in a single file to diff.

```bash
# the general structure
npm diff --diff=<version> [...paths]

# specific examples
npm diff --diff=<version> README.md
npm diff --diff=<version> /lib/handler.js
npm diff --diff=<version> SECURITY.md /public/index.html
```

As an example, if we diff `index.js`:

```diff
$ npm diff --diff==1.0.0 index.js
diff --git a/index.js b/index.js
index v1.0.0..v1.1.0 100644
--- a/index.js
+++ b/index.js
@@ -1,3 +1,3 @@
-const lts = require('exports/lts.js')
+const lts = require('./exports/lts.js')
 
 module.exports = lts
 ```

## Diffing Two Remote Versions

There is also a very valid reason you may want to diff two versions of the same module you've got that aren't locally stored. `npm diff` allows you to do this with package identifiers (a.k.a. `pkg-identifier`) which is something along the lines of `package@semver-range` - so, for example, `node@12.10.0`, `fastify@latest`, `babel@7.0.0-rc.1`, and `npm@7`.

```bash
# the general structure
npm diff --diff=<pkg-identifier> --diff=<pkg-identifier>

# specific example
npm diff --diff=gatsby@2.32.3 --diff=gatsby@latest
```

If we try to run the latter command - comparing a slightly older version of Gatsby to the latest version - we'll get about 19mb of diff output at time of publishing (the latest version of Gatsby is presently `gatsby@3.2.0` if you'd like to try to reproduce this output exactly). Unfortunately, that's far too much to include in a blog post, but you should try running it yourself.

As with any actively developed module - or any sufficiently modified module from one package identifier to another - this diff will only get bigger as the maintainers published newer and newer versions, making more changes.

## Diffing Individual Files from Two Remote Versions

As with previous `npm diff` commands, you can pass in individual files or paths to filter your diff's output and you'll get just a diff for that file or path.

```bash
# the general structure
npm diff --diff=<pkg-identifier> --diff=<pkg-identifier>

# specific examples
npm diff --diff=fastify@3.13.0 --diff=fastify@latest package.json
npm diff --diff=fastify@3.13.0 --diff=fastify@latest /lib/errors.js
npm diff --diff=fastify@3.13.0 --diff=fastify@latest README.md /lib/context.js
```

Here's what the output for the first command there looks like:

```diff
$ npm diff --diff=fastify@3.13.0 --diff=fastify@latest package.json
diff --git a/package.json b/package.json
index v3.13.0..v3.14.1 100644
--- a/package.json
+++ b/package.json
@@ -1,6 +1,6 @@
 {
   "name": "fastify",
-  "version": "3.13.0",
+  "version": "3.14.1",
   "description": "Fast and low overhead web framework, for Node.js",
   "main": "fastify.js",
   "type": "commonjs",
@@ -177,7 +177,7 @@
     "abstract-logging": "^2.0.0",
     "ajv": "^6.12.2",
     "avvio": "^7.1.2",
-    "fast-json-stringify": "^2.2.1",
+    "fast-json-stringify": "^2.5.2",
     "fastify-error": "^0.3.0",
     "fastify-warning": "^0.2.0",
     "find-my-way": "^4.0.0",
```

## Useful Flags

The `npm diff` command also provides some helpful flags to limit the diff output to only _relevant_ changes, depending on your goal.

- `--diff-ignore-all-space`: Ignores all changes that are exclusively space. Extremely useful for limiting changes to only what matters, especially after linter runs.
- `--diff-name-only`: Limits outputs to _only_ filenames of files with changes for the command. Extremely useful for getting an overview of what's changed and figuring out which files to drill down into.