// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://maximederycke.dev',
  // Object Storage sert about/index.html et redirige /about → /about/ : on lie directement la version avec slash
  trailingSlash: 'always',
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});
