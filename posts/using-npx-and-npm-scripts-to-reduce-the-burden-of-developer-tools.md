---
title: Using npx and npm scripts to Reduce the Burden of Developer Tools
layout: post
description: A quick tip about how you can use npx and npm scripts together to automate repetitive execution of CLIs that others have published to npm.
date: 2019-04-22
tags: 
  - post
  - javascript
  - webdev
  - productivity
  - beginners
---
On Friday, I was working on a [workshop-ified version](https://github.com/bnb/step-by-step-express-workshop) of [Step by Step Express](https://github.com/bnb/step-by-step-express) for [Flawless Hacks](http://flawlesshacks.com/) in Brooklyn.

In the workshop-ified version, I've modified each step so there is an `app.js` and an `app.complete.js` so that attendees could start with a clean slate from the previous step and know what they're aiming for to complete in the step that they're working on.<!-- excerpt -->

I figured there was probably a tool on npm that would allow me to lower the barrier even further to let attendees/users know what they need to do to complete the step and check their code against `app.complete.js` if their code isn't doing what they think it is.

After a bit of searching, I was able to find [Pretty Diff](https://www.npmjs.com/package/prettydiff), which exposes a CLI tool that allows you to diff two files, and show the difference in the console.

I tested the CLI a bit after globally installing it and was able to figure out that because of how I structured the changes (`app.js` and `app.complete.js` in each folder in addition to each folder having its own `package.json`), I was able to use the same command for every single step:

```bash
diff source:"app.js" diff:"app.complete.js"
```

Awesome! I found a tool that will hopefully lower the barrier to finding success with the code that they'll be writing. There's only one problem: they'll need the CLI to be installed for the above command to work. That sounds like a _fantastic_ way to increase the barrier to entry and waste time on tooling that was intended to improve the experience, not take away from it 😱

## Enter npx

Luckily, there's this excellent tool that everyone who has a modern version of `npm` installed already has: `npx`.

In case you're not familiar, `npx` is a CLI that the `npm` team ships which automagically executes a CLI from a module on the npm registry. Ideally, most modules will only ship one top-level command – for those modules, you can simply run `npx <module name>` and the command will be executed.

In our case, we're looking to run the `prettydiff` module and pass the `diff` command. Luckily, `npx` makes this super easy:

```bash
npx prettydiff diff source:"app.js" diff:"app.complete.js"
```

Workshop attendees can 100% run this in any of the steps' directories and they'll be able to see a diff of the before/after!

![What a terminal looks like after a participant runs `npx prettydiff diff source:"app.js" diff:"app.complete.js"` in the step-two directory](https://thepracticaldev.s3.amazonaws.com/i/hczjz1wyriurmcsjfdhr.png)

Awesome! I've found a workable solution... that is 58 characters long and has some weird syntax that may be difficult to remember for everyone. It works, but it's not necessarily ideal. Luckily, we can make it even easier.

## Using npm scripts

npm scripts are a super handy utility in our toolbelt that makes repetitive tasks and long commands easy. Awesomely, you can use `npx` inside of npm scripts – meaning you can use **any** CLI on npm to do work in your project without ever needing to actually install it. This is fantastic for build steps, productivity tools, and (in our case) diffing code.

In my case, I added a `diff` command to my `package.json`:

```json
  "scripts": {
    "lint": "standard",
    "diff": "npx prettydiff diff source:\"app.js\" diff:\"app.complete.js\""
  },
```

Now, instead of needing to write out `npx prettydiff diff source:"app.js" diff:"app.complete.js"` attendees of my workshop can just type `npm run diff` and the command will execute 🤗

## Fin

I love npx and think npx + npm scripts is a super powerful combination that allows end-users of our JavaScript code to reduce the cognitive load of repetitive commands that aid their workflow. I wanted to share this quick example of how I've used it in hopes of enabling others to focus more on code rather than getting caught up on workflows ✨

If you've got any questions about npx, npm scripts, or anything else I've talked about in this article, please don't hesitate to ask in the comments – more than happy to answer any questions you may have!