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
eleventyExcludeFromCollections: true,
draft: true
---

## A Brief History Of Me Not Talking

I have never talked much. The last time I met some of my high school friends in 2017, they celebrated midly when I indulged in a conversation. They exclaimed _{% inlineDoubleQuotes "Oh my freaking God, Ari spoke!" %}_. I've never gotten into fights, I never argue about things that I stand up for ( because there are so few ). I don't go out much ( pre covid ). In a room full of people and buzz, be it in office, at a house party, or even a social gathering of like minded people, I'd remain silent for most of the time. I didn't know why that was. I've oscillated between being defensive about it, and asking why. Not talking has affected relationships with family and friends.

I remember a time when I had a week's worth of work with me at office on that Monday. I didn't speak a single word with anybody for that entire week. I had no reason to. I had work that I had to do that didn't have any dependencies.

By Thurday, my mind started goofing up making scenarios and assumptions which I had no means to confirm. I got really worked up about the fact that no one was checking on my work, and they suddenly would, and I'd be caught off red handed, not having completed it.

There is no innate wanting to talk when there's no need to. That sounds really selfish. But from my mind's eye, it's frightening, yet I don't know what to do about it.

Then suddenly a good friend and colleague cracked some marvellous joke and that weird no speaking streak was broken. I felt instantly relieved.

What keeps me from talking to people? A baseless fear of some of the experiences before.

1. All the times I had jumped myself in a conversation and regretted it. By the end of them, I'd awkwardly be laughing at my own joke or hit a deadend with people looking at me as if saying _{% inlineDoubleQuotes "that's it?" %}_

2. Due to a lot of factors that I am not comfortable discussing yet, I'd waste a lot of time. And all the commitments done to others in that time would see dust. So I wouldn't talk to the people I had not kept a word with in the past. This includes father, bosses, colleagues, friends. I remember I didn't talk to father for over 4 months because I had failed to act on an urgent task he had given me to do. I had never acted out of laziness.

3. All the times that I had asked for help, but hadn't got it, because people were not available, or had other priorities. I find it hard to shamelessly plug myself back and go back to them to ask again.

4. This one's funny, but I don't know how to mollify, pacify, bring about someone who is angry or upset or generally not feeling well, especially if it's a close one. Most of the times singing works. Sometimes it doesn't.

5. Feeling stupid for having basic questions.

6. [A Little Story For Ya](#a-little-story-for-ya)

I have an exact period of time, which I could track, where the tendency to not speak up started. Where? Kota.

## Back When It All Started

Before 10th grade, I had friends. I'd have school to look forward to, marks to get, a class of 40 some people to top, teachers whom I admired. I'd have basketball and cricket to play in the mornings and evenings. After I went away from home after 10th grade, I started becoming reticent. Kota was a newly found freedom, with lovely friends who'd stay for a year. But along with it came endless hours of studying which I didn't set my mind to. And constant anxiety. And in that anxiety not having a heart to ask doubts on and off class.

I would skip doing the daily practice problems, I'd spend hours on an {% footnoteref "addiction" "I'm writing an article for a culture mag/website about it, and am not ready to speak about it publicly yet." %} addiction {% endfootnoteref %}. I'd waste time on movies. I would not have control over my senses. If I had to sit and study for an hour, I wouldn't be able to. Would be too easily distracted.

No surprise that I wasn't able to crack most of the prestigious engineering entrace exams, despite being smart, having an inclination towards what I studied. There was lack of practice, lack of tactics, lack of goals and working towards them, lack of habits, lack of asking.

<!--
- not having much knowledge about things

~~Since I've never really spoken with people about things that'd instigate action, creation, learning, discussion, polite healthy arguments, this year I found myself troubled by how much I should have known and didn't know.~~

Doubt creeped in like angry 🍯🐝s inside the house. I doubted if I had been a good son, a good brother, a good friend to others, and I got gigantic NOs to all of those. More, I didn't know how to change that. So not knowing what to do, I just started down the memory lane. -->


From then onwards I was on auto pilot. Graduated from college with a decent grade, decent bourgeois job. Didn't have career goals right from the start. It and some other factors led to wanting to [quit the first job](http://gdad-s-river.github.io/blog/goodbye-sapient), staying unemployed in an ennui for 1.8 years.

For a brief moment after I managed to get a job back in Oct 2018, I thought I'd have it in me now. But the rut of the job, and not having commitments for the things that matter to me ( read code, make stuff, write and read a lot ) brought me back to square one. Amidst this I even stopped exploring and reading about new technologies. I don't even know when that happened.

## The Big O Realisation.

I suddenly realised this when all the people I was surrounded with and had a safety net of, quit the company this year. People I look upto and respect a lot, and have learnt tons from. When I stared looking out for my next career move, I realised the repercussions of not having career goals, and not working everyday as if the work that I'd do would be needed for an interview the next day. I realised how stupid I had been to not be aware that I was at least 3.5 years behind in the pay scale range from the market average.

The day it happened, I remembered all those photographs on Instagram when I had seen batchmates from college studying or working outside, in ivy league universities and doing stunning work at companies. I'd shut my phone down. I wouldn't be able to handle it. But remembered the drive, ambition and purpose all those batchmates had in college, and I wondered why I didn't have it, why I didn't have goals – financial, career's, life's.

I was doing everything without a sense of direction and purpose. How could I be going anywhere other than every whichway?

> All this, because I didn't ask, network, bond, talked.

I was given untamed freedom by my parents right from childhood. I didn't see how lucky I've always been in this regard. And it pinches to write it down, that though I've not misused that freedom in any extreme way, I didn't use it for what it existed. I wasted a lot of time, enjoying the privilege I didn't have — TIME.

In short I've been afraid to try things out, and failed without trying. I've also not regularly talked with people — be it parents, friends, past colleagues, present colleagues, coding community online. I had all these ideas gather and gather, and I hadn't worked on single one of them.

> Talking to people makes you accountable. You talk, you open up opportunities for yourself, you work to avail those opportunities. In doing do you take a lot of responsibility, not only of yourself, but others, and that's how leadership quality refines — by taking more responsibility.

## A Little Story For Ya

{% assign tundraPradesh = "Tundra is a barren cold environment/place. Pradesh in Hindi means province/territory and is the last name of many Indian states" %}

I come to my mother's room and my mother mumbles a wish to drink milk outloud, to herself. _{% inlineDoubleQuotes 'I want to drink milk. How shall I go downstairs…' %}_. She calls me and half heartedly asks if I could go and get it for her. _"Arihant…"_

And then she trails off saying, _{% doubleQuotesPaired %}… no never mind, it's {% footnoteref "tundra-pradesh" tundraPradesh %}Tundra Pradesh{% endfootnoteref %} down there, don't go.{% enddoubleQuotesPaired %}_

I ask if I should go get her milk for her, I say, _{% inlineDoubleQuotes "I really could go, I'll go wear the thick jacket, don't worry" %}_. She keeps denying, so that I don't catch cold in stone cold kitchen downstairs at 0&deg; celcius. I keep insisting that she least me go, asking _{% inlineDoubleQuotes "Are you sure?" %}_. She snaps at me and says _{% inlineDoubleQuotes "Stop being so overtly sensitive Arihant. You've to be stern at times, stand by what you want to do, even if it goes against other people's wishes, even mine" %}_.

[This website that you're at](https://github.com/arihantverma/arihantverma.com) is the first project out of finally realising it was time for me to shun all sensory pleasures and work. If you've made it to the end of the post. Congrats! You deserve some confetti 🎉🎊.

Thank the Lord for meditation.
