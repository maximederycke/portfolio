---
name: Portfolio Maxime Derycke
description: A calm, flat, zinc-and-white portfolio set like a technical letter, with one drafting-pen teal for state and place.
colors:
  drafting-teal: "oklch(70.4% 0.14 182.503)"
  drafting-teal-wash: "oklch(98.4% 0.014 180.72)"
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
    letterSpacing: "0.1em"
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
  stack: "0.75rem"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: "0.625rem 1.25rem"
  button-primary-hover:
    backgroundColor: "{colors.graphite}"
  button-text:
    textColor: "{colors.pencil}"
    typography: "{typography.body-sm}"
  button-text-hover:
    textColor: "{colors.slate}"
  select-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.xl}"
    padding: "0.875rem 1rem"
  select-card-selected:
    backgroundColor: "{colors.drafting-teal-wash}"
    textColor: "{colors.ink}"
  field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "0.625rem 1rem"
  mode-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.pencil}"
    rounded: "{rounded.2xl}"
    padding: "{spacing.card-pad}"
  mode-card-tinted:
    backgroundColor: "{colors.paper-tint}"
  chip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.pencil}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "0.25rem 0.75rem"
  nav-pill:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.graphite}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.full}"
  nav-link-active:
    textColor: "{colors.drafting-teal}"
---

# Design System: Portfolio Maxime Derycke

## Overview

**Creative North Star: "The Technical Letter"**

The site reads like a well-typeset professional letter from an engineer: white paper, one sans voice, thin rules instead of boxes-with-shadows, small mono annotations in the margins, and a single drafting-pen teal that marks where you are or what you chose. Nothing performs. Restraint is the credential: the calm hierarchy tells a PME owner the work will be orderly, and the mono detailing tells a tech lead the author is technical.

The mood is calm, precise, unhurried. Space does most of the structural work; borders are hairlines; type weight and size carry hierarchy. Color is rationed to the point that the teal accent is noticed when it appears. The one place the system allows atmosphere is the home hero, where a faint hairline drafting-grid sits behind the headline. Motion is one authored moment, not a coat of effects: on load the sheet is ruled (the grid is swept in left to right) and the hero is set down in reading order, then the list rules draw as they scroll into view.

**Key Characteristics:**
- Light-only, white paper with zinc ink; no dark mode.
- Flat surfaces with hairline zinc borders; shadow exists only on the floating header elements.
- One sans (DM Sans) for reading, one mono (DM Mono) for labels, tags and metadata.
- Generous rounding (8-16px) and pill forms for floating and tag elements.
- Teal is a marker of state and place, never a fill or a headline color.

## Colors

A near-monochrome zinc palette (Tailwind v4 defaults, hue ~286° at very low chroma) plus one teal. The canonical values are Tailwind v4's `oklch` tokens; `CLAUDE.md` still lists the v3 hex `#14B8A6`, which is not what renders.

### Primary
- **Drafting Teal** (oklch(70.4% 0.14 182.503), Tailwind `teal-500`, about `#00BBA7`): the drafting-pen mark. Active and hovered nav links, the form progress line, the border of a selected choice or a focused field, the availability dot before "Disponible…", and the "Message envoyé" mono status label. Never a button fill, never body text.
- **Drafting Teal Wash** (oklch(98.4% 0.014 180.72), `teal-50`, used at 50% opacity): the fill behind a selected choice card.

