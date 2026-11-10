# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary audience: non-technical owners of service SMEs.** Owners and managers of service companies with 10 to 50 employees and teams in the field (cleaning, electrical work, heating, maintenance, landscaping…). Their problem: planning and field information are scattered across Excel, paper, WhatsApp and software that does not fit how they work. The result is double data entry, lost information and time wasted at the office. They are not technical and judge on clarity, proximity and a firm price.

**Secondary audience: technical teams looking for reinforcement.** Agencies, software publishers, recruiters and IT departments looking for a freelance developer to join their team (Renfort technique). They have their own page, outside the main navigation. They are never presented on an equal footing with the primary audience: the home page, the menu and the offer speak to the SME owner.

The job for the primary audience: recognise their problem, understand how a project runs and what each step costs, and ask for a Rendez-vous de découverte.

## Product Purpose

Professional site of Maxime Derycke, freelance developer based in Beauvais (Oise). It presents a stepped offer for SME field teams, shows the proof on hand, and turns visitors into requests for a Rendez-vous de découverte through a single-page contact form that emails him a notification (Scaleway Transactional Email, no third-party storage). Success is a qualified request from an SME owner whose problem fits the offer.

## Positioning

Tagline: « Du terrain au bureau, sans rien ressaisir. »

Three arguments, always in this order:

1. **Specialist of tools for field teams**: planning, interventions, reports and the flow of information between the field and the office.
2. **Present in the Oise**: « je viens voir le terrain ». Local work in Beauvais, the Oise and neighbouring departments, with on-site visits.
3. **I design and code it myself**: one person from the first visit to delivery, no subcontracting.

Supporting facts already on the site: 4 years of automotive R&D (test and vehicle-integration technician, embedded-systems degree) before retraining as a developer in 2022; experience connecting tools to an existing ecosystem (ERP, third-party APIs, internal tools).

## Offer

A fixed-price project, delivered in Étapes, each with a firm price agreed before it starts:

1. **Rendez-vous de découverte**: free, 30 minutes by phone or on site.
2. **Étude de projet**: paid; visit, specification, mock-up or diagram, and the firm price of the first Étape. The deliverable belongs to the client.
3. **First usable Étape**: a first part of the tool, delivered and invoiced at a firm price.
4. **Further Étapes and Maintenance**: each new Étape is priced before it starts; Maintenance is offered at each delivery, after 3 months of included warranty.

The means are an Automatisation (connecting existing tools) or an Application (a custom web or mobile tool). The tool belongs to the client.

Vocabulary is fixed in `GLOSSARY.md`; use its terms and never the synonyms it rules out.

## Operating Context

- Site language is French (`lang="fr"`); copy is addressed to French-speaking clients.
- Local: Beauvais, the Oise and neighbouring departments. The offer does not claim to cover all of France.
- The only collaboration model shown to the primary audience is the stepped, fixed-price offer above.

## Capabilities and Constraints

- Static site (Astro) deployed to Scaleway Object Storage + CDN; the only interactive piece is the React contact-form island; the form posts to a separate Scaleway Serverless Function.
- Domain `maximederycke.dev`.
- Pages live: `/`, `/about/`, `/services/`, `/contact/`, `/mentions-legales/`, `/confidentialite/`.
- Pages to come: `/offres/` (the stepped offer and its prices) and `/renfort/` (the Renfort technique page for technical teams, outside the main navigation). `/projects/` does not exist; it will only return with real content.
- The repository is public: nothing internal is written in it (see `AGENTS.md`).

## Brand Commitments

- Name: Maxime Derycke. Voice: sober and direct, first person (« je »), no hype, no jargon for the primary audience.
- Never a daily rate on the site.
- Accent color and typographic/component decisions already settled in `AGENTS.md` and `DESIGN.md` (teal accent as a marker of state and place only, zinc neutrals, DM Sans + DM Mono, custom Tailwind with no component library) are binding project constraints; this file does not restate or extend them.

## Evidence on Hand

- Professional history on `/about/` (2022-2026 fullstack developer on permanent contract; 2017-2021 automotive), described in text only.
- One freelance mission: a planning tool for field technicians, presented anonymised (no client name, no logo).
- No named client, testimonial, screenshot or metric is available to show. Do not fabricate any.

## Product Principles

1. **Credibility before persuasion**: let real facts and the method do the convincing; never invent proof.
2. **Speak to the field, not to developers**: an SME owner must understand every page of the main path without technical vocabulary. Stack and track record belong to the Renfort technique page.
3. **Firm prices, step by step**: every Étape has a price agreed before it starts; nothing is left open-ended.
4. **One clear next step**: every page of the main path leads to a request for a Rendez-vous de découverte.
5. **Stay small and sovereign**: static, minimal JS, no third-party data storage.
