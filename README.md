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
| Formulaire → email | Scaleway Serverless Function (Node.js 22) + Scaleway Transactional Email |

## Pages

| Route | Contenu |
|---|---|
| `/` | Accueil — Hero, accroche, CTA |
| `/about` | Parcours, stack, compétences |
| `/services` | Modes Agile & Forfait |
| `/projects` | Galerie de réalisations (page à venir) |
| `/contact` | Formulaire multi-étapes (React island) |

## Développement local

```sh
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # Production build → ./dist/
pnpm preview    # Prévisualisation du build
```

Prérequis : Node.js ≥ 22.12, pnpm 11+

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

Deux workflows GitHub Actions se déclenchent sur `main` (et à la demande) :

- **Deploy Frontend** — build statique (avec le secret `PUBLIC_API_URL`) puis `rclone sync` de `dist/` vers le bucket Scaleway Object Storage `maximederycke.dev`.
- **Deploy API** — bundle esbuild de `api/contact.ts` puis déploiement de la fonction `contact-form-handler` (Node 22, `fr-par`) avec la CLI Scaleway.
