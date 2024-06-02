// @ts-check
import { DateTime } from "luxon";
import fs from "fs";
import util from "util";
import pluginRss from "@11ty/eleventy-plugin-rss";
import pluginNavigation from "@11ty/eleventy-navigation";
import markdownIt from "markdown-it";
import anchor from "markdown-it-anchor";
import CleanCSS from "clean-css";
import footnotes from "eleventy-plugin-footnotes";
import Image from "@11ty/eleventy-img";
import fetch from 'isomorphic-unfetch';
import { optimize } from 'svgo';
import pluginWebc from '@11ty/eleventy-plugin-webc'
import { EleventyRenderPlugin } from '@11ty/eleventy'
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
// import Shiki from '@shikijs/markdown-it'

// NOT SUPPORTED FOR NUNJUCKS, to support nunjucks, have to load the language locally
// https://github.com/shikijs/textmate-grammars-themes/tree/main/packages/tm-grammars/grammars
// https://github.com/shikijs/shiki/pull/494
// https://shiki.style/languages
// const shiki = await Shiki({
//   themes: {
//     light: 'github-light',
//     dark: 'github-dark',
//   },
// })

import {
  timeZone,
  readableDateFormatForLuxon,
} from "./js/utils/constants.js";

import getReadableDate from "./js/utils/get-readable-date.js";
import makeTwitterLink from "./js/utils/make-twitter-link.js";

/* Markdown Overrides */
let markdownLibrary = markdownIt({
  html: true,
  breaks: true,
  linkify: true,
}).use(anchor, {
  permalink: anchor.permalink.linkInsideHeader({
    class: "direct-link",
    symbol: "🔗",
  }),
})
// .use(shiki)

