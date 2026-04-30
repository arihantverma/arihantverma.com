// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://arihantverma.com",
  integrations: [mdx(), sitemap(), react()],
  fonts: [
    {
      provider: fontProviders.google(),
      // Google/Fontsource expose this family under the NZ abbreviation.
      name: "Playwrite NZ Guides",
      cssVariable: "--astro-font-playwrite-nz-guides",
      weights: [400],
      styles: ["normal"],
      // Google metadata exposes this family as `menu`, but the returned CSS
      // labels the only block as `fallback`, so we include both for Astro.
      subsets: ["menu", "fallback"],
      // TODO: change this fallback to something else.
      fallbacks: ["cursive"],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
