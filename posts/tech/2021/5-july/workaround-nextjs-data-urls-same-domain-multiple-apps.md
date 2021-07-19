---
title: Workaround for _next/data URLs throwing 404, for multiple Next.js Apps Running On Same Domain
description: When you have to use multiple Next.js on the same domain without having basepath for each app, it gets tricky to make **_next/data**
tags: ["Nextjs", "tech", "code", "JavaScript"]
layout: layouts/post/post.njk
twitterHashtags: nextjs,tech,code,JavaScript
twitterRelated: vercel:parent company of Next.js framework,
date: 2021-07-18
lastModified: 2021-07-18
newsletter: "tech"
typeOfPost: "essay"
coverImage: https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg
coverImageAlt: "Next.js logo"
coverImageCaption: "Next.js logo"
---

If you have to use multiple Next.js apps on a simple domain, the only straightforward way for you to do that is to have [`baseUrl`](https://nextjs.org/docs/api-reference/next.config.js/basepath) option set in `next.config.js`. But the problem with that is, you'll have different URLs for different apps on your domain: 

```md
example.com/app-1/some-route
example.com/app-2/some-other-route
```

If you want to do have them as so:

```md
example.com/some-route ( from app-1 )
example.com/some-other-route ( from app-2 )
```

you're a little out of luck. My first hunch was that it'd be possible to use the `baseUrl` but change the anchor links from 

```md
/app-1/some-route-on-some-page
/app-2/some-route-on-some-page
```

to 

```md
some-route-on-some-page
some-route-on-some-page
```

by using the [`as`](https://nextjs.org/docs/api-reference/next/link) property of `next/link` by masking the URLs that users will see, while still being able to request the correct base-path-added url from next server. As much as I could google, it's not possible. If you've made it work, please tell me on the [twitter](https://twitter.com/gdadsriver), I'd be very grateful 🌻.

I ended up making it work at my job by doing a bunch of things.

Using [asset prefix](https://nextjs.org/docs/api-reference/next.config.js/cdn-support-with-asset-prefix) to make a distinguishing factor between assets of different next.js apps, along with a [next.js re write rule](https://nextjs.org/docs/api-reference/next.config.js/rewrites).

```js
// next.config.js
module.exports = {
  assetPrefix: BASE_PREFIX_FOR_APP,
  async rewrites(){
    return [
      {
        source: `${BASE_PREFIX_FOR_APP}/_next/:path*`,
        destination: '_next/:path*'
      }
    ]
  }
}
```

With this, the client will request assets from `${BASE_PREFIX_FOR_APP}/_next/:path*`, but it'll reach your app at a path that it serves assets from `/_next/:path*` ( `/_next/static/*` to be more precise ).


In a similar fashion, you'd handle images and api request paths

```js/10-17
// next.config.js
module.exports = {
  assetPrefix: BASE_PREFIX_FOR_APP,
  async rewrites(){
    return [
      {
        /** ASSET PREFIX */
        source: `${BASE_PREFIX_FOR_APP}/_next/:path*`,
        destination: '/_next/:path*'
      },
      {
        /** IMAGE PREFIX */
        source: `${BASE_PREFIX_FOR_APP}/images/:query*`,
        destination: '/_next/image/:query*'
      },
      /** API PREFIX */
      {
        source: `${BASE_PREFIX_FOR_APP}/api/:path*`,
        destination: '/api/:path*'
      }
    ]
  }
}
```

For images you'll have to wrap `next/image` component in your own component, to request your images with the prefix `BASE_PREFIX_FOR_APP`, using a [custom Next.js image loader](https://nextjs.org/docs/api-reference/next/image#loader)

```ts
// CustomImage.tsx
import Image from 'next/image'

const CustomImage: typeof Image = props => {
  const finalProps = {
    props,
    loader({ src, width, quality } {
      const urlQuery = `?url=/images${src}`
      return `/${BASE_PREFIX_FOR_APP}/images${urlQuery}&w=${width}&q=${quality ?? 75}`
    })
  }
}

export default CustomImage;
```

All was well and good, and the apps were running fine with the requirements that we had: not having to change our links with app specific base path prefix. But there was still a problem.

When you use a `next/link` to navigate to another route, and that upcoming route has a `getServerSideProps` method implemented, Next.js will send an API request to the server, which will run `getServerSideProps` and return a JSON containing the result. You can read about this in [Next.js docs here](https://nextjs.org/docs/basic-features/data-fetching#only-runs-on-server-side). That resulted JSON fetch request data is used to render the upcoming route. Those data fetch requests have a path that looks like this: `_next/data/<build-id>/<route-slug>.json`.

The problem with that for our context — to be able to run multiple Next.js apps on same domain without base url prefix — is that Next.js doesn't give us a way to control this path. Which is to say there's no **_data fetch request path URL prefix_** which Next.js gives as a configuration option. Because of that we have a hard time finding a distinguishing factor for data URLs for multiple apps.

The fix we ended up using is as follows:

Remember that the data fetch url looks like `_next/data/<build-id>/<route_slug>.json`. If we could have a way generate unique `<build-id>` for all our apps, we could use that and write a re write rule at load balancer level to distinguish the request between multiple Next.js apps. By default the `<build-id>` is a random id generated by Next.js build process for each build. [Thankfully they give us a way to control the build id](https://nextjs.org/docs/api-reference/next.config.js/configuring-the-build-id).

We ended up using a package called [`next-build-id`](https://github.com/nexdrew/next-build-id#readme) to configure a custom build id where we gave a `app-1-<git-commitSHA>` signature and added a re write rule in our load balancer for incoming request host name having `app-1` for first app, `app-2` for second app and so on and so forth, to solve this.

Hope this was helpful.