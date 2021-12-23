---
title: Securely Automating npm publish with the New npm Automation Tokens
layout: post
description: Today, npm announced automation tokens. Let's go over what automation tokens are, what they're useful for, and how to use them.
date: 2020-10-02
tags:
  - post 
  - javascript
  - webdev
  - beginners
  - node
---
Today, npm has shipped automation tokens 🎉

Previously, if you wanted to automatically publish an npm module from CI/CD you had a choice - have 2FA turned off and allow publishing via a token **or** have 2FA turned on and build a custom tool to allow you to input a 2FA code when your CI/CD is trying to publish.<!-- excerpt -->

This was a challenging system since it made users choose between smooth DX or security. This has been impactful historically - there have been cases (for example, the [eslint-scope incident](https://eslint.org/blog/2018/07/postmortem-for-malicious-package-publishes)) where maintainers' accounts were hijacked and impactful modules were compromised since they didn't have 2FA for user publishes turned on.

Since 2FA on publish was introduced, folks in the ecosystem have been asking for the ability to have some way to automatically publish modules from CI while also having 2FA for user-publishes turned on.

Today, the npm team delivered one of the proposed solutions: automation tokens.

## What are Automation Tokens?

Automation tokens are effectively publish tokens that a user can create to publish a module from an automated process. They skip the OTP (one-time password) check and ship it.

Say, for example, that you're the maintainer of a module called `good-first-issue`. Instead of having to pull `good-first-issue` locally and publish after opening up your 2FA app and typing in the OTP, you could instead set up your favorite CI - GitHub Actions CI, CircleCI, Travis, or whatever else - to automatically publish whenever certain conditions are met. [Semantic Release](https://semantic-release.gitbook.io/semantic-release/) is a pretty wonderful example of this kind of automation.

This has the obvious benefit of streamlining workflows and reducing maintainer burden. It also helps reduce risk - in pulling down and publishing or having to build a custom publishing system both have their own additional levels of potential risk. With automation tokens, we can now pretty easily just ship code where we build it.

## How can I Use Automation Tokens?

To publish with Automation Tokens today, you'll want to do a few things to get going.

First, to actually publish to a module with an automation token, you'll need to update the module's `Settings`. Specifically, you'll need to change the module's `Publishing Access` from whatever it was previously (either `Two-factor authentication is not required` or `Require two-factor authentication to publish`) to the new option, `Require two-factor authentication or automation tokens`.

![Screenshot of npm's access page, showing off the new option](https://dev-to-uploads.s3.amazonaws.com/i/iz61wxyav8obn4yvfyuj.png)

Once you've updated that, you'll now be able to use Automation Tokens for publishing that module.

To get an automation token, you'll want to head over to your user settings. From that, you'll open up the Access Tokens page and then create a new token. When you start the token creation flow, you'll have the option to select `Automation`. Once you do, click `Generate Token` and you'll be shown the token once - copy it, and you're all set.

## Looking Forward

There are a handful of use cases where this current implementation is extremely useful - specifically, my perspective is that it's most useful where you're an individual maintainer with a limited set of projects.

That said, this is the first step in the right direction for more granular controls for all kinds of maintainers to securely manage their modules with a good DX while being as secure as possible. In speaking with the npm team, they're exploring further iteration in this space that I'm super excited for.