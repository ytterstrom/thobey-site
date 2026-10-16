---
name: Thobey Solutions
description: Personal consulting site of Thomas Ytterström, system architect and tech lead
colors:
  slate-ink: "#262936"
  slate-raised: "#313544"
  signal-coral: "#df5c65"
  signal-coral-hover: "#ea7880"
  signal-coral-deep: "#b8434c"
  dot-peach: "#e8ab92"
  paper: "#f4f5f8"
  mist: "#b3b5c2"
  slate-soft: "#3d4050"
  coral-ink: "#1d1f29"
  peach-muted-ink: "#4a3d3f"
  chip-grey: "#e4e6ee"
typography:
  monument:
    fontFamily: "Montserrat, Montserrat Fallback, Segoe UI, system-ui, sans-serif"
    fontSize: "calc((100cqi - 2 * var(--margin)) / 12.48)"
    fontWeight: 500
    lineHeight: 0.8
    letterSpacing: "0.12em"
  headline:
    fontFamily: "Big Shoulders, Big Shoulders Fallback, Arial Narrow, sans-serif"
    fontSize: "clamp(2.75rem, 1.6rem + 4vw, 5rem)"
    fontWeight: 500
    lineHeight: 0.9
    letterSpacing: "-0.005em"
  title:
    fontFamily: "Public Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem)"
    fontWeight: 600
    lineHeight: 1.2
  lead:
    fontFamily: "Public Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem)"
    fontWeight: 400
    lineHeight: 1.4
  body:
    fontFamily: "Public Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Public Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1
rounded:
  none: "0"
  full: "50%"
spacing:
  margin: "max(clamp(1rem, 2.2vw, 2rem), (100vw - 90rem) / 2)"
  gap: "clamp(1.25rem, 2vw, 2rem)"
  section: "clamp(6rem, 11vw, 9.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.signal-coral}"
    textColor: "{colors.coral-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "1rem 1.75rem"
  button-primary-hover:
    backgroundColor: "{colors.signal-coral-hover}"
  topic-chip:
    backgroundColor: "transparent"
    borderColor: "{colors.slate-soft}"
    textColor: "{colors.slate-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.875rem 1.125rem"
    height: "44px"
  topic-chip-hover:
    backgroundColor: "{colors.chip-grey}"
  topic-chip-selected:
    backgroundColor: "{colors.signal-coral}"
    textColor: "{colors.coral-ink}"
  portrait:
    rounded: "{rounded.full}"
    width: "clamp(10rem, 19vw, 18rem)"
---

# Design System: Thobey Solutions

## Overview

**Creative North Star: "The Nameplate"**

The name is cast large, like lettering on a building: "Thobey Solutions" set in the logo's own lettering, wide geometric capitals (Montserrat) that span the full width of the hero, sized by container query so it always fits edge to edge. "Solutions" takes the logo's peach. Everything beneath it is calm and factual. The page is a sequence of full-bleed colour bands (slate, peach, slate, paper, slate) on one shared twelve-column grid, and each band does one job.

Colour comes from the logo: a slate ink ground, a single coral signal, and a peach field. Coral is rare and decisive: buttons, list dots, focus rings, the selected chip. Display type is always Big Shoulders in capitals; reading type is always Public Sans. There are no shadows, no rounded corners outside the portrait, and no decoration that isn't the logo's own dots.

Motion is restrained and physical: the monument rises in, text lifts, the logo's dots draw their ring one after another, and buttons press in. Everything is visible without JavaScript and without motion.

**Key Characteristics:**
- Full-width monumental name and email address, fitted to the container.
- Full-bleed colour bands on one twelve-column grid with shared margins.
- One accent (Signal Coral), used sparingly.
- Square, flat components; the circular portrait is the only curve besides the dots.
- Big figures carry the proof; adjectives don't.

## Colors

A dark slate ground with one coral signal and a warm peach field, all taken from the logo.

### Primary
- **Signal Coral** (`signal-coral`): the only accent. Primary buttons, list bullets, focus outlines, text selection, the selected topic chip, link underline on hover. Hover lifts to `signal-coral-hover`; on light paper the hover text tone is `signal-coral-deep`.

### Secondary
- **Dot Peach** (`dot-peach`): the field colour. The Selected Work band, the body background behind the page, and the word "Solutions" in the hero name. Text on it is `slate-ink`, with `slate-soft` for units and `peach-muted-ink` for the client list.

### Neutral
- **Slate Ink** (`slate-ink`): the dominant ground for hero, services, about and footer; also the text colour on paper and peach.
- **Slate Raised** (`slate-raised`): a raised slate surface, available but rarely used.
- **Paper** (`paper`): primary text on slate, and the ground of the Contact band.
- **Mist** (`mist`): secondary text on slate (lead lines, nav links, side-fact labels, footer columns).
- **Slate Soft** (`slate-soft`): quiet text on light grounds (units under figures, hints).
- **Coral Ink** (`coral-ink`): text on coral.
- **Chip Grey** (`chip-grey`): hover fill of the outlined topic chips on paper.

### Named Rules
**The One Signal Rule.** Signal Coral is the only accent. It marks what to act on or where you are, never large decorative areas.

**The Band Rule.** Each section is one full-bleed colour band. Bands alternate slate with a light field (peach or paper); two light bands never touch.

## Typography

