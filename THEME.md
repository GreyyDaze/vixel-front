# Theme Reference

CSS variables in `src/app/globals.css` under `@theme inline`.

---

## Colors

### Text
| Class | Value | Usage |
|---|---|---|
| `text-text-primary` | `#111` | Headings, names, values, body |
| `text-text-secondary` | `#666` | Descriptions, stat labels, secondary info |
| `text-text-tertiary` | `#7C7C7C` | Timestamps, metadata, subtle labels |
| `text-text-conversation` | `#333` | Chat transcript body |

### Brand
| Class | Value | Usage |
|---|---|---|
| `text-brand-blue` / `bg-brand-blue` | `#002FD2` | Accent text, icon containers, active indicators |
| `bg-brand-light` | `#F4F7FF` | Row highlight (new/active call) |
| `bg-brand-tint` | `#E0E7FF` | Status chip/badge background |
| `ring-blue` | `#4B6FE8` | Ringing/active call indicators |

### Backgrounds
| Class | Value | Usage |
|---|---|---|
| `bg-page-bg` | `#FDFDFC` | Page body |
| `bg-sidebar-bg` | `#FBFBFA` | Sidebar panel |
| `bg-card-active` | `#faf8f4` | Active/hovered card |
| `bg-card-warm` | `#F6F4F0` | Warm neutral card bg |
| `bg-avatar-bg` | `#F0F0F0` | Avatar placeholder circles |
| `bg-element-bg` | `#111` | Dark element bg (active nav, dark avatars) |

### Borders & Shadows
| Class | Value | Usage |
|---|---|---|
| `border` | `oklch(0.922 0 0)` | All standard borders |
| `border-card-border` | `#D0D0D0` | Card outer container borders (three-step cards) |
| `border-border-light` | `#E5E5E5` | Light card borders (use case cards) |
| `border-inset-border` | `#E2E1DD` | Card inner dividers |
| `shadow-card` | `0 1px 2px rgba(0,0,0,0.04)` | All card shadows |

### Semantic / Utility
| Class | Value | Usage |
|---|---|---|
| `text-green` | `#50A45A` | Success states, positive metrics |

---

## Font Sizes

Use Tailwind's built-in scale where possible.

| Class | Size | Usage |
|---|---|---|
| `text-xs` | 12px | Labels, metadata, timestamps |
| `text-sm` | 14px | Body text, descriptions |
| `text-lg` | 18px | Standout stat values |
| `text-xl` | 20px | Card section titles |
| `text-3xl` | 30px | Large emphasis text |
| `text-[36px] lg:text-[44px]` | — | Section headings |

Custom sizes without Tailwind equivalents: `9px`, `9.5px`, `10px`, `10.5px`, `11px`, `11.5px`, `13px`, `13.5px`, `14.5px`, `15px`, `17px`, `24px`, `42px`, `52px`.

---

## Border Radius

| Class | Size | Usage |
|---|---|---|
| `rounded-md` | 6px | Cards, inputs, inner containers |
| `rounded-lg` | 8px | Outer card containers, panels |
| `rounded-full` | — | Avatars, pills, badges |

Phone mockup uses custom radii (`[20px]`, `[16px]`, `[14px]`, `[5px]`).

---

## Layout Conventions

These are consistent by convention, not variables.

| Pattern | Used in |
|---|---|
| `max-w-[1320px] mx-auto px-8 lg:px-16` | Header, HowItWorks, RealSituations, FAQ, Security, Footer |
| `mb-11` (44px) | Section-to-section spacing via margin (all sections) |
| Section heading + `.mb-16` + `.max-w-[640px]` | HowItWorks, RealSituations, FAQ |
| `gap-2` / `gap-2.5` | Standard flex/grid spacing |
| `gap-1.5` | Tight spacing (icon + text) |

### Section spacing pattern
Use `mb-11` (44px) on each `<section>` for consistent spacing between sections. Internal top padding varies by section:
- `pt-[105px]` — HowItWorks
- `pt-24` — RealSituations, Security, FAQ, CTA
- `pt-32 lg:pt-40` — ProblemStatement (first content section after Hero)

Footer is the last element — no `mb-11`, uses `pt-12 pb-12` internally.

---

## Reusable Components

### `SectionHeading`
Standard section heading across the landing page. Used in HowItWorks, RealSituations, Security, FAQ.

```tsx
<SectionHeading className="mb-4">{COPY.section.headline}</SectionHeading>
```

Renders `<h2>` with `text-[36px] lg:text-[44px] leading-[1.1] tracking-[-0.02em] font-medium text-text-primary`.

### `StatusChip`
Small status badge for call states. Two sizes, two variants.

```tsx
<StatusChip size="md" variant="active">Handling</StatusChip>
<StatusChip size="sm" variant="inactive">Transferred</StatusChip>
```

| Prop | Options | Default |
|---|---|---|
| `size` | `sm` (9px) / `md` (10px) | `md` |
| `variant` | `active` (brand-blue bg) / `inactive` (tertiary bg) | `active` |

---

## Usage Guidelines

### Status chips
```
bg-brand-tint + text-brand-blue   → active (Booked, Handling, Answering)
bg-element-bg + text-white        → dark avatar initials
bg-avatar-bg + text-text-tertiary → light avatar initials
```

### Row highlights
```
bg-brand-light   → new/active call row
(no bg)          → default row
```

### Cards
```
rounded-lg + shadow-card + border   → outer card container
rounded-md + border                 → inner card sub-container
```

### Inline styles / SVG props
```tsx
<Clock size={14} color="var(--color-text-primary)" />
<path stroke="var(--color-brand-blue)" />
<div style={{ backgroundColor: 'var(--color-card-active)' }} />
```
