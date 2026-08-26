---
title: Essential Resources for Getting Started with AT Protocol
layout: post
date: 2026-08-25
description: A set of critical links for anyone interested in getting started with AT Protocol and exploring the landscape
tags:
  - post
  - atprotocol
atUri: "at://did:plc:uashgn65n5z7aqwk5cbuba5c/site.standard.document/3mtxb3lhnsg2t"
---
A number of times now, I've shared links with personal software engineering friends who I'm trying to convince to explore the AT Protocol. Rather than just sharing those links individually over and over again, I figured I'd just slap together a post so I can can copy/paste one link rather than more than a dozen.<!-- excerpt -->

I'll update it in the future, and I'll put my most used emoji in these parentheses every time I update it, starting with my current most used emoji for the initial post because there are no rules: (💕)

## Understanding the AT Protocol

These are some posts I conisder to be staples of atmospheric thinking. I'm sure there are more, but these are the ones that I've gone back to over and over again.

- [A Social Filesystem](https://overreacted.io/a-social-filesystem/) by Dan Abramov - required reading for understanding AT Protocol as a human who has used a computer.
- [There Are No Instances in atproto](https://overreacted.io/there-are-no-instances-in-atproto/) by Dan Abramov - really useful if you've ever even the fediverse. I originally got started in Tent which was orthogonal to the fediverse, but right at that same time I started learning about the fediverse as Mastodon and Diaspora* were getting their feet under them. Really good way to de-fediverse your brain so you can absorb how AT Protocol works from a clean slate, IMO. (Hacker News: I swear I'm not anti-fediverse.)
- [Let's Talk Money](https://blog.joebasser.com/3msgtu45ir22f/l-quote/82_0-82_261#breaking-apart-the-platform) by Joe Basser - a deep dive into money and the AT Protocol, specificially ending at the point of ATM (Atmosphere Money) which Joe is one of the developers of. IMO Atmosphere Money is a unique and good approach and I'm hopeful it actually ends up being successful.
- [The Atproto Spaces Alpha is Live](https://atproto.com/blog/atproto-spaces-alpha) by Daniel Holmgren - intro point to Atproto Spaces, which is effectively "private data" for the Atmosphere. I know a lot of folks were waiting for this to start building.

## Data

Fundamentally, the AT Protocol is about data ownership. Lexicons define structure for data, data is stored in records on a Personal Data Server (PDS), and the protocol defines how data is moved. It's way more complicated than that, but that gets you like 80% of the way there in most cases. These are some resources that are useful for the data part of AT Protocol development.

- [HappyView](https://happyview.dev/) - a one-click deployable AppView. AppViews have been called "the hardest part of AT Protocol Development" (I've seen this and am too lazy to find the source), but HappyView legitimately makes it completely trivial.
- [bluesky-social/pds](https://github.com/bluesky-social/pds) - The reference PDS implementation from Bluesky. I've heard criticisms but it is the reference implementation, so...
- [Tranquil PDS](https://tangled.org/tranquil.farm/tranquil-pds) - I've had a number of folks tell me this is the best deployable PDS. I have no stake in it but there's some social proof for you.

## Utilities

These are some utilities that I've either personally found useful when building for the AT Protocol or poked at and am looking forward to using but haven't had the need yet. 

- [microcosm.blue](https://www.microcosm.blue/) - open-source APIs that can be super useful for AT Protocol development, depending on what you're building.
- [pdsls](https://pds.ls/) - web interface for exploring the AT Protocol. It's got a pretty comprehensive record viewer + there's firehose, jetstream, spacedust, and labeler tooling.
- [atproto.at](https://atproto.at/) - a different web interface for exploring the AT Protocol. Bunch of good features, I prefer pdsls but atproto.at has a really great UI.
- [ATStore](https://atstore.fyi/) - positioning itself as the "AT Protocol App Directory", the ATStore is so far the steward of "here's different apps that take advantage of the AT Protocol". I definitely have some complicated feelings about the ATStore, but it is the central hub for discovery currently.
- [atproto.md](https://atproto.md/) - Authless markdown representation of any AT Protocol record.
- [atmosphere.money](https://atmosphere.money/) - ATM (Atmosphere Money) is a jab at trying to get payments natively into the AT Protocol.

## Things Built With AT Protocol

Just a number of things that are built on top of AT Protocol that are... neat and can show you some of the breadth of what is possible. I've found sharing this often helps people understand that it's not just about building a Twitter clone or social apps.

- [BeaconBits](https://www.beaconbits.app/) - check-in app, similar to swarm. It's browser-only, which I feel tanks its viability as a consumer app, but it's pretty nice in-browser.
- [atmowx](https://atmowx.net/) - weather data, on AT Protocol. Super cool to see data binded and visualized to the protocol.
- [adsb](https://map.adsb.at/) - flight data, crowdsourced onto the protocol. Super super cool, hits my special interests perfectly.
- [plyr.fm](https://plyr.fm/) - social music on the AT Protocol. Kinda like SoundCloud, but the songs are hosted in users' PDSes.
- [Marque](https://marque.at/) - domain registrar built on the AT Protocol. If you're building an app where users register and would want to get their own domain, you can use Marque as an interface for that - pretty nifty.

Okay that's it. Hit me up at [@bnb.im](https://bsky.app/profile/bnb.im) if you have suggestions. I might add them, I might not. If you made the thing I'll probably be more hesitant, but there's a shot.