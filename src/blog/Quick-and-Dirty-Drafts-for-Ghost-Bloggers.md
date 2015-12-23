---
root: "../"
title: 'Quick and Dirty Drafts for Ghost Bloggers'
cover-img: tablet_book_2_hires.jpg
layout: blog-post.hbs
collection: blog-post
slug: Quick-and-Dirty-Drafts-for-Ghost-Bloggers
tags:
  - GitHub
  - ghost
  - draft
  - drafts
  - how to
  - simple
  - quick
  - dirty
  - blogger
  - bloggers
posted: "September 18, 2014 at 11:37AM"
date: 2014-09-18 11:37:54
---
# Writing with Ghost
I was working on my [What Tent Is](http://bnb.im/blog/what-tent-is/) post for a long time. In the process, I wanted to show it to some people and get their feedback. It was pretty damn hard to find a good method to do this. But I did: GitHub Gists.

# The Failures

## Dropbox and Email
At first, I tried simply uploading it to Dropbox as an .md file, and emailing it to the reviewers. That didn't work too well, and was _extremely_ sloppy. There was no way for the reviewer to comment without sending a long form email with no clear way to respond to specific parts of the content. Also, it wasn't immediately viewable in the browser, which put an unnecessary burden on the editors.

## Draft
One of my reviewers tried to find an alternative for his comments, and came up with [Draft](https://draftin.com/). I already knew about Draft and had considered it, but the reviewers needed an account to view and make comments. Draft has okay version control, and the comments-on-highlight (where the reviewer can highlight a bit of the text and put a specific comment right there) are nice. However, the UI for these and other features isn't designed very well, and the site structure isn't very clear.

## Ghost pages
I considered creating a Ghost page for the blog post, but I realized that would be dangerous. It would hide the post from the blog feed, but there are various problems with the link getting out there and being seen and indexed. Those aren't going to be solved unless the writer either puts up a login barrier, like Draft had, or modifies her `robots.txt` temporarily (if the writer can remember to fix it later) to hide the page from search engines.

Another problem with Ghost pages is that there's no way to privately comment on the page. [Ouija](http://ouija.io/) is very similar to the commenting system on Draft (and Medium). But if the writer investigates the platform it's built on, [GoInstant](https://goinstant.com/), she’ll find it is being, or has been, shut down. She can add Disqus comments, but that's a pain in the ass and she probably shouldn't be modifying `page.hbs` to add Disqus comments, as they'll be on _every_ page. Even if she does, she would have to figure out how to delete the comments for when the post is published.

# The Success (GitHub Gists)

Thanks to one of my reviewers, I ended up using a GitHub Gist to share my work. Gists do everything. They:

*   **Render markdown** correctly, making formatting mistakes easy to spot

*   **Allow commenting**, with specific parts being quotable through blockquotes)

*   **Maintain privacy**, insofar as nobody (including search engines) ever has to see the unrevised versions of the writer's writing unless she, or her editors, want them to.
*   **Have good version control**, allowing the writer to see differences between versions

*   **Utilize GitHub accounts**, making it easy for the writer and her editor to comment

To use Gists, just copy (highlight all, then `Ctrl` + `c`) and paste (`Ctrl` + `v`) into the [Gist site](https://gist.github.com/), and press the yellow, "Create secret Gist" button. And... **BAM**! You've got yourself an easy to use, editable draft for your post.
