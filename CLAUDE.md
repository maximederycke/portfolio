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
- Formulaire de contact dynamique multi-étapes connecté à Notion
- À la soumission : création automatique d'une fiche client + page de recueil de besoins dans Notion

## Stack décidée

| Couche | Technologie | Raison |
|---|---|---|
| Framework | Astro | Statique, 0 JS par défaut, parfait pour portfolio |
| Langage | TypeScript (strict) | Stack JS/TS cohérent |
| Composants interactifs | React (islands) | Pour le formulaire uniquement |
| Style | CSS Modules | Zéro dépendance, contrôle total, pas de licence |
| Hébergement | Scaleway Object Storage + CDN | Souverain, ~1-2 €/mois |
| Formulaire → Notion | Scaleway Serverless Container (Node.js) | Proxy sécurisé pour clé API Notion |
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
├── api/                 # Serverless function Node.js (formulaire → Notion)
│   └── contact.ts       # Handler : reçoit form, crée page Notion
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
- Créer une **fiche client** dans la BDD Notion "Freelance – Core" (table Clients)
- Créer une **page de recueil de besoins** pré-remplie sous `Clients/[Nom du client]/`
- Renvoyer un 200 ou une erreur propre au formulaire

### Sécurité
- La clé API Notion ne doit JAMAIS être dans le code front-end
- Elle doit être en variable d'environnement côté serverless uniquement
- NOTION_API_KEY et NOTION_DATABASE_ID en .env (jamais committé)

## Design

- **Style** : Minimaliste et épuré, beaucoup d'espace blanc
- **Mode** : Light mode par défaut
- **Couleur d'accent** : à définir (pas encore décidé)
- **Typographie** : sobre, lisible, moderne
- **Inspiration** : Tailwind Spotlight (structure) mais design 100% original — aucun code Tailwind, CSS Modules uniquement
- Pas de framework CSS (pas de Tailwind, pas de Bootstrap)

## Design tokens à créer (src/styles/tokens.css)
```css
:root {
  --color-bg: #ffffff;
  --color-text: #111111;
  --color-text-secondary: #666666;
  --color-accent: /* à définir */;
  --color-border: #e5e5e5;
  --font-sans: /* à définir */;
  --font-mono: /* à définir */;
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
  --space-xl: 8rem;
  --max-width: 680px;
  --border-radius: 8px;
}
```

## Ce qui reste à décider (à demander à Maxime)
- [ ] Couleur d'accent
- [ ] Typographie (Google Fonts ou système ?)
- [ ] Projets à mettre en avant (au moins 2-3)
- [ ] Photo ou avatar ?
- [ ] Nom de domaine (maximederycke.fr ? maximedev.fr ?)

## Tâches immédiates (dans l'ordre)

1. Scaffolder Astro avec pnpm dans le repo existant :
```bash
pnpm create astro@latest . --template minimal --typescript strict --no-install --no-git
pnpm install
pnpm astro add react
```

2. Créer la structure de dossiers
3. Créer le layout de base (BaseLayout.astro) avec les tokens CSS
4. Créer une première page index.astro avec le hero
5. Vérifier que `pnpm dev` tourne correctement

## Notion — IDs utiles (pour la serverless function)
- Workspace : Freelance
- Page principale : Freelance HQ (507f2804-aa2a-4ecf-8f68-58f5fd358af6)
- BDD Freelance – Core : 459f4327-9a23-40b2-ba82-a4c78359e568
- Dossier Clients : 34f438d2-c17e-8114-b1b6-da06fccc5c2e
- Template Recueil de besoins : 34f438d2-c17e-8142-b96c-dc78cccaa2ad

## Suivi du projet
Page Notion du projet : Lab perso → Portfolio — maxime.dev
(350438d2-c17e-8170-a176-c16675b3d92a)
