# Portfolio — Maxime Derycke

Portfolio personnel de [Maxime Derycke](https://maximederycke.dev), développeur Fullstack JS/TS freelance.

## Stack

| Couche | Technologie |
|---|---|
| Framework | Astro 6 |
| Langage | TypeScript (strict) |
| Composants interactifs | React 19 (islands) |
| Style | Tailwind v4 (custom uniquement) |
| Typographie | DM Sans + DM Mono |
| Hébergement | Scaleway Object Storage + CDN |
| Formulaire → Notion | Scaleway Serverless Function (Node.js) |

## Pages

| Route | Contenu |
|---|---|
| `/` | Accueil — Hero, accroche, CTA |
| `/about` | Parcours, stack, compétences |
| `/services` | Modes Agile & Forfait |
| `/contact` | Formulaire multi-étapes (React island) |

## Développement local

```sh
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # Production build → ./dist/
pnpm preview    # Prévisualisation du build
```

Prérequis : Node.js ≥ 22, pnpm 10+

## Variables d'environnement

Le formulaire de contact appelle une Serverless Function hébergée séparément (`/api/`).

```sh
PUBLIC_API_URL=https://your-function-url/contact  # optionnel en local
```

## Déploiement

Le site est buildé en statique et déployé sur Scaleway Object Storage via CI/CD.
