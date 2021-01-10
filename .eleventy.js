const { DateTime } = require("luxon");
const fs = require("fs");
const util = require('util');
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const CleanCSS = require("clean-css");
const footnotes = require('eleventy-plugin-footnotes')

const {timeZone, readableDateFormatForLuxon} = require('./utils/constants');
const getReadableDate = require("./utils/get-readable-date");


/* Markdown Overrides */
let markdownLibrary = markdownIt({
  html: true,
  breaks: true,
  linkify: true,
}).use(markdownItAnchor, {
  permalink: true,
  permalinkClass: "direct-link",
  permalinkSymbol: "#",
});


module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight, {
    init: function({ Prism }) {
      // Prism.languages.myCustomLanguage = /* */;
    }
  });
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(footnotes)

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addLayoutAlias("post", "layouts/post/post.njk");

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return getReadableDate(dateObj)
  });

  eleventyConfig.addFilter('dump', (obj) => {
    return util.inspect(obj)
  });

  eleventyConfig.addFilter('dumpKeys', obj => util.inspect(Object.keys(obj)))

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: timeZone }).toFormat("yyyy-LL-dd");
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addFilter("min", (...numbers) => {
    return Math.min.apply(null, numbers);
  });

  /** SHORT CODES */

  // georgia-font font1point1rem classes if we want georgia with 1.1rem
  eleventyConfig.addShortcode("inlineDoubleQuotes", (text) => {
    return `<span class="double-open-close-quote">${text}</span>`
  })

  eleventyConfig.addShortcode("twitterShareLink", (
    text = '',
    url = '',
    related = '',
    hashtags = '',
    additionalTwitterHandles = []
  ) => {
    const defaultHashtags = "marketingtwitter"

    let additionalTwitterHandlesText = ''

    additionalTwitterHandles.forEach((handle, index) => {
      const isLast = index === additionalTwitterHandles.length - 1;
      additionalTwitterHandlesText += `@${handle}${isLast ? ' ': ''}`;
    })

    const twitterText = `${text} ${additionalTwitterHandlesText}`;

    const link = `https://twitter.com/intent/tweet?text=${twitterText}&url=${url}&via=gdadsriver&related=${related}&hashtags=${defaultHashtags}${hashtags ? ',' : ''}${hashtags}`;

    return `<div class="post__twitter-share-text">
      <h2 class="post__share--heading">Share</h2>
      <span>If you liked this article please</span>
      <a href="${link}">share it on twitter</a>
    </div>`
  })

  eleventyConfig.addPairedShortcode("note", (content, fontSize) => {
    const markdownToHtml = markdownLibrary.render(content);
    return `<div class="post__note"><h3>Note</h3><div>${markdownToHtml}</div></div>`
  })

  eleventyConfig.addShortcode("blur", (text, spread = "10px", blurColor = "rgba(0, 0, 0, 0.75") => {
    return `<span style="color: transparent; text-shadow: 0 0 ${spread} ${blurColor}">${text}</span>`
  })

  eleventyConfig.addShortcode("newsletter", (whichOne) => {
    if (whichOne === "lit") {
      return `<iframe src="https://arihant.substack.com/embed" width="480" height="320" style="border:1px solid #EEE; background:white; width: 100%;" frameborder="0" scrolling="no"></iframe>`
    }

    if (whichOne === "tech") {
      return `<iframe src="https://bangingonthekeyboard.substack.com/embed" width="480" height="320" style="border:1px solid #EEE; width: 100%; background:white;" frameborder="0" scrolling="no"></iframe>`
    }
  })

  eleventyConfig.addPairedShortcode("doubleQuotesPaired", (content) => {
    return `<span class="double-open-close-quote">${content}</span>`
  })

  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, bs) {

        bs.addMiddleware("*", (req, res) => {
          const content_404 = fs.readFileSync('_site/404.html');
          // Add 404 http status code in request header.
          res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    }
  });

  // inline css https://www.11ty.dev/docs/quicktips/inline-css/
  // eleventyConfig.addFilter("cssmin", function(code) {
  //   return new CleanCSS({}).minify(code).styles;
  // });

  eleventyConfig.addCollection("tagList", function (collection) {
    let tagSet = new Set();
    collection.getAll().forEach(function (item) {
      if ("tags" in item.data) {
        let tags = item.data.tags;

        tags = tags.filter(function (item) {
          switch (item) {
            // this list should match the `filter` list in tags.njk
            case "all":
            case "nav":
            case "post":
            case "posts":
              return false;
          }

          return true;
        });

        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });

    // returning an array in addCollection works in Eleventy 0.5.3
    return [...tagSet];
  });

  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("fonts");

  eleventyConfig.setLibrary("md", markdownLibrary);

  // Browsersync Overrides
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = fs.readFileSync("_site/404.html");

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false,
  });

  return {
    templateFormats: ["md", "njk", "html", "liquid"],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about those.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`
    // pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",

    // These are all optional, defaults are shown:
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
