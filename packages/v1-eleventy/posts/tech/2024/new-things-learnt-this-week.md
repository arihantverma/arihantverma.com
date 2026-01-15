---
title: Tech Week - 1
description: Some new things I learnt last week.
tags: ["css", "tailwind", "media queries", "typescript", "events"]
layout: layouts/post/post.njk
twitterHashtags: css,tailwind,mediaqueries,typescript,events
date: 2024-06-24
lastModified: 2024-06-24
---


1. [You can write styles for properties that tailwind@3.x.x doesn't support](https://tailwindcss.com/docs/adding-custom-styles#arbitrary-properties)

```html
<div class="[mask-type:luminance] [cx:17px]">
  <!-- ... -->
</div>
```

2. How to use css variables in tailwind

```html
<div class="bg-[--my-color]">
  <!-- ... -->
</div>
```

3. How to use `media` and `supports` in tailwind inline

```html
<div class="[@supports(cx:1)]:translate-x-0 [@media(hover:none)]:w-12">
  <!-- ... -->
</div>
```

4. Media Hover can be used to detect which devices don't have hover ( touch devices )

```html
<div class="[@media(hover:none)]:w-12">
  <!-- ... -->
</div>
```

5. [How to type custom events in Typescript](https://adropincalm.com/blog/notes-on-typescript-custom-events/)
