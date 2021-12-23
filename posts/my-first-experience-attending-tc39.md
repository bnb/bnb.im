---
title: My 🔥 First Experience Attending TC39
layout: post
description: Sharing everything about my experience as a first-time attendee at a TC39 meeting
date: 2019-04-15
tags:
  - post
  - javascript
  - webdev
  - opensource
  - tc39
---
A few weeks ago I had the opportunity to attend TC39, the ECMA technical committee that defines the ECMAScript specification, for the first time. As a first-timer, the experience wasn't what I expected and I want to share what it was like being there. I'd like to share that experience with y'all 💖<!-- excerpt -->

## What the heck is TC39

TC39 is a Technical Committee (hence TC) under [ECMA International](https://www.ecma-international.org/) that defines the ECMAScript standard – better known as JavaScript. There's a pretty good article outlining what the differences between the two are [over on FreeCodeCamp](https://medium.freecodecamp.org/whats-the-difference-between-javascript-and-ecmascript-cba48c73a2b5).

tl;dr: TC39 builds the specification that browser engines implement that lets _you_ run JavaScript.

## Terminology

I wanted to build a tiny list of terminology because there is a lot of words that are commonly used in the meetings. Trying to interpret the terminology while also keeping up with the discussions was a challenge. Going into the meeting, I knew none of the terminology. Over three days I ended up catching on. In the rest of this article, I'll be using some of these terms – I wanted to put them up front so y'all will be able to refer to them 💖

- **Proposal**: A proposal is a suggested addition to ECMAScript. For example, `import()` and `BigInt` are both proposals. You can find the full list of proposals [on GitHub](https://github.com/tc39/proposals).
- **Stages**: The mechanism that TC39 uses to advance proposals. I would argue this is a consensus mechanism, though others may disagree. You can find the entire staging process in the [process document](https://tc39.github.io/process-document/).
- **Plenary**: The part of the meeting in which proposals are being discussed. Effectively, when everyone is in the room discussing proposals.
- **Normative**: Typically brought up in the context of "normative changes", when something is normative it's a requirement in the spec that's not reflected correctly. A "normative change" is a change that is intended to resolve such an issue. Basically, they're bugs in the spec. See [@allenwb](https://dev.to/allenwb)'s [comment](https://dev.to/allenwb/comment/a5eg) on this post for more context!
- **Delegate**: An individual representing a member (members are corporate entities) of ECMA International.
- **Invited Expert**: Someone who is invited by the Secretariat General (a role currently held by [Istvan Sebestyen](https://www.linkedin.com/in/istv%C3%A1n-sebesty%C3%A9n-81733a7/) – you can see the job description [here](https://www.ecma-international.org/news/Call_for_new_Ecma_SG_March%202018.pdf)) or a member or of TC39 (as far as I can tell?) as a domain expert. They are not delegates themselves.

## Expectation vs. Reality

### What were my expectations going in?

In the context of the plenary session, I was expecting was an extremely high barrier in terms of a computer science education and in terms of understanding how specifications work. That is _not_ my background, so I was... nervous about that expectation.

As an extension of that expectation, I was confident that I wasn't going to be able to contribute to the meeting much at all – I was expecting to observe the meeting to figure out if there was a path to meaningful contributions for me.

### How did my expectations stack up to reality?

In reality, the technical barrier was a lot lower than my expectations. There was a lot I didn't understand, but that mostly seemed to stem from not being familiar with the specification and how certain parts of it work – less of a "you're not coming from a computer-science background" and more of a "you're not familiar with this specific context." I know I can catch up on context, but I don't think I can reasonably catch up on a comp-sci degree.

This isn't to say that a computer science background wouldn't be helpful (it absolutely would), but I'm not feeling left out because I don't have one. There is a _tremendous_ amount of work that can be done with other skills. Technical writing, reviewing, contributor onboarding, and even experience with JavaScript as a developer of any level are all traits that are appreciated in the meetings and in work on GitHub.

Additionally, I was surprised that there were multiple paths to non-trivial contributions that weren't just technical contributions. Just like any good open-source project, TC39 seemed to value non-code contributions. I now realize how... silly my expectation of not being able to contribute was because the vast majority of the work done in TC39 isn't actually about writing code. There is absolutely code written (see, for example, the [Realms proposal](https://github.com/tc39/proposal-realms), which has a shim, examples, and other bits of code) but an immense amount of the work seems to be writing docs, building consensus, and other work to help surface both the specification and the processes via which the specification are built.

I was incredibly happy to be able to assist with meeting minutes – of which there were roughly two dozen pages written on each of the three days. As someone with ADHD, it was awesome to be able to follow along with the discussion by typing out what I was hearing (this personally helps me commit information to memory more easily) and work with 1-2 other people at a time on getting content into the minutes as a team. Additionally, there were several points when I hit a limit of being able to focus on the discussions, and I was able to spin out at those points and focus on something else. Everyone who was working on the minutes was incredibly friendly, and I felt like that contribution was valued – something I'd 100% not expected out of the first meeting.

## Timeline

TC39 meetings span three days. I'm not sure what the plan usually is, but this meeting was Tuesday, Wednesday, and Thursday. I assume they intentionally put it in the middle of the week so delegates can travel and attend on their work-week, rather than forcing them to travel over the weekends.

Let's dig into what each day looked like in terms of what happened in plenary and planned activities.

### Day 1:

  * Plenary session:
    * Started with What seemed to me to be boilerplate kickoff presentations (some metrics reporting about the spec
    * Some high level "normative" presentations
    * Advancement of a few non-controversial proposals through the stages
  * After plenary, there was a first-timers meetup, led by [Aki Rose Braun](https://twitter.com/gesa) – one of the TC39 co-chairs.
    * I found it helpful to identify who else was also at the meeting for the first time (a few people from Netflix, IBM, GitHub, and of course myself from Microsoft).
    * This meetup provided a space for me to get the vast majority of my questions answered!

### Day 2:

  * Plenary session:
    * Discussions of the more meaty/controversial proposals started.
      * Multiple people told me this would be how it went on Day 1.
      * The proposals discussed were all at various stages – 1, 2, and 3.
        * I'd not expected this much diversity in the levels of maturity of each proposal, but it was exciting to see how the conversations were slightly different at each stage.
        * One of the biggest takeaways from this experience was that certain types of concerns only come up at certain stages, and some concerns can be ignored until a proposal reaches a given stage.
      * One or two discussions went into overtime and had additional time allotted to them later so we could continue working through the other proposals.
  * Ended with a dinner for the entire attending membership (and invited experts) of TC39.

### Day 3:
  
  * Plenary session:
    * Almost identical in structure to Day 2.
    * Major difference that I noticed in _this_ meeting – not sure if this is standard practice – was that the the proposals for features that typically get a lot of attention from the broader JavaScript ecosystem were on Day 3, as opposed to the features that get less widespread attention.
  * Ended with the [Modern JavaScript: /runtimes/](https://twitter.com/concoquere/status/1111401201424195584?s=20) meetup that was organized by [Myles Borins](https://twitter.com/MylesBorins/).

There were a few constants between all the days:

* Breakfast and lunch were provided by the venue each day.
* There was about an hour for lunch, and several 5-15 minute breaks throughout the day.
* Individuals – myself included – dropped out often to attend meetings or complete their normal work that they needed to do. Plenty of space was available to do this, and it wasn't looked down upon at all.
* Each night, some tangent of attendees ended up going out to grab dinner as a group whether or not there was something officially planned.

Something I'd not expected in any way was the hallway track – during lunches, breaks, and at the dinners I attended, I had many excellent discussions with people who I'd not met before. Everyone was incredibly warm and welcoming – probably _more so_ because I was a first-time attendee.

Also worth noting that this specific meeting was graciously hosted in the Google NYC offices, thanks to [Myles Borins](https://twitter.com/MylesBorins/) and the cast of JavaScript Googlers in NYC.

## Takeaways

Even though I'd come in with few expectations, the entire experience broke the mold that I thought it would fit in.

Every single delegate that I talked to was extremely encouraging of new participants, absolutely following the same structure and practices that I've come to expect from open-source projects – straying from how I'd assumed standards bodies operated in general. My unique personal background was valued. I was warmly welcomed and gently encouraged to contribute however I felt comfortable. The kind of non-technical work that I end up doing – documentation, first-timer onboarding, and context building – is something the group is looking to do _more_ of.

One of the threads that were brought up each day in various ways was engagement with the broader JavaScript community – not as a question, but more as a value. Much as my assumptions about standards bodies were challenged by work that's already been completed around encouraging new delegates and their participation, I'm extraordinarily happy to see that the individuals who represent TC39's membership care about this and are holding it more like a core value and less as "something we should probably do", as I assumed.

Overall, the experience was different than anything else I've ever done in terms of technology and community. I fairly confident I'm going to continue participating as a delegate, and see how I can meaningfully contribute to processes, community, and the spec itself.