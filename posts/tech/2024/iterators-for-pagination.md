---
title: Iterators for Pagination
description: How iterators are a natural fit for pagination requests.
tags: ["iterator", "javascript", "octokit", "github", "api"]
layout: layouts/post/post.njk
twitterHashtags: iterator,javascript,octokit,github,api
date: 2024-05-29
lastModified: 2024-05-29
newsletter: "tech"
typeOfPost: "essay"
coverImage: "./images/pagination.png"
coverImageAlt: "Pagination"
coverImageCaption: "My Pagination Art"
---

I've have been spending some time using and reading github api through their official JavaScript SDK [octokit](https://github.com/octokit/octokit.js).

One interesting thing I stumbled upon today was their [`.paginate.iterator`](https://github.com/octokit/plugin-paginate-rest.js/?tab=readme-ov-file#octokitpaginateiterator) api ([implementation]()), wherein you can provide this function any other listing api’s fetching function ( say `listCommits` ), and provide options to tell how many to fetch in one time ( and optionally takes a `page` ).

The nice thing about implementing this iterator function is that we can just use a normal `for await` loop and it’ll keep fetching next paginated page’s data. Something like

```shiki
const mainCommits: Endpoints["GET /repos/{owner}/{repo}/commits"]["response"]["data"] = []
const mainCommitsIterator = octokit.paginate.iterator(octokitRest.repos.listCommits, {
  ...githubDetails,
  sha: mainCommitSHA,
  per_page: 30, // Set the number of commits per page
});

for await (const { data: commits } of mainCommitsIterator) {
  mainCommits.push(...commits);
  if (mainCommits.length >= 150) break;
}
```

This provided me a very easy option to _‘not fetch after 150 commits have been fetched’_ functionality by just breaking the for loop. Internally any loop structure which supports iterating over iterators, calls the iterator’s `next` function internally, automatically. [More on JavaScript iterators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)

