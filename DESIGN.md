---
name: Portfolio Maxime Derycke
description: A calm, flat, zinc-and-white portfolio set like a technical letter, with one drafting-pen teal for state and place.
colors:
  drafting-teal: "oklch(70.4% 0.14 182.503)"
  drafting-teal-wash: "oklch(98.4% 0.014 180.72)"
  drafting-teal-ink: "oklch(51.1% 0.096 186.391)"
  ink: "oklch(21% 0.006 285.885)"
  graphite: "oklch(37% 0.013 285.805)"
  slate: "oklch(44.2% 0.017 285.786)"
  pencil: "oklch(55.2% 0.016 285.938)"
  placeholder: "oklch(70.5% 0.015 286.067)"
  hairline: "oklch(92% 0.004 286.32)"
  hairline-faint: "oklch(96.7% 0.001 286.375)"
  paper-tint: "oklch(98.5% 0 0)"
  paper: "#ffffff"
  error: "oklch(63.7% 0.237 25.331)"
typography:
  display:
    fontFamily: "DM Sans Variable, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "DM Sans Variable, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: "DM Sans Variable, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
  lead:
    fontFamily: "DM Sans Variable, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "DM Sans Variable, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  body-sm:
    fontFamily: "DM Sans Variable, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "DM Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.333
rounded:
  lg: "0.5rem"
  xl: "0.75rem"
  2xl: "1rem"
  3xl: "1.5rem"
  full: "9999px"
spacing:
  gutter: "1.5rem"
  gutter-lg: "2rem"
  section: "4rem"
  card-pad: "1.75rem"
  card-pad-lg: "2.5rem"
  stack: "0.75rem"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: "0 1rem 0 1.25rem"
    height: "2.75rem"
  button-primary-hover:
    backgroundColor: "{colors.graphite}"
  button-primary-compact:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: "0 0.75rem 0 0.875rem"
    height: "2.25rem"
  arrow-link:
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    height: "2.75rem"
  header-bar:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.2xl}"
    padding: "0 0.75rem"
    height: "3.5rem"
  nav-link:
    textColor: "{colors.slate}"
    typography: "{typography.body-sm}"
    height: "2.75rem"
  nav-link-active:
    textColor: "{colors.drafting-teal-ink}"
  field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "0.625rem 1rem"
    height: "2.75rem"
  choice-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.xl}"
    padding: "0.875rem 1rem"
  choice-card-selected:
    backgroundColor: "{colors.drafting-teal-wash}"
    textColor: "{colors.ink}"
  contact-card:
    backgroundColor: "{colors.paper-tint}"
    textColor: "{colors.slate}"
    rounded: "{rounded.2xl}"
    padding: "{spacing.card-pad-lg}"
  proof-card:
    backgroundColor: "{colors.paper-tint}"
    textColor: "{colors.slate}"
    rounded: "{rounded.2xl}"
    padding: "{spacing.card-pad}"
  ink-band:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.3xl}"
    padding: "5rem 4rem"
  chip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.pencil}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "0.25rem 0.75rem"
---

# Design System: Portfolio Maxime Derycke

## Overview

**Creative North Star: "The Technical Letter"**

The site reads like a well-typeset professional letter from an engineer: white paper, one sans voice, thin rules instead of boxes-with-shadows, small mono annotations in the margins, and a single drafting-pen teal that marks where you are or what you chose. Restraint is the credential: the calm hierarchy tells an SME owner the work will be orderly, and the mono detailing tells a tech lead the author is technical.

Space does most of the structural work; borders are hairlines; type size and weight carry hierarchy, with large, tight headings. Every page sits on one grid and one vertical line, shared by the header name, the page title and the footer. The home page has the rhythm of a landing page (each block treated differently, one ink band as its strong moment); inner pages read like a document (section title on the left, content on the right). Motion is one authored moment, not a coat of effects: on load the home sheet is ruled (the grid is swept in) and the hero is set down in reading order.

**Key Characteristics:**
- Light-only, white paper with zinc ink; no dark mode. The ink band on the home is the only dark surface.
- Flat surfaces with hairline zinc borders; shadow exists only on the floating header bar.
- One sans (DM Sans) for reading, one mono (DM Mono) for metadata.
- Everything aligned to the sheet grid: the header name, every `h1` and the footer share one vertical.
- Teal is a marker of state and place, never a fill or a headline color.

