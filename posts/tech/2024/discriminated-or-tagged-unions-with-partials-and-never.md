---
title: Discriminated / Tagged Union Types
description: Let's learn about discriminated union types a little more than we already know.
tags: ["typescript", "types", "discriminated", "union"]
layout: layouts/post/post.njk
twitterHashtags: typescript,types,discriminated,union
date: 2024-06-02
lastModified: 2024-06-02
typeOfPost: "essay"
coverImage: "./images/discriminated-types-in-typescript.webp"
coverImageAlt: "Typescript Discriminated Union"
coverImageCaption: "Typescript Discriminated Union"
---

I learnt about **Discriminated Union Types** for the first time 2 years back from [Typescript in 50 Lessons](-books/typescript-in-50-lessons/) book by [Stefan Baumgartner](https://mastodon.social/@deadparrot). The example from the book:

```ts
// common properties for an event entity
type TechEventBase = {
  title: string,
  description: string
  date: Date,
  capacity: number,
  rsvp: number,
}

type Talk = {
  title: string,
  abstract: string,
  speaker: string
}

type Conference = TechEventBase & {
  location: string,
  price: number,
  talks: Talk[],
  kind: 'conference'
}

type Meetup = TechEventBase & {
  location: string,
  price: string,
  talks: Talk[],
  kind: 'meetup'
}

type Webinar = TechEventBase & {
  url: string,
  price?: number,
  talks: Talk,
  kind: 'webinar'
}

type TechEvent = Conference | Webinar | Meetup

function getEventTeaser(event: TechEvent) {
  switch(event.kind) {
    case 'conference':
    // We now know that I'm in type Conference
    return `${event.title} (Conference), ` +
    // Suddenly I don't have to check for price as
    // TypeScript knows it will be there
    `priced at ${event.price} USD`
    case 'meetup':
    // We now know that we're in type Meetup
    return `${event.title} (Meetup), ` +
    // Suddenly we can say for sure that this
    // event will have a location, because the
    // type tells us
    `hosted at ${event.location}`
    case 'webinar':
    // We now know that we're in type Webinar
    return '${event.title} (Webinar), ' +
    // Suddenly we can say for sure that there will
    // be a URL
    `available online at ${event.url}`
    default:
    throw new Error('Not sure what to do with that!')
  }      
}
```

Typescript playground [link](https://www.typescriptlang.org/play/?ssl=14&ssc=1&pln=15&pc=1#code/PTAEGMHsFtsg7UAHATpJBTFAXAlhgZ1ADNIVQBDRDANw3m1Hr2wE8AoNzUAFQ3AAWAUToMAQhQIZQAXlABvdqFAsANhgBcoAthS54AcwA0S0ABNC4PUjwItOvYdNmK2TaAAirjCeXgKSBTguGxa8ACu0ABGWL6gKAQ0SGGRMSgmAL7snKzcPBSqANayCqZq7g76xqYUUQ5B2Pa6VXEEmBSFWE2OBuxZOdwAwgjEWPTg0nJ8giLMElKgAGSlyqqQ-rbw3S2mqLgTKdGxZQWFBFr5RQDaALpxhfpmWgDkUPCjKOMYz33ZXNIAWQwGGw4SQJWmwlE2Hm0mWilW61cuDs2mahjiewOaJ6cWwp3OvFOt3ujxe0GBoKQP36-1AAHUMFF9BRyFN+FC5pI4StQOEUKpthjdnoJgB+Q5pPEEi6nUnwJ6gZ4AdyZLJQNL+uWkkNmDBKw3eY3gE1AAB8GWr4KzzaAgSCwdliOETZtQAYQXrsHxuSgABS0ZgXDlegCUvIIypCggD0IAdA8FeGEcoINylW8Pl9nhpTMoQJbQPBIMrQIVi6XsAJXKAAJLPaCgfQqbWgQ1Zk0YPPxB0oRAAAwAJPJAww4+UMqA-e3jRNQ0ZQP3QABqbsFgDK4TMFngqlYdfMCGejGrdBUkAgAn4xVI5Cx0kka7APG166suBsZYrRBCoCjqlUUAYhUK9Pm7ft7zMShGGHUdsDje9JwAVXXDx+27fwFgbSkwRzJ9CwrL8SxAmtVWeT4m0QOl7SpbtPlBPtF1g+MJynGiwXnRcV3wzdt3oPc-2kfxEAICh91vbR+WkKsayrXACHwuC-1wADQFPB9QDWDYUXgBcYn8cIFirLtU1AAs6TcACiEM8CBEgHQMCgmtmOYOMtORBAMnQ0zMOkFUrVZPDTILRki2I8tiJkxgyIo5s6UZZlrRQOje0QZ4XLHVi-QS9VOOebjgrAXidwE1U0xEsSSDISSKKikCxmUgD8OAihQCQgAlAAZcCKBoCgVNqdRQAQVR9AfGCR3jflVC87sLGIChwlURpuyrNBS3gDBSyEFA0H9Z4ADlIEYAgpL-atGGwC8zAvKMqxI7AAEJnlDUxJ1M0A+iAA) for above code.

Discriminated union types provide…no surprise…discrimination with the help of a common **identifier**, using which Typescript is able to  identify (discriminate/narrow down) between different kinds of types, just like we can identify rock from metal music.

{% InlineEmoji "🤘🏼🎸" "rock hands and guitar" %}

In the case above, that common **identifier** is the property `kind` on all different types of `TechEvent`. For your eyes only:

```ts/4,11,18
type Conference = TechEventBase & {
  location: string,
  price: number,
  talks: Talk[],
  kind: 'conference'
}

type Meetup = TechEventBase & {
  location: string,
  price: string,
  talks: Talk[],
  kind: 'meetup'
}

type Webinar = TechEventBase & {
  url: string,
  price?: number,
  talks: Talk,
  kind: 'webinar'
}

```



Once TypeScript checks that an event has a particular `kind` property, TypeScript can narrow down the  `TechEvent` type to be one of those union types (see `getEventTeaser` above).

If you don't have a common identifier property like `kind`, and instead try to do this:

```ts
type OtherProperties = {
  location?: string,
  url?: string,
  price?: number | string,
  talks: Talk[] | Talk,
  kind: 'conference' | 'meetup' | 'webinar'
}

type TechEvent = OtherProperties & TechEventBase
```

There's no necessary knowledge about which properties, the event of kind `conference`, or `meetup`, or `webinar`, _definitely has and has not_. Every kind of event could have any kind of property, which is not nice. Because we know that `url` property only makes sense for `webinar` kind of event, but this type doesn't help enforce it in any way. Neither does it let us narrow types down when we provide `switch` or `if` checks on `TechEvent` typed value. 

> Discriminated Union type, with a common property across a union of types, helps Typescript to narrow types down, when you check for one particular kind of that property.

But what if you want to make associations between two properties? Suppose say, I have two properties on a type, property `isPending` and `pendingText`. I want either both of them to be required or none of them at all. I'm fairly intermediate at TypeScript, and in no way can I pull off what xstate and trpc pull off under the hood, but this is what I found to be one of the ways. And strangely(or not?), it's a form of telling TypeScript a way of discriminating. See this:


```ts
type PendingProps = {
  isPending: boolean;
  pendingText: string;
};

type Props = {
  otherProp: string
} 

type Options = Props &
  (
    | (Partial<PendingProps> & { isPending?: never; pendingText?: never })
    | ({ isPending: boolean } & Required<Pick<PendingProps, 'pendingText'>>)
    | ({ pendingText: string } & Required<Pick<PendingProps, 'isPending'>>)
  );

function foo(options: Options) {
  console.info(options)
}

// works
foo({
  otherProp: 'whatever'
})

// works
foo({
  otherProp: 'whatver',
  isPending: true,
  pendingText: 'Loading…'
})

// errors
foo({
  otherProp: 'whatver',
  isPending: false
})

// errors
foo({
  otherProp: 'whatver',
  pendingText: 'Loading…'
})
```

Typescript Playground [link](https://www.typescriptlang.org/play/?#code/C4TwDgpgBAChB2ATAlvA5jATgezAZygF4oBvAKCimTziVTQC4oAjbbAGwgEN4BuCqJDroAKhAAewJnmCZ6-AL78yoSLBz4ipAdmAALCJiy5ps+mQVQyK8NADyYYMmzwCxY5oBkAgBQDKAD5QPjBcmE5c7AA8tCjoHngAfFCepFQ0CHFoAPxM8BAAboa8gpn0YpK5UPlFmFAKAJT+UEE+JOmx9EysHNzw9SlQAEoQAI4ArsiYEIgxyADGANYxZfEaeAA0UADkQlkVwNuJiU2UgcHte+USUlAycugDqSMTUzNzSyvCGOtb29SddBHE4CBrKABm43g8ycLig4LYPlwsNcTAcKLwDW0lHmLjwvQAdKgEUjHM5XE0FNYAPTUqAAd2wmEWeDICOwbR0+kMHiY23pei4wEKhm2FiaZFpDKZLLZiPIlF0BiMGj5AqFtW2GwEANWjCgsnGEG1lCuohufIAMtguFlAGQEYsaNLphhwmFZ7M5iu5KpMO3VwE1Jo6eqY4MieAg4udUFdTI98q5yt5-sFgdFwbNaAOVpt9sdDSAA) for the above code

Let's break that down.

**ONE: `Partial<PendingProps> & { isPending?: never; pendingText?: never }`.**
This means that if you don't provide any of the `isPending` or `pendingText` props, both of them will be treated as optional, and you won't get any TypeScript error. When you intersect `Partial<PendingProps>` with `{ isPending?: never; pendingText?: never }`, it effectively removes the possibility of having `isPending` or `pendingText` as optional properties. It kinda makes sense when you read it:

Because if, say, we provide `isPending` and miss `pendingText`, TypeScript matches the type with `Partial<PendingProps>` (since `pendingText` is missing). But it also has to match the intersection. 

{% note %}
  **Quick Recap**: We read Intersection Types (`&` operator) as _and_. We combine the properties from one type A with that of another type B, much like extending classes. The result is a new type with the properties of type A and type B.
{% endnote %}

If `Partial<PendingProps>` is matched, and it intersects with `{ isPending?: never; pendingText?: never }`, we're basically saying

> Nah, uuh! If you give partial, I don't allow you to use either of them, they are `never`!

**TWO: `({ isPending: boolean } & Required<Pick<PendingProps, 'pendingText'>>)`**
This means that if you provide the `isPending` prop, the `pendingText` prop becomes required. The third part says the vice versa.

# Recap
1. Make partial properties impossible
2. If one is given, make the other one mandatory.

As and when I find other examples of discriminating in TypeScript, I'll keep updating here. If you learnt something new, or liked this, share it with others 💃🏻