---
title: Markdown Link Checking in GitHub with Actions
layout: post
description: If you maintain any repo for a sufficient amount of time, you'll end up finding that various Markdown links will eventually break. With GitHub Actions you can address this challenge with ease.
date: 2021-05-05
tags:
  - post
  - beginners
  - opensource
  - github
  - javascript
---
Having been a part of the Node.js project since the io.js 1.0 announcement, one of the things I've grown extremely familiar with is how untouched Markdown documents that are supposed to provide a foundation can rot over time.<!-- excerpt -->

More specifically, a project on GitHub can slightly tweak how it operates every now and then. Those changes might not be enough to justify a documentation change since they're not meaningfully different enough.

If enough of these pile up you can end up with some blind spots on how your foundational documents haven't kept up with the times. This can often be remedied by manual inspection, but even then there's things that you might miss.

One of those things I've often missed when doing that manual inspection is broken links. Specifically, if a file is moved at some point but all references to it aren't updated you end up in a situation where those references point to a 404.

I've also had a handful of experiences with external links to smaller sites die because they decided to completely redesign the site and its structure... and if we're honest, I've only noticed those when I've really tried to find things that are broken. I'm **sure** others who are less familiar with that documentation have hit them more often.

Various forms of link rot like this are something that I've struggled to fight with different tooling for years. Now, thankfully, I've found the exact setup I've always wanted.

## Linkinator and GitHub Actions

A friend, [Justin Beckwith](https://twitter.com/justinbeckwith), published a tool that serves both as a CLI and a module called [Linkinator](https://github.com/JustinBeckwith/linkinator) some time ago that focused on finding broken links within HTML sites. He extended it to work with Markdown [relatively recently](https://github.com/JustinBeckwith/linkinator/issues/73#issuecomment-737661545) as well.

He _also_ published a [Linkinator GitHub Action](https://github.com/JustinBeckwith/linkinator-action) that consumes Linkinator as a module and uses that to cleanly integrate with GitHub repositories.

Even more recently, he added [the `retry` functionality](https://github.com/JustinBeckwith/linkinator-action/pull/45) from the module to the Action.

With `retry` and the foundation of the rest of the work Justin's put into Linkinator, my problems with Markdown link rot in GitHub have now been entirely solved.

Let's get into how.

## Markdown Link Rot Begone: Using the Action

The first space I've set up Linkinator is in the Node.js Community Committee repo via [#658](https://github.com/nodejs/community-committee/pull/658). Specifically, this PR adds the Linkinator GitHub Action and fixes all (but one, which has been fixed in a different unmerged PR) broken links in the repository. As it turns out, there were quite a few... including some in very notable places, like the README.

The setup is pretty standard for a single purpose GitHub Action. There's some pretty decent documentation of the expected YAML on [GitHub's Docs site](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions). I'll walk through each line with you:

### Setting up Triggers

To start, we set up [the triggers](https://docs.github.com/en/actions/reference/events-that-trigger-workflows) for the Action. The first line will always be `on:` but from there you can do a lot.

In this specific case, I've set it up to run on push to the default branch (thanks to the handy `$default-branch` macro, it doesn't matter what the name is!), on PRs (this could be more verbose to run less often), and on `workflow_dispatch` which allows us to run it manually via the GitHub Actions UI if we want to.

```yaml
on:
  push:
    branches:
      - $default-branch
  pull_request:
  workflow_dispatch:
```

### The Name

Next, we have the name which is what will appear in the GitHub UI. In this case, I just went with `Linkinator CI` but you can change this to whatever you'd like.

```yaml
name: Linkinator CI
```

### The Job

The beginning of the jobs section is, again, relatively standard. We include the `jobs` property under which we start defining the work that'll be done.

In this case, we name the (only!) step `linkinator` since I like to try to keep to as small yet as descriptive of a job name as is possible.

Then, we tell Actions to run this on `ubuntu-latest` and add the property `steps` to start defining what we're going to do in the job.

From there, we then we declare that we want to use the [actions/checkout](https://github.com/actions/checkout) action which by default checks out the repo this is running in and sets things up nicely for us.

```yaml
jobs:
  linkinator:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
```

Next, we're going to actually include the `linkinator` step. We call the Linkinator action from Justin's repo directly. We also pass a few of [Linkinator's inputs](https://github.com/JustinBeckwith/linkinator-action#inputs) via the `with` property:

- `paths`: we're specifically checking for all markdown files in the project, recursively with [globbing](https://en.wikipedia.org/wiki/Glob_(programming)).
- markdown: asserting to Linkinator that we're specifically looking for markdown files (as opposed to HTML files).
- retry: for GitHub repos that have links to GitHub this is super important - if we get timed out because of a rate limit, the Action will respectfully retry until they get a non-rate-limited response.

```yaml
      - uses: JustinBeckwith/linkinator-action@v1
        with:
          paths: "**/*.md"
          markdown: true
          retry: true
```

### The Whole Configuration

Putting all of that together, we get the following:

```yaml
on:
  push:
    branches:
      - $default-branch
  pull_request:
  workflow_dispatch:
name: Linkinator CI
jobs:
  linkinator:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: JustinBeckwith/linkinator-action@v1
        with:
          paths: "**/*.md"
          markdown: true
          retry: true
```

By popping this as a new file into `./github/workflows/` (say, `./github/workflows/linkinator.yml`) and pushing it to your repo, you'll start getting link checks on every push and PR plus whenever you want to manually run it.

Genuinely happy with this solution and I hope it helps someone else as much as it's (going to be) helping me ❤️