// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Astro Blog';
export const SITE_DESCRIPTION = 'Welcome to my website!';

export const headerNavEls = [
  {
    text: 'Who am I?',
    url: '/who-am-i'
  },
  {
    text: 'Who are you?',
    url: '/who-are-you'
  },
  {
    text: 'blog',
    url: '/blog'
  },
] satisfies Array<{ text: string, url: string }>

type BasicSeo = {
  title: string;
  description: string;
}
// title and descriptions for pages
export const homePageBasicSeoData: BasicSeo = {
  title: "Arihant Verma",
  description: "Detailed tutorials for developers, focus on web tech. Detailed essays about books, literature, politics and personal experiences.",
}