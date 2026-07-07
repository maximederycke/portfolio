# Contexte projet — Portfolio Maxime Derycke

## Qui je suis
Développeur Fullstack JS/TS freelance, basé à Beauvais (full remote).
4 ans d'expérience (dont 6 mois de formation initiale et 1 an d'alternance).
Double compétence : développement + appétence UX réelle.
GitHub : @maximederycke

## Ce qu'on construit
Un portfolio personnel professionnel, avec :
- Présentation du profil et des services
- Présentation des 2 modes de collaboration (Agile / Forfait)
- Formulaire de contact dynamique multi-étapes
- À la soumission : envoi d'un email de notification via Scaleway Transactional Email

## Stack décidée

| Couche | Technologie | Raison |
|---|---|---|
| Framework | Astro | Statique, 0 JS par défaut, parfait pour portfolio |
| Langage | TypeScript (strict) | Stack JS/TS cohérent |
| Composants interactifs | React (islands) | Pour le formulaire uniquement |
| Style | Tailwind v4 (custom uniquement) | Utilitaires, zéro lib de composants (pas de shadcn/ReUI) |
| Hébergement | Scaleway Object Storage + CDN | Souverain, ~1-2 €/mois |
| Formulaire → Email | Scaleway Serverless Function (Node.js) + Scaleway Transactional Email | Notification par email à la soumission, sans dépendance tierce |
| Versionning | GitHub public | github.com/maximederycke/portfolio |

## Environnement local
- Node.js 20
- npm 10.8
- pnpm 10.6 (à utiliser de préférence)
- macOS (MacBook)
- Repo déjà créé et cloné localement

## Structure de dossiers cible

```
portfolio/
├── src/
│   ├── pages/           # Routes Astro (.astro)
│   │   ├── index.astro       # Accueil — Hero + accroche + CTA
│   │   ├── about.astro       # À propos — parcours, valeurs, différenciation
│   │   ├── projects.astro    # Projets — galerie de réalisations
│   │   ├── services.astro    # Services — 2 modes de colla + tarifs
│   │   └── contact.astro     # Contact — formulaire dynamique
│   ├── components/      # Composants réutilisables (.astro + .tsx)
│   ├── layouts/         # Layout global (BaseLayout.astro)
│   ├── styles/          # CSS Modules globaux + tokens
│   └── content/
│       └── projects/    # Projets en MDX
├── public/              # favicon, og:image, assets statiques
├── api/                 # Serverless function Node.js (formulaire → email)
│   └── contact.ts       # Handler : reçoit form, envoie email via Scaleway TEM
├── astro.config.ts
├── tsconfig.json
└── package.json
```

## Pages prévues

| Page | Route | Contenu principal |
|---|---|---|
| Accueil | `/` | Hero, phrase d'accroche, CTA |
| À propos | `/about` | Parcours, valeurs, différenciation dev+UX |
| Projets | `/projects` | Galerie avec stack + description |
| Services | `/services` | Modes Agile et Forfait, tarifs |
| Contact | `/contact` | Formulaire dynamique multi-étapes |

## Formulaire de contact — comportement attendu

### Étapes du formulaire (React island)
1. Choix du type de projet (web / mobile / conseil)
2. Choix du mode (Agile ou Forfait) avec explication courte de chaque
3. Budget estimatif (fourchettes : <2k / 2-5k / 5-10k / +10k)
4. Description libre du projet
5. Infos de contact (nom, email, entreprise)

### À la soumission → appel vers `/api/contact`
La serverless function Node.js doit :
- Envoyer un email de notification (via Scaleway Transactional Email) vers la boîte pro, avec toutes les infos du formulaire et un `Reply-To` réglé sur l'email du contact
- Renvoyer un 200 ou une erreur propre au formulaire

### Sécurité
- La clé secrète Scaleway ne doit JAMAIS être dans le code front-end
- Elle doit être en variable d'environnement côté serverless uniquement
- SCW_SECRET_KEY, SCW_DEFAULT_PROJECT_ID, EMAIL_FROM, EMAIL_TO en .env (jamais committé)

## Design

- **Style** : Minimaliste et épuré, beaucoup d'espace blanc
- **Mode** : Light mode par défaut
- **Couleur d'accent** : à définir (pas encore décidé)
- **Typographie** : sobre, lisible, moderne
- **Inspiration** : Tailwind Spotlight (structure) mais design 100% original — aucun code Tailwind, CSS Modules uniquement
- Pas de framework CSS (pas de Tailwind, pas de Bootstrap)

## Thème Tailwind (src/styles/global.css)
Tailwind v4 — tokens définis via `@theme` :
- `--font-sans` : DM Sans
- `--font-mono` : DM Mono
- Accent : `teal-500` (`#14B8A6`), hover `teal-600`
- Neutre : zinc
- `max-w-2xl` comme largeur max de contenu, `px-6` comme padding horizontal

## Décisions design arrêtées
- **Couleur d'accent** : Teal 500 `#14B8A6` — uniquement sur les liens de navigation (actif + hover). Partout ailleurs : zinc. Les icônes sociales et autres éléments interactifs hors-nav utilisent `hover:text-zinc-600`
- **Neutre** : Zinc pour tout le reste
- **Typographie** : DM Sans (corps) + DM Mono (code/tags) via Google Fonts
- **Nom de domaine** : `maximederycke.dev`
- **Composants** : custom Tailwind uniquement — pas de shadcn, pas de ReUI
- **React** : uniquement pour le formulaire de contact (island `client:load`)

## État du projet (v1)

Pages livrées : `/`, `/about`, `/services`, `/contact`
Formulaire multi-étapes connecté à Scaleway Transactional Email (notification par email, sans stockage tiers).
Favicons, web manifest, nav responsive (desktop pill + mobile dropdown) en place.

## Ce qui reste à faire

- [ ] Page `/projects` — galerie de réalisations (au moins 2-3 projets à choisir)
- [ ] Photo ou avatar sur la page À propos
- [ ] Enregistrer et vérifier le domaine `maximederycke.dev` sur Scaleway TEM (SPF/DKIM) avant mise en prod

## Suivi du projet
Page Notion du projet : Lab perso → Portfolio — maxime.dev
(350438d2-c17e-8170-a176-c16675b3d92a)
