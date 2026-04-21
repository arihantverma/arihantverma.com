# Website Excellence Checklist

This checklist is for building a portfolio/blog website that aims to be as good as it can get across SEO, accessibility, offline support, semantics, progressive enhancement, performance, privacy, and long-term maintainability.

## Core goals

- Excellent SEO
- Excellent accessibility
- Excellent offline-capable PWA support
- Excellent semantics
- Excellent progressive enhancement
- Excellent performance
- Strong security and privacy
- Strong content architecture
- Strong reliability and maintainability

## Head and metadata

Every page should have:

- [ ] `title`
- [ ] `meta name="description"`
- [ ] `link rel="canonical"`
- [ ] `meta name="viewport"`
- [ ] favicon set
- [ ] `meta name="theme-color"`
- [ ] `link rel="manifest"` for PWA
- [ ] `link rel="alternate"` for RSS where relevant
- [ ] `meta name="robots"` when needed

Social sharing metadata should include:

- [ ] `meta property="og:title"`
- [ ] `meta property="og:description"`
- [ ] `meta property="og:type"`
- [ ] `meta property="og:url"`
- [ ] `meta property="og:image"`
- [ ] `meta property="og:image:alt"`
- [ ] `meta property="og:site_name"`
- [ ] `meta property="og:locale"`
- [ ] `meta name="twitter:card"`
- [ ] `meta name="twitter:title"`
- [ ] `meta name="twitter:description"`
- [ ] `meta name="twitter:image"`
- [ ] `meta name="twitter:image:alt"`
- [ ] `meta name="twitter:site"` if applicable
- [ ] `meta name="twitter:creator"` if applicable

Blog post metadata should include:

- [ ] `article:published_time`
- [ ] `article:modified_time`
- [ ] `article:author`
- [ ] `article:section` where relevant
- [ ] `article:tag` where relevant

## Structured data

Add JSON-LD where appropriate:

- [ ] `Person` for the site owner
- [ ] `WebSite` for the overall site
- [ ] `Blog` for the blog section
- [ ] `BlogPosting` for each post
- [ ] `BreadcrumbList` for nested pages
- [ ] `CollectionPage` or `ItemList` for blog or project listings
- [ ] `Organization` only if the site is for a company/brand rather than a personal site

## SEO

- [ ] Set the real production site URL in Astro config
- [ ] Use unique titles and descriptions per page
- [ ] Keep a single meaningful `h1` per page
- [ ] Use clean, stable URL structure
- [ ] Generate a sitemap
- [ ] Generate an RSS feed
- [ ] Create a `robots.txt`
- [ ] Avoid duplicate-content routes
- [ ] Add a custom 404 page
- [ ] Build strong internal linking between home, about, projects, and blog
- [ ] Add tags/categories if the blog grows
- [ ] Add pagination when content volume justifies it
- [ ] Use consistent social preview images
- [ ] Ensure images have meaningful alt text where needed
- [ ] Ensure image dimensions are known to reduce layout shift
- [ ] Handle canonicals correctly on paginated/tag pages
- [ ] Add multilingual support only if there is a real need

## Accessibility

- [ ] Add a skip link to main content
- [ ] Use proper landmarks: `header`, `nav`, `main`, `footer`
- [ ] Use meaningful link text
- [ ] Ensure every interactive control works with keyboard only
- [ ] Provide visible focus states
- [ ] Meet WCAG AA color contrast at minimum
- [ ] Do not convey information by color alone
- [ ] Keep heading hierarchy logical
- [ ] Label all form fields clearly
- [ ] Provide accessible validation, hints, and error messaging
- [ ] Use `aria-describedby` where helpful for forms and controls
- [ ] Give icon-only buttons/links accessible names
- [ ] Use empty alt text for decorative images
- [ ] Use meaningful alt text for informative images
- [ ] Support `prefers-reduced-motion`
- [ ] Ensure light/dark themes preserve contrast if themes are added
- [ ] Make code blocks, footnotes, and media embeds accessible
- [ ] Test with a screen reader, not only automated tools
- [ ] Run automated accessibility audits such as axe and Lighthouse

