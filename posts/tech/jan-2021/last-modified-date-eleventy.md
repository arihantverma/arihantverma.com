---
title: Last Modified Date For Blog Posts in Eleventy
description: How to add last modified readable date for blog posts in eleventy
tags: ["eleventy", "blog", "nodejs"]
layout: layouts/post/post.njk
twitterHandlesForText: ["eleven_ty"]
twitterRelated: eleven_ty:Simple Javascript Static Site Generator
twitterHashtags: eleventy,staticsite,javascript,nunjucks,tech
eleventyExcludeFromCollections: true
permalink: false
---

{% note %}
Following assumes nunjucks as templating engine for eleventy, but the process should apply to other templating languages supported by eleventy as well.

Prerequiste: Basics of [eleventy](https://www.11ty.dev/)
{% endnote %}

## TL;DR

Eleventy provides a `date` stamp for its content, but no `last modified` date stamp out of the box. [Relevant github issue](https://github.com/11ty/eleventy/issues/869) regarding the same.

## What and Why

Tech world changes at a break neck speed. When I read a tech blogpost, I like to see when it was published, to at least get a hint of if it might be outdated. It's frustrating to see blog posts which do not have a published date. I have to go through at least some content to figure out if it's stale. The problem increases if I have little knowledge about the topic I'm trying to read about.

Publish date doesn't tell when the blog post was last edited. I think it's a good embellishment to have. That way one wouldn't have to keep writing 'edit' sections.

Github solves the staleness problem through being able to archive repositories, and by the virtue of its business – using git version control, branching and commits aiding that process. Typescript solves it through [deprecated JSDOC comment](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#-deprecated--support). Google Docs stores a doc's revisions.

Blog posts could lessen the staleness problem through at least, automatically generating a **Last Modified** date. In this blog post we are going to see how to do that in eleventy, the famous static site generator popularised by its use by [web.dev | Github ⤴️](https://github.com/GoogleChrome/web.dev)

## A Bit About Dates In Eleventy

{% note %}
[Skip To How](#how) if you already know how dates work in eleventy work.
{% endnote %}

Eleventy has a [special set of data keys](https://www.11ty.dev/docs/data-configuration/), which you can assign at any level of [data cascade][data cascade link] in it. One of those keys is `date`.

Let's suppose all our blog posts ( markdown files ) reside in `posts` top level folder. Let's take `posts/my-post.md` as an example blog post file. By default, if we don't provide any `date` front end matter data key in our blog post file, eleventy automatically takes the created time stamp of that file as its date.

It also provides an option of 'Last Modified' value to be set for `date` in the front end matter, which will – as the name suggests – give us the last modified date stamp in the `date` key. Read about these [here](https://www.11ty.dev/docs/dates/).

Eleventy doesn't provide any way to give access of both of those data points in two separate variables. We only get one – `date`. So I can only get one of the two – created OR last modified – in the `date` variable inside my blog posts and any template that might be used to wrap those blog posts ( see [data cascade][data cascade link] in eleventy for more information about levels of places where data can be set ). There's also a [github issue](https://github.com/11ty/eleventy/issues/869) that asks for exactly this.

This is what I did to solve this…

## How

Eleventy has a way [to compute data based on existing available data](https://www.11ty.dev/docs/data-computed/). Read about it before reading on.

In my `posts` top level directory, I create a [directory level data file](https://www.11ty.dev/docs/data-template-dir/) `posts.11tydata.js`. The directory data files follow the naming convention **{name of the directory}-.11tydata.{js|json}**.

```javascript
// posts/posts.11tydata.js

const path = require('path');
const fs = require('fs');
const { DateTime } = require("luxon");

const timeZone = 'utc+05:30'; // India's time zone, where I live
const readableDateFormatForLuxon = "dd LLL yyyy";

/* get last modified time of the file */
const getFileLastUpdatedAt = (path) => {
  const stats = fs.statSync(path);
  return stats.mtime;
}

/** get readable format of date stamp/object using luxon library */
function getReadableDate(dateObj) {
  return DateTime.fromJSDate(dateObj, { zone: "utc+05:30" }).toFormat(
    readableDateFormatForLuxon
  );
}

module.exports = {
  // ... other data,

  /** `eleventyComputed` is a special key. All keys inside this object
   * will be injected into blog posts markdown files (since this data file
   * is inside `posts` folder) and template files using the content of
   * those blog post markdown files. Read below for more explanation.
  */
  eleventyComputed: {
    // `fileData` can be any key you want
    fileData: {
      lastModified: data => {
        /** eleventy supplies some data to every page
         * `data` here is that data. See a list of everything
         * that eleventy provides to a page here — https://www.11ty.dev/docs/data-eleventy-supplied/
        */
        const postPath = data.page.inputPath;

        /**
         * get the absolute file path. This will be different, if your blog posts
         * do not reside in top level 'posts' directory
        */
        const absoluteFilePath = path.join(__dirname, '..', filePath)

        const lastModifiedDateObj = getFileLastUpdatedAt(absoluteFilePath);
        const readableDate = getReadableDate(lastModifiedDateObj);
        return readableDate;
      }
    }
  }
}

```

Eleventy supports a special key called `eleventyComputed`. It can set from any level of [data cascade][data cascade link]. It can take a bunch of values like an object or a function (note that if it's a function, you have to use javascript front end matter or javascript data file).

We have used an object for `eleventyComputed` key, in the above code snippet, and we are declaring it in a javascript data file — `posts/posts.11tydata.js`

In both — template files, and our blogpost markdown files `posts/*.md` it'll be available at `fileData.lastModified`. So in a nunjucks template which is consuming content from any file in `posts/*.md`, we could do `{% raw %}{{ fileData.lastModified }}{% endraw %}`

That's it! If you look at this very blog post at the top of the page, you'll see that I've used exactly this to show the 'last modified' date.

[data cascade link]: https://www.11ty.dev/docs/data-cascade/
