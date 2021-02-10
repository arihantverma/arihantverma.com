---
title: When I Woke Up To ₹ 28,000 Bill From Google Cloud Not Knowing Why
description: A story about the morning when I woke up to find that I was charged ₹ 28,000 by Google Cloud, with no prior memory of having used anything on Google Cloud, except some firebase projects which were years old.
tags: ["tech essay", "github", "pull request"]
layout: layouts/post/post.njk
twitterHashtags: essay,github,pullrequest,googlecloud
date: 2021-02-10
lastModified: 2021-02-10
newsletter: 'tech'
typeOfPost: 'essay'
coverImage: "https://images.unsplash.com/photo-1591453089343-9ee5e4ac7e2d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
coverImageAlt: 'Github Repository'
coverImageCaption: "Photo by Markus Winkler on Unsplash"
---

Until recently, like many of us, the first thing I used to do in the morning would be to check my mobile phone. I realised that it was taking about 20 mins to half an hour of my morning time. So I stopped doing it and replaced it with keeping my eyes closed and meditating instead for 15-20 mins. But the incident I'm going to tell you about happened when I still used to look up for my mobile phone first thing in the morning, in half asleep state, with one eye open and the other closed, hid behind the pillow contour.

<div>
{% RespImage "https://images.unsplash.com/photo-1517898717281-8e4385a41802?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80", "a woman half awake on bed with one eye open", "a woman half awake on bed with one eye open" %}

<caption>
  <p class="font-size-base" style="margin: 0.5rem 0;">
    Caption: Photo by Markus Winkler on Unsplash
  </p>
</caption>

</div>

On 3rd September, 2020, I woke up to an automated email from Google Cloud Platform. First response – shock. It was a bill of $377. That amount meant a lot because I didn't earn much in INR, and it was a significant portion of my salary. Without even opening my Google Cloud console, I started a chat with Google Cloud support. In about a couple of hours, they told me in detail what I was billed for.

I was billed for a Google Cloud project which had used Google Maps JavaScript Places API for over 2 months. I was so sure that I had done nothing wrong that I started telling this to the customer support over emails and chat messages. But they kept reiterating that my project had infact used Google Maps JavaScript Places API, for which I was charged.

I worked for [Goibibo](https://goibibo.com/) at the time. Goibibo is one of the largest online travel agencies in India. Two months before this happened, I was working on the [hotels details page](https://www.goibibo.com/hotels/taj-bangalore-bengaluru-hotel-in-bengaluru-1045137713186360887/?hquery=%7B%22ci%22:%2220210212%22,%22co%22:%2220210213%22,%22r%22:%221-2-0%22,%22ibp%22:%22%22%7D&cc=IN)'s Google Maps project — you know — to show the location of the hotel in the map, and all the points of interest around that hotel, and the ability to search for any location in reference to the hotel.

I read a partiular line in one of the Google Cloud support communication emails:

> Just a quick disclaimer, we cannot reveal domain information if the usage is from a domain outside of your authorized ones due to our privacy and security policy.

And then it hit me.

Goibibo's google cloud account didn't have `localhost` added to their whitelist of allowed domains. So it was impossible to for me to develop locally. To avoid the round trip of having to find the required person, and request them to add localhost to the whitelist, and then start developing, I created a google cloud project from my personal account and started developing locally. I created an API key and enabled Google Maps JavaScript Places API against that key in my project. Here's how I kept both of the Goibibo's and my API keys in the code while developing:

```javascript
/* Only use this key for production, comment the one below */
// export const googleMapsApiKey = `<goibibo account's api key>`;

/*
 * WARNING: Do not push the key to production. Is only meant
 * for development purposes only
*/
export const googleMapsApiKey = `<my personal account's api key>`;
```

I frantically checked the code in the main branch to see if I had accidetally forgotten to follow my own advice. That was in fact the case, and I did a big:

<div style="font-size: 4rem; text-align: center;">
  🤦🏽‍♂️
</div>


I git blamed the file to find the pull request which had enabled this blunder. Then I sent its screenshot to both the google cloud support, apologizing for an honest mistaken, and to my team's slack channel to blare loudly at them for not having done a decent code review.

I had also [forgotten to restrict](https://www.youtube.com/watch?v=2_HZObVbe-g&feature=emb_title&ab_channel=GoogleMapsPlatform) my personal account's API key to allow requests to Google Maps Places API from only `localhost` domain.

That meant that

1. 2 months worth of Goibibo's Details Page traffic was charged against my personal account's project. Good thing that we had lazy loaded map, which meant that all the JavaScript and other files necessary to render google maps was loaded only when the user had scrolled down to the location section. It'd have cost a lot more, if the resources loaded as soon as the details page loaded.

2. Had someone extracted that API key by watching the API request from browser developer tools, they could have potentially bombarded requests to Google Maps Places API billed against my personal account from any domain.

I didn't detect this blunder for a month, because for the first month, google had used the $100 free credit that I had gotten from somewhere. So in the first month's billed it showed `$0`. It was only a month later that that month's $277 showed as amount charged on my credit card.

On multiple requests the Google Cloud team refunded that amount after taking confirmations from me that I had read and now understood all the ways to restrict access of api keys, and to set billing alerts on google cloud projects. After giving multiple assurances and acknowledgements that I had indeed read up all the docs that taught how to do all these things, I found peace.

<div style="font-size: 4rem; text-align: center;">
  🕊✌🏼☮️
</div>
