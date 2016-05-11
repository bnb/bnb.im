---
title: What Tent Is
slug: What-Tent-Is
cover: true
tags:
  - What
  - Tent
  - Is
  - description
  - explain
  - protocol
  - hosting
  - data
  - privacy
  - freedom
  - decentralized
posted: "September 9, 2014 at 4:49PM"
date: 2014-09-05 16:49:05
---

# What is Tent?

Tent is a new protocol developed by [some](https://daniel.cupcake.is/profile) [fine](https://jonathan.cupcake.is/profile) [fellows](https://jesse.cupcake.is/profile) that aims to be a decentralized data-hosting service.

Why does this matter? In the digital climate we live in today, companies own your data. All of it. They can do whatever they want with it, and they often exercise their right to do so. They make money off your data. Decentralization will dislocate your information from the sockets that data companies, social networks, and advertising providers have comfortably built. Tent is a decentralized solution to this problem.

Additionally, decentralization is at the heart of the Internet. A website is a decentralized store of linked information, separate from other websites, with the possibility to link to, but not control, external sources. That's what Tent aims to do with your data. Your data should be yours, just as a website's content is its owner's, whether they be college students hosting a server in their apartment or a multinational corporation.

You may already know about Tent, and think it's just a microblogging or a social networking protocol. It's not. It is really good at social networking, but it has great abilities in other forms of data handling, too.

Invest some time, and maybe you'll join the Tent community as a long-term member--or you might learn something that can help you build the next decentralized data tool that is another step in the evolution of this new movement.

# Tent...

## Has similarities to email

Tent is quite similar to your email--there is a server somewhere that hosts all your Tent data, and is available to receive data from certain places. You have a Tent address that is similar to an email address--people can send you things by including you in the discussion as a recipient and you can send things to other people by including _them_ in the discussion as a recipient.

## Has differences from email

Despite its similarities, Tent is different than email, too. One difference is that your Tent address, mentioned a second ago, isn't in the format of `someone@somesite.com` or `@someone`. Rather, your Tent address is simply a url with [SSL](http://en.wikipedia.org/wiki/Transport_Layer_Security). No `@`, or any other modifier. For example, someone's entity might be `https://someone.com`. It's as simple as that.

Also, with Tent, there isn't one type of information that can be sent--in email, traditionally plain text or HTML markup--rather, any type of data can be _stored_, as not all data on your Tent server is intended to be sent to others; it's just as good at keeping data for your own use.

## Is based on posts

Those data are stored in the form of **posts**. A post is data on Tent. All data are stored in posts. The way a specific post works is defined by a **post-type**.

Post-types are developer-defined objects, just like file types on the desktop. To save as or manipulate a file type, say `.psd`, you need to follow the guidelines that are put in place by the developers. You couldn't use a `.rb` file, written in the Ruby file format, in PhotoShop, a `.psd` file's interpreter, in place of a `.psd` file unless you made a special piece of software that was **intended** to cross the two. But you can create as many `.psd` files and `.rb` files as you want, and you can store any data that fits what the developers outlined.

> You could just rename the `.psd` file to `.rb`, but then it wouldn't be in the Ruby file format.

Similarly, Tent post-types are developed by a developer who outlines what can and can't be done with a post of that type, and what format a post of that type should take. Two posts of a type can exist on the same server without conflict. When you try to criss cross the data in their interpreters, you'll run into trouble. But interpreters of one specific post-type or another will be able to read **any** post of its interpretable post-type. The way that data is stored, and is thus interpreted by the interpreter, is defined by the developer when she creates the post-type.

There are several post-types that have been created by the Tent team to document how ideal post-types would be constructed, such as [Status](https://tent.io/docs/post-types#status), a microblogging post-type, [Essay](https://tent.io/docs/post-types#essay), a long form writing post-type, and [Photo](https://tent.io/docs/post-types#photo), a post-type for saving a images.

The data delivery and manipulation of Tent is also done through post-types--these post-types are non-content posts (i.e. not obviously visible to regular users)--such as [Credentials](https://tent.io/docs/post-types#credentials), which is used to identify an application and its user with [HAWK identification](https://github.com/hueniverse/hawk), [Subscription](https://tent.io/docs/post-types#subscription), which is what the server uses to set your subscription to another entity, and [App](https://tent.io/docs/post-types#app), which is what an app creates when you sign in with it, and uses from then on to authenticate the app with the entity.

Posts are stored as [JSON](http://json.org/) objects that follow a definition set by the post-type. How do we view and make use of posts, though?

> Further Reading (short): [Here's](https://gist.github.com/joakim/24237914c6c178e424c3) an excellent short summary on posts, subscriptions, and the push model. Thanks to ^[Joakim](https://joakim.cupcake.is/)

## Is viewed through apps

We can do so through **apps**. A Tent app is one of many interfaces that users have for Tent; it is a post interpreter. An app can support viewing, submitting, and/or editing of a specific post-type or -types. It may do any of these in the foreground, by user-initiated actions, or it may do any of them in the background, without guidance of the user. An app can do anything it is designed to do, if you give it permission.

Since this is true, you have to trust the apps you authenticate with--they're not going to steal your password, but you should be aware of what they're doing with your data. This is made simple with the current server implementations by using an authorization page that allows you to view what post types an app uses and how it uses them, which enables you to know what's going on.

Think of an app or three that you use frequently. Is there some form of data associated with it? If so, then there's a good chance it could be developed as a Tent app. It could use Tent posts for its data, while keeping the exact same user interface that it has right now. It would be identical in every way, except **you** would own your data.

Tent is a protocol, so by its very nature it leaves display and interaction up to the apps that are developed on it. The only guidelines in place are for those implementing servers, who can get an official Tent™ seal of approval for their server implementation if they want to. They can do this by submitting to a process defined by the team behind Tent which verifies that the server implementation meets the standards of usability for end-users determined to be satisfactory.

## Developed by a small company

Tent is being developed by a small company, run by its founders. The company that owns the Tent trademark and associated IP is a separate entity from Cupcake, to maintain the safety of the protocol were the hosting or apps run by Cupcake, or any other service the developers create, to be sued. This may seem like a trivial fact, but it is quite important when considering what Tent is. Tent is a protocol.

For a protocol to be as objectively good as possible when it's initially released, it needs to be essentially complete. The company that Tent is owned by is able to keep development under control, guiding it to be complete and useful. If it were able to be influenced by outside sources, such as venture capitalists, management-types, or lawsuits, it would not be able to get to where it needs to be to be solid and successful.

# Principles of Tent

Some principles of Tent are defined on the [Thinking with Tent](https://tent.io/docs/thinking-with-tent#principles) page on the official documentation. These are aimed at developers, but can help anybody understand some of the underlying concepts that Tent is based on.

They are:

### The Principles

*   Users' Tent servers should be the primary data store.
*   Trust your Tent server: don’t client-side encrypt content unless absolutely necessary.
*   Use common post types to make data accessible across applications.*   Don’t delete old versions of posts unless explicitly requested by the user.

Let's think about each, individually.

## Users' Tent servers should be the primary data store.

When this is said, it doesn't just mean that Tent servers should be the users' primary data store for their Tent data, but as much of their data as is possible. As mentioned previously, Tent can be the data-serving back-end for just about any type of application you can think of. Conceivably, you could even create a [desktop environment](https://en.wikipedia.org/wiki/Desktop_environment) and a [file system](https://en.wikipedia.org/wiki/File_system) that the user could run on their PC from their Tent server. In this vein, it can be understood that there is enough data stored within such a system that the system would be a primary source of the user's data.

Do note that the word _primary_ is used, instead of _only_. Of course there will be applications, situations, and environments where the user's Tent servers won't be usable, where the user does not want to use their Tent server for whatever reason, and so on. **Primary** simply means that a user's Tent server will be the main place in which they store information they create and gather from the web and beyond.

Also, it's worth pointing out that the Tent team doesn't think the protocol will be instantly adopted by all, and all of users' data will be able to be stored on their Tent server immediately. This is an _eventual_ outcome for the protocol--there is not an insane rush to get this principle to become reality. Rather, data should slowly build up as more apps that use Tent are created convert.

## Trust your Tent server: don’t client-side encrypt content unless absolutely necessary.

With Tent, your data is encrypted between entities' servers and between applications. That means your data is encrypted at a level that's more secure than client-side encryption. This is because there are several vulnerabilities of client-side encryption.

For example, the device with the encryption key can be compromised and all data can be accessed quickly and efficiently. This is much harder to do with a server, as it can't be stolen, retrieved, or accessed nearly as easily. Very few people would break into a data-center and steal a dedicated server, and it's a lot harder to get into a server than it is, say, a smartphone; with a server, there's usually a good, secure password in place. On a phone, often someone can just pick up the device and access its data, or the passcode can be seen easily.

One might bring up the NSA, but there are ways to mitigate that problem as well. If you choose your Tent host wisely, you can stay safe. Choosing a host in Iceland is supposed to be a good option, but that's a whole different discussion. If you were very paranoid about NSA intervention, you're free to choose a hosting provider you trust in a jurisdiction that's friendly to your needs, just like email.

Even if your server was compromised and you _had_ encrypted on the client-side, information about activities can still be understood from post-types used, time stamps, and contacted entities can all be gotten from the server, despite client-side encryption.

On the contrary, a major benefit of not encrypting on the client-side, and trusting encryption to inter-server and inter-app encryption, is that the data on your Tent server can be understood and made searchable, indexable, filterable, and so on so you can use your data in the most convenient way.

If your data were encrypted on the client-side, you would have all the aforementioned negatives of it, plus you wouldn't be able to access your data however you need to, using it for whatever you want, in whatever way you want. This access is one of the main ideas behind, and upsides of, Tent, and it would be neglected for a security measure that isn't as effective as one might think.

## Use common post types to make data accessible across applications.

This one is pretty simple. The idea is that the developer should use post-types that have already been created and/or are already widely used. If this tenet is stuck to, data will be widely available and interoperable across applications, services, and tools.

Right now, there are very few post-types. There's a [to-do post-type](http://dev.campnews.org/tasky/developer.php) that's used in [Tasky](http://dev.campnews.org/tasky/landing.php) by ^[Yannik](https://cacauu.cupcake.is/profile), a review post-type (the repo that it was hosted on was deleted by the owner, ^[Ian Jeffries](https://ian.cupcake.is/profile), because he didn't feel it was his best work) that was used at IsItNice, a product review site that was taken down by choice not long before this article was published, and a few others. There are also, of course, the core content post-types such as Status, Essay, Photo, Album, Favorite, and so on (all of which can be found [here](https://tent.io/docs/post-types)).

Since there are so few post-types right now, it's okay for developers to create new ones to suit their needs. In fact, it has been encouraged by the creators of Tent, as it will help grow the community and adoption. This may seem contradictory to the principle, but it can be assumed that if there are competing post-types one will emerge as the dominant type over time, and apps will be able to convert to it when the loosing type(s) are deprecated.

If a post-type that they could possibly use already exists, it's extremely easy to contribute to the existing post-type to make it do what the developer needs. Most post-types will be open-source, since the structure (and therefore source) of them will be available to every person who has a post of that type on their server. As far as I have seen, the developers of most post-types are completely open to suggestions, criticism, and pull requests for their post-type repositories on GitHub.

## Don’t delete old versions of posts unless explicitly requested by the user.

Tent is intentionally transparent--multiple apps can see posts of the same post-type, so they can all interact with them appropriately and to the user's benefit. Say one app decides, for example, that it's time to delete a post because it's been a year since the user viewed the post. Then, other apps, like statistical apps, search apps, or retrospective apps won't be able to use that post in a way the user might want because it's gone. Forever.

> Further reading (longer): A very good short write-up about why immutability of posts because of post-versioning and non-centralized data by a friend and former Tent user is located [here](https://news.ycombinator.com/item?id=5099312) in a Hacker News comment.

Storage is the main aspect that would prevent keeping data indefinitely or until the user requests it be deleted. However, it's quite cheap to store data. It's similar to email--why wouldn't you keep your old emails? You might need to refer to them later, when something comes up, or you might never look at them again. However, it costs very little, if anything, to store your old emails. Why would it be any different with other data in a similar format?

# Review.

Here's a brief summary (a tl;dr, if you wish) of _What Tent Is_:

*   Tent is **similar to email**, in that your data is hosted on a server, and you can be sent information by other Tent users through being addressed by them

*   Tent is **different than email** in that your address is a simple URL, and it's not restricted to one type of information--you can store any type of data with a post-type

*   **Tent is based on posts**; all data on tent is stored in the form of a post

*   **Tent is viewed through apps**; posts can be viewed, created, and modified by apps who request permissions to do these things

And the _principles_ which can help anybody understand Tent, are:

*   The **user should use Tent as their primary data store** for whatever data _can_ be stored on their server, to centralize their data under their control, not under a thousand different companies' with as many different Terms of Service and other agreements that allow them to use your data essentially however they want

*   Data **encryption should _usually_ be left to Tent**; encryption on the client can be compromised by the device falling into the wrong hands, and encryption on the client hinders the use of information on behalf of the Tent user

*   **Use existing post types when they fit your needs**. We don't need a million post-types for microblogging, so we can generally agree on using the Status post-type. Create new post types when there isn't one that fits your needs, or when there isn't one that can be guided to do so

*   **Don't delete old posts** or post versions **unless requested by the user**; other applications are likely to be using those, and storage doesn't cost much

# Conclusion

Tent is a progressive development in the decentralized web ecosystem, the social web ecosystem, and the data-centric web ecosystem. Tent is still in development, so changes can be expected. It has been said by the protocol's creators that once Tent hits v1.0 there won't be many, if any, major breaking changes to it like we've seen in the v0.3 update and, coming up, the v0.4 update. The goal, at v1.0, is to have a stable base that can hold its own for a very long time.

That said, you should take a deeper look into it if anything here has kindled something inside you. Join the community and talk to some others. Create a post-type and implement it in an app. Send a pull request to the [tent/tent.io](https://github.com/tent/tent.io) repository to help develop the core of Tent or the [tent/tent-status](https://github.com/tent/tent-status) repository to help develop the Status app that Cupcake uses.

Enjoy.
