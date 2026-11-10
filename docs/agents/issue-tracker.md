# Suivi des tickets : Linear

Les tickets et les specs de ce dépôt vivent dans Linear, équipe **Maxime**, projet **Portfolio**. Les identifiants sont de la forme `M-<n>`. Toutes les opérations passent par les outils MCP Linear.

## Dépôt public

Ce dépôt est public (voir `AGENTS.md`). Le contenu d'un ticket (description, commentaires, noms de clients ou de prospects) reste dans Linear et ne se recopie jamais dans le code, les commits ou les PR. Seul l'identifiant apparaît, dans le nom de branche.

## Conventions

- **Créer un ticket** : `save_issue` sans `id`, avec `team: "Maxime"` et `project: "Portfolio"`. Vérifier d'abord avec `list_issues` (paramètre `query`) qu'un ticket équivalent n'existe pas.
- **Lire un ticket** : `get_issue` avec l'identifiant (`M-104`), puis `list_comments` pour la discussion, que `get_issue` ne renvoie pas.
- **Lister les tickets** : `list_issues` filtré par `team: "Maxime"`, `project: "Portfolio"`, et selon le besoin `state`, `label` ou `assignee: "me"`. Résultats paginés : suivre le `cursor` tant que `hasNextPage` vaut `true`.
- **Commenter** : `save_comment` avec l'identifiant du ticket.
- **Labels** : `save_issue` avec `id` et `labels`. Ce paramètre remplace la liste entière : relire les labels actuels, puis renvoyer la liste complète modifiée.
- **Fermer** : `save_issue` avec `id` et un statut terminé (`Done` ou `Canceled`), après un commentaire qui explique pourquoi.
- **Branche** : reprendre `gitBranchName` renvoyé par `get_issue` (ex. `feature/m-104-…`).

## Pull requests comme source de demandes

**PRs as a request surface: no.** _(Passer à `yes` si les PR externes doivent entrer dans la file de triage ; `/triage` lit ce drapeau.)_

## Quand une skill dit « publier dans le suivi des tickets »

Créer un ticket Linear dans l'équipe Maxime, projet Portfolio.

## Quand une skill dit « récupérer le ticket concerné »

`get_issue` avec l'identifiant `M-<n>`, puis `list_comments`.

## Opérations de cartographie (`/wayfinder`)

- **Carte** : un ticket parent avec le label `wayfinder:map`, qui porte les sections Notes / Decisions-so-far / Fog.
- **Ticket enfant** : un sous-ticket du parent (`parentId`), avec un label `wayfinder:<type>` (`research`, `prototype`, `grilling`, `task`).
- **Blocage** : relation `blocked by` native de Linear. Un ticket est débloqué quand tous ses bloqueurs sont terminés.
- **Frontière** : sous-tickets ouverts de la carte, sans bloqueur ouvert ni assigné ; le premier dans l'ordre de la carte l'emporte.
- **Prise en charge** : assigner le ticket à `me`, première écriture de la session.
- **Résolution** : commenter la réponse, passer le ticket à `Done`, puis ajouter un pointeur (résumé + lien) dans les Decisions-so-far de la carte.
