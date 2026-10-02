// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://maximederycke.dev',
  // Astro 7 passe par défaut à 'jsx', qui supprime les espaces entre éléments inline (« et <a>…</a> » → « et… »)
  compressHTML: true,
  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});
