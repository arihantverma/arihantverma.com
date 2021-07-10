---
title: The Way I Helped My Brother Understand "Why React?"
description: I was fortunate enough to start my front end career by actually using bare bones JS and CSS while we were trained 3/6 months. Others are not so lucky, they have to jump in on frameworks directly. In this post, I give a gentle introduction of React's state and component model by comparing it with native JS, primarily intended for beginners.
tags: ["React", "JavaScript", "beginnner", "introdution", "tech"]
layout: layouts/post/post.njk
twitterHashtags: React,JavaScript,introduction,beginner,whyreact
date: 2021-07-10
lastModified: 2021-07-10
newsletter: "tech"
dataImage: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"
imageAlt: "React logo"
---

When I started my front end journey in 2015, I was privileged enough to have a 6 months training program in which our company at the time — Sapient Nitro ( now Publicis Sapient ) invested in. Our trainer was instructed that by the end of the program we ought to have strong JavaScript fundamentals. I remember one of the SMEs Mahesh, who invested a lot of his time ( and goofy calming laughter ) which us new joinees straight out of college. He guided us to learn DOM JavaScript APIs and make our own jQuery like utility library for the project that we were supposed to deliver in phrases during our training. 

At that point of time, I wasn't very social and open. I wouldn't talk to any of the SMEs and would just get whatever information I'd get out of limited interaction with other people. But I'm glad that even that had something for me to learn from.

Recently, I have been collaborating with my little brother, who's studying in Canada, in learning web development completely hands on style. So guess what was one of the first things I helped him understand. JavaScript and React both at the same time! Let's walk through what I told him. Ready?

{% InlineEmoji "🚀", "rocket emoji" %}

This is what we are doing to make both in JavaScript and React. Click on the checkbox or the label, it's got a cute little toggling happening.

<div id="app" style="background: lightpink; padding: 10px; border: 4mm ridge lightcoral;"></div>

<script>
const CHECKBOX_ID = "my-checkbox";
const defaultLabelContent = "Click me to apply fake discount!";
const beforeDiscountText = "You have not availed discount";
const afterDiscountText = "Discount Availed!";

const checkBoxEl = document.createElement("input");
checkBoxEl.type = "checkbox";
checkBoxEl.id = CHECKBOX_ID;

const labelEl = document.createElement("label");
labelEl.style = "margin-left:5px; font-weight:bold;font-style:italic;";
const labelTextNode = document.createTextNode(defaultLabelContent);
labelEl.htmlFor = CHECKBOX_ID;
labelEl.append(labelTextNode);

const discountContentEl = document.createElement("div");
discountContentEl.style = "padding-left: 25px;"
const discountContentTextNode = document.createTextNode(beforeDiscountText);
discountContentEl.append(discountContentTextNode);

// appending
const appContainerEl = document.getElementById("app");
appContainerEl.append(checkBoxEl);
appContainerEl.append(labelEl);
appContainerEl.append(discountContentEl);

function toggleCheckBoxHandler(event) {
  const checkBoxOnWhichChangeHappened = event.target;

  if (checkBoxOnWhichChangeHappened.checked) {
    discountContentTextNode.textContent = afterDiscountText;
    labelTextNode.textContent = 'Click on me to remove fake discount'
  } else {
    discountContentTextNode.textContent = beforeDiscountText;
    labelTextNode.textContent = defaultLabelContent
  }
}

checkBoxEl.addEventListener("change", toggleCheckBoxHandler);
</script>

## Let's Start With JavaScript

We'll have one 'root' html element where we going to append things

```html
<div id="app"></div>
```

Let's create a checkbox and set its id

```javascript
const CHECKBOX_ID = "my-checkbox";

const checkBoxEl = document.createElement("input");
checkBoxEl.type = "checkbox";
checkBoxEl.id = CHECKBOX_ID;
```

Right now the `checkBoxEl` is a floating in the memory, it's not attached to any [DOM node](https://developer.mozilla.org/en-US/docs/Web/API/Node).

Let's create a label the same way we created checkbox

```javascript
const labelEl = document.createElement("label");
```

Let's create a text node and append it to the label

```javascript
const defaultLabelContent = "Click me to apply fake discount!";
const labelTextNode = document.createTextNode(defaultLabelContent);

labelEl.append(labelTextNode);
```

Let's append this the checkbox and label we have made to our `div#app` element

```javascript
const appContainerEl = document.getElementById("app");
appContainerEl.append(checkBoxEl);
appContainerEl.append(labelEl);
```

So far we have:

<div id="app-1" style="background: lightpink; padding: 10px; border: 4mm ridge lightcoral;"></div>

<script>
const _CHECKBOX_ID = "my-checkbox-1";

const _checkBoxEl = document.createElement("input");
_checkBoxEl.type = "checkbox";
_checkBoxEl.id = _CHECKBOX_ID;

const _labelEl = document.createElement("label");
_labelEl.style = "margin-left:5px; font-weight:bold;font-style:italic;";
const _defaultLabelContent = "Click me to apply fake discount!";
const _labelTextNode = document.createTextNode(_defaultLabelContent);

_labelEl.append(_labelTextNode);

