---
title: "Your Publisher Freedom Doesn't Exist"
slug: Your-Publisher-Freedom-Doesn-t-Exist
cover: true
tags:
  - npm
  - publisher
  - freedom
  - isaac
  - arnout
  - opinion
posted: "March 2, 2014 at 11:20PM"
date: 2014-03-02 23:20:00
---

_Note: This article is a response to [An attack on publisher freedom](https://medium.com/p/271013ff33c5), found on Medium by author [Arnout Kazemier](https://twitter.com/@3rdEden)._

# From the beginning

Let's start from the beginning of Arnout's article.

## The namespace of modules

60,000 is a big number. If it's the count of modules in a repository, it makes that repository seem huge.

But, let's take into consideration the English language. Since Arnout points out that he likes single word names, we'll use single words. There are 171,476 words in The Second Edition of the 20-volume _Oxford English_ Dictionary. <sup>[1](http://www.oxforddictionaries.com/us/words/how-many-words-are-there-in-the-english-language)<sup></sup></sup>

This fact means that every module in the aforementioned repository could have a single word name, and there would still be almost enough single words for every module to have a second and third single word name. This lends no consideration to the fact that there are, at time of writing, 7,105 living languages <sup>[2](http://www.ethnologue.com/world)</sup> and countless slang and derivative words. So, there are enough words for everybody to use, even when taking into consideration the scope of a project--you've just got to do some looking.

## The process of module creation

Arnout asserts that the namespace is part of releasing your code, and that creating one doesn't make the task easy. Naming your project is a part of the project, yes. However, it has nothing to do with the actual mechanism of releasing your code, which is what NPM provides to developers, and is what the problem arose from.

# npmjs and confusing confusion

Let's talk about why naming a project "npmjs" and releasing it on a site called "npm" with the domain "npmjs.org" is confusing.

## The basis of the project

It's really great that Arnout saw an opportunity to develop a better API for NPM, and accomplished it--I really like the idea of his project, and I hope it goes well from here on.

Arnout created a competitor to the default NPM module, and planned on releasing it on NPM. Great. Some people would see a problem with this. I can definitely imagine potential for such an issue. (If you can put into words exactly what one instance of such an issue would be, other than the one listed below, I would be delighted if you would write a response in the comments or on your own blog.)

Basically, NPM is bundled with every installation of Node, so it makes sense for every module to be put on NPM. However, if you're going to create a direct competitor to a corporation's main product, you can be pretty sure that they won't take very kindly to having it published through that product.

The obvious issue here is that npm, Inc. is based on an open-source product and lives and breathes the open-source community. I honestly don't think there's an argument against this that doesn't paint npm, Inc. as a corporate villain, but I know that's not why Isaac asked Arnout _kindly_ to rename his package. Isaac needs to protect his company from what he sees as a possible or known issue.

## It's all in the name

Okay, so you're building a direct competitor to a project. Okay, you're going to release it on their site. I would imagine that NPM would regularly be very happy with this. Arnout, however used their name for his project. NPM's name is 'npm'. Arnout's name is 'npmjs'.

### This type of thing shouldn't be interpreted - it should be understood

Whether Arnout thinks that the name is confusing or not is irrelevant. He has no idea what other people thought, or why the 'npmjs' module has been left unused all this time. He has no idea the history of the topic--his conclusions are only conjecture. He should have recognized this instead of making assumptions about the level of confusion that would ensue and understood Isaac's message.

### The -js suffix stands for JavaScript - projects with it are interchangeable with projects without it

The -js suffix is common. Everybody that uses Node uses it because of the very nature of Node. Even that, the name "Node," can be said either simply "Node," or it can be said with the -js suffix, "Node.js". Names of projects are interchangeable with and without the -js suffix. So, having two separate projects, one with the suffix and one without it, which do almost the exact same thing is extremely confusing. This is compounded when the domain name of the project without the suffix in its official name actually has the suffix, as is the case with NPM and [npmjs.org](http://npmjs.org/).

### Why not just differentiate yourself?

Further, Arnout's product isn't NPM. His product is in direct competition with NPM. Why use the name of your only competitor? If you're offering a better product, as he felt he was doing, why would you attach yourself to the inferior product? He should have differentiated himself from the product that others created, others developed, and others maintained.

Why not take the name and build upon it instead of putting minimal effort in taking the name of the competing product and adding nothing unique to it? Why not take the letters npm and do something with them? Here are a few examples:

*   Nipem
*   Nompom
*   Napalm
*   Mpn (and come up with ridiculous words that this is an abbreviation for)
*   Nipem

The list goes on. It's really not so hard to come up with a name, especially not when you have a base that you can _build_ on.

# Isaac: "I’d call that bad behavior at least."

In the email Isaac says that what Arnout is doing is bad behavior at the very least. When he says this, he clearly wasn't making a reference to the time and effort that Arnout put into creating the module, or helping out NPM with the creation of the new module, based on the NPM API, which will likely boost public perception of NPM.

It's ridiculous to even suggest that that's what Isaac was talking about. You've got to take the whole paragraph into account. Here it is:

> You’re using a name that is the intellectual property of someone else. Even if it wasn’t my mark you were using in a confusing manner, as an admin of the public npm registry, I’d call that bad behavior at least.

It's pretty clear from the structure of this paragraph that Isaac means using the name, from a registry admin's point of view, is the bad behavior.

## Changing it up a bit

I'm not sure what Isaac's position in the food chain is over at npm, Inc., but I think it's pretty high--if not the highest position there is. As a proprietor of the registry, Isaac has the right to remove things that he deems unfit. He, and npm, Inc., which he's representing, have the right to modify what's on their registry.

Imagine, for a moment, saying that the owner of a bulletin board didn't have the right to moderate the posts, which includes ones she deems unfit for the site. That just wouldn't happen. It's a right that's a given for those that run public forums, which is what NPM is.

## You know, there's a good explanation for that

Arnout goes on to describe how his module was instantly deleted from the NPM registry. If we go back and look at Isaac's warning, he makes it clear that deletion is imminent. Read it yourself:

> I’m not requesting. This isn’t a negotiation. I’m informing you that the “npmjs” module will be deleted from the registry.
>
> Please pick a new name that more clearly describes what this module is, and doesn’t imply affiliation between you and npm.

In the second paragraph, Isaac kindly prompts Arnout to choose a new name that is **clearer** than the less-than-descriptive "npmjs". The first paragraph is also a warning that the package "npmjs" will be deleted--it's the only warning that needs to be given in this situation, as it's closes the matter and gives enough information to Arnout to proceed accordingly.

# The finale: think critically

It's clear from my post what I think of the Arnout/Isaac/npm, Inc. incident. You, however, have got to use critical thinking skills and come to your own conclusion. Balance what I've said with what Arnout has said, and _you_ decide what's right and what's wrong--and you should act accordingly.
