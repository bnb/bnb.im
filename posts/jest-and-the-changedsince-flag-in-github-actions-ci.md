---
title: Jest and the `--changedSince` flag in GitHub Actions CI
layout: post
description: Today I worked through getting Jest's `--changedSince` flag working on GitHub Actions CI. Let's dig into why, what happened, and how each of the moving parts work in a way that's seemingly not documented anywhere else.
date: 2020-04-09
tags:
  - post
  - javascript
  - beginners
  - tutorial
  - node
---
Recently, I've been working a lot more with GitHub Actions - both writing actions and creating CI pipelines for projects. Last week I picked up a project I started a bit ago: the [nodejs/examples](https://github.com/nodejs/examples) repository.<!-- excerpt -->

> **Note:** The examples repository is still in its early stages. As such, there's still a bunch of WIP work we're doing - we've intentionally not talked a bunch publicly about it yet. That said, if you're interested in helping, feel free to reach out to me on [Twitter](https://twitter.com/bitandbang) or the [OpenJS Slack](http://slack.openjsf.org) ❤️

The goal of this repository is to be home to a bunch of distinct and well-tested examples of real-world Node.js that go beyond "hello, world!". This means there's hopefully going to be a boatload of distinct projects in there.

This structure presents a challenge when trying to be straightforward for new contributions; specifically, it's a barrier to run a full test suite for many projects when someone submitting a PR only needs to see the results of the one they've worked on.

## Jest's Solutions

Jest has a super handy [`--onlyChanged`](https://jestjs.io/docs/en/cli.html#--onlychanged) feature that only tells you what has changed in the current repository. This is super duper handy, but the functionality is slightly unclear in one way: does it diff with master or just with the previous commit? It does indeed seem to be the latter (though I could totally be wrong!), which is not particularly helpful in the case of PRs with multiple commits.

As such, I looked through the flags that Jest exposes and found the [`--changedSince`](https://jestjs.io/docs/en/cli.html#--changedsince) flag which compares the current work with a different branch. Since - in the case of nodejs/examples - master will always be a source of truth, this is perfect for the use case of potentially having multiple commits while still wanting to run only the tests relevant to a proposed change.

## `--changedSince` and GitHub Actions CI

Previously, the `--onlyChanged` flag worked flawlessly with GitHub Actions CI. When trying to simply change from `--onlyChanged` to `--changedSince`, the CI build immediately nuked itself with the following command:

```bash
  ● Test suite failed to run

    fatal: bad revision '^master'
```

This was bizarre to me since the test was working completely fine on my machine (shocker, I know). Upon investigating, this is a `git` error and not a Jest error - Jest is merely acting as a courier for that error.

It turns out that the `actions/checkout` GitHub Action does not checkout your full repository, but only the code relevant to the PR. As such, `master` as a branch did not exist. Further, my specific use case of wanting to have `master` in the run but have the PR branch checked out is not particularly well supported by `actions/checkout` at present since it is somewhat of an edge case (though I did [open an issue](https://github.com/actions/checkout/issues/214) to request it).

While the examples are helpful, they don't solve my somewhat complex but not over the top use case. Layer on that I'm not super excellent with git, and you have a challenging mixture. 

I reached out to [Shelley Vohr](https://twitter.com/codebytere/), who's extremely talented with git (amongst many other things) and explained what I was facing. She suggested that I'd need to go one step beyond what the `actions/checkout` repo recommended:

```bash
git fetch --no-tags --prune --depth=1 origin +refs/heads/*:refs/remotes/origin/* # fetches all branches
```

... and needed to checkout `master` with the following command:

```bash
git checkout -b master # -b creates and checks out a new branch
```

... and then switch back to the PR branch. Luckily, GitHub provides that data in the YAML config:

```bash
git checkout ${{ github.event.pull_request.head.sha }} # checks out the SHA of the HEAD from the PR
```

This was all able to be combined as a part of a `run` property in the YAML for the step, which runs whatever commands are passed to it:

```yaml
    - uses: actions/checkout@v2
    - run: |
        git fetch --no-tags --prune --depth=1 origin +refs/heads/*:refs/remotes/origin/* # fetches all branches
        git checkout -b master # -b creates and checks out a new branch
        git checkout ${{ github.event.pull_request.head.sha }} # checks out the SHA of the HEAD from the PR
```

However, that's a rather bulky git fetch that can potentially artificially increase the build times as more branches are added to the repo. As such, I figured I should try to cut it down to just what I needed. After a bit of searching around, I found the `git fetch <remote> <branch>` structure. Since I know I'll always want to use master, this was a pretty easy change (while also ditching `--prune` since it seems potentially useless in this case):

```yaml
    - uses: actions/checkout@v2
    - run: |
        git fetch --no-tags --depth=1 origin master
        git checkout -b master
        git checkout ${{ github.event.pull_request.head.sha }}
```

In addition to all this YAML CI config, I also included a new npm script called `test:changedsince` which is a handy shortcut for the Jest command I want to run:

```json
  "scripts": {
    "test": "jest --coverage",
    "test:changedsince": "jest --changedSince=master --coverage",
    "lint": "standard"
  },
```

This new npm script took the place of the previous `test:onlychanged` npm script in my final GitHub Actions CI YAML config, seen below. **Note**: if you copy-paste this config into your own CI, you'll need ensure that you have `jest` as a `devDependency` so it's installed on your CI build.

```yaml
name: tests(push) - install, lint, test:changedsince

on: [push]

jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macOS-latest]
        node-version: [10.x, 12.x]
    steps:
    - uses: actions/checkout@v2
    - run: |
        git fetch --no-tags --depth=1 origin master
        git checkout -b master
        git checkout ${{ github.event.pull_request.head.sha }}
    - name: Use Node.js ${{ matrix.node-version }} on ${{ matrix.os }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}
    - name: npm install
      run: npm install
      env:
        CI: true 
    - name: npm run test:changedsince
      run: jest --changedSince=master --coverage
      env:
        CI: true
```

Now, this seems to be working perfectly - it'll diff changes between the current PR's `HEAD` and `master`, running only the tests that are different across *all* commits and not just between the most recent commit and the one prior.