const _appContainerEl = document.getElementById("app-1");
_appContainerEl.append(_checkBoxEl);
_appContainerEl.append(_labelEl);
</script>

Remember, the label and its text node are still in memory because we haven't attached them to a DOM node yet too.

You would have seen that on websites whenever you click the label of a checkbox, you are able to check and un-check checkbox as if you were clicking on it directly! Let's make that happen now.

```javascript
labelEl.htmlFor = CHECKBOX_ID; // CHECKBOX_ID is 'my-checkbox-1
```

We tell label element

> _Hey label! You are linked with the checkbox with id `my-checkbox-1`_

Let's try clicking on the label now.

<div id="app-2" style="background: lightpink; padding: 10px; border: 4mm ridge lightcoral;"></div>

<script>
  {
    const _CHECKBOX_ID = "my-checkbox-2";

    const _checkBoxEl = document.createElement("input");
    _checkBoxEl.type = "checkbox";
    _checkBoxEl.id = _CHECKBOX_ID;

    const _labelEl = document.createElement("label");
    _labelEl.style = "margin-left:5px; font-weight:bold;font-style:italic;";
    _labelEl.htmlFor = _CHECKBOX_ID; 

    const _defaultLabelContent = "Click me to apply fake discount!";
    const _labelTextNode = document.createTextNode(_defaultLabelContent);

    _labelEl.append(_labelTextNode);

    const _appContainerEl = document.getElementById("app-2");
    _appContainerEl.append(_checkBoxEl);
    _appContainerEl.append(_labelEl);
  }
</script>

So far so good?

You'd notice in our original demo that when the checkbox is unchecked we have a text saying _**You have not availed discount**_

Let's add that in the same fashion as we've added checkbox and label

```javascript
const beforeDiscountText = "You have not availed discount";

const discountContentEl = document.createElement("div");
const discountContentTextNode = document.createTextNode(beforeDiscountText);
discountContentEl.append(discountContentTextNode);

appContainerEl.append(discountContentEl);
```

<div id="app-3" style="background: lightpink; padding: 10px; border: 4mm ridge lightcoral;"></div>

<script>
  {
    const _CHECKBOX_ID = "my-checkbox-3";

    const _checkBoxEl = document.createElement("input");
    _checkBoxEl.type = "checkbox";
    _checkBoxEl.id = _CHECKBOX_ID;

    const _labelEl = document.createElement("label");
    _labelEl.style = "margin-left:5px; font-weight:bold;font-style:italic;";
    _labelEl.htmlFor = _CHECKBOX_ID; 

    const _defaultLabelContent = "Click me to apply fake discount!";
    const _labelTextNode = document.createTextNode(_defaultLabelContent);

    _labelEl.append(_labelTextNode);

    const beforeDiscountText = "You have not availed discount";

    const discountContentEl = document.createElement("div");
    discountContentEl.style = "padding-left: 25px;"
    const discountContentTextNode = document.createTextNode(beforeDiscountText);
    discountContentEl.append(discountContentTextNode);


    const _appContainerEl = document.getElementById("app-3");
    _appContainerEl.append(_checkBoxEl);
    _appContainerEl.append(_labelEl);
    _appContainerEl.append(discountContentEl);
  }
</script>

At this point of time, I want to point your attention to the fact that **we are using imperative DOM APIs**. What the heck does that mean? It means that when we use the APIs that browsers give us, we have to use them and tell them **HOW TO DO SOMETHING**.

Let's understand imperative vs declarative in layman terms first, with an example borrowed from [ui.dev](https://ui.dev/imperative-vs-declarative-programming/)

<h2 style="margin-bottom:0;">Imperative Way</h2>
<p style="margin:0;"><i>emphasises on <strong>how</strong> to do</i></p>

You go into a restaurant at the reception and say

> I see that table with two chairs, located at the far right corner, which has just emptied. My friend and I am going to walk over there and sit down.

In contrast:

<h2 style="margin-bottom:0;">Declarative Way</h2>
<p style="margin:0 0 25px 0;"><i>emphasises on <strong>what</strong> to do</i></p>

> Table for two, please.

Now let's take a look at why native DOM APIs that we have used are imperative by eavesdropping to this conversation between you and browser APIs:

> **YOU:** Hey Browser! Yeah you! Listen… I want you to make a div for me
> **createElement API:** Okay! Use me and tell me how to do it, and I'll do it for you
> **YOU:** `const divEl = document.createElement('div')`
> **YOU:** Okay, hey browser I want to actually show this in-memory div element in the browser. Tell me HOW to do it.
> **BROWSER:** Same thing you did with `createElement` dude/dudette. Just ask the `append` API for example.
> **append API:** Hey! yeah, use me and tell me what to append and how ( you'll get how to do that in my documentation ), and I'll do it for you
> **YOU:** Alright so okay, I already have div with id _app_ in html, so I'll select it using `const appEl = document.getElementById('app')` and I'll append div element I created before in it by doing `appEl.append(divEl)`

So when you use browser APIs we have explicitly use those APIs to tell the browser HOW to do things. This is a very simple example, and already we have a little verbose code:

```javascript
const CHECKBOX_ID = "my-checkbox";
const defaultLabelContent = "Click me to apply fake discount!";
const beforeDiscountText = "You have not availed discount";

/** Create checkbox */
const checkBoxEl = document.createElement("input");
checkBoxEl.type = "checkbox";
checkBoxEl.id = CHECKBOX_ID;

/** Create label */
const labelEl = document.createElement("label");
const labelTextNode = document.createTextNode(defaultLabelContent);
labelEl.htmlFor = CHECKBOX_ID;
labelEl.append(labelTextNode);

/** Create a dov wotj initial value of the text we have to toggle */
const discountContentEl = document.createElement("div");
const discountContentTextNode = document.createTextNode(beforeDiscountText);
discountContentEl.append(discountContentTextNode);

/** append all the above to our div#app html element */
const appContainerEl = document.getElementById("app");
appContainerEl.append(checkBoxEl);
appContainerEl.append(labelEl);
appContainerEl.append(discountContentEl);
```

And we are not done yet. We still have to actually toggle the text when checkbox toggles. Let's make that happen. Let's put a change event on checkbox and toggle stuff

```javascript
// ... the code that we wrote before //

const afterDiscountText = "Discount Availed!";
const afterToggleCheckboxLabelText = 'Click on me to remove fake discount';

/** apply change event listener and pass in a handler function */
checkBoxEl.addEventListener("change", toggleCheckBoxHandler);

function toggleCheckBoxHandler(event) {
  /** get hold of the checkbox, always safer for browser to tell us
   * on which event it fired the event, instead of us having to pluck out
   * the element from the DOM itself, which might be error prone in a moderately
   * big codebase
   */
  const checkBoxOnWhichChangeHappened = event.target;

  /** we check the actual `checked` value of the checkbox DOM Element
   * if it's true we change two things
   * 1. the discount text
   * 2. the label text of checkbox
  */
  if (checkBoxOnWhichChangeHappened.checked) {
    discountContentTextNode.textContent = afterDiscountText;
    labelTextNode.textContent = afterToggleCheckboxLabelText
  } else {
    /** if checkbox is not checked, we restore the values
     * to the old ( initial ones )
    */
    discountContentTextNode.textContent = beforeDiscountText;
    labelTextNode.textContent = defaultLabelContent
  }
}
```

We are done! Let's see it in action

<div id="app-10" style="background: lightpink; padding: 10px; border: 4mm ridge lightcoral;"></div>

<script>
  {
    const CHECKBOX_ID = "my-checkbox-10";
    const defaultLabelContent = "Click me to apply fake discount!";
    const beforeDiscountText = "You have not availed discount";
    const afterDiscountText = "Discount Availed!";

    const checkBoxEl = document.createElement("input");
    checkBoxEl.type = "checkbox";
    checkBoxEl.id = CHECKBOX_ID;

    const labelEl = document.createElement("label");
    labelEl.style = "margin-left:5px; font-weight:bold;font-style:italic;";
    const labelTextNode = document.createTextNode(defaultLabelContent);
    labelEl.htmlFor = CHECKBOX_ID;
    labelEl.append(labelTextNode);

    const discountContentEl = document.createElement("div");
    discountContentEl.style = "padding-left: 25px;"
    const discountContentTextNode = document.createTextNode(beforeDiscountText);
    discountContentEl.append(discountContentTextNode);

    // appending
    const appContainerEl = document.getElementById("app-10");
    appContainerEl.append(checkBoxEl);
    appContainerEl.append(labelEl);
    appContainerEl.append(discountContentEl);

    function toggleCheckBoxHandler(event) {
      const checkBoxOnWhichChangeHappened = event.target;

      if (checkBoxOnWhichChangeHappened.checked) {
        discountContentTextNode.textContent = afterDiscountText;
        labelTextNode.textContent = 'Click on me to remove fake discount'
      } else {
        discountContentTextNode.textContent = beforeDiscountText;
        labelTextNode.textContent = defaultLabelContent
      }
    }

    checkBoxEl.addEventListener("change", toggleCheckBoxHandler);
  }
</script>

Feeling nice having gotten this far isn't it? Good reading!

I want to emphasis again on the fact how we wrote the toggle logic. We've to manually check for a lot of things and actually reach out inside the DOM

1. To check if the the checkbox is checked or un-checked
2. To manually select the text nodes whose content has to be changed and manually change them **depending on the state of the DOM itself!** ( the checkbox check state )

That's a considerable amount of things you have to tell the browser. I remember writing assembly code for my microprocessor class in 3rd year of college — explicitly telling which register should hold what value and what operation should be performed when to achieve a particular result **explicitly** and **imperatively**. That's how trying to change DOM values through native JavaScript APIs feel like. It's not bad, it's actually really powerful in a way. But making interactions with these APIs usually result in developers making abstractions on top of these APIs.

One such, one of the most popular abstractions over DOM APIs was jQuery. But it still dealth with us **_keeping the UI state in the DOM itself_** ( like we did when we checked if checkbox was checked or not by actually reading its value from the checkbox element ).

Let's now see how React's declarative state and element modeling helps to mitigate verboseness.