## Colors

A near-monochrome zinc palette (Tailwind v4 defaults, hue ~286° at very low chroma) plus one teal. The canonical values are Tailwind v4's `oklch` tokens, not the v3 hex values.

### Primary
- **Drafting Teal** (oklch(70.4% 0.14 182.503), Tailwind `teal-500`): the drafting-pen mark, used as strokes and dots only: the underline of the current nav link, the dot before the current item of the mobile menu, the dot before the reassurance « 30 min, au téléphone ou sur place », the dot before « Après » in the proof card, the ring of the first step in a numbered rail, and the border of a selected choice card. Never a fill, never text.
- **Drafting Teal Ink** (`teal-700`, about 5.4:1 on white): the same teal when it has to be read or must reach 3:1 as an indicator: the current nav link, the « Demande envoyée » label, and the 2px border + ring of a focused form field.
- **Drafting Teal Wash** (`teal-50`, at 50% opacity): the fill behind a selected choice card.

### Neutral
- **Ink** (`zinc-900`): headings, primary button fill, and the one dark surface (the ink band on the home).
- **Graphite** (`zinc-700`): primary-button hover, unselected choice-card labels, the feature icons.
- **Slate** (`zinc-600`): lead paragraphs, body text, list items, inactive nav links.
- **Pencil** (`zinc-500`): metadata (dates, reassurance, update date), footer, social icons at rest.
- **Placeholder** (`zinc-400`): input placeholder text only.
- **Hairline** (`zinc-200`): borders of cards, fields, chips and icon boxes; numbered-rail lines; the hero grid strokes.
- **Hairline Faint** (`zinc-100`): rules between sections and between list rows; the footer rule.
- **Paper Tint** (`zinc-50`): the contact card, the proof card, and the ground around the page sheet from `lg`.
- **Paper** (#ffffff): the page sheet and the header bar (90%).
- On the ink band, text is Paper, secondary text `zinc-300`, rules `white/10`.

### Error
- **Error** (`red-500`): the border of an invalid field; `red-600` border + ring when it has focus.
- **Error Ink** (`red-700`, about 6:1): every error message set as text.

### Named Rules
**The Drafting Pen Rule.** Teal marks state and place ("you are here", "this is chosen", "this is the first step"). It is used in small strokes, dots and borders, never as a surface; when it must be read as text or as a focus indicator it uses the darker Ink shade. If a screen has more than a few teal marks, remove some.

**The Paper Rule.** Everything that is not teal or an error is zinc on white. No second hue joins the system. Ink may be used as one surface per page at most (the home band); it is not a theme.

## Typography

**Display / Body Font:** DM Sans Variable (with `system-ui, sans-serif`), optical sizing on, antialiased
**Label / Mono Font:** DM Mono (with `ui-monospace, monospace`)

**Character:** A friendly geometric sans for reading paired with a matching mono for the "typewriter margin". Hierarchy comes from size and weight (semibold 600 for headings, regular for text), not from colour or decoration. The shared scale lives in `src/lib/typography.ts` (`h1`, `lede`, `h2`, `h3`, `body`, `inlineLink`, `bullet`).

### Hierarchy
- **Display** (600, 2.25rem → 3rem from `sm`, tracking -0.025em, balanced): every page title (`h1`), including the home hero sentence.
- **Headline** (600, 1.5rem → 1.875rem from `sm`, tracking -0.025em, balanced): section headings (`h2`). On the home, the centred and the frise headings go up to 2.25rem from `sm`.
- **Title** (600, 1.25rem): step titles, the two means, the proof card title.
- **Lead** (400, 1.125rem, relaxed, `slate`, `max-w-2xl`): the paragraph under a page title (1.25rem from `sm` on the home hero).
- **Body** (400, 1rem, relaxed, `slate`, `max-w-2xl`): running text, list items.
- **Body Small** (400, 0.875rem, relaxed): details under an item title, buttons, nav.
- **Label** (DM Mono 400, 0.75rem, sentence case): dates, reassurance, update dates, price labels, step numbers, footer.

### Named Rules
**The Margin Note Rule.** Anything that is metadata (dates, tech tags, step numbers, status) is set in DM Mono at label size in `pencil`. Anything that is meaning is set in DM Sans. A mono label is never the only title of a section, and there are no eyebrows above headings.

## Layout

A single white sheet, like a letter on a desk: from `lg` it is framed by a 1px `hairline-faint` ring on a Paper Tint ground (up to `max-w-7xl`, 2rem outer gutters), and below `lg` it is simply the white page. Content inside the sheet uses `px-6`, `lg:px-8`, so the header name, every `h1` and the footer © share one vertical (x = 137px at 1440px).

**Inner pages** (`Page`, `PageIntro`, `Section` components): the title and lead sit on the left, held to `max-w-3xl`. Each following section spans the full sheet: from `lg`, its heading takes the left 4 of 12 columns (and stays visible while the section scrolls) and its content the right 8, with a `hairline-faint` rule and 3rem to 4rem of padding between sections. The page ends with the full-width contact card. On /contact/ the form takes the left 6 columns and the other ways to get in touch the right 4.

**Home**: a landing-page rhythm where each block has its own treatment. The hero is a 12-column grid: text on the left 7 (avatar, title, lead, button, reassurance), the proof card on the right 5. Then a centred heading with four features side by side, the ink band (heading left, the two means right), a horizontal numbered rail with its link aligned right, a `Section` (Parcours), and the contact card. Each fact appears once on the home; the detail lives on /offres/ and /about/.

Below `lg` every grid stacks in reading order; below `sm` the numbered rail turns vertical. The header is fixed, so `main` reserves 4rem at the top.

## Elevation & Depth

Flat by default. Depth is conveyed by hairline borders, the Paper Tint cards, the one ink band, and whitespace. The only shadow is on the floating header bar, because it overlays scrolling content: one soft shadow tinted from the ink (`0 10px 15px -3px rgb(39 39 42 / 0.05), 0 4px 6px -4px rgb(39 39 42 / 0.05)`) plus a 1px ring at 5% ink, on a 90% white fill with a backdrop blur (opaque white when the mobile menu is open). Below `lg`, a white fade sits behind the bar so text never shows above it.

### Named Rules
**The Flat-By-Default Rule.** Cards, fields, chips and buttons never carry a shadow. A surface earns a shadow only when it floats over other content.

## Shapes

Soft and consistent by role: 8px (`lg`) for buttons, 12px (`xl`) for form fields, choice cards and icon boxes, 16px (`2xl`) for the header bar and the content cards (contact, proof), 24px (`3xl`) for the ink band, a full circle for numbered steps and the avatar, a full pill for tag chips. Borders are always 1px hairlines. The other geometry: a 1px teal gradient underline under the active nav link, a faint 200px square grid behind the home hero (hidden below `sm`), and 1px rails between numbered steps.

## Components

### Header Bar
- **Structure:** a fixed bar retired 12px (16px from `lg`) from the sheet edge and padded by the same amount, so « Maxime Derycke » (DM Sans semibold, Ink) sits on the content vertical. Then the nav links (Offres & tarifs, À propos), then the compact primary button « Prendre rendez-vous → » on the right, on every page including /contact/ (`aria-current` there). There is no « Contact » link: the button is the way in.
- **Nav links:** 0.875rem medium `slate`, hover to Ink (colour only), the current page in Drafting Teal Ink with the 1px teal underline and `aria-current="page"`. Every target is 44px tall.
- **Mobile:** the bar keeps the name and a 44px burger icon that morphs into a cross. The menu is a disclosure, not a modal: the bar grows downward (rows 0fr → 1fr and opacity, 300ms ease-out), turns opaque, and a blurred 20% zinc scrim covers the page. It lists Accueil, the nav links (48px rows, current one with a teal dot and semibold) and a full-width primary button. Closed, the panel is `inert`. Escape closes it and returns focus to the burger; a tap on the scrim or a link closes it; widening to `sm` closes it. The page behind does not scroll while it is open.
- **Skip link:** « Aller au contenu », visible on focus only, first in the page, targets `main`.

### Buttons
- **Primary:** Ink fill, white text 0.875rem medium, 8px radius, 44px tall, a 16px arrow on the right that slides 2px on hover. Hover shifts to Graphite; pressing nudges it down 1px.
- **Primary compact (header only):** 36px tall, with a pseudo-element that extends the hit area to 44px.
- There is no secondary filled button and no teal button.

### Links
- **Arrow link** (`ArrowLink`): the only action link. Ink medium 0.875rem, a trailing arrow that slides 2px, underline on hover, 44px hit area.
- **Inline link** (`inlineLink`): inside running text, always underlined (Ink, 30% decoration, 4px offset), the decoration darkens on hover.

### Contact Card
- **Style:** full width, Paper Tint fill, 1px `hairline` border, 16px radius, 1.75rem to 3rem padding. From `lg`, the heading and one sentence on the left 7 columns, the action on the right.
- **Content:** default heading « Vous avez un projet ? Parlons-en. », the primary button, and below it the reassurance in a label with a teal dot: « 30 min · au téléphone ou sur place ». /renfort/ replaces the action with an e-mail button and the Malt link. The free first meeting is never labelled « offert ».

### Proof Card (home)
- Paper Tint, 16px radius, title « Avant / après » with the mission date in a label; two rows « Avant » (body in `slate`) and « Après » (a teal dot, body in Ink). It is opaque so the hero grid never runs behind its text.

### Ink Band (home)
- The one strong moment of the home: Ink fill, 24px radius, generous padding; heading in white on the left, the two means on the right as Title + body in `zinc-300`, separated by `white/10` rules. Only one per page.

### Feature List (home)
- Four items side by side from `lg` (two from `sm`): a 44px icon box (12px radius, hairline border, 20px line icon in Graphite, 1.5 stroke), a medium title, a body-small detail.

### Numbered Rail
- Steps numbered because the order matters: a 32px circle with the number in a label, the first step ringed in teal, the others in `hairline`; a 1px `hairline` rail links them. Vertical on /offres/ (with prices aligned right) and on mobile; horizontal from `lg` on the home.

### Chips
- Full pill, 1px `hairline` border, no fill, `pencil` label. Used for the stack list on Renfort technique. Static.

### Inputs / Fields
- **Style:** 1px `hairline` border, white, 12px radius, at least 44px tall, text 1rem (0.875rem from `md`), placeholder in `zinc-400` (examples only, labels carry the meaning).
- **Focus:** the border and a 1px ring turn Drafting Teal Ink (2px in all, about 5.4:1); no offset outline.
- **Error:** `red-500` border (`red-600` border + ring on focus) and a `red-700` message tied with `aria-invalid` and `aria-describedby`. The send error is a `role="alert"` line that names the cause and offers the address; entered data is kept.
- **Labels:** DM Mono label in `pencil` above the field, tied with `htmlFor`; fields declare `autocomplete` and length limits that match the API.

### Choice Cards (form)
- Real radio inputs in a `radiogroup` (call or visit). 12px radius, 1px border; selected has a Drafting Teal border with the wash fill, and an Ink dot in the radio ring carries the state without relying on colour. Focus shows the 2px ink outline around the card.

### Avatar
- A round portrait (64px, 80px from `sm`) with a 1px `hairline` ring, at the top of the home hero only. It renders from `src/assets/avatar.*`; without that file the hero shows no avatar.

## Do's and Don'ts

### Do:
- **Do** align every page to the sheet grid (`px-6`, `lg:px-8`): name, `h1` and footer on one vertical.
- **Do** build inner pages with `Page`, `PageIntro`, `Section` and end them with `ContactCard`; take sizes from `src/lib/typography.ts`.
- **Do** set metadata in DM Mono at 0.75rem in `pencil`.
- **Do** use teal only as a stroke, dot, border or short label, per The Drafting Pen Rule.
- **Do** give every interactive element a 44px target and keep the global 2px ink focus outline (fields use the teal-700 border + ring instead).
- **Do** keep motion to the home load sequence (600ms exponential ease-out, 70ms stagger, CSS only, content visible by default), the menu disclosure and small hover nudges, all cut under `prefers-reduced-motion`.
- **Do** write template comments as `{/* … */}` so they never ship in the HTML.

### Don't:
- **Don't** fill a button, card or heading with teal, or add a second accent hue.
- **Don't** add shadows to cards, buttons, fields or chips.
- **Don't** use a mono eyebrow above a heading or as the only title of a section.
- **Don't** centre an inner page in a narrow column with empty space on both sides.
- **Don't** use a component library (shadcn, ReUI, etc.); components are custom Tailwind.
- **Don't** add count-ups, carousels or a motion library; don't introduce a dark mode or a weight heavier than 600.
