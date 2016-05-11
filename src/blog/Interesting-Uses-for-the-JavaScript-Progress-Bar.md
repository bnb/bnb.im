---
title: Interesting Uses for the JavaScript Progress Bar
slug: Interesting-Uses-for-the-JavaScript-Progress-Bar
tags:
  - PACE
  - Progre(c)ss
  - list
  - ideas
posted: "April 6, 2014 at 8:12PM"
date: 2014-04-06 20:12:00
---

Everybody has seen them. Loading bars. MethodJS has tweeted about [nanobar](http://nanobar.micronube.com/) before. [NProgress](http://ricostacruz.com/nprogress/) is similar; [Progress.js](http://usablica.github.io/progress.js/) has a little bit more functionality built in than nanobar and NProgress. [PACE](http://github.hubspot.com/pace/docs/welcome/) is the easiest to use for what I would call the most popular use. [Progre(c)ss](http://jh3y.github.io/progre-c-ss/) is a CSS version that you can increment with JavaScript.

The point is, there are a ton of these scripts and there are several ways to use them.

# Examples of uses for progress bars

There are several ways to use progress bars. Some are more popular than others. Some are more useful than others. Using them can add a nice touch to a project that can polish a page or application. Let's look at a few.

## The usual

The following uses for progress bars are what we see them used for all the time. Skip to the "Out of the ordinary" section to see more unique uses.

### Use 1: Page load progress

The way that we see progress bars used most often is for page loading. This usually means a simple, monotone bar at the extreme top of the page.

This method is an effective indicator of the load process and is one that users are likely familiar with, or will at least pick up on quickly. No matter what, it's become an almost universally recognized element of a page - whether that's good or bad remains to be seen.

[PACE](http://github.hubspot.com/pace/docs/welcome/) allows you to simply drop in the script and stylesheets and it will show real page loading progress in one of the several progress indicators they have available.

#### Making it interesting

One way to make this more interesting would be to simply change the position of the loading bar. Putting it on the left or bottom side of the screen could add an unusual, interesting note to your site.

### Use 2: Download/upload progress

Download and upload progress bars are something that are built into every OS. What's more rare is to see a JS implementation of a download/upload progress bar. Because I'm so used to seeing progress bars in my OS, it often doesn't seem like a big deal when I see a JavaScript version.

Having a download or upload progress bar on your website wouldn't be revolutionary, but it could add a touch of polish that most sites go without. I advise you to consider whether it will actually be useful and add meaning to your site, or whether it would be superfluous before you go ahead and add one.

#### Making it interesting

If you do decide to add a download or upload progress bar, maybe being unexpected would be best. Add it to a parent element, such as the container of a download button or an upload form instead of to the actual upload/download element itself. Or, you could add it to the top level of the page, similar to how you would do page load progress bars.

## Out of the ordinary

These uses are more uncommon and interesting than the aforementioned ones. Implementing them in your website can add intrigue to it that most other sites lack.

### Use 3: Page or element timer progress

One interesting element that we don't see very often on a webpage is a timer. If there is a use for a timer in your project, consider using a progress bar as an indicator of time remaining.

You could indicate time either way--from 0% to 100% or from 100% to 0% of the progress bar. It depends on the type of project that uses it, but I think the 100% to 0% timer is more effective at creating a notion of time remaining--it's a countdown on how much time you've got, which is more bold and engaging than a count up.

One effect that I've seen on timer progress bars is that they slow the closer they get to their final goal. So, for example, the progress bar could go at 10% speed for the first 10%, 9% speed for the second 10%, 8% speed for the third 10%, and so on. It's an interesting effect that just feels right.

### Use 4: Form progress

You could use a progress bar to indicate the user's progress in completing a form before submit can be pressed. The progress bar could be displayed at the top or bottom of the form (or both) or on the sides of the form going from top to bottom to give a good visual indicator of how far the user is in completing the form.

Additionally, the progress bar could be displayed in the submit button to serve as a reminder that there are elements left to fill in. This would be a good way to tell the user what they have and haven't filled out.

### Use 5: Image load progress

Lazyloading images has become a new trend that seems like an effective way to keep load times down. One way that a progress bar can be used is on lazyloaded image elements to indicate the progress of their load. This is an interesting way that two JavaScript trends can complement each other and increase interest and usability of a website.

### Use 6: Read time progress

I know it existed before Medium, but Medium has made "read time" a common practice. Read time is the length of time that it will take you to read the article that you're looking at.

One use for the progress bar is to link it to read time. You can put a progress bar at the top of the page that indicates how far down the page the reader is, or how far down the containing element of the article the reader is. This is an interesting effect that I've seen a couple times, and I liked it a good deal.

### Use 7: Textarea progress

Textareas often have character limits. On Twitter, contact forms, and applications to hackathons alike you'll find a set amount of characters that you can type into a text area. The number remaining is usually indicated by a number outside the textarea, which isn't the best use of space.

Instead, you could put a progress bar on the textarea, most likely the top or bottom, which increments with each character typed. It's an easy and interesting visual that will effectively communicate the information in the least amount of space possible.

## Conclusion

It would be distracting and annoying to have too many progress bars on one site. I suggest using one at most. Two might be acceptable in certain conditions; use your best judgment, but try to keep it to a minimum.

That said, progress bars are an interesting user interface element that has become popular recently. I suggest you try one out on your next appropriate project to see if you like developing with them or not. They're fun to code as a developer, and fun to use as a user.
