import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import { serveV1DirectoryIndex } from './plugins/serve-v1-directory-index';

export default defineConfig({
  adapter: cloudflare(),
  vite: {
    plugins: [serveV1DirectoryIndex()]
  }
});
