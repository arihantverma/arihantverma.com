---
title: Patch to make @octokit/types work with vite/astro
description: Just a small patch.
tags: ["patch", "astro", "vite", "npm", "node"]
layout: layouts/post/post.njk
twitterHashtags: patch,astro,vite,npm,node
date: 2024-05-28
lastModified: 2024-05-28
newsletter: "tech"
typeOfPost: "essay"
coverImage: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
coverImageAlt: "Github Mascot Octocat"
coverImageCaption: "Photograph by Roman Synkevych on Unsplash"
---

{% note %}
  If you are using node, use [patch-package](https://github.com/ds300/patch-package). If you are using pnpm use the in-built [patch](https://pnpm.io/cli/patch) command.

{% endnote %}

Trying to use `@octokit/types` with vite/astro? You might run into [this kind of error](https://github.com/vitejs/vite/blob/main/packages/vite/src/node/plugins/resolve.ts#L1078-L1079)

This is because of how vite.js resolves packages. `@octokit/types` doesn't export any javascript file, so vite says

> I don't recognise you, can't let you in.

You need to add a dummy `main` file in the package's package.json to make it happy. This is how patched package.json of `@octokit/types` should look like

```
diff --git a/index.js b/index.js
new file mode 100644
index 0000000000000000000000000000000000000000..e69de29bb2d1d6434b8b29ae775ad8c2e48c5391
diff --git a/package.json b/package.json
index 7ee12d257f4213c3583c11acbfde95895f80d261..2693b41cab2f0865f76de2bff5e600a114ccf6e4 100644
--- a/package.json
+++ b/package.json
@@ -43,5 +43,13 @@
     "dist-types/**"
   ],
   "types": "dist-types/index.d.ts",
+  "exports": {
+    ".": {
+      "import": "./index.js",
+      "require": "./index.js",
+      "types": "./dist-types/index.d.ts"
+    }
+  },
+  "main": "./index.js",
   "sideEffects": false
 }
```

If this helped you down, consider giving me a shout out on twitter :)