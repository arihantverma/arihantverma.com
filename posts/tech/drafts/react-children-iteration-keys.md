---
title: Let's Play With React Children, Their Iteration And Keys
description: Write this before publishing
tags: ["tech essay", "github", "opensource", "react"]
layout: layouts/post/post.njk
twitterHashtags: essay,github,opensource,react
date: 2021-03-15
lastModified: 2021-03-15
newsletter: "tech"
typeOfPost: "essay"
coverImage: "https://images.unsplash.com/photo-1614112671716-d584b4ce4f49?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1500&q=80"
coverImageAlt: "Blue Open Focus Aperture Lights Shot Photograph"
coverImageCaption: "Photo by Benyamin Bohlouli on Unsplash"
eleventyExcludeFromCollections: true,
permalink: false
---

## Introduction

In this post, we are going to fiddle with React children, their iteration and React keys.

## Storytime

I stumbled upon two tweets by Mark Dalgleish, the master mind behind [Braid Design System](https://seek-oss.github.io/braid-design-system/) and [Playroom](https://github.com/seek-oss/playroom). Here are the tweets

<!-- <div style="display: flex; flex-direction: column; align-items: center">
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">When creating composite React components (i.e. parent + child pairs like HTML&#39;s &lt;select&gt; and &lt;option&gt;) you can avoid exposing private props like &quot;index&quot; or &quot;isFirstChild&quot; on child elements by using context.<br><br>CodeSandbox demo: <a href="https://t.co/ojqQoFQ9qM">https://t.co/ojqQoFQ9qM</a> <a href="https://t.co/HGYrzqHs5M">pic.twitter.com/HGYrzqHs5M</a></p>&mdash; 🧁 Mark Dalgleish (@markdalgleish) <a href="https://twitter.com/markdalgleish/status/1370552733590167552?ref_src=twsrc%5Etfw">March 13, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Invented a new React pattern I&#39;m calling the &quot;fake child&quot; pattern.<br><br>When making composite components (e.g. &lt;Select&gt; and &lt;Option&gt;) it lets you pass private props (i.e. not on the type signature) from parent to child *without* using context.<br><br>Demo: <a href="https://t.co/3M8z28pP7o">https://t.co/3M8z28pP7o</a> <a href="https://t.co/ZMhiDLGpMw">pic.twitter.com/ZMhiDLGpMw</a></p>&mdash; 🧁 Mark Dalgleish (@markdalgleish) <a href="https://twitter.com/markdalgleish/status/1370951759284162565?ref_src=twsrc%5Etfw">March 14, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div> -->

In both the tweets you can see the import

```js
import { flattenNodes } from "react-keyed-flatten-children";
```

The the code mentioned in tweets, `flattenNodes` is invoked with React's `children` as its argument. The result of the function call is then given to the iteration utility `React.Children` that React gives. Like so:

```js
React.Children.map(flatten(children), (child, index) => {
  // …
});
```

But why? Why not directly use `children` prop like so…?

```js
React.Children.map(children, (child, index) => {
  // …
});
```

I went onto `react-keyed-flatten-children` [github repository](https://github.com/grrowl/react-keyed-flatten-children) and started reading its readme.

Before I summarise what I learnt from there, let's recap or get acquainted ( depending on if you already know about these or not ) about some React utilities.

## Let's learn about some React APIs

`React.Children.toArray`

From React docs it says:

> Returns the children opaque data structure as a flat array with keys assigned to each child. Useful if you want to manipulate collections of children in your render methods, especially if you want to reorder or slice this.props.children before passing it down.

Let's break that down. The description above consists of three things

1. Returns the children opaque data structure
2. As a flat array
3. With keys assigned to each child.

We'll concern ourselves with 2 and 3. Opaque data structure is basically what a React [Fiber](https://github.com/acdlite/react-fiber-architecture) [Node](https://github.com/facebook/react/issues/7942) is.

## About `keys`

Let's see the difference between `children` prop and `Children.toArray(children)`.

```javascript
import { Children } from 'react'

function Debugger({children}) {
  // lets log some things
  console.log(children);
  console.log(
    Children.toArray(children);
  )

  return children;
}

function Playroom() {
  return (
    <Debugger>
        <a href="/home">Home</a>
        <a href="/popular">Popular Posts</a>
    </Debugger>
  )
}
```

We've made a wrapper component called `Debugger` which just returns the `children` as is, but also logs `children` and `Children.toArray(children)`. Let's see what they look like.

<!-- Snippets of objects -->

```javascript
// console.log(children);
[
  {
    $$typeof: Symbol(react.element),
    key: null,
    props: {
      href: "/home",
      children: "Home",
    },
    ref: null,
    type: "a",
    // … other properties
  },
  {
    $$typeof: Symbol(react.element),
    key: null,
    props: {
      href: "/popular",
      children: "Popular Posts",
    },
    ref: null,
    type: "a",
    // … other properties
  },
][
  // console.log(Children.toArray(children))
  ({
    $$typeof: Symbol(react.element),
    key: ".0",
    props: {
      href: "/home",
      children: "Home",
    },
    ref: null,
    type: "a",
    // … other properties
  },
  {
    $$typeof: Symbol(react.element),
    key: ".1",
    props: {
      href: "/popular",
      children: "Popular Posts",
    },
    ref: null,
    type: "a",
    // … other properties
  })
];
```

{% note %}
To get a detailed knowledge about what keys are, why they are necessary and how to handle them while iterating over data go through the following links.

1. [List and Keys In React](https://reactjs.org/docs/lists-and-keys.html)
2. [Recursing On Children](https://reactjs.org/docs/reconciliation.html#recursing-on-children)
3. [Explanation of A Codesandbox In The Second Link](https://www.youtube.com/watch?v=xlPxnc5uUPQ&ab_channel=Codevolution)

{% endnote %}

As you can see `Children.toArray` – as the docs suggest – adds a 'key' property to all the children.

## About Flattened Array

If you see React's Typescript types for a valid React Node

```typescript
type ReactNode =
  | ReactChild
  | ReactFragment
  | ReactPortal
  | boolean
  | null
  | undefined;
```

We see inside `ReactFragment`'s types that React can also render an array of valid React nodes.

```typescript
interface ReactNodeArray extends Array<ReactNode> {}
type ReactFragment = {} | ReactNodeArray;
```

Let's make an array of React Elements, render it and see what `Children.toArray` does to them.

```js/12-21,31
import { Children } from 'react'

function Debugger({children}) {
  // lets log some things
  console.log(children);
  console.log(
    Children.toArray(children);
  )

  return children;
}
function Playroom() {
  const arrayOfReactElements = [
    <span>First</span>,
    [
      <span>Second</span>,
      [
        <span>Third</span>
      ]
    ]
  ];

  return (
    <Debugger>
      <a href="/home">Home</a>
      <a href="/popular">Popular Posts</a>

      <span>
        Some text
      </span>

      {arrayOfReactElements}
    </Debugger>
  )
}
```

`children` gets logged as `[Object, Object, Object, Array]`

`Children.toArray(children)` gets logged as `[Object, Object, Object, Object, Object, Object]`. The last three array elements correspond to the React elements inside the `arrayOfReactElements` variable. Conclusion is that `React.Children.toArray` — as the React docs say — _flattens array of React children_.

So

```js
const arrayOfReactElements = [
  <span>First</span>,
  [<span>Second</span>, [<span>Third</span>]],
];
```

got flattened to

```js
[<span>First</span>, <span>Second</span>, <span>Third</span>];
```

and got rendered like that. This is explained very tersely and nicely in [this React github repository issue's comment](https://github.com/facebook/react/issues/6889#issuecomment-221858162). Copy pasting it here:

> It [`React.Children.toArray`] does not pull children out of elements and flatten them, that wouldn't really make any sense. It flattens nested arrays and objects, i.e. so that `[['a', 'b'],['c', ['d']]]` becomes something similar to `['a', 'b', 'c', 'd']`.

```js
React.Children.toArray([
  ["a", "b"],
  ["c", ["d"]],
]).length === 4;
```

Also let's take a look at what keys look like for these flattened React elements. To do that, let's loop over our children and show the key in the UI itself, like so…

```js/9-18
import { Children } from 'react'

function Debugger({children}) {
  // lets log some things
  console.log(children);
  console.log(
    Children.toArray(children);
  )

  return (
    <ul role="menu" className="toolbar">
      {React.Children.toArray(children).map((child) => (
        <li key={child.key}>
          {child.key} {child}
        </li>
      ))}
    </ul>
  );
}

function Playroom() {
  const arrayOfReactElements = [
    <span>First</span>,
    [
      <span>Second</span>,
      [
        <span>Third</span>
      ]
    ]
  ];

  return (
    <Debugger>
      <a href="/home">Home</a>
      <a href="/popular">Popular Posts</a>

      <span>
        Some text
      </span>

      {arrayOfReactElements}
    </Debugger>
  )
}
```

You'll see an output like this:

- .0 Home
- .1 Popular Posts
- .2 Some text
- .3:0 First
- .3:1:0 Second
- .3:1:1:0 Third

Notice how `Children.toArray` is smart enough to understand nesting in the array and take that into consideration while generating unique keys. It's using `3` for the `ReactNodeArray` type of React Node encountered. For each nesting inside that array it's using a `:` to add to the previous key value. So for first level of nesting it creates `.3:0`, for second level of nesting `3:1:0`, for third level of nesting `.3:1:1:0`

That's it! We're done with understanding what `Children.toArray` does. Now let's understand what it doesn't do 🤔.

## Let't Look At The Open Source For Answers

From the readme of [react-keyed-flatten-children](https://github.com/grrowl/react-keyed-flatten-children) package:

1. [`Children.toArray` does not traverse into fragments](https://github.com/facebook/react/issues/6889), which limits flexibility of its use.

2. Existing solutions exist, but they do not preserve the keys of the children and fragments, which throws away valuable performance optimisations provided through React keys.

3. You might be doing something a little wild, so you want the concept of "children" to as predictable as possible for you, and for the consumers of your library or component, [to avoid issues like this](https://github.com/ReactTraining/react-router/issues/5785#issuecomment-351067856) down the line.

(1) and (3) are mostly telling about the same point. Let's start with what it means when it says _`Children.toArray` does not traverse into fragments_. Let's see that in action.

```js/23-26
import { Children } from 'react'

function Debugger({children}) {

  console.log(Children.toArray(children));

  return (
    <ul role="menu" className="toolbar">
      {Children.toArray(children).map((child) => (
        <li key={child.key}>
          {child.key} {child}
        </li>
      ))}
    </ul>
  );
}

function Playroom() {
  return (
    <Debugger>
      <a href="/home">Home</a>
      <a href="/popular">Popular Posts</a>

      <>
        <a href="/profile">Profile</a>
        <a href="/settings">Settings</a>
      </>
    </Debugger>
  )
}
```

To make things simpler we've just removed the `span` and the array of React elements and added a fragment with two children, in the code snippet above. Let's see what gets seen in the UI:

.0 Home
.1 Popular Posts
.2 ProfileSettings

Oh oh! 😕. As you can see the children of the fragment get rendered together instead of separately. So instead of something like

```html
<ul role="menu" class="toolbar">
  <li>
    .0
    <a href="/home">Home </a>
  </li>
  <li>
    .1
    <a href="/popular">Popular Posts</a>
  </li>
  <li>
    .2..0
    <a href="/profile">Profile</a>
  </li>
  <li>
    .2..1
    <a href="/settings">Settings</a>
  </li>
</ul>
```

we get

```html
<ul role="menu" class="toolbar">
  <li>
    .0
    <a href="/home">Home</a>
  </li>
  <li>
    .1
    <a href="/popular">Popular Posts</a>
  </li>
  <li>
    .2
    <a href="/profile">Profile</a>
    <a href="/settings">Settings</a>
  </li>
</ul>
```

Reiterating points, (1) and (3) from the github repository's readme, so that you wouldn't have to scroll up again:

(1) [`Children.toArray` does not traverse into fragments](https://github.com/facebook/react/issues/6889), which limits flexibility of its use.

(3) You might be doing something a little wild, so you want the concept of "children" to as predictable as possible for you, and for the consumers of your library or component, [to avoid issues like this](https://github.com/ReactTraining/react-router/issues/5785#issuecomment-351067856) down the line.

In a small blog post introducing **reacted-keyed-flatten-children** its author Tom writes in the first line:

> There are some use cases where you’ll want to wrap each provided child or introspect the collection.

We want to be able to do that with children inside Fragments as well. Basically what `React.Children.toArray` does for array of React elements, we need to do the same with React Fragments as well. Why is that? Because we are't really concerned with Fragments while iterating over children, since they just help us _consolidate_ elements together without a need of an actual parent element – which may be very useful for styling. They are basically helpful _pass throughs_. We are interested Fragments children which actually get rendered in the DOM.

The open source package [react-keyed-flatten-children](https://github.com/grrowl/react-keyed-flatten-children) helps us do exactly this.

Let's look at its code. We are essentially going to enhance `React.Children.toArray` to support traversing into Fragment's children.

```ts
import {
  // types
  ReactNode,
  ReactChild,

  // utilities
  Children,
} from "react";

function flattenChildren(
  children: ReactNode,
  depth: number = 0, // used just for debugging recursive calls
  keys: (string | number)[] = [] // we'll come to this later
): ReactChild[] {
  // 1. we are going to return an array of children
  // 2. we iterate over `Children.toArray` and enhance
  //    it to support traversing into Fragments
  return Children.toArray(children).reduce(
    (acc: ReactChild[], node, nodeIndex) => {},
    // initial value of our accumulator/collector of React children
    []
  );
}
```

{% note %}
If you are unaware or want to revise how `reduce` works, take some time to read about it [on mdn docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
{% endnote %}

```ts/15-17,20-41
import {
  // types
  ReactNode,
  ReactChild,

  // utilities
  Children,
} from "react";

import { isFragment } from "react-is";

function flattenChildren(
  children: ReactNode,
  depth: number = 0, // used just for debugging recursive calls
  keys: (string | number)[] = []
): ReactChild[] {
  // 1. we are going to return an array of children
  // 2. we iterate over `Children.toArray` and enhance
  //    it to support traversing into Fragments
  return Children.toArray(children).reduce(
    (acc: ReactChild[], node, nodeIndex) => {
      if (isFragment(node)) {
        // We'll handle this in the next snippet
      } else {
        // if the node is valid react element
        // we clone the node, update the 'key' prop
        // and push it to our accumulator array
        // read on for why we are doing this.
        if (isValidElement(node)) {
          acc.push(
            cloneElement(node, {
              key: keys.concat(String(node.key)).join('.')
            })
          );
        } else if (
            typeof node === "string"
            || typeof node === "number"
        ) {
          // if the node is of string or number type
          // we directly push it in the accumulator
          acc.push(node);
        }
      }
    },
    // initial value of our accumulator/collector of React children
    []
  );
}
```

We're iterating over the flattened children that `React.Children.toArray` gives us. We check each React node. For now we've checked for two things

1. If the node is of type string or number, we directly push them in our accumulator list.
2. If they are a valid React Element, we clone the that node and update the key prop of that node. At this point you might ask, why we have to clone the node, and why we can't use them as is. Let's handle the fragment use case before we can answer this.

```ts/21-28
import {
  // types
  ReactNode,
  ReactChild,

  // utilities
  Children,
} from "react";

import { isFragment } from "react-is";

function flattenChildren(
  children: ReactNode,
  depth: number = 0, // used just for debugging recursive calls
  keys: (string | number)[] = []
): ReactChild[] {
  // 1. we are going to return an array of children
  // 2. we iterate over `Children.toArray` and enhance
  //    it to support traversing into Fragments
  return Children.toArray(children).reduce(
    (acc: ReactChild[], node, nodeIndex) => {
      if (isFragment(node)) {
        acc.push.apply(
          acc,
          flattenChildren(
            node.props.children,
            depth + 1,
            keys.concat(node.key || nodeIndex)
          )
        );
      } else {
        // if the node is valid react element
        // we clone the node, update the 'key' prop
        // and push it to our accumulator array
        // read on for why we are doing this.
        if (isValidElement(node)) {
          acc.push(
            cloneElement(node, {
              key: keys.concat(String(node.key)).join('.')
            })
          );
        } else if (
            typeof node === "string"
            || typeof node === "number"
        ) {
          // if the node is of string or number type
          // we directly push it in the accumulator
          acc.push(node);
        }
      }
    },
    // initial value of our accumulator/collector of React children
    []
  );
}
```

Let's understand what `acc.push.apply` is doing. Let's [turn to mdn docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply#using_apply_to_append_an_array_to_another) to understand what is happening by calling `Array.prototype.push` function as a `Function.prototype.apply` method. `acc.push.apply` is basically letting us push all elements of one array to another array.

```js
const arr1 = [1, 2, 3];
arr1.push.apply([4, 5, 6, 7]);

// arr1 -> [1, 2, 3, 4, 5, 6, 7]

const arr2 = [1, 2, 3];
arr2.push(...[4, 5, 6, 7]);

// arr2 -> [1, 2, 3, 4, 5, 6, 7]
```

For every fragment encountered we call `flattenChildren` again, and push the value of that call in the accumulator array.

As an example, let's have children like this

```js
const children = (
  // first fragment
  <>
    <span>one</span>
    <span>two</span>

    // second fragment
    <>
      <span>three</span>
      <span>four</span>
    </>
  <>
)

const newChildren = flattenChildren(children);
```

In the beginning

{% note %}
Accumulator's value is `[]`
{% endnote %}

1.  The first time `flattenChildren` is called is because of the line

```js
const newChildren = flattenChildren(children);
```

2. Inside that function execution, it will identify the first fragment and execute the following line of code

```js
acc.push.apply(
  acc,
  flattenChildren(
    node.props.children,
    depth + 1,
    keys.concat(node.key || nodeIndex)
  )
);
```

The function call `acc.push.apply(...)` will be pending until `flattenChildren` function call – its second argument – returns. Notice that when `flattenChildren` is called here, we also pass the key of the fragment node, namely, `node.key` to the it as the third argument. This node will get attached to the key of each of the Fragment's children. This way the children will be uniquely identified. This is very similar to how `React.Children.toArray` handle nesting of arrays inside arrays, like we've already seen before.

`flattenChildren` is called with Fragment's children as its first argument. The children are two span elements and another fragment. The two span elements are handled

```js
if (isValidElement(node)) {
  // here
}
```

Remember now, that we are in the second `flattenChildren` call. After the two span React nodes are handled, the function execution reaches the inner fragment.

The same thing repeats again. `flattenChildren` is called again ( this is the third time in total ) with the children of the inner fragment. This time the two inner spans get handled by

```js
if (isValidElement(node)) {
  //
}
```

The execution returns into the second `flattenChildren` call. `acc.push.apply` finally finishes. `reduce` call finishes and returns the final array of React children which consistens of four span nodes.

---

Todo:

1. https://github.com/reactjs/rfcs/pull/61#issuecomment-584402735
2. https://cdb.reacttraining.com/react-call-return-what-and-why-7e7761f81843
3. https://medium.com/@rmhartog/composable-compound-components-with-react-call-return-7a3c5b0e5009
4. https://github.com/facebook/react/issues/12638
