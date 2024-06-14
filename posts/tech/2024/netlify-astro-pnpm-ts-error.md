---
title: Netlify Astro DB PNPM Typescript Error
description: A short note on how to fix a weird typescript build error for astro db on netlify.
tags: ["typescript", "astro", "error", "pnpm", "netlify"]
layout: layouts/post/post.njk
twitterHashtags: typescript,astro,error,pnpm,netlify
date: 2024-06-14
lastModified: 2024-06-14
---

On netlify, I kept getting this error when trying to build my astro project:

```plain
6:17:37 PM: src/pages/dashboard/messages/index.astro:87:28 - error ts(7006): Parameter 'message' implicitly has an 'any' type.
6:17:37 PM: 87             {messages.map((message) => {
6:17:37 PM:                               ~~~~~~~
```

In one of my astro files, in frontmatter, the `messages` was all rows from an astro db table:

```js
const messages = await db.select().from(ContactMessage);
```

When I locally ran `astro check` there were no errors. [`astro check` runs `astro sync` as well internally](https://docs.astro.build/en/reference/cli-reference/#astro-sync). `astro sync` generates all types for the astro db.

Looking at the build logs, I saw that netlify uses a particular version of `8` for pnpm. I had been using `9` locally. So I added the `PNPM_VERSION` environment variable to my netlify build settings.

Then I got a pnpm error:

```plain
6:56:03 PM:  ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date with package.json
6:56:03 PM: Note that in CI environments this setting is true by default. If you still need to run install in such cases, use "pnpm install --no-frozen-lockfile"
6:56:03 PM:     Failure reason:
6:56:03 PM:     specifiers in the lockfile 
```

I deleted the `pnpm-lock.yaml` file and ran `pnpm install` again.

Then the build passed.