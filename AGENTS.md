# Portfolio — Maxime Derycke

Site vitrine statique (Astro) et fonction serverless pour le formulaire de contact.

## Dépôt public

Ce dépôt est public. Rien de ce qui y est écrit (code, commentaires, documentation, messages de commit, descriptions de PR) ne doit contenir d'information interne :
- aucun chemin local de machine ;
- aucun nom de client ou de prospect, aucun contenu de ticket ;
- aucune décision interne (hébergement envisagé, domiciliation…) ;
- aucune adresse IP, aucun nom de bucket, aucun identifiant, aucune clé ni aucun secret.

Seule exception : l'identifiant de ticket dans le nom de branche (ex. `feature/m-104-…`), qui relie la PR à l'outil de suivi.

Un secret passe toujours par une variable d'environnement : `.env` (site) ou `api/.env` (API), tous deux ignorés par git. Les modèles sont `.env.example` et `api/.env.example`, avec des valeurs fictives uniquement. En CI, les valeurs sont dans les secrets et variables GitHub.

## Stack

- **Astro 7**, sortie statique, TypeScript strict (`astro/tsconfigs/strict`). Config dans `astro.config.mjs` : `trailingSlash: 'always'`, préchargement de toutes les pages, sitemap.
- **Tailwind v4** via `@tailwindcss/vite`. Composants custom uniquement, sans bibliothèque de composants (ni shadcn, ni ReUI).
- **React 19** uniquement pour le formulaire de demande de rendez-vous (island `client:load`, une seule page).
- **Polices** : DM Sans Variable (texte) et DM Mono (labels, tags, métadonnées) via Fontsource.
- **API** (`api/`) : TypeScript sur Node 22, bundlé par esbuild, sans dépendance d'exécution. Elle tourne en fonction serverless Scaleway et envoie l'email via Scaleway Transactional Email.
- **Outils** : pnpm 11 (`packageManager`), Node ≥ 22.12 (Node 24 en CI pour le site).

## Structure

```text
src/
├── pages/            # une page = une route (index, about, offres, renfort, contact, mentions-legales, confidentialite)
├── layouts/
│   └── BaseLayout.astro   # <head> (SEO, Open Graph), en-tête et navigation (navLinks), menu mobile, pied de page
├── components/       # SocialLinks, Avatar, ContactForm.tsx (island React), icons/
├── lib/avatar.ts     # charge src/assets/avatar.* s'il existe
├── styles/global.css # @theme (polices), focus, animations
└── assets/           # portrait
public/               # favicons, manifest.json, robots.txt
api/                  # contact.ts (handler), dev.ts (serveur local), lib/ (email, http, rate-limit) ; package et lockfile propres
.github/workflows/    # check.yml, deploy-frontend.yml, deploy-api.yml
DESIGN.md             # système visuel « The Technical Letter »
PRODUCT.md            # publics, positionnement, principes
```

## Commandes

| Où | Commande | Effet |
|---|---|---|
| racine | `pnpm dev` | serveur de dev, http://localhost:4321 |
| racine | `pnpm build` | build statique dans `dist/` |
| racine | `pnpm preview` | sert le build |
| racine | `pnpm check` | vérification des types (`astro check`) |
| `api/` | `pnpm dev` | API locale sur http://localhost:8080/api/contact (lit `api/.env`) |
| `api/` | `pnpm build` | bundle `dist/contact.js` |
| `api/` | `pnpm check` | `tsc --noEmit` |

Pour pointer le site local vers l'API locale : `PUBLIC_API_URL=http://localhost:8080/api/contact pnpm dev`.

Déploiement : aucun script local. GitHub Actions déploie à chaque push sur `main`, après le workflow Check (types et build du site et de l'API), qui tourne aussi sur chaque PR. Ne jamais déployer à la main.

Branches : le travail arrive dans `develop`, jamais directement dans `main`. Une branche de ticket part de `develop` et sa PR vise `develop` (`gh pr create --base develop`). Mettre en ligne, c'est fusionner une PR `develop` → `main`, décidée par Maxime.

## Où vit le contenu

- Les textes sont écrits directement dans les pages `src/pages/*.astro`. Il n'y a ni content collections ni markdown.
- Les liens de navigation sont dans le tableau `navLinks` de `BaseLayout.astro`. Le pied de page (et ses liens, `footerLinks` : Renfort technique et pages légales) est dans ce même layout.
- Les choix et limites du formulaire sont dans `src/components/ContactForm.tsx`. Leurs libellés et leur validation côté serveur sont dans `api/contact.ts`, et les deux doivent rester alignés (constante `MAX`).
- Pages légales (`mentions-legales.astro`, `confidentialite.astro`) : l'adresse et le téléphone viennent de `LEGAL_ADDRESS` et `LEGAL_PHONE` au build. Les marqueurs `[ADRESSE]`, `[TÉLÉPHONE]` et `[À VÉRIFIER]` font échouer `pnpm build` (intégration `check-placeholders` dans `astro.config.mjs`). Le jour où `/projects` présente des clients, ajouter aux mentions légales : « Les marques et logos des clients présentés le sont avec leur accord. »
- Chaque page passe `title` et `description` à `BaseLayout`. Le titre suit le format `<Page> — Maxime Derycke`.

## Conventions de code

- TypeScript strict, sans point-virgule, guillemets simples, indentation de 2 espaces, virgule finale en multiligne.
- Commentaires en français, courts, qui expliquent le pourquoi. En TS, les sections sont séparées par `// ─── Titre ───`.
- Classes Tailwind en ligne, `class:list` pour les classes conditionnelles. Pas de CSS hors de `global.css`.
- Liens internes avec slash final (`/about/`), à cause de `trailingSlash: 'always'`.
- Accessibilité : `aria-label` sur les liens icônes, zone cliquable d'au moins 44 px, `aria-current="page"` sur la navigation, focus visible conservé.
- Commits : `type(portée): message` (feat, fix, docs, ci, chore, perf), en français, courts.
- Pull requests de ticket : vers `develop`, fusion en squash uniquement, un ticket donne une PR et un commit. Le titre de la PR devient le message du commit, il suit donc la convention ci-dessus.
- PR de mise en ligne `develop` → `main` : fusion par commit de fusion (« Create a merge commit »), jamais en squash ni en rebase, pour garder un commit par ticket sur `main` et `develop` synchronisée sans réécriture.

## Design

`DESIGN.md` fait référence pour toute nouvelle page ou tout nouveau composant. L'essentiel :
- light mode uniquement, fond blanc, neutres zinc, filets d'1 px, pas d'ombre hors des éléments flottants de l'en-tête ;
- accent `teal-500` (Tailwind v4, `oklch(70.4% 0.14 182.503)`) réservé aux marqueurs d'état ou de lieu, en traits et en points. `teal-700` quand il doit se lire comme du texte. Jamais en fond ni en texte courant ;
- largeurs : `max-w-3xl` pour les pages internes, `max-w-7xl` pour l'accueil, `max-w-xl` pour le formulaire. Padding horizontal `px-6` (`lg:px-8` sur l'accueil).

## Agent skills

### Issue tracker

Tickets dans Linear, équipe Maxime, projet Portfolio (identifiants `M-<n>`). Voir `docs/agents/issue-tracker.md`.

### Triage labels

Les cinq labels par défaut (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). Voir `docs/agents/triage-labels.md`.

### Domain docs

Single-context : un `GLOSSARY.md` à la racine. Les ADR sont des documents Linear du projet Portfolio (`ADR-NNNN — …`), jamais dans le dépôt public. Voir `docs/agents/domain.md`.
