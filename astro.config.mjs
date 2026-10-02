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
  // Astro 7 passe par défaut à 'jsx', qui supprime les espaces entre éléments inline (« et <a>…</a> » → « et… »)
  compressHTML: true,
  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});
