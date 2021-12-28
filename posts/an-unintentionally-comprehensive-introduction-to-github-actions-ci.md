---
title: An Unintentionally Comprehensive Introduction to GitHub Actions CI
layout: post
date: 2019-10-02
description: I recently started working on some templates for GitHub Actions CI that Node.js and JavaScript folks could simply copy/paste to instantly get cross-platform CI builds for free inside of GitHub. In this post, we go over those templates and walk line-by-line over one of them to better understand the composition of a GitHub Action CI template.
tags:
  - post
  - javascript
  - webdev
  - beginners
  - github
---
We're currently approaching GitHub Actions v2 shipping publicly for _everyone_ to use. I'm personally super excited about this because it means I don't need to configure an external service to run my CI – I can slap in some YAML, and I'm off with a cross-platform (!) CI system with multiple versions of Node.js installed.<!-- excerpt -->

For me, that's bliss. No need to go to an external site; everything is very neatly contained. That said, when I've used other CI services in the past (primarily Travis CI and Azure Pipelines) I've generally just copy/pasted someone else's CI configuration from the beginning and then tweaked it with additional context.

This time though, there's minimal prior context. During the beta of Actions v2, GitHub has published a few different CI templates that I could copy/paste certain parts from. However, there are a few standards I hold all of my projects to:

