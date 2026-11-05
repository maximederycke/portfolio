// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';
import { readFile, readdir } from 'node:fs/promises';

// Valeurs encore à remplir sur les pages légales : la build échoue tant qu'il en reste une
const PLACEHOLDERS = ['[ADRESSE]', '[TÉLÉPHONE]', '[À VÉRIFIER]'];

/** @returns {import('astro').AstroIntegration} */
const checkPlaceholders = () => ({
  name: 'check-placeholders',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const files = (await readdir(dir, { recursive: true })).filter(f => f.endsWith('.html'));
      const found = [];
      for (const file of files) {
        const html = await readFile(new URL(file, dir), 'utf8');
        const missing = PLACEHOLDERS.filter(p => html.includes(p));
        if (missing.length) found.push(`${file} : ${missing.join(', ')}`);
      }
      if (found.length) throw new Error(`Valeurs à remplir avant publication :\n${found.join('\n')}`);
    },
  },
});

// https://astro.build/config
export default defineConfig({
  site: 'https://maximederycke.dev',
  // Object Storage sert about/index.html et redirige /about → /about/ : on lie directement la version avec slash
  trailingSlash: 'always',
  // 4 pages de quelques Ko : tout précharger au chargement, pour que la transition parte dès le clic (y compris sur mobile, sans survol)
  prefetch: { prefetchAll: true, defaultStrategy: 'load' },
  // Astro 7 passe par défaut à 'jsx', qui supprime les espaces entre éléments inline (« et <a>…</a> » → « et… »)
  compressHTML: true,
  integrations: [react(), sitemap(), checkPlaceholders()],

  vite: {
    plugins: [tailwindcss()]
  }
});
