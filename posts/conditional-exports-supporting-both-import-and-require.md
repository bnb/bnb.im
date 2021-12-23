---
title: "Conditional Exports: Supporting both import and require()"
layout: post
description: On conditional exports and enabling end-users to use both import and require() with your module.
date: 2021-06-17
tags: 
  - post
series: "esm-in-node-js"
part: "3"
---
Now that we've both gone over how to make Node.js [implicitly](https://dev.to/bnb/implicit-esm-in-node-js-with-type-module-np) and [explicitly](https://dev.to/bnb/explicit-esm-in-node-js-with-mjs-3ooh) parse your code as ESM, we can get into some of the more meaty and interesting bits of ESM in Node.js.<!-- excerpt -->

To me, one of the most interesting features is **Conditional Exports**. With conditional exports, you can have a single module export both ESM (allowing it to be `import`ed, with all the features of `import` that you'd expect) and CommonJS (allowing it to be `require()`ed.)

From a broader perspective, this is an amazing tool for transition. Whether you're a maintainer of an open-source module or charged with supporting1 internal end-users on an SDK with a long support cycle, this helps ease the shock of going from CommonJS to ESM, or simply helps you support both use cases for as long as your consumers require.

## Setting up Conditional Exports

Let's take the `package.json` we used in the [Implicit ESM][implicit] article, and exapand on that:

```diff
{
  "name": "apollo-lunar-module",
  "version": "0.0.1",
  "description": "A simple, fast, nice lunar lander module",
  "main": "index.js",
  "type": "module",
+ "exports": {
+   "import": "./main.js",
+   "require": "./main.cjs"
+ },
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

You can see we've added the following code: 

```json
{
  // ...
  "exports": {
    "import": "./main.js", // doesn't have to be `main`
    "require": "./main.cjs" // doesn't have to be `main`
  }
  // ...
}
```

You should note that we've got `"type": "module"` in our package.json, meaning that `.js` will be interpreted as ESM and to use CommonJS in this module, we'll need to use the `.cjs` extension.


The utility of having both ESM and CommonJS in the same project becomes apparent here. We're now able to enable _both_ ESM and CommonJS users to consume our package without having to install a different module.

Now, it is worth noting that you can't just copy/paste your code from `main.js` into `main.cjs` - you'll actually need to make it work as CommonJS code, which probably also means figuring out how to support both use cases in both export styles. If you'd like a solid example of how to do this for realsies, [Myles Borins][myles] built [node-osc][node-osc] and has a [rollup configuration][rollup] that does ESM to CommonJS conversion for this exact use case. Additionally, there are a number of codemods that exist (and I've apparently [signed myself up][signup] to work on yet another codemod for this) that can help with this.

## Consuming a Module that has Conditional Exports

Thankfully, conditional exports were built in such a way that they're _largely_ invisible to end-users of your module with *one* caveat.

The caveat: if your end-users are somehow consuming the same module both as ESM and as CommonJS, the _instance_ is of the ESM and CommonJS versions are not the same. Both ESM and CommonJS have been built so the instance is shared, but in the case of using _both_ the instance will not be the same. For most folks this _likely_ won't be problematic for a number of reasons, but it is still a possibility. The most likely way this'll surface is through _you_ using a conditionally exported module one way and a dependency in `node_modules` using it a different way.

Outside of that, you'd use modules with conditional exports however you would normally.

Let's take the example of `apollo-lunar-module` that we've been using:

```bash
npm install apollo-lunar-module
```

To use it in ESM:

```js
import * as lander from "apollo-lunar-module"
```

And if we wanted to import (hypothetical) named exports from `main.js` with ESM:

```js
import { abortGuidancePanel } from "apollo-lunar-module"
import { plssCondensateContainerAssy } from "apollo-lunar-module"
import { crewLog } from "apollo-lunar-module"
```

To use it in CommonJS:

```js
const lander = require("apollo-lunar-module")
```

And, again, if we wanted to consume (hypothetical) named exports, exposed by `main.cjs`: 

```js
const { abortGuidancePanel } = require("apollo-lunar-module")
const { plssCondensateContainerAssy } = require("apollo-lunar-module")
const { crewLog } = require("apollo-lunar-module")
```

Either way, as an end-user, conditional exports make support for ESM or for CommonJS effectively invisible to those who are using your modules the other way. This ends up creating a pretty wonderful solution for end-users, enabling maintainers to ensure they're supporting both ESM and CommonJS consumers _if they want to_.

[implicit]: https://dev.to/bnb/implicit-esm-in-node-js-with-type-module-np
[explicit]: https://dev.to/bnb/explicit-esm-in-node-js-with-mjs-3ooh
[myles]: https://twitter.com/MylesBorins
[node-osc]: https://github.com/mylesborins/node-osc
[rollup]: https://github.com/MylesBorins/node-osc/blob/main/rollup.config.mjs
[signup]: https://twitter.com/bitandbang/status/1404929283500478470