import fs from 'node:fs';
import path from 'node:path';
import type { Plugin, ViteDevServer, Connect } from 'vite';

/**
 * Vite plugin to serve index.html for directory requests in public/v1.
 * This enables the archived Eleventy site to work during Astro dev mode.
 */
export function serveV1DirectoryIndex(): Plugin {
  return {
    name: 'serve-v1-directory-index',
    configureServer(server: ViteDevServer) {
      server.middlewares.use((req: Connect.IncomingMessage, _res: unknown, next: Connect.NextFunction) => {
        const url = req.url;
        if (url?.startsWith('/v1')) {
          const urlPath = url.split('?')[0];
          if (urlPath) {
            const filePath = path.join(process.cwd(), 'public', urlPath);

            // If it's a directory, try to serve index.html
            if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
              const indexPath = path.join(filePath, 'index.html');
              if (fs.existsSync(indexPath)) {
                req.url = urlPath.endsWith('/') ? `${urlPath}index.html` : `${urlPath}/index.html`;
              }
            }
          }
        }
        next();
      });
    }
  };
}