### Neutral
- **Ink** (oklch(21% 0.006 285.885), `zinc-900`): headlines, primary button fill, selected labels.
- **Graphite** (oklch(37% 0.013 285.805), `zinc-700`): primary-button hover, unselected card labels.
- **Slate** (oklch(44.2% 0.017 285.786), `zinc-600`): lead paragraphs, list items, text-link hover, social-icon hover.
- **Pencil** (oklch(55.2% 0.016 285.938), `zinc-500`): default secondary text, mono labels, inactive nav, social icons at rest.
- **Placeholder** (oklch(70.5% 0.015 286.067), `zinc-400`): input placeholder text only.
- **Hairline** (oklch(92% 0.004 286.32), `zinc-200`): all borders on cards, fields, chips and the nav pill; the hero grid strokes.
- **Hairline Faint** (oklch(96.7% 0.001 286.375), `zinc-100`): footer rule and form progress track.
- **Paper Tint** (oklch(98.5% 0 0), `zinc-50`): the second collaboration card, the mobile menu's active row, and the ground around the page sheet from `lg`.
- **Paper** (#ffffff): the page sheet.

### Error
- **Error** (oklch(63.7% 0.237 25.331), `red-500`; softer `red-400` / `red-300` for inline hints and invalid borders): form errors only.

### Named Rules
**The Drafting Pen Rule.** Teal marks state and place ("you are here", "this is chosen", "we are 3 of 5"). It is used in small strokes, borders and short mono labels, never as a surface. If a screen has more than a few teal marks, remove some.

**The Paper Rule.** Everything that is not teal or an error is zinc on white. No second hue joins the system.

## Typography

**Display / Body Font:** DM Sans Variable (with `system-ui, sans-serif`), optical sizing on, antialiased
**Label / Mono Font:** DM Mono (weights 300, 400, 500; with `ui-monospace, monospace`)

**Character:** A friendly geometric sans for reading paired with a matching mono for the "typewriter margin". Hierarchy comes from size and weight (semibold 600 for headings, regular for text), not from colour or decoration.

### Hierarchy
- **Display** (600, 3rem, line-height 1, tracking -0.025em): the large stat numbers. The home hero headline is a full sentence, so it runs one step down (2.25rem, 3rem from `sm`, balanced wrapping).
- **Headline** (600, 1.875rem, line-height ~1.2, tracking -0.025em): page titles (`h1`) and home section headings.
- **Title** (600, 1.25rem): card titles ("Agile", "Forfait"). Form step titles are a step down (500, 1.125rem).
- **Body** (400, 1rem, relaxed 1.625): lead and long-form text in `slate` or `pencil`; the home lead runs at 1.25rem in `slate`. Line length is capped by the container (`max-w-xl` to `max-w-2xl`).
- **Body Small** (400, 0.875rem, relaxed): card copy, list items, buttons, nav.
- **Label** (DM Mono 400, 0.75rem, tracking 0.1em, uppercase for section labels): section eyebrows, tags, timeline dates, step counters, footer copyright. Sentence case (no uppercase) for status labels and counters.

### Named Rules
**The Margin Note Rule.** Anything that is metadata (dates, tech tags, step counters, status) is set in DM Mono at label size in `pencil`. Anything that is meaning is set in DM Sans.

## Layout

A single white sheet, like a letter on a desk: from `lg` it is framed by a 1px `hairline-faint` ring on a Paper Tint ground (up to `max-w-7xl`, 2rem outer gutters), and below `lg` it is simply the white page. Header, content and footer all sit on the sheet; only the floating nav pill lives above it. Inner pages sit in a `max-w-3xl` (48rem) column with 1.5rem side gutters and 4rem vertical section padding; the home page opens to `max-w-7xl` with 2rem gutters at `lg`, with hero text held to `max-w-2xl`, and the contact form is held to `max-w-xl`. The home hero is a single left-aligned column with the drafting grid behind it; the grid fades out before the hero ends, so its lines never run behind text or cards. Below the hero the home splits into two columns from `lg`: the work on the left (who, what is built, how the collaboration runs) and flat cards on the right (Parcours with the two figures, then the contact card). On mobile the right column stacks after the left, so the contact card closes the page.

Content is stacked with generous, uneven rhythm: 3.5rem between About blocks, 2rem to 3rem between headings and their content, 0.75rem between selectable cards. Two-up layouts use a simple two-column grid that collapses to one column below `sm`; the two collaboration cards share row tracks via subgrid so their internal sections align. Below `sm` the desktop nav pill becomes a "Menu" button that opens a modal panel. The header is fixed, so `main` reserves `4rem` at the top.

## Elevation & Depth

Flat by default. Depth is conveyed by hairline borders (`hairline`), a one-step tint on the second card (`paper-tint`), and whitespace. The only shadows are on the floating header elements (the home avatar circle, the desktop nav pill and the mobile Menu button) because they overlay scrolling content: one soft shadow tinted from the ink (`0 10px 15px -3px rgb(39 39 42 / 0.05), 0 4px 6px -4px rgb(39 39 42 / 0.05)`) plus a 1px ring at 5% ink. They use a 90% white fill with a backdrop blur. The mobile menu panel is a modal card with a 1px ring and no shadow, over a 40% zinc scrim with a light blur.

### Named Rules
**The Flat-By-Default Rule.** Cards, fields, chips and buttons never carry a shadow. A surface earns a shadow only when it floats over other content.

## Shapes

Soft, generous, and consistent by role: 8px (`lg`) for buttons, 12px (`xl`) for form fields and selectable choice cards, 16px (`2xl`) for large content cards, 24px (`3xl`) for the mobile menu panel, and a full pill for the desktop nav, the mobile Menu button, the header avatar circle and tag chips. Borders are always 1px hairlines. The only other geometry is a 1px gradient underline under the active nav link (teal fading to transparent at both ends) and a faint 200px square grid behind the home hero, masked with a radial fade and a vertical fade so it ends with the hero.

## Components

### Buttons
- **Shape:** gently curved (8px), 0.875rem medium-weight text, padding 0.625rem 1.25rem.
- **Primary:** Ink fill, white text. Hover shifts to Graphite over 150ms. Disabled drops to 40% opacity with a not-allowed cursor.
- **Text button / link:** no fill or border, `pencil` text with a trailing arrow ("Voir les services →", "← Retour"), hovering to `slate`. On the services cards the CTA is Ink text that softens to `pencil` on hover.
- There is no secondary filled button and no teal button.

### Chips
- **Style:** full pill, 1px `hairline` border, no fill, `pencil` DM Mono at label size, padding 0.25rem 0.75rem. Used for the stack list on About. Static, non-interactive.

### Cards / Containers
- **Corner Style:** 16px.
- **Background:** white; the second collaboration card uses `paper-tint`.
- **Shadow Strategy:** none (see Elevation).
- **Border:** 1px `hairline`; the "Pas sûr ?" block uses the fainter `hairline-faint`.
- **Internal Padding:** 1.75rem on the services page, 1.5rem on the home summary.

### Sidebar Cards
- **Style:** the right-column cards on the home: 16px radius, 1px `hairline` border, transparent fill, 1.5rem padding, flat.
- **Header:** a 20px inline line icon (1.5 stroke, `placeholder` colour) plus a 0.875rem semibold Ink title. Rows below use a medium 0.875rem title, a 0.75rem `pencil` detail, and DM Mono dates aligned right.
- **Action:** a text link with a trailing arrow, or a full-width primary button in the contact card.

### Avatar (optional)
- **Style:** a round portrait (64px, 80px from `sm`) with a 1px `hairline` ring, placed above the status label in the hero. It renders only when `src/assets/avatar.{jpg,jpeg,png,webp}` exists, so nothing shows until a photo is added.

### Inputs / Fields
- **Style:** 1px `hairline` border, white, 12px radius, padding 0.625rem 1rem (0.75rem vertical on the textarea), text 1rem on mobile and 0.875rem from `md`, `placeholder` in zinc-400.
- **Focus:** the outline is removed and the border turns Drafting Teal over 150ms. This is the only focus indicator on fields, so it is a single hairline color change.
- **Error:** invalid email switches the border to the soft red and adds a 0.75rem red hint below.
- **Labels:** DM Mono label in `pencil`, above the field.

### Choice Cards (form)
- **Style:** full-width, left-aligned, 12px radius, 1px border; a title in 0.875rem medium and a `pencil` description below.
- **State:** unselected has a `hairline` border that darkens slightly on hover; selected has a Drafting Teal border with the wash fill at 50%, and the title moves from Graphite to Ink.

### Navigation
The header is a three-part row over the sheet, modelled on the Tailwind UI Spotlight header: a round avatar on the left, the navigation centred, and nothing on the right (it only keeps the pill centred).
- **Home link:** a 40px round button (ring plus soft shadow) holding the portrait, or an "M" monogram until a photo exists. It is hidden on the home, where the portrait sits in the hero. There is no "home" item inside the pill.
- **Desktop:** a floating white pill (90% opacity, backdrop blur, 1px ink-5% ring, soft shadow) listing À propos, Services and Contact in 0.875rem medium `graphite`. Hover and the current page turn Drafting Teal, and the current page gets a 1px teal-to-transparent underline; it also carries `aria-current="page"`.
- **Mobile:** a "Menu" pill with a small chevron on the right. It opens a modal panel (native `<dialog>`, so focus is trapped and Escape closes it): 24px radius, 2rem padding, a "Navigation" title with a close button, and a list of large links separated by `hairline-faint` rules. The current page is set in semibold Ink, with no coloured side border. The page behind does not scroll while it is open.

### Progress (form)
- **Style:** a 1px track in `hairline-faint` with a 1px Drafting Teal fill that grows over 300ms; below it a mono counter "Étape n / N" in `pencil`.

### Status Label
- **Style:** a short DM Mono line above a headline. On the home it reads "Disponible pour de nouvelles missions" in `slate` with a 6px Drafting Teal dot as the state marker (so text contrast holds); the form success "Message envoyé" is still set in teal text. Labels, not links.

## Do's and Don'ts

### Do:
- **Do** keep surfaces white or `paper-tint`, with 1px `hairline` borders for structure.
- **Do** set metadata (dates, tags, step counters, status) in DM Mono at 0.75rem in `pencil`.
- **Do** use teal only as a stroke, border, short label or hover/active text color, per The Drafting Pen Rule.
- **Do** reserve shadows for surfaces that float over content (the header avatar, nav pill and Menu button).
- **Do** match radius to role: 8px buttons, 12px fields and choice cards, 16px content cards, full pill for nav and tags.
- **Do** give social icons `pencil` at rest and `slate` on hover, not teal. Their hit area is 44px even though the glyph is 18-20px.
- **Do** keep motion to one sequence (the home load) plus scroll-drawn list rules: 600ms exponential ease-out, 70ms stagger, about 1s in total, CSS only, with content visible by default and a plain 250ms fade under `prefers-reduced-motion`.
- **Do** keep the global 2px `ink` focus outline (2px offset) on every focusable element; fields replace it with the teal border. Selected text uses the `teal-100` wash on `ink`.

### Don't:
- **Don't** fill a button, card or heading with teal, or add a second accent hue.
- **Don't** add shadows to cards, buttons, fields or chips.
- **Don't** use a component library (shadcn, ReUI, etc.); components are custom Tailwind.
- **Don't** set body or paragraph text in teal.
- **Don't** animate the nav, stat numbers or cards, add count-ups or carousels, or load a motion library.
- **Don't** introduce a dark mode or a heavier type weight than 600.