**Logo Font:** Montserrat (with Montserrat Fallback, Segoe UI, system-ui, sans-serif)
**Display Font:** Big Shoulders (with Big Shoulders Fallback, Arial Narrow, sans-serif)
**Body Font:** Public Sans (with Segoe UI, system-ui, sans-serif)

**Character:** The hero name echoes the logo's wide, geometric, widely tracked capitals. Below it, a tall, condensed signage face in capitals carries headlines and numbers against a sober, public-service grotesque that explains plainly.

### Hierarchy
- **Monument** (Montserrat 500, 0.12em tracking, fitted to container width, line-height 0.8, uppercase): the name in the hero, matching the logo. Sized as container width minus margins divided by the text's em-width, so it spans edge to edge. The email address in Contact is the same idea in Big Shoulders 400.
- **Headline** (500, `clamp(2.75rem, 1.6rem + 4vw, 5rem)`, line-height 0.9, uppercase): section headings and the big figures in Selected Work (with tabular numerals).
- **Title** (Public Sans 600, lead size, 1.2): offer headings and the hero role line.
- **Lead** (400, lead size, 1.4): intro notes, about text, client list. Max about 34–44ch.
- **Body** (400, fluid ~17–19px, 1.55): running text, max about 54ch.
- **Label** (600, 0.875rem): nav, chips, side-fact labels, footer.

### Named Rules
**The Capitals Rule.** Big Shoulders is always uppercase and only used for the email monument, section headlines and figures. Montserrat is only used for the hero name, in widely tracked capitals like the logo. Public Sans is never set in capitals.

**The Fit Rule.** Monumental lines are fitted to the container, never wrapped. If the text changes, recompute its em-width (`--fit-name`, the `.email` divisor) and the `size-adjust` of the metric-matched Arial stand-ins ("Big Shoulders Fallback", "Montserrat Fallback"), so the lines keep their width before and without the web fonts.

## Layout

One twelve-column grid (`gap` column gap) inside shared side margins (`margin`, which grows to centre a 90rem measure on wide screens). Sections use subgrid so headings, notes and content align to the same columns: intro heading on columns 1–7 with its note on 9–12; offers span six columns each; facts span four each; about places side facts on 1–4 and the text on 5–12. Vertical rhythm comes from `section` padding.

The hero opens with the bar, then the monument directly beneath it, then the role, lead and a one-line facts strip (years, stack, where) beside the portrait. Contact sizes to its content: intro, topic chips and the live subject line, generous space, then the email address as the bottom monument with the contact list (copy button first) beneath its descenders.

Under 47.5em the phone gets its own composition: one column, the portrait centred above the text, the monument moved up under the bar, optional nav items hidden, and side facts in two columns.

## Elevation & Depth

Completely flat. There are no shadows. Depth comes from the colour bands alone, with the sticky-looking page sitting over the peach body background.

### Named Rules
**The Flat Rule.** No box-shadow, no blur, no gradients. Separation is done by changing the band colour.

## Shapes

Square corners everywhere (radius 0) on buttons, chips and bands. The only curves are circles: the portrait, the bullet dots in the offer lists, and the logo's own dots. Bullets are 7px coral circles.

## Components

### Buttons
- **Shape:** square (0 radius).
- **Primary:** solid Signal Coral with Coral Ink text, 600 weight, `1rem 1.75rem` padding (smaller in the nav).
- **Hover / Focus:** lightens to `signal-coral-hover`; presses to 97% scale on active; 3px coral focus outline with 3px offset.

### Chips (topic toggles)
- **Style:** outlined in 1px Slate Soft on paper (Chip Grey fill on hover), Slate Ink label, 600 small text, 44px minimum height, a leading "+" glyph.
- **State:** selected turns Signal Coral with a "−" glyph (`aria-pressed`); presses to 96% on active. The general topic (`data-solo`) never combines with the others: picking it clears them, picking another clears it.
- **Subject line:** beneath the chips, "Subject: …" shows the subject the email will open with, updated live.

### Copy button
- A compact primary button ("Copy address") leads the contact list, the one coral element in Contact until a chip is selected. It copies the address, reads "Copied" for two seconds and announces it through a status region. Hidden without JavaScript or clipboard support.

### Navigation
- Small text in Mist, turning Paper on hover; the language switch in Paper 600; a compact coral "Email me" button at the end. On phones, optional links are hidden.

### Lists
- Offer lists have no markers except a small coral dot; items slide in from the left one after another.

### Signature: The Monument
The name (hero, in the logo's Montserrat capitals) and the email address (contact, in Big Shoulders) fitted edge to edge. Letters rise in on load; on the email, the domain nudges right and the colour deepens on hover.

### Signature: The Dot Ring
The logo's dots animate in sequence: in the header on load and in the footer wordmark when it scrolls into view; they pulse on header hover.

## Do's and Don'ts

### Do:
- **Do** take every colour from the logo palette above.
- **Do** keep Signal Coral to actions, markers and focus.
- **Do** set section headlines and figures in uppercase Big Shoulders, and everything else in Public Sans.
- **Do** align new content to the twelve-column grid and shared margins.
- **Do** keep everything visible without JavaScript and respect `prefers-reduced-motion`.

### Don't:
- **Don't** add shadows, gradients or rounded corners.
- **Don't** add a second accent colour.
- **Don't** wrap monumental lines; fit them instead.
- **Don't** put two light bands (peach, paper) next to each other.
