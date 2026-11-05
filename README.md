# Portfolio — Maxime Derycke

Portfolio personnel de [Maxime Derycke](https://maximederycke.dev), développeur Fullstack JS/TS freelance.

## Stack

| Couche | Technologie |
|---|---|
| Framework | Astro 7 |
| Langage | TypeScript (strict) |
| Composants interactifs | React 19 (islands) |
| Style | Tailwind v4 (custom uniquement) |
| Typographie | DM Sans + DM Mono |
| Hébergement | Scaleway Object Storage + CDN Cloudflare |
| Formulaire → email | Scaleway Serverless Function (Node.js 22) + Scaleway Transactional Email |

## Pages

| Route | Contenu |
|---|---|
| `/` | Accueil — Hero, accroche, CTA |
| `/about` | Parcours, stack, compétences |
| `/services` | Modes Agile & Forfait |
| `/contact` | Formulaire multi-étapes (React island) |
| `/mentions-legales` | Mentions légales |
| `/confidentialite` | Politique de confidentialité |

## Développement local

```sh
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # Production build → ./dist/
pnpm preview    # Prévisualisation du build
pnpm check      # Vérification des types (astro check)
```

Prérequis : Node.js ≥ 22.12 (Node 24 recommandé, c'est la version de la CI frontend), pnpm 11+

## Photo

Le portrait (hero de l'accueil, bouton d'accueil de l'en-tête et image de partage) est `src/assets/avatar.jpg` (`.jpeg`, `.png` et `.webp` sont aussi acceptés). Astro le redimensionne et l'optimise ; pour le remplacer, viser un carré d'environ 1200 px, sans métadonnées (EXIF), pour garder le dépôt léger. Sans fichier, un monogramme « M » s'affiche dans l'en-tête et rien dans le hero.

## API du formulaire de contact

Le formulaire envoie une notification par email (Scaleway Transactional Email) via une Serverless Function située dans `api/`, avec un `Reply-To` réglé sur l'email du visiteur.

```sh
cd api
cp .env.example .env    # renseigner les variables Scaleway
pnpm install
pnpm dev                # http://localhost:8080/api/contact
```

Variables d'environnement de l'API (`api/.env`, jamais committé) :

| Variable | Rôle |
|---|---|
| `SCW_ACCESS_KEY`, `SCW_SECRET_KEY` | Identifiants Scaleway |
| `SCW_DEFAULT_ORGANIZATION_ID`, `SCW_DEFAULT_PROJECT_ID`, `SCW_DEFAULT_REGION` | Contexte Scaleway |
| `EMAIL_FROM`, `EMAIL_TO` | Expéditeur vérifié (SPF/DKIM) et boîte de réception |
| `ALLOWED_ORIGINS` | Origines autorisées à appeler la fonction (CORS) |

Côté front, l'URL de la fonction se règle avec `PUBLIC_API_URL` (par défaut `/api/contact`). En local, pour pointer vers l'API ci-dessus :

```sh
PUBLIC_API_URL=http://localhost:8080/api/contact pnpm dev
```

## Déploiement

Le workflow **Check** tourne sur chaque pull request : vérification des types (`astro check` côté site, `tsc --noEmit` côté API) puis build des deux. Les workflows de déploiement l'appellent aussi et ne déploient que s'il passe.

Deux workflows de déploiement se déclenchent sur `main` (et à la demande) :

- **Deploy Frontend** — build statique (avec le secret `PUBLIC_API_URL`), `rclone` de `dist/` vers le bucket Scaleway Object Storage (assets `_astro/` en cache immuable, HTML revalidé), puis purge du cache Cloudflare.
- **Deploy API** — bundle esbuild de `api/contact.ts` puis déploiement de la fonction `contact-form-handler` (Node 22, `fr-par`) avec la CLI Scaleway.

Secrets GitHub requis : `SCW_ACCESS_KEY`, `SCW_SECRET_KEY`, `SCW_ORG_ID`, `SCW_PROJECT_ID`, `SCW_NAMESPACE_ID`, `PUBLIC_API_URL`, `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ZONE_ID`. Variables GitHub requises : `SCW_BUCKET` (nom du bucket ; le déploiement s'arrête si elle manque), `LEGAL_ADDRESS` et `LEGAL_PHONE` (coordonnées des mentions légales).

## Pages légales

L'adresse et le téléphone des mentions légales viennent des variables `LEGAL_ADDRESS` et `LEGAL_PHONE` (`.env` en local, variables GitHub en CI). Tant qu'un marqueur (`[ADRESSE]`, `[TÉLÉPHONE]`, `[À VÉRIFIER]`) reste dans le HTML généré, `pnpm build` échoue : une page incomplète ne peut pas être publiée. En `pnpm dev`, les marqueurs s'affichent.

## Référencement et partage

`astro.config.mjs` déclare `site: 'https://maximederycke.dev'`. Le layout génère l'URL canonique et les balises Open Graph / Twitter (image carrée tirée du portrait), le sitemap est produit à la build par `@astrojs/sitemap` (`/sitemap-index.xml`) et `public/robots.txt` le référence. `sharp` est une dépendance directe : avec pnpm, la build échoue sans elle dès qu'une image est optimisée.
