# Documentation du domaine

Comment les skills d'ingénierie utilisent la documentation du domaine de ce dépôt.

## Avant d'explorer, lire

- **`GLOSSARY.md`** à la racine, s'il existe.
- **Les ADR** : documents Linear du projet Portfolio dont le titre commence par `ADR-` (`list_documents` filtré sur le projet, puis `get_document`). Lire ceux qui touchent la zone de travail.

S'ils n'existent pas, **continuer sans le signaler**. Ne pas proposer de les créer d'avance : la skill `/domain-modeling` les crée au moment où un terme ou une décision est réellement tranché.

## ADR : dans Linear, jamais dans le dépôt

Le dépôt est public (voir `AGENTS.md`) : aucune décision interne n'y est écrite. Il n'y a **pas de dossier `docs/adr/`**, et aucune skill ne doit en créer un. Chaque ADR est un document Linear rattaché au projet **Portfolio** (`save_document`).

### Numérotation

Lister les documents `ADR-` du projet et prendre le numéro le plus haut plus un, sur quatre chiffres. Un numéro n'est jamais réutilisé, même pour un ADR abandonné.

### Format

Titre : `ADR-0001 — <décision en quelques mots>`.

Corps, toujours avec ces sections, dans cet ordre :

```markdown
**Statut** : Proposé | Accepté | Remplacé par ADR-NNNN | Abandonné
**Date** : AAAA-MM-JJ
**Tickets** : M-<n>, …

## Contexte

Le problème et les contraintes qui imposent de choisir.

## Décision

Ce qui est décidé, en une ou deux phrases affirmatives.

## Options écartées

Chaque alternative sérieuse et la raison de son rejet.

## Conséquences

Ce que la décision rend plus facile, plus difficile, et ce qu'elle engage.
```

Un ADR accepté ne se réécrit pas : une décision qui change donne un nouvel ADR, et l'ancien passe à `Remplacé par ADR-NNNN`.

### Signaler les contradictions

Si une sortie contredit un ADR existant, le dire explicitement au lieu de l'écarter en silence :

> _Contredit ADR-0007 (…), mais mérite d'être rouvert parce que…_

## Glossaire

`GLOSSARY.md` est public : il ne contient que du vocabulaire, jamais de nom de client ou de prospect, ni de décision interne.

Quand une sortie nomme un concept du domaine (titre de ticket, proposition de refactoring, hypothèse, nom de test), utiliser le terme tel que défini dans `GLOSSARY.md`, sans dériver vers les synonymes qu'il écarte.

Si le concept n'y figure pas encore, c'est un signal : soit le vocabulaire est inventé (à reconsidérer), soit il manque vraiment (à noter pour `/domain-modeling`).
