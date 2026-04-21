# Josh Comeau CSS Learning Notes

## Goal

This document explains what the published CSS on [joshwcomeau.com](https://www.joshwcomeau.com/) is doing, using excerpts from the shipped stylesheets.

Inspected files:

- `/_next/static/css/8bac76b9e3393e61.css`
- `/_next/static/css/030921fd1fdf69eb.css`
- `/_next/static/css/b76ecf9bb3192d18.css`

The purpose of this document is not to recreate his site exactly. It is to understand the architecture, token strategy, and base-style decisions clearly.

## Big Picture

The site uses a serious semantic CSS variable system, not just one set of global colors.

The CSS shows these patterns repeatedly:

- semantic color tokens are defined globally
- light and dark themes remap the same token names
- typography, spacing, motion, and editorial surfaces are tokenized too
- the base layer does a lot of quality work
- specialized tokens exist for code, syntax, keyboard hints, selection, clouds, sky, and status colors

That means the site behaves much more like a design system than a simple stylesheet.

---

## 1. Semantic Theme Tokens Live At The Root

One of the strongest signals is the inline token map placed directly on `html`.

### Example

```css
--color-text:hsl(222deg 22% 5%);
--color-background:hsl(0deg 0% 100%);
--color-blurred-background:hsl(0deg 0% 95% / 0.75);
--color-muted-background:hsl(200deg 45% 76% / 0.85);
--color-action:hsl(240deg 95% 62%);
--color-primary:hsl(240deg 95% 62%);
--color-secondary:hsl(333deg 100% 45%);
--color-tertiary:hsl(255deg 85% 30%);
--color-decorative:hsl(200deg 75% 65%);
```

### What this means

- the site is not styling everything with raw palette references directly
- token names express intended role
- components can rely on `--color-primary` or `--color-background` and remain theme-safe

### Learning

This is the core design-system move. The token names are meaningful enough to be reused everywhere.

---

## 2. There Is A Raw Palette Layer Behind The Semantics

The site also defines step-based scales and supporting palettes.

### Example

```css
--color-gray-50:hsl(225deg 40% 96%);
--color-gray-100:hsl(225deg 25% 92%);
--color-gray-200:hsl(225deg 16% 86%);
--color-gray-300:hsl(225deg 8% 80%);
--color-gray-400:hsl(225deg 8% 70%);
--color-gray-500:hsl(225deg 7% 60%);
--color-gray-600:hsl(225deg 15% 50%);
--color-gray-700:hsl(225deg 12% 40%);
--color-gray-800:hsl(225deg 20% 30%);
--color-gray-900:hsl(225deg 25% 20%);
--color-gray-1000:hsl(225deg 15% 15%);
```

### What this means

- there is a foundation palette available
- semantic tokens can be derived from those values
- component code does not need to know the exact palette step every time

### Learning

This is a hybrid model: palette tokens plus semantic aliases.

---

## 3. Light And Dark Theme Use Token Remapping

The dark theme does not introduce a new naming system. It redefines the existing semantics.

### Example

```css
const colorMap = {
  "--color-text":"hsl(210deg 10% 90%)",
  "--color-background":"hsl(210deg 15% 6%)",
  "--color-primary":"hsl(225deg 100% 75%)",
  "--color-secondary":"hsl(333deg 100% 55%)",
  "--color-gray-100":"hsl(210deg 15% 12%)",
  "--color-gray-1000":"hsl(210deg 25% 96%)",
  "--syntax-bg":"hsl(210deg 15% 6%)",
  "--kbd-background-color":"hsl(210deg 9% 40%)"
};
```

And the shipped CSS repeats the same pattern in class-based token scopes:

```css
.d16kq653{
  --color-text:#e3e6e8;
  --color-background:#0d0f12;
  --color-primary:#809fff;
  --color-gray-200:#272e35;
  --color-gray-1000:#f2f5f7;
  --syntax-bg:#0d0f12;
  --kbd-background-color:#5d666f;
  color:var(--color-text);
  background:var(--color-background);
  color-scheme:dark;
}
```

### What this means

- components remain stable because token names stay stable
- dark mode is an implementation detail of token assignment
- the design system was designed for theme parity, not theme patching

### Learning

This is one of the strongest reasons to prefer semantic tokens over raw utility colors.

---

## 4. The Base Layer Is Doing A Lot Of Work

The site has a substantial base layer before any page-specific styling shows up.

### Example

```css
*,:after,:before{box-sizing:border-box}
*{margin:0;line-height:inherit}

@media (prefers-reduced-motion:no-preference){
  html{interpolate-size:allow-keywords}
}

body{
  -webkit-font-smoothing:antialiased;
  line-height:1.5;
  line-height:calc(.95 + .62rem)
}

canvas,img,picture,svg,video{display:block;max-width:100%}
button,input,select,textarea{font:inherit}
h2,h3,h4,h5,h6,p{text-wrap:pretty}
h1,h2,h3,h4,h5,h6,p{overflow-wrap:break-word}
h1{text-wrap:balance}
```

### What this means

- the site has a reset and readability layer
- media behavior is normalized
- forms inherit typography correctly
- text wrapping defaults are deliberate

### Learning

The polish is not only in components. It starts with the base CSS.

---

## 5. Typography Tokens Are Treated As System Values

Typography is tokenized through variables on `body`.

### Example

```css
body{
  --font-weight-bold:600;
  --font-weight-medium:500;
  --font-weight-light:400;
  --font-family:"Wotfard","Wotfard-fallback",sans-serif;
  --font-family-mono:"Cartograph CF",monospace;
  --font-family-spicy:"Sriracha","Wotfard-fallback",sans-serif;
  --viewport-padding:32px;
  --springy-spring-easing:linear(0,0.1407 4.43%,0.9383 16.72%,1.0774 20.43%,1.1493 24.31%,1.1629 26.95%,1.1536 29.93%,1.0168 43.09%,0.9766 51%,1.0033 76.88%,1);
  --springy-spring-duration:833ms;
  font-family:var(--font-family)
}
```

### What this means

- font families are system primitives
- font weights are normalized into named steps
- layout spacing and motion values sit in the same token universe

### Learning

This is broader than a color system. It is a tokenized presentation system.

---

## 6. There Are Dedicated Editorial And Code Tokens

The site has explicit token support for code and syntax highlighting.

### Example

```css
--syntax-bg:hsl(213deg 80% 95%);
--syntax-highlight:hsl(225deg 25% 93%);
--syntax-txt:hsl(0deg 0% 16%);
--syntax-comment:hsl(225deg 15% 42%);
--syntax-prop:hsl(327deg 100% 43%);
--syntax-bool:hsl(302deg 100% 37%);
--syntax-val:hsl(200deg 15% 40%);
--syntax-str:hsl(259deg 100% 56%);
--syntax-name:hsl(280deg 100% 50%);
--syntax-del:hsl(0deg 100% 67%);
--syntax-regex:hsl(255deg 100% 42%);
--syntax-fn:hsl(231deg 99% 62%);
--color-code-bg:hsl(213deg 80% 95%);
```

Inline code also gets deliberate styling:

```css
.e1la1cd6 code{
  display:inline;
  font-family:var(--font-family-mono);
  font-size:.9375em;
  font-style:normal;
  letter-spacing:-.5px;
  padding:2px 6px;
  margin:1px -1px;
  background:var(--color-code-bg);
  border-radius:3px;
  box-decoration-break:clone
}
```

### What this means

- editorial code is not an afterthought
- syntax colors have a full vocabulary
- inline code and block code surfaces are treated as first-class UI

### Learning

If your site includes writing or tutorials, code tokens belong in the foundation.

---

## 7. `kbd` Has Its Own Token Pair

This is a small but very telling detail.

### Example

```css
--kbd-background-color:hsl(225deg 25% 92%);
--kbd-border-color:hsl(225deg 8% 80%);

kbd{
  display:inline-block;
  font-family:var(--font-family-mono);
  font-size:.9375em;
  padding:0 10px;
  margin:1px -1px;
  border-bottom:3px solid var(--kbd-border-color);
  border-radius:3px 3px 5px 5px;
  background-color:var(--kbd-background-color);
  transition:var(--color-mode-transition);
  cursor:default
}
```

### What this means

- keyboard hints are considered a real design-system surface
- the site has enough interface literacy to style even low-frequency semantic elements properly

### Learning

Production-grade systems usually cover these “small” elements because they compound into polish.

---

## 8. Selection Styling Is Tokenized

The site styles text selection differently for light and dark modes.

### Example

```css
html[data-color-mode=light]{
  --selection-background-color:#ffec8f;
  --selection-text-color:#000;
}

html[data-color-mode=dark]{
  --selection-background-color:rgba(139,133,173,.35);
  --selection-text-color:inherit;
}

::selection{
  background-color:var(--selection-background-color);
  color:var(--selection-text-color)
}
```

### What this means

- text selection is part of the product feel
- the tokens are theme-aware

### Learning

This is exactly the kind of subtle detail that separates a default stylesheet from a thoughtful one.

---

## 9. Scrollbars Are Also Treated As Theme Surfaces

Another signal of system maturity.

### Example

```css
html[data-color-mode=light]{
  --scrollbar-bg:var(--color-background);
  --scrollbar-thumb:var(--color-cloud-700);
  --scrollbar-thumb-hover:var(--color-gray-500)
}

@media (min-device-width:600px){
  *{scrollbar-color:var(--scrollbar-thumb) var(--scrollbar-bg)}
  ::-webkit-scrollbar{width:9px;height:9px;background-color:var(--scrollbar-bg)}
  ::-webkit-scrollbar-thumb{
    border-radius:10px;
    background-color:var(--scrollbar-thumb);
    border:2px solid var(--scrollbar-bg)
  }
}
```

### What this means

- browser chrome is being integrated into the visual system
- the theme is intended to feel complete, not partial

### Learning

You do not always need custom scrollbars, but their presence here confirms the level of refinement.

---

## 10. Focus Styles Are Consistent And Token-Aware

Interactive elements repeatedly use `--color-primary` for focus treatment.

### Example

```css
a,button{outline-color:var(--color-primary)}

.s1j91s21:focus-visible{
  outline:2px auto var(--color-primary);
  outline-offset:2px
}

.a1tdgj4y:focus-visible{
  outline:2px auto var(--color-primary);
  outline-offset:4px
}
```

### What this means

- focus styling is not inconsistent or left to browser defaults
- the interaction language is tied to brand/action color

### Learning

The design system includes accessibility behavior, not just visual decoration.

---

## 11. Motion Is Tokenized And Named

The site uses both motion tokens and reusable keyframes.

### Example

```css
--color-swap-duration:350ms;
--color-swap-timing-function:cubic-bezier(0.41, 0.1, 0.13, 1);
--springy-spring-duration:833ms;
```

```css
@keyframes fadeIn{0%{opacity:0}to{opacity:1}}
@keyframes fadeOut{0%{opacity:1}to{opacity:0}}
@keyframes slideFromHorizontal{0%{transform:translateX(var(--slide-val,-100%))}}
@keyframes slideFromVertical{0%{transform:translateY(var(--slide-val,-100%))}}
@keyframes spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}
```

### What this means

- motion has shared timing language
- animation primitives are reusable
- theme switching itself uses motion tokens

### Learning

If motion is part of the brand feel, it should be tokenized too.

---

## 12. Layout Uses Global Spatial Tokens

The site centralizes things like viewport padding and content container behavior.

### Example

```css
body{
  --viewport-padding:32px;
}

@media (max-width:35.1875rem){
  body{--viewport-padding:16px}
}

.watium4{
  width:100%;
  max-width:var(--max-width);
  margin-inline:auto;
  padding-inline:var(--viewport-padding)
}
```

### What this means

- layout rhythm is centralized
- containers stay aligned across the site
- responsive gutters use one shared value

### Learning

A serious token system includes layout dimensions, not only aesthetic variables.

---

## 13. The Site Uses Specialized Domain Tokens

Some tokens are not generic app tokens. They are purpose-built for this site's visual language.

### Example

```css
--color-cloud-100:hsl(203deg 60% 95%);
--color-cloud-300:hsl(202deg 68% 92%);
--color-cloud-400:hsl(201deg 60% 86%);
--color-cloud-500:hsl(200deg 80% 83%);
--color-cloud-700:hsl(210deg 30% 55%);
--color-sky-from:hsl(200deg 70% 78%);
--color-sky-to:hsl(200deg 70% 70%);
--color-sky-subtle:hsl(200deg 90% 88%);
```

### What this means

- the token system includes brand/environment-specific vocabulary
- he did not force everything into generic names only

### Learning

This is a useful lesson: semantic systems can still have bespoke visual tokens when the product needs them.

---

## 14. Components Consume Semantic Tokens Directly

The utility of the token system is clear in actual component rules.

### Examples

```css
.wohac9x{
  color:inherit;
  text-decoration:none
}

.a11yvlpg path{
  stroke:var(--color-primary);
}

.sirpwu7{
  color:var(--color-gray-700);
  font-weight:var(--font-weight-medium);
}

.wuiocxb[data-is-stuck=true]{opacity:1}
html[data-color-mode=dark] .wuiocxb{background:rgba(13,15,18,.65)}
html[data-color-mode=light] .wuiocxb{background:hsla(0,0%,100%,.9)}
```

### What this means

- the component CSS stays expressive
- tokens encode intent and reduce arbitrary styling decisions
- theme variants are easy to apply where necessary

### Learning

The system is useful because components are truly consuming it, not bypassing it.

---

## 15. Some Theme Scopes Exist Beyond The Root

The CSS includes scoped theme wrappers like `.l17lpp8k` and `.d16kq653` that redefine many variables.

### Example

```css
.l17lpp8k{
  --color-text:#0a0c10;
  --color-background:#fff;
  --color-primary:#4242fa;
  --color-code-bg:#e8f1fc;
  color:var(--color-text);
  background:var(--color-background);
  color-scheme:light;
}
```

### What this means

- not all theming is global-only
- some components or sections can establish their own themed token scope
- CSS variables make local theming cheap and powerful

### Learning

This is a good advanced pattern once the root token system is solid.

---

## Practical Lessons To Take Away

If you want to learn from this CSS architecture, these are the clearest takeaways:

1. Use semantic variables as the main public API of the design system.
2. Keep raw palette scales available behind that API.
3. Tokenize typography, layout, and motion, not just color.
4. Treat code, `kbd`, selection, and focus as first-class surfaces.
5. Implement dark mode through token remapping.
6. Use specialized tokens where the brand language needs them.
7. Make the base layer carry a meaningful share of the quality.

## Final Summary

Josh Comeau's site CSS is not impressive because it has lots of variables. It is impressive because the variables are organized around meaning, themeability, and editorial polish.

The strongest architectural lesson is this:

Build a semantic token system first, then let components consume it consistently.