export default function config (eleventyConfig) {
  // v0 -> v1 in case its needed
  // eleventyConfig.setLiquidOptions({ strictFilters: false })

  eleventyConfig.addGlobalData("eleventyComputed.permalink", function () {
		return (data) => {
			if (data.draft) {
				return false;
			}

			return data.permalink;
		};
	});

  // When `eleventyExcludeFromCollections` is true, the file is not included in any collections
	eleventyConfig.addGlobalData(
		"eleventyComputed.eleventyExcludeFromCollections",
		function () {
			return (data) => {
				if (data.draft) {
					return true;
				}

				return data.eleventyExcludeFromCollections;
			};
		}
	);

	// eleventyConfig.on("eleventy.before", ({ runMode }) => {
	// 	// Set the environment variable
	// 	if (runMode === "serve" || runMode === "watch") {
	// 		process.env.BUILD_DRAFTS = true;
	// 	}
	// });

  eleventyConfig.addPlugin(pluginSyntaxHighlight, {
    alwaysWrapLineHighlights: true,
    init: function ({ Prism }) {
      // Prism.languages.myCustomLanguage = /* */;
    },
  });

  eleventyConfig.addPlugin(EleventyRenderPlugin);
  
  eleventyConfig.addPlugin(pluginWebc, {
    components: '_includes/components/**/*.webc'
  });
  
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(footnotes);
  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addLayoutAlias("post", "layouts/post/post.njk");
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return getReadableDate(dateObj);
  });
  eleventyConfig.addFilter("dump", (obj) => {
    return util.inspect(obj);
  });

  eleventyConfig.addFilter("dumpKeys", (obj) => util.inspect(Object.keys(obj)));

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: timeZone }).toFormat(
      "yyyy-LL-dd"
    );
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
    return `<span class="double-open-close-quote">${text}</span>`;
  });

  eleventyConfig.addShortcode(
    "twitterShareLinkMarkup",
    (
      text = "",
      url = "",
      related = "",
      hashtags = "",
      additionalTwitterHandles = []
    ) => {
      const link = makeTwitterLink({
        text,
        url,
        related,
        hashtags,
        additionalTwitterHandles,
      });

      return `<div class="post__twitter-share-text">
      <h2 class="post__share--heading">
        <a href="${link}">Share on twitter.</a>
      </h2>
    </div>`;
    }
  );

  eleventyConfig.addShortcode(
    "twitterShareLink",
    (
      text = "",
      url = "",
      related = "",
      hashtags = "",
      additionalTwitterHandles = []
    ) => {
      return makeTwitterLink({
        text,
        url,
        related,
        hashtags,
        additionalTwitterHandles,
      });
    }
  );

  eleventyConfig.addPairedShortcode("centerAlignInPost", (content) => {
    return `<div style="display: flex;align-items: center;justify-content: center;">${content}</div>`;
  });

  eleventyConfig.addPairedShortcode("note", (content, fontSize, bold) => {
    const boldStyle = bold ? `style="font-weight:600;"` : ''
    const markdownToHtml = markdownLibrary.render(content);
    return `<div class="post__note" ${boldStyle}><div>${markdownToHtml}</div></div>`;
  });

  eleventyConfig.addPairedShortcode("longquote", (content) => {
    const markdownToHtml = markdownLibrary.render(content);

    return `<div style="background: #ffe6c4; padding: 10px 15px; border-radius: 20px; box-shadow: 0 2px 4px -1px rgba(0,0,0,0.2), 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12); margin-bottom: 20px;">${markdownToHtml}</div>
    `
  })


  eleventyConfig.addShortcode(
    "blur",
    (text, spread = "10px", blurColor = "rgba(0, 0, 0, 0.75") => {
      return `<span style="color: transparent; text-shadow: 0 0 ${spread} ${blurColor}">${text}</span>`;
    }
  );

  eleventyConfig.addShortcode("newsletter", (whichOne) => {
    if (whichOne === "lit") {
      return `<iframe src="https://arihant.substack.com/embed" width="480" height="320" style="border:1px solid #EEE; background:white; width: 100%;" frameborder="0" scrolling="no"></iframe>`;
    }

    if (whichOne === "tech") {
      return `<iframe src="https://bangingonthekeyboard.substack.com/embed" width="480" height="320" style="border:1px solid #EEE; width: 100%; background:white;" frameborder="0" scrolling="no"></iframe>`;
    }

    if (whichOne === "lit&tech") {
      return `
      <div>
        <iframe src="https://arihant.substack.com/embed" width="480" height="320" style="border:1px solid #EEE; background:white; width: 100%;" frameborder="0" scrolling="no"></iframe>

        <iframe src="https://bangingonthekeyboard.substack.com/embed" width="480" height="320" style="border:1px solid #EEE; width: 100%; background:white;" frameborder="0" scrolling="no"></iframe>
      </div>


      `.trim();
    }
  });

  eleventyConfig.addPairedShortcode("doubleQuotesPaired", (content) => {
    return `<span class="double-open-close-quote">${content}</span>`;
  });

  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, bs) {
        bs.addMiddleware("*", (req, res) => {
          const content_404 = fs.readFileSync("_site/404.html");
          // Add 404 http status code in request header.
          res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
  });

  // inline css https://www.11ty.dev/docs/quicktips/inline-css/
  eleventyConfig.addFilter("cssmin", function (code) {
    return (new CleanCSS({}).minify(code)).styles;
  });

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

  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy({ "favicon-data": "/" });

  // eleventyConfig.addPassthroughCopy({ "cert": "/"});

  // eleventyConfig.browserSyncConfig = {
  //   https: {
  //     key: "/rootCA.key",
  //     cert: "/rootCA.crt"
  //   }
  // };

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

  eleventyConfig.addShortcode("InlineEmoji", (emoji, label) => {
    return `<div style="font-size: 4rem; text-align: center;"><span role="img" aria-label="${label}">${emoji}</span></div>`
  })

  // https://alexpearce.me/2020/06/jekyll-to-eleventy/
  eleventyConfig.addShortcode("post_url", (collection, slug) => {
    try {
      if (collection.length < 1) {
        throw "Collection appears to be empty";
      }
      if (!Array.isArray(collection)) {
        throw "Collection is an invalid type - it must be an array!";
      }
      if (typeof slug !== "string") {
        throw "Slug is an invalid type - it must be a string!";
      }

      const found = collection.find(p => p.fileSlug == slug);
      if (found === 0 || found === undefined) {
        throw `${slug} not found in specified collection.`;
      } else {
        return found.url;
      }
    } catch (e) {
      console.error(
        `An error occured while searching for the url to ${slug}. Details:`,
        e
      );
    }
  });

  eleventyConfig.addAsyncShortcode("RespImage", async (src, alt, caption, width) => {
    if (!alt) {
      throw new Error(`Missing \`alt\` on Image from: ${src}`);
    }


    if (src.slice(-3) === 'svg') {
      const inlineSvgHTML = await fetch(src).then(res => res.text())
      const optimizedSvg = optimize(inlineSvgHTML, {
        plugins: ["removeDimensions"]
      })

      return optimizedSvg.data;
    }

    try {
      let stats = await Image(src, {
        widths: [350, 808, null],
        formats: ["jpeg", "webp"],
        urlPath: "/images",
        outputDir: '_site/images/',
      });

      let lowestSrc = stats["jpeg"][0];
      let highResJpeg = stats["jpeg"][1];
      let lowReswebp = stats["webp"][0];
      let highReswebp = stats["webp"][1];

      const srcset = Object.keys(stats).reduce(
        (acc, format) => ({
          ...acc,
          [format]: stats[format].reduce(
            (_acc, curr) => `${_acc} ${curr.srcset} ,`,
            ""
          ),
        }),
        {}
      );

      const source = `<source type="image/webp" media="(max-width: 629px)" srcset="${lowReswebp.url}" >
                      <source type="image/webp" media="(min-width: 630px)" srcset="${highReswebp.url}" >
                      <source type="image/jpeg" media="(max-width: 529px)" srcset="${lowestSrc.url}" >
                      <source type="image/jpeg" media="(min-width: 630px)" srcset="${highResJpeg.url}" >`;

      const img = `
        <img
          loading="lazy"
          alt="${alt}"
          width="${highResJpeg.width}"
          height="${highResJpeg.height}"
          src="${lowestSrc.url}">`;

      return `<picture>${source}${img}</picture>`;
    } catch (e){
      console.log(e)
    }

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
