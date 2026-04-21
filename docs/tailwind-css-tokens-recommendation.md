# Tailwind CSS Tokens Recommendation

## Goal

Create a semantic CSS token system for this project using Tailwind CSS v4 so that:

- the design system is production-grade from the start
- components consume meaningful semantics instead of raw palette values
- light and dark themes are handled by token remapping
- typography, layout, motion, code styles, and interaction states are part of the same system

This recommendation is influenced by the patterns found in the published CSS for [joshwcomeau.com](https://www.joshwcomeau.com/), but translated into a cleaner Tailwind v4-first setup for a fresh codebase.

## Core Principle

Do not treat tokens as only "colors".

A professional token system covers:

- color
- typography
- spacing
- layout
- radius
- shadow
- border
- motion
- interactive states
- editorial surfaces like code, `kbd`, selection, and prose

## Recommended Layers

Use three layers of tokens.

1. Foundation tokens
2. Semantic tokens
3. Context tokens

Component-specific tokens should come later and only when needed.

---

## 1. Foundation Tokens

Foundation tokens are the raw building blocks. They should not describe product meaning. They only describe a reusable value.

Examples:

- neutral palette steps
- accent palette steps
- font stacks
- spacing scale
- radius scale
- shadow scale
- motion values

### Why these tokens exist

They give you a stable primitive layer to compose semantics from. If your brand color changes, or if your dark mode palette shifts, you only update the mapping layer instead of every component.

### Example

```css
@theme {
  --color-gray-50: oklch(98% 0.004 255);
  --color-gray-100: oklch(96% 0.006 255);
  --color-gray-200: oklch(92% 0.008 255);
  --color-gray-400: oklch(70% 0.015 255);
  --color-gray-600: oklch(51% 0.02 255);
  --color-gray-800: oklch(29% 0.02 255);
  --color-gray-950: oklch(17% 0.01 255);

  --color-primary-500: oklch(60% 0.2 265);
  --color-primary-600: oklch(54% 0.21 265);

  --font-sans: "Inter Variable", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Iowan Old Style", Georgia, serif;
  --font-mono: "JetBrains Mono Variable", ui-monospace, monospace;

  --radius-sm: 0.375rem;
  --radius-md: 0.75rem;
  --radius-lg: 1.25rem;

  --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.06);
  --shadow-md: 0 12px 30px rgb(0 0 0 / 0.12);

  --duration-fast: 150ms;
  --duration-base: 250ms;
  --duration-slow: 350ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
}
```

---

## 2. Semantic Tokens

Semantic tokens are the layer your UI should mostly consume.

Examples:

- `--color-background`
- `--color-foreground`
- `--color-surface`
- `--color-border`
- `--color-muted`
- `--color-primary`
- `--color-danger`

### Why these tokens exist

They let your code express intent instead of implementation.

Bad:

```html
<div class="bg-indigo-600 text-white">
```

Better:

```html
<div class="bg-primary text-primary-foreground">
```

The second version tells you what the element means, not just what color it currently is.

### Example

```css
@theme {
  --color-background: var(--color-gray-50);
  --color-foreground: var(--color-gray-950);
  --color-surface: white;
  --color-surface-elevated: white;
  --color-muted: var(--color-gray-100);
  --color-muted-foreground: var(--color-gray-600);
  --color-border: var(--color-gray-200);

  --color-primary: var(--color-primary-600);
  --color-primary-foreground: white;

  --color-success: oklch(56% 0.18 155);
  --color-warning: oklch(74% 0.17 78);
  --color-danger: oklch(57% 0.22 25);
  --color-info: oklch(62% 0.17 255);
}
```

### Tailwind usage example

```html
<article class="rounded-lg border border-border bg-surface text-foreground shadow-sm">
  <h2 class="text-xl font-semibold">Article title</h2>
  <p class="text-muted-foreground">Supporting summary text.</p>
  <a class="text-primary" href="#">Read more</a>
</article>
```

---

## 3. Context Tokens

Context tokens are still global, but they represent specific UX contexts rather than broad UI roles.

Examples:

- `--color-code-bg`
- `--syntax-comment`
- `--syntax-fn`
- `--kbd-background-color`
- `--selection-background-color`
- `--selection-text-color`
- `--color-content-outline`

### Why these tokens exist

Editorial products and portfolios usually need more than card/button colors. Code snippets, inline code, keyboard key hints, and text selection all contribute to polish.

These tokens keep those surfaces deliberate instead of one-off.

### Example

```css
@theme {
  --color-code-bg: var(--color-gray-100);
  --kbd-background-color: var(--color-gray-100);
  --kbd-border-color: var(--color-gray-300);

  --selection-background-color: color-mix(in oklab, var(--color-primary) 24%, white);
  --selection-text-color: var(--color-gray-950);

  --syntax-bg: var(--color-gray-100);
  --syntax-comment: var(--color-gray-600);
  --syntax-prop: oklch(58% 0.22 350);
  --syntax-bool: oklch(62% 0.24 315);
  --syntax-str: oklch(55% 0.21 280);
  --syntax-fn: oklch(59% 0.18 250);
}
```

### Example base styles

```css
@layer base {
  ::selection {
    background: var(--selection-background-color);
    color: var(--selection-text-color);
  }

  code {
    font-family: var(--font-mono);
    background: var(--color-code-bg);
    padding: 0.125em 0.35em;
    border-radius: 0.25rem;
  }

  kbd {
    font-family: var(--font-mono);
    background: var(--kbd-background-color);
    border-bottom: 3px solid var(--kbd-border-color);
    border-radius: 0.25rem 0.25rem 0.375rem 0.375rem;
    padding: 0 0.625rem;
  }
}
```

---

## Recommended Token Set

Below is the recommended starting token set and why each group should exist.

## Color Tokens

### `--color-background`

Purpose: the default page background.

Why it should exist: every page and app shell needs one canonical background token. It is the base that theme switching pivots around.

```css
--color-background: var(--color-gray-50);
```

```html
<body class="bg-background text-foreground">
```

### `--color-foreground`

Purpose: the default text color on the main page background.

Why it should exist: this gives you one reliable token for readable default text instead of repeatedly choosing arbitrary dark values.

```css
--color-foreground: var(--color-gray-950);
```

```html
<main class="text-foreground">
```

### `--color-surface`

Purpose: background for cards, panels, menus, and contained blocks.

Why it should exist: many elements sit on top of the page background and need a separate surface identity.

```css
--color-surface: white;
```

```html
<section class="bg-surface border border-border rounded-lg">
```

### `--color-surface-elevated`

Purpose: a slightly more prominent surface for dropdowns, dialogs, or hover layers.

Why it should exist: lets you distinguish nested layers without inventing arbitrary values later.

```css
--color-surface-elevated: white;
```

### `--color-muted`

Purpose: subdued fills for chips, inline code backgrounds, callout tints, and quiet UI areas.

Why it should exist: subtle fills appear everywhere in real UIs.

```css
--color-muted: var(--color-gray-100);
```

```html
<span class="bg-muted text-muted-foreground rounded px-2 py-1">Draft</span>
```

### `--color-muted-foreground`

Purpose: secondary text color.

Why it should exist: default body text and supporting text should not fight for the same attention.

```css
--color-muted-foreground: var(--color-gray-600);
```

```html
<p class="text-muted-foreground">Published 2 days ago</p>
```

### `--color-border`

Purpose: default border and divider color.

Why it should exist: borders need consistency across cards, inputs, dividers, and hover states.

```css
--color-border: var(--color-gray-200);
```

```html
<div class="border-b border-border"></div>
```

### `--color-primary`

Purpose: main action/link/emphasis color.

Why it should exist: one token defines the core interactive identity of the site.

```css
--color-primary: var(--color-primary-600);
```

```html
<a class="text-primary">Read article</a>
<button class="bg-primary text-primary-foreground rounded-md px-4 py-2">Subscribe</button>
```

### `--color-primary-foreground`

Purpose: foreground color shown on top of a primary fill.

Why it should exist: ensures contrast remains correct when the primary color changes.

```css
--color-primary-foreground: white;
```

### `--color-success`, `--color-warning`, `--color-danger`, `--color-info`

Purpose: status semantics.

Why they should exist: production UIs need states for feedback, alerts, validation, and notices.

```css
--color-success: oklch(56% 0.18 155);
--color-warning: oklch(74% 0.17 78);
--color-danger: oklch(57% 0.22 25);
--color-info: oklch(62% 0.17 255);
```

```html
<p class="text-danger">Payment failed.</p>
<div class="border border-warning bg-muted px-4 py-3">Maintenance scheduled tonight.</div>
```

---

## Typography Tokens

### `--font-sans`

Purpose: default UI and body typeface.

Why it should exist: this lets the entire product share one readable default stack.

```css
--font-sans: "Inter Variable", ui-sans-serif, system-ui, sans-serif;
```

### `--font-serif`

Purpose: editorial contrast for titles, pull quotes, or longform branding moments.

Why it should exist: blogs and personal sites often need more typographic range than apps.

```css
--font-serif: "Iowan Old Style", Georgia, serif;
```

### `--font-mono`

Purpose: code, inline code, terminal snippets, keyboard hints.

Why it should exist: monospace treatment should be standardized.

```css
--font-mono: "JetBrains Mono Variable", ui-monospace, monospace;
```

### `--font-weight-light`, `--font-weight-medium`, `--font-weight-bold`

Purpose: normalized weight steps for the product.

Why they should exist: many design systems drift into random weight usage. These tokens keep hierarchy consistent.

```css
--font-weight-light: 400;
--font-weight-medium: 500;
--font-weight-bold: 600;
```

### Type scale tokens like `--text-base`, `--text-xl`, `--text-3xl`

Purpose: standard size steps.

Why they should exist: repeated handcrafted sizes create inconsistent rhythm and scaling.

```css
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.25rem;
--text-2xl: clamp(1.5rem, 1.2rem + 1vw, 2.25rem);
--text-3xl: clamp(2rem, 1.5rem + 2vw, 3.5rem);
```

```html
<h1 class="text-3xl font-semibold tracking-tight">Arihant Verma</h1>
```

---

## Layout Tokens

### `--viewport-padding`

Purpose: shared page-side padding.

Why it should exist: a consistent site gutter is one of the fastest ways to make layouts feel coherent.

```css
--viewport-padding: 1rem;
```

### `--content-width`

Purpose: max width for standard content containers.

Why it should exist: keeps page layouts aligned without hardcoding magic numbers across components.

```css
--content-width: 72rem;
```

### `--content-width-reading`

Purpose: readable line length for paragraphs and prose.

Why it should exist: content readability depends heavily on line length.

```css
--content-width-reading: 68ch;
```

```css
@layer base {
  p,
  li {
    max-width: var(--content-width-reading);
  }
}
```

### `--header-height`

Purpose: canonical top navigation height.

Why it should exist: sticky headers, skip links, scroll margins, and anchor offsets should all reference one value.

```css
--header-height: 5rem;
```

---

## Radius and Shadow Tokens

### `--radius-sm`, `--radius-md`, `--radius-lg`

Purpose: shared corner styles.

Why they should exist: corner language is part of brand feel, and should remain consistent across cards, inputs, badges, and overlays.

```css
--radius-sm: 0.375rem;
--radius-md: 0.75rem;
--radius-lg: 1.25rem;
```

### `--shadow-sm`, `--shadow-md`

Purpose: elevation scale.

Why they should exist: cards, sticky headers, menus, dialogs, and floating controls need consistent depth rules.

```css
--shadow-sm: 0 1px 2px rgb(0 0 0 / 0.06);
--shadow-md: 0 12px 30px rgb(0 0 0 / 0.12);
```

```html
<div class="rounded-lg bg-surface shadow-sm">
```

---

## Motion Tokens

### `--duration-fast`, `--duration-base`, `--duration-slow`

Purpose: normalized timing steps.

Why they should exist: transitions should feel related across controls and overlays.

```css
--duration-fast: 150ms;
--duration-base: 250ms;
--duration-slow: 350ms;
```

### `--ease-standard`

Purpose: default easing for most transitions.

Why it should exist: keeps UI motion feeling cohesive.

```css
--ease-standard: cubic-bezier(0.2, 0, 0, 1);
```

### `--ease-emphasized`

Purpose: more expressive easing for larger theme transitions or more noticeable moments.

Why it should exist: some transitions need more character than the default ease.

```css
--ease-emphasized: cubic-bezier(0.41, 0.1, 0.13, 1);
```

```css
.theme-transition {
  transition: background-color var(--duration-slow) var(--ease-emphasized);
}
```

---

## Accessibility and Interaction Tokens

### `--selection-background-color` and `--selection-text-color`

Purpose: custom text selection colors.

Why they should exist: selection styling is a small but professional touch, especially for editorial sites.

```css
--selection-background-color: color-mix(in oklab, var(--color-primary) 24%, white);
--selection-text-color: var(--color-gray-950);
```

### `--kbd-background-color` and `--kbd-border-color`

Purpose: polished keyboard shortcut styling.

Why they should exist: if you ever show shortcuts or command hints, `kbd` should already belong to the design system.

```css
--kbd-background-color: var(--color-gray-100);
--kbd-border-color: var(--color-gray-300);
```

### `--color-content-outline`

Purpose: subtle outline token for focused or contained content regions.

Why it should exist: longform content layouts sometimes need soft frame/outline treatment, especially in dark mode.

```css
--color-content-outline: transparent;
```

---

## Example Global CSS Skeleton

```css
@import "tailwindcss";

@theme {
  --font-sans: "Inter Variable", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Iowan Old Style", Georgia, serif;
  --font-mono: "JetBrains Mono Variable", ui-monospace, monospace;

  --font-weight-light: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 600;

  --color-gray-50: oklch(98% 0.004 255);
  --color-gray-100: oklch(96% 0.006 255);
  --color-gray-200: oklch(92% 0.008 255);
  --color-gray-400: oklch(70% 0.015 255);
  --color-gray-600: oklch(51% 0.02 255);
  --color-gray-950: oklch(17% 0.01 255);
  --color-primary-600: oklch(54% 0.21 265);

  --color-background: var(--color-gray-50);
  --color-foreground: var(--color-gray-950);
  --color-surface: white;
  --color-surface-elevated: white;
  --color-muted: var(--color-gray-100);
  --color-muted-foreground: var(--color-gray-600);
  --color-border: var(--color-gray-200);
  --color-primary: var(--color-primary-600);
  --color-primary-foreground: white;

  --color-code-bg: var(--color-gray-100);
  --kbd-background-color: var(--color-gray-100);
  --kbd-border-color: var(--color-gray-200);

  --viewport-padding: 1rem;
  --content-width: 72rem;
  --content-width-reading: 68ch;
  --header-height: 5rem;

  --radius-sm: 0.375rem;
  --radius-md: 0.75rem;
  --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.06);

  --duration-fast: 150ms;
  --duration-base: 250ms;
  --duration-slow: 350ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --ease-emphasized: cubic-bezier(0.41, 0.1, 0.13, 1);
}

:root {
  color-scheme: light;
  --selection-background-color: color-mix(in oklab, var(--color-primary) 24%, white);
  --selection-text-color: var(--color-foreground);
}

[data-theme="dark"] {
  color-scheme: dark;
  --color-background: oklch(19% 0.01 255);
  --color-foreground: oklch(94% 0.01 255);
  --color-surface: oklch(23% 0.01 255);
  --color-surface-elevated: oklch(27% 0.01 255);
  --color-muted: oklch(26% 0.01 255);
  --color-muted-foreground: oklch(75% 0.015 255);
  --color-border: oklch(32% 0.01 255);
  --selection-background-color: color-mix(in oklab, var(--color-primary) 30%, black);
}

@layer base {
  html {
    background: var(--color-background);
    color: var(--color-foreground);
    font-family: var(--font-sans);
    text-rendering: optimizeLegibility;
  }

  body {
    min-height: 100vh;
    background: var(--color-background);
    color: var(--color-foreground);
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
  }

  ::selection {
    background: var(--selection-background-color);
    color: var(--selection-text-color);
  }

  a {
    color: var(--color-primary);
    text-underline-offset: 0.18em;
    text-decoration-thickness: 0.08em;
  }

  :focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 3px;
  }

  h1,
  h2,
  h3,
  h4 {
    line-height: 1.08;
    letter-spacing: -0.02em;
  }

  p,
  li {
    max-width: var(--content-width-reading);
  }

  code,
  pre,
  kbd {
    font-family: var(--font-mono);
  }
}
```

## Implementation Guidance

Build in this order:

1. Foundation palette and typography tokens
2. Semantic aliases
3. Base CSS defaults
4. Dark theme remapping
5. Context tokens for code, `kbd`, selection, and prose
6. Component work

## Final Recommendation

The best starting point is a semantic token system in `global.css` backed by Tailwind v4 `@theme`, not a Tailwind-only utility strategy.

That is the closest path to matching the polish level of a site like Josh Comeau's while keeping the system maintainable in a fresh codebase.