## Offline / PWA

- [ ] Add `manifest.webmanifest`
- [ ] Add a service worker
- [ ] Make the site installable
- [ ] Provide an offline fallback page
- [ ] Cache the app shell
- [ ] Cache fonts
- [ ] Cache static assets
- [ ] Cache images sensibly
- [ ] Cache previously visited content pages for offline reading
- [ ] Use an appropriate cache strategy such as stale-while-revalidate for non-critical assets
- [ ] Define a clear update strategy when a new version is deployed
- [ ] Fail gracefully when offline

Note:

- [ ] Aim for offline-capable after first visit, not "offline-only"

## Semantics

- [ ] Use `article` for blog posts and suitable content units
- [ ] Use `time` with valid `datetime` attributes for publish/update dates
- [ ] Use `figure` and `figcaption` when media needs captions
- [ ] Use `nav` labels when there are multiple navigation regions
- [ ] Use buttons for actions and links for navigation
- [ ] Use `header`, `main`, `aside`, and `footer` intentionally
- [ ] Mark up author/contact information semantically where appropriate
- [ ] Keep headings descriptive and structurally correct

## Progressive enhancement

The site should work without JavaScript for:

- [ ] Reading pages
- [ ] Navigating the site
- [ ] Reading blog posts
- [ ] Viewing projects
- [ ] Accessing contact information
- [ ] Using the default theme

Then enhance selectively with JavaScript for:

- [ ] Theme toggle
- [ ] Search
- [ ] Copy buttons on code blocks
- [ ] Table of contents highlighting
- [ ] Page transitions
- [ ] Share actions
- [ ] Reading progress or other optional enhancements

## Performance

- [ ] Keep client-side JavaScript minimal
- [ ] Hydrate only where necessary
- [ ] Optimize all images
- [ ] Use responsive images
- [ ] Self-host fonts where appropriate
- [ ] Preload only truly critical assets
- [ ] Lazy-load below-the-fold media
- [ ] Avoid layout shift
- [ ] Monitor and improve Core Web Vitals
- [ ] Test on slow mobile devices and networks, not only desktop

## Security and privacy

- [ ] Add `rel="noopener noreferrer"` to external links using `target="_blank"`
- [ ] Add appropriate security headers
- [ ] Add a Content Security Policy if feasible
- [ ] Add a `Referrer-Policy`
- [ ] Minimize or avoid third-party scripts
- [ ] Prefer privacy-friendly analytics if analytics are needed
- [ ] Avoid unnecessary cookies and tracking

## Content and product quality

- [ ] Write a clear homepage value proposition
- [ ] Build a strong About page
- [ ] Build meaningful portfolio case studies with problem/process/outcome
- [ ] Add an author bio
- [ ] Add a clear contact path
- [ ] Design a consistent tone and visual system
- [ ] Create a durable content structure for future growth
- [ ] Add draft support if publishing workflow needs it
- [ ] Add related posts or other discovery features if helpful

## Reliability and maintainability

- [ ] Use type-safe content schemas
- [ ] Validate content at build time
- [ ] Run build checks in CI
- [ ] Run Lighthouse checks in CI where practical
- [ ] Run accessibility checks in CI where practical
- [ ] Check for broken internal and external links
- [ ] Keep content and metadata generation centralized
- [ ] Document conventions for posts, projects, metadata, and images

## Immediate gaps in the current Astro starter

- [ ] Replace the placeholder `site` URL in `astro.config.mjs`
- [ ] Expand the base head component with richer metadata and structured data
- [ ] Add a PWA manifest and service worker
- [ ] Add accessibility basics such as a skip link and focus-state review
- [ ] Replace starter content and generic social links
- [ ] Add a custom 404 page
- [ ] Add `robots.txt`
- [ ] Add consistent social preview image handling

## Quality bar

- [ ] The site should be usable and readable with JavaScript disabled
- [ ] The site should remain understandable with CSS reduced or absent
- [ ] The site should be fast on real mobile networks
- [ ] The site should degrade gracefully when offline
- [ ] The site should be understandable to screen readers
- [ ] The site should be easy to extend without duplicating metadata or layout logic
