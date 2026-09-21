# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, both confirmed, landing on the site to decide whether to contact Maxime:

- **Non-technical buyers**: owners or managers at PME (small and mid-size companies) who need a custom web or mobile tool connected to their existing ecosystem (ERP, third-party APIs, internal tools) or an MVP. They want to know how the work is run and roughly what it costs before writing.
- **Technical peers and buyers**: tech leads, ESN or agency contacts looking for a freelance developer. They scan stack, track record and working method quickly.

The job for both: judge credibility and fit, understand the two collaboration modes (Agile / Forfait), and start a project through the multi-step contact form.

## Product Purpose

Personal professional portfolio for Maxime Derycke, freelance fullstack JS/TS developer based in Beauvais, working full remote (occasional on-site trips in Île-de-France and Hauts-de-France). It presents his profile and services, explains the two collaboration modes, and converts visitors into qualified inquiries through a multi-step contact form that emails him a notification (Scaleway Transactional Email, no third-party storage). Success is a well-qualified inquiry (project type, mode, budget range, description, contact) from either audience.

## Positioning

Fullstack JS/TS delivery **with a real UX sense**: he takes projects end to end, from UX thinking through to production, with genuine attention to both code quality and user experience. Supporting facts that are already on the site: 4 years of automotive R&D (test and vehicle-integration technician, embedded-systems degree) before retraining as a developer in 2022; a focus on connecting tools to a client's existing ecosystem (ERP, Jira, Microsoft Graph, OAuth2 APIs).

## Operating Context

- Site language is French (`lang="fr"`); copy is addressed to French-speaking clients across France.
- Two collaboration modes: **Agile** (evolving scope, indicative budget, regular deliveries; suits MVPs and exploration) and **Forfait** (fixed scope, price and deadlines set upfront; out-of-scope work quoted separately).
- Inquiry flow: contact form steps are project type (web / mobile / consulting), mode, budget range (<2k / 2-5k / 5-10k / 10k+), free description, contact details. Entry links can pre-select the mode (`/contact?mode=agile|forfait|unknown`).

## Capabilities and Constraints

- Static site (Astro) deployed to Scaleway Object Storage + CDN; the only interactive piece is the React contact-form island; the form posts to a separate Scaleway Serverless Function.
- Domain `maximederycke.dev`; sending domain must still be registered and verified (SPF/DKIM) on Scaleway TEM before production.
- Pages live: `/`, `/about`, `/services`, `/contact`. `/projects` does not exist yet: the placeholder was removed before the first deploy and will return with real content.
- Open decisions: what work can be shown on `/projects` (public projects, anonymised NDA work, or nothing yet); whether the About page gets a photo or avatar.

## Brand Commitments

- Name: Maxime Derycke. Voice: sober and direct, first person ("je"), no hype.
- Accent color and typographic/component decisions already settled in `CLAUDE.md` (teal accent on navigation only, zinc neutrals, DM Sans + DM Mono, custom Tailwind with no component library) are binding project constraints; this file does not restate or extend them.

## Evidence on Hand

- Professional history on `/about` (2026 freelance internal planning hub for an ESN; 2022-2026 fullstack CDI; 2017-2021 automotive), described in text only.
- No named client, testimonial, case study, screenshot, metric, or public project is available to show yet. Do not fabricate any; the `/projects` content is an open decision.

## Product Principles

1. **Credibility before persuasion**: let real facts, stack and method do the convincing; never invent proof.
2. **Serve both readers**: a PME owner must understand the offer without jargon, and a tech lead must find the stack and track record without digging.
3. **One clear next step**: every page leads to the qualified contact form, with the mode explained honestly (including what changes cost).
4. **Show the UX sense by being the example**: the site itself is the proof of the "dev + UX" claim.
5. **Stay small and sovereign**: static, minimal JS, no third-party data storage.
