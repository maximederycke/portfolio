# Contexte projet — Portfolio Maxime Derycke

## Qui je suis
Développeur Fullstack JS/TS freelance, basé à Beauvais (full remote).
4 ans d'expérience (dont 6 mois de formation initiale et 1 an d'alternance).
Double compétence : développement + appétence UX réelle.
GitHub : @maximederycke — repo public github.com/maximederycke/portfolio

## Décisions arrêtées
- pnpm de préférence
- **Composants** : custom Tailwind uniquement — pas de shadcn, pas de ReUI, pas de lib de composants
- **React** : uniquement pour le formulaire de contact (island `client:load`)
- **Nom de domaine** : `maximederycke.dev`
- **Hébergement** : Scaleway Object Storage + CDN ; formulaire → Scaleway Serverless Function (`api/`) + Transactional Email, sans dépendance tierce

## Design
- Minimaliste et épuré, beaucoup d'espace blanc, light mode par défaut
- Inspiration Tailwind Spotlight (structure), design 100% original
- Système visuel complet : `DESIGN.md` (« The Technical Letter ») — à respecter pour toute nouvelle page ou composant
- **Accent** : `teal-500` Tailwind v4 (`oklch(70.4% 0.14 182.503)`, ≈ `#00BBA7` — pas le `#14B8A6` de Tailwind v3). Marqueur d'état/de lieu uniquement : liens de nav (actif + hover, sans variante teal-600), progression et bordures sélectionnées/focus du formulaire, labels de statut mono. Jamais en fond de bouton ni en texte courant. Partout ailleurs : zinc ; icônes sociales et autres éléments interactifs hors-nav en `hover:text-zinc-600`
- **Typographie** : DM Sans (corps) + DM Mono (code/tags)
- Largeurs : `max-w-3xl` pour les pages internes (`max-w-7xl` pour l'accueil, `max-w-xl` pour le formulaire), `px-6` (`lg:px-8` sur l'accueil) comme padding horizontal

## Sécurité
- La clé secrète Scaleway ne doit JAMAIS être dans le code front-end
- Elle doit être en variable d'environnement côté serverless uniquement
- SCW_SECRET_KEY, SCW_DEFAULT_PROJECT_ID, EMAIL_FROM, EMAIL_TO en .env (jamais committé)

## Ce qui reste à faire
- [ ] Page `/projects` — galerie de réalisations (au moins 2-3 projets à choisir)
- [ ] Photo ou avatar sur la page À propos
- [ ] Enregistrer et vérifier le domaine `maximederycke.dev` sur Scaleway TEM (SPF/DKIM) avant mise en prod

## Suivi du projet
Page Notion du projet : Lab perso → Portfolio — maxime.dev
(350438d2-c17e-8170-a176-c16675b3d92a)
