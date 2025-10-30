---
title: 'is-mdm: MDM detection in Node.js'
layout: post
description: A quick post about is-mdm, a package I wrote to detect MDM enrollment that was inspired by a Rust implementation found on Lobste.rs from LGUG2Z.
date: 2025-10-30
tags:
  - post
  - javascript
  - nodejs
  - package
---
Last night, I was looking at Lobste.rs and saw that the top post was a [blog post](https://lgug2z.com/articles/normalize-identifying-corporate-devices-in-your-software/) from [LGUG2Z](https://bsky.app/profile/lgug2z.com) about MDM detection, using Rust. The post heavily implied that this could be used for ensuring butts-in-seats (hands-on-keyboards?) licenses are being followed - you can use your imagination on how detecting MDM would connect to that.<!-- excerpt -->

The scripts looked pretty simple, so I thought it'd be fun to implement in JavaScript. I know no Rust, and am definitely a bit rusty since I was [laid off](https://www.linkedin.com/posts/activity-7355591427763884032-1imJ?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOeUEQB_1xI46eoODDY40HH7EreVkdWrAA) a few months ago. In the past week I've been asked 6 times what I've worked on while not employed, which I've found... weird but understandable I guess. This seemed like a way to at least derust a little bit.

It seemed like The Node Way to make it a package, so I've published a zero-tests (PRs welcome) package to npm called [`is-mdm`](https://www.npmjs.com/package/is-mdm) that checks both macOS and Windows for MDM enrollment.

## Using `is-mdm`

Quick usage, it's pretty simple. Install with `npm install is-mdm` and then:

```js
const isMdm = require('is-mdm')

isMdm() // true if MDM is detected, otherwise it'll return false
```

## Under the Hood of `is-mdm`

Basically, I converted the Rust version from the blog post and then added conditional checking of platforms through Node.js's provided `process.platform`. 

The macOS check is pretty straightforward - it uses the exact command from the blog post:

```js
function isMdmMacOS() {
	let enrolled = true; // let's assume we're managed and correct ourselves if we prove we're not

	const command = spawnSync("/usr/bin/profiles", [
		"status",
		"-type",
		"enrollment",
	]).stdout.toString();

	if (
		command.includes("Enrolled via DEP: No") &&
		command.includes("MDM enrollment: No")
	) {
		enrolled = false;
	}

	return enrolled;
}
```

The Windows version does the same thing, using the exact same command linked in the blog post:

```js 
function isMdmWindows() {
	let enrolled = true; // let's assume we're managed and correct ourselves if we prove we're not

	const command = spawnSync("dsregcmd", ["/status"]).stdout.toString();

	if (!command.includes("MdmUrl")) {
		enrolled = false;
	}

	return enrolled;
}
```

and I've wrapped them both in a function that checks the platform and exported that function as the module:
```js
function isMdm() {
	if (process.platform === "darwin") {
		return isMdmMacOS();
	}

	if (process.platform === "win32") {
		return isMdmWindows();
	}
}
```

Both functions do default to expecting that the device is MDM'ed unless it's proven that they're not - I think this is reasonable but if people want to tell me I'm wrong and I should do it differently, I'm open to that.

Honestly, I expect nobody to ever use this but I like the name in the style of `is-even` and `is-odd` and it was a fun lil process to publish a module that does something outside of what I normally look at.

As a fun aside, I have Copilot installed in VS Code because it's been a minute since I've used this computer, and while writing this it keeps suggesting that `node-mdm-detector` exists and is a package that I've written `is-mdm` as an alternative for. I searched it on Google, and Google's AI header section also thinks `node-mdm-detector` exists. It doesn't. I'm perpetually amazed at how bad literally every AI tool is.