- `npm install` should pass on the latest versions of all operating systems
- `npm test` should pass on the latest versions of all operating systems
- `npm install` and `npm test` should succeed without fail on all [currently supported](https://github.com/nodejs/release#release-schedule) Node.js versions

This ends up meaning I have a matrix of anywhere from 9 (3 versions multiplied by three operating systems) to 12 (4 versions multiplied by three operating systems) CI runs on every project at any time. I've found that the implementation of _how_ to achieve this varies greatly depending on the CI system.

Given that there's not going to be a massive amount of prior art on release, I figured I'd begin building out some comprehensive templates so at launch people will have something to easily copy/paste and then tweak to suit their exact needs.

# GitHub Actions CI Templates

After working on adding GitHub Actions CI to [good-first-issue](https://github.com/cutenode/good-first-issue), I figured I should probably abstract the CI file into a repo, so it's a bit more accessible.

As such, last night, I built out [GitHub Actions CI Templates](https://github.com/cutenode/github-actions-ci-templates). Initially, I shipped it with a single template that covered my needs around Node.js and npm, but as of about an hour ago I've added two additional templates: Node.js and Yarn, and Node.js and pnpm.

If you'd like to check out the templates, they're all relatively straightforward as far as YAML goes:

- [Node.js Cross-Platform](https://github.com/cutenode/github-actions-ci-templates/blob/master/templates/javascript/nodejs-cross-platform-ci.yml):
  - Runs builds on:
    - Ubuntu (Latest),
    - Windows (Latest),
    - macOS (Latest)
  - Using all versions of Node.js that are [currently supported](https://github.com/nodejs/release#release-schedule) by the Node.js project,
  - Using `npm install` and `npm test`.
- [Node.js Cross-Platform (using Yarn)](https://github.com/cutenode/github-actions-ci-templates/blob/master/templates/javascript/yarn-nodejs-cross-platform-ci.yml)
  - Runs builds on:
    - Ubuntu (Latest),
    - Windows (Latest),
    - macOS (Latest)
  - Using all versions of Node.js that are [currently supported](https://github.com/nodejs/release#release-schedule) by the Node.js project,
  - Using `yarn install` and `yarn test`.
- [Node.js Cross-Platform (using pnpm)](https://github.com/cutenode/github-actions-ci-templates/blob/master/templates/javascript/pnpm-nodejs-cross-platform-ci.yml):
  - Runs builds on:
    - Ubuntu (Latest),
    - Windows (Latest),
    - macOS (Latest)
  - Using all versions of Node.js that are [currently supported](https://github.com/nodejs/release#release-schedule) by the Node.js project.
  - Using `pnpm install` and `pnpm test`.

## Dissecting the GitHub Actions YAML for the Templates

The templates all follow a relatively similar structure. I figured I'd walk you through each line of code of the [Node.js Cross-Platform](https://github.com/cutenode/github-actions-ci-templates/blob/master/templates/javascript/nodejs-cross-platform-ci.yml) file to help ensure that they're understandable to you. Let's go line by line, with code on the top and the description on the bottom:

```yaml
name: Node.js Cross-platform CI (using Yarn)
```

The above line is the title of the entire CI script, as it'll show up in the `Actions` tab of the GitHub repo.

Relevant docs:

- [Workflow syntax docs - `name`](https://help.github.com/en/articles/workflow-syntax-for-github-actions#name)

```yaml
on: [push]
```

The above line indicates the trigger for a run. For most CI cases, `[push]` will be ideal since you want it to run every time you push code to the repo or to a PR.

Relevant docs:

- [Workflow syntax docs - `on`](https://help.github.com/en/articles/workflow-syntax-for-github-actions#on)
- [Workflow trigger docs](https://help.github.com/en/articles/events-that-trigger-workflows)

```yaml
jobs:
```

Workflows are composed of one or more jobs. This line is an indicator that we've got multiple jobs to be run.

Relevant docs:

- [Workflow syntax docs - `jobs`](https://help.github.com/en/articles/workflow-syntax-for-github-actions#jobs)
- [Usage limits](https://help.github.com/en/articles/workflow-syntax-for-github-actions#usage-limits), for context on limits around jobs

```yaml
  build:
```

This one is the `job_id` of our specific job. Since we're running a build, I named this `build` but this specific name has no semantic meaning inside of GitHub Actions CI itself.

Relevant docs:

- [Workflow syntax docs - `jobs.<job_id>`](https://help.github.com/en/articles/workflow-syntax-for-github-actions#jobsjob_id)

```yaml
    runs-on: ${{ matrix.os }}
```

This is a required property, which tells the CI run what kind of machine it should be running on. In our case, we've added some complexity by adding a matrix of operating systems that need to be built against. That said, the context of the matrix gets hoisted, and we can use that context here.

One key thing to note from the docs:

> Each job runs with a fresh instance of the virtual environment specified in by runs-on.

Meaning, every job is running a clean instance of whatever OS is selected. This is table stakes for CI, but it's always useful to keep it in mind. ❤️

Relevant docs:

- [Workflow syntax docs - `jobs.<job_id>.runs-on`](https://help.github.com/en/articles/workflow-syntax-for-github-actions#jobsjob_idruns-on)
- [Virtual environments for GitHub Actions](https://help.github.com/en/articles/virtual-environments-for-github-actions), which lists all the possible supported values for this property

```yaml
    strategy:
```

Having a `strategy` line is the way to begin defining a matrix of environments to run your builds in.

Relevant docs:

- [Workflow syntax docs - `jobs.<job_id>.strategy`](https://help.github.com/en/articles/workflow-syntax-for-github-actions#jobsjob_idstrategy)

```yaml
      matrix:
```

The tl;dr of a matrix is that it's the set of all the pieces of context you'll want to run against. The most straightforward matrix is one row – for example, multiple Node.js versions on a _single_ platform. 

A simple matrix:

| ubuntu-latest |
|---------------|
| Node.js 8     |
| Node.js 10    |
| Node.js 12    |

That said, JavaScript and Node.js applications are effectively run on all three of the major operating systems in the world as a part of developer workflows. Often, we'll want to run on the three major operating systems to ensure that there are no unexpected platform-specific bugs that are going to occur – especially in open source when there are very few direct paths to end-users. Luckily, a matrix makes this relatively straightforward.

By adding in multiple operating systems, our matrix gets more complex:

| ubuntu-latest | macos-latest | windows-latest |
|---------------|--------------|----------------|
| Node.js 8     | Node.js 8    | Node.js 8      |
| Node.js 10    | Node.js 10   | Node.js 10     |
| Node.js 12    | Node.js 12   | Node.js 12     |

But... that's only the _latest_ versions of each platform. What about older versions that we may often need to support? Well, it turns out that we can also use older versions of each platform in GitHub Actions CI, which could even further complicate the matrix:

| ubuntu-latest | ubuntu-16.04 | macos-latest | macOS-10.14 | windows-latest | windows-2016 |
|---------------|--------------|--------------|-------------|----------------|--------------|
| Node.js 8     | Node.js 8    | Node.js 8    | Node.js 8   | Node.js 8      | Node.js 8    |
| Node.js 10    | Node.js 10   | Node.js 10   | Node.js 10  | Node.js 10     | Node.js 10   |
| Node.js 12    | Node.js 12   | Node.js 12   | Node.js 12  | Node.js 12     | Node.js 12   |

And this is currenlty a downtime for Node.js builds. Half of the year (every year) there are 4 supported release lines, which would look more like this:

| ubuntu-latest | ubuntu-16.04 | macos-latest | macOS-10.14 | windows-latest | windows-2016 |
|---------------|--------------|--------------|-------------|----------------|--------------|
| Node.js 8     | Node.js 8    | Node.js 8    | Node.js 8   | Node.js 8      | Node.js 8    |
| Node.js 10    | Node.js 10   | Node.js 10   | Node.js 10  | Node.js 10     | Node.js 10   |
| Node.js 12    | Node.js 12   | Node.js 12   | Node.js 12  | Node.js 12     | Node.js 12   |
| Node.js 13    | Node.js 13   | Node.js 13   | Node.js 13  | Node.js 13     | Node.js 13   |

A matrix is super useful in helping us programmatically define such a list without actually having to define each of these contexts individually. This utility mostly comes when you start adding more platforms and versions, but thankfully the overhead of doing that is incredibly low from the configuration side of things (see the following sections for more context)

Relevant docs:

- [Workflow syntax docs - `jobs.<job_id>.strategy.matrix`](https://help.github.com/en/articles/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix)

```yaml
        os: [ubuntu-latest, windows-latest, macOS-latest]
```

The above is effectively a variable that we're assigning to the matrix, which can be dynamically called. In our case, we're just saying that the `os` variable on `matrix` (so `matrix.os`) is going to be each of these. The _how_ is still a bit magic to me, but... it works, seemingly by iterating over each of them when they're called. When used in conjunction with another variable (like `node-version`), they're iterated over to create something like the tables above effectively.

Relevant docs:

- [Virtual environments for GitHub Actions](https://help.github.com/en/articles/virtual-environments-for-github-actions), which is where you can find information about all of the operating systems currently available.

```yaml
        node-version: [8.x, 10.x, 12.x]
```

Another variable where we're going to define the Node.js versions we'd want to be running.

Relevant docs:

- [actions/setup-node](https://github.com/actions/setup-node) – the GitHub Action we pass versions to, which defines the acceptable syntax for versions
- [Software in virtual environments for GitHub Actions
](https://help.github.com/en/articles/software-in-virtual-environments-for-github-actions) – an exhaustive list of software available in each virtual environment (OS) by default

```yaml
    steps:
```

Each job contains a set of `steps`. This specific line is where we indicate that we're going to begin defining the steps.

Relevant docs:

- [Workflow syntax docs - `jobs.<job_id>.steps`](https://help.github.com/en/articles/workflow-syntax-for-github-actions#jobsjob_idsteps)

```yaml
    - uses: actions/checkout@v1
```

Tells our workflow that we're going to be using the GitHub Action that can be found at `actions/checkout` which maps to the GitHub org/repo at [gihub.com/actions/checkout]. It's also worth noting that `@v1` which is a tagged and released version that can be found in the [GitHub Releases](https://github.com/actions/checkout/releases/tag/v1.0.0) for the repo.

Relevant docs:

- [actions/checkout](https://github.com/actions/checkout), an action that checks out your repository to `$GITHUB_WORKSPACE` in the virtual environment.
- [Workflow syntax docs - `jobs.<job_id>.steps.uses`](https://help.github.com/en/articles/workflow-syntax-for-github-actions#jobsjob_idstepsuses)

```yaml
    - name: Use Node.js ${{ matrix.node-version }} on ${{ matrix.os }}
```

The name to display for the job in the UIs that it's rendered within, given the various variables that we've inserted using `matrix`.

> **Note:** There seems to be a bug where this does not render properly  – instead of rendering as a tagged template literal, the Actions UI renders as a string.

Relevant docs:

- [Workflow syntax docs - `jobs.<job_id>.name`](https://help.github.com/en/articles/workflow-syntax-for-github-actions#jobsjob_idname)

```yaml
      uses: actions/setup-node@v1
```

Defines an external action – in this case, the [github.com/actions/setup-node] action at version 1.x.x (as released via the GitHub repo). In our case, this is an action that provides a super handy interface to install arbitrary versions of Node.js other than the version that comes baked into the VMs that are provided. My guess is that this will be a default action for _anyone_ who is running JavaScript or Node.js builds simply because it handles so much for you by default.

It's worth noting that actions consumed with `uses:` can be sourced from within the same repository, from a public repository, and from a Docker image published to Docker Hub.

Relevant docs:

- [Workflow syntax docs - `jobs.<job_id>.steps.uses`](https://help.github.com/en/articles/workflow-syntax-for-github-actions#jobsjob_idstepsuses)
- [actions/setup-node](https://github.com/actions/setup-node)

```yaml
      with:
```

This is a `map` (my assumption is that this is a `map` in the sense of YAML's definition of a map) of the parameters defined in the action. In our case, `actions/setup-node` needs a version to run with.

Relevant docs:

- [Workflow syntax docs - `jobs.<job_id>.steps.with`](https://help.github.com/en/articles/workflow-syntax-for-github-actions#jobsjob_idstepswith)

```yaml
        node-version: ${{ matrix.node-version }}
```

The `actions/setup-node` action needs a version of Node.js to run, via the `node-version:` property. Since we named the variable for Node.js versions in our Matrix `node-versions`, we're able to pass `matrix.node-version` to the `node-version:` property.

Relevant docs:

- [Workflow syntax docs - `jobs.<job_id>.steps.with`](https://help.github.com/en/articles/workflow-syntax-for-github-actions#jobsjob_idstepswith)
- [actions/setup-node](https://github.com/actions/setup-node)

```yaml
    - name: npm install and test
```

We're again defining the name of a job. In this case, there's no dynamic information since the commands we're going to be running are pretty static.

I use `npm install` and `npm test`, but your applications may vary in install/build/test/ci commands – my recommendation for this is to tweak both the title and the actual commands, so it's extremely clear what's being run.

Relevant docs:

- [Workflow syntax docs - `jobs.<job_id>`](https://help.github.com/en/articles/workflow-syntax-for-github-actions#jobsjob_id)

```yaml
      run: |
        npm install
        npm test
```

This is an interesting set of lines for those unfamiliar with YAML. We start with using a `run` property for the job, which allows us to run any command on the system. In our case, we're going to use this to run `npm install` and `npm test`... but those are two different commands, that need to be run separately. The pipe (`|`) is a tool defined in the [YAML spec](https://yaml.org/spec/1.2/spec.html#id2795688) as Literal Style. In our case, it allows us to write multiple lines that execute independently without having to use multiple `run:` commands or multiple jobs. Basically, it's shorthand that enables use to be looser in how we're able to build out our file.

> **Note:** It may be worth using `npm ci` rather than `npm install` to install dependencies, given that `npm ci` was tailor-made for CI environments. You can find more details on `npm ci` in the [official documentation](https://docs.npmjs.com/cli/ci).

Relevant docs:

- [Workflow syntax docs - `jobs.<job_id>.steps.run`](https://help.github.com/en/articles/workflow-syntax-for-github-actions#jobsjob_idstepsrun)
- [npm install](https://docs.npmjs.com/cli/install)
- [npm test](https://docs.npmjs.com/cli/test)

```yaml
      env:
```

Allows us to set up environment variables in our virtual environments with relative ease.

Relevant docs:

- [Workflow syntax docs - `jobs.<job_id>.steps.env`](https://help.github.com/en/articles/workflow-syntax-for-github-actions#jobsjob_idstepsenv)

```yaml
        CI: true
```

This one is a personal preference, and also happens to be the default for the simplest Node.js workflow suggested by GitHub. Simply sets an environment variable that can be easily picked up on by various tools. GitHub

Relevant docs:

- [Virtual environments for GitHub Actions – Environment Variables](https://help.github.com/en/articles/virtual-environments-for-github-actions#environment-variables)

## What's next?

Currently, GitHub Actions CI is in a semi-public beta as a part of GitHub Actions v2 – they've invited a bunch of folks who applied to use it. That said, if you feel like this is a repeat of what happened when GitHub Actions initially shipped last year, you'll be happy to know that in the [GitHub Special Event](https://youtu.be/E1OunoCyuhY?t=2070) in which GitHub Actions CI and GitHub Actions v2 were shared, Nat Friedman said that GitHub Actions CI and GitHub Actions v2, along with GitHub Package Registry, is shipping to everyone on November 13th – the first day of [GitHub Universe](https://githubuniverse.com/).

So, in just over a month from the date of publishing this article, you'll be able to start using GitHub Actions CI on any and every public project for free. 🎉

If you've got any questions or comments about what I've talked about in this post, or if there's more you'd like to learn about GitHub Actions CI or GitHub Actions v2, I'd be more than happy to see if I can either answer your questions in the comments directly, make good free and public repos that can help give you answers, or write more posts on the subject if you'd find that helpful!
