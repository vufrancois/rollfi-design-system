# Rollfi Design System

The authored, tokenized source of truth for Rollfi product, partner-portal, and onboarding surfaces — built around a `--rf-*` token system with first-class light and dark themes.

## Quick Start

```tsx
import { ThemeProvider, ToastProvider } from './components';
import './tokens/index.css';

<ThemeProvider defaultTheme="light">
  <ToastProvider>
    <App />
  </ToastProvider>
</ThemeProvider>
```

## Tokens

All tokens use the `--rf-` prefix. They live in `src/tokens/` as CSS custom properties.

### Colors (`colors.css`)

Semantic tokens that flip automatically between light and dark themes. Hex values below are the resolved defaults; every token can be inspected live in the App's library demo "Colors" section.

#### Brand & primary

| Token | Light | Dark | Purpose |
|---|---|---|---|
| `--rf-color-primary` | `#000000` | `#ffffff` | Primary CTA background |
| `--rf-color-primary-hover` | `#1a1a1a` | `#e8e8e8` | Primary hover |
| `--rf-color-primary-pressed` | `#333333` | `#d4d4d4` | Primary pressed |
| `--rf-color-on-primary` | `#ffffff` | `#000000` | Text on primary |
| `--rf-color-brand` | `#FF2F1C` | `#FF2F1C` | Brand accent base (tenant-overridable via `<BrandProvider brand="…">`) |
| `--rf-color-brand-hover` | derives — `color-mix(brand 88%, black)` | derives — `color-mix(brand 80%, white)` | Brand hover |
| `--rf-color-brand-soft` | derives — `color-mix(brand 10%, transparent)` | derives — `color-mix(brand 14%, transparent)` | Brand-tinted background |
| `--rf-color-brand-text` | derives — `color-mix(brand 92%, black)` | derives — `color-mix(brand 70%, white)` | Brand text/link color |
| `--rf-color-brand-border` | derives — `color-mix(brand 25%, transparent)` | derives — `color-mix(brand 30%, transparent)` | Brand-tinted border |

#### Surfaces & borders

| Token | Light | Dark |
|---|---|---|
| `--rf-color-canvas` | `#f9f9fa` | `#0a0a0b` |
| `--rf-color-surface` | `#ffffff` | `#121214` |
| `--rf-color-surface-elevated` | `#f2f2f4` | `#1a1a1e` |
| `--rf-color-surface-overlay` | `rgba(0,0,0,0.5)` | `rgba(0,0,0,0.7)` |
| `--rf-color-border` | `#e2e2e6` | `#2a2a2e` |
| `--rf-color-border-subtle` | `#ebebef` | `rgba(255,255,255,0.07)` |
| `--rf-color-border-strong` | `#d0d0d6` | `rgba(255,255,255,0.14)` |
| `--rf-color-border-focus` | `#000000` | `#ffffff` |

#### Text

| Token | Light | Dark |
|---|---|---|
| `--rf-color-text` | `#0a0a0a` | `#f4f4f6` |
| `--rf-color-text-secondary` | `#5E6167` | `#9c9da2` |
| `--rf-color-text-tertiary` | `#8b8d92` | `#6e7075` |
| `--rf-color-text-disabled` | `#b4b6ba` | `#4a4b50` |
| `--rf-color-text-inverse` | `#ffffff` | `#0a0a0b` |
| `--rf-color-text-on-accent` | `#ffffff` | `#ffffff` |

#### Semantic states (each ships `-soft` / `-bg` / `-text` / `-border` siblings)

| Token | Light | Dark | Purpose |
|---|---|---|---|
| `--rf-color-info` | `#3A6DFF` | `#6b93ff` | Info / neutral notification |
| `--rf-color-success` | `#16A34A` | `#22c55e` | Success state |
| `--rf-color-warning` | `#F7DE52` | `#F7DE52` | Warning state |
| `--rf-color-danger` | `#cc1a0a` | `#ff5443` | Danger / destructive |

#### Accent palette (each ships `-soft` / `-text` / `-border`; some add `-bg`)

| Token | Light | Dark | Purpose |
|---|---|---|---|
| `--rf-color-accent-teal` | `#0891B2` | `#22d3ee` | Payroll-ready / status accent |
| `--rf-color-accent-lime` | `#CEFF00` | `#CEFF00` | Highlight accent |
| `--rf-color-accent-orange` | `#FF6905` | `#ff8438` | Highlight accent |
| `--rf-color-accent-purple` | `#9146FF` | `#a76aff` | Highlight accent |

#### Sidebar (overridable via `<BrandProvider sidebar="…">`)

| Token | Default (dark sidebar) | Light sidebar (auto-flip) |
|---|---|---|
| `--rf-color-sidebar` | `#0A0A0A` | tenant-supplied |
| `--rf-color-sidebar-hover` | `color-mix(white 4%, sidebar)` | `color-mix(black 4%, sidebar)` |
| `--rf-color-sidebar-active` | `color-mix(white 8%, sidebar)` | `color-mix(black 8%, sidebar)` |
| `--rf-color-sidebar-text` | `rgba(255,255,255,0.72)` | `rgba(0,0,0,0.78)` |
| `--rf-color-sidebar-text-dim` | `rgba(255,255,255,0.50)` | `rgba(0,0,0,0.55)` |
| `--rf-color-sidebar-text-strong` | `#ffffff` | `#0a0a0a` |
| `--rf-color-sidebar-border` | `rgba(255,255,255,0.08)` | `rgba(0,0,0,0.10)` |

### Typography (`typography.css`)

Use the `font` shorthand with CSS variables — never set individual `font-size`/`font-weight` on components:

```css
font: var(--rf-text-body-md);
```

#### Font families

| Token | Stack | Purpose |
|---|---|---|
| `--rf-font-display` | `'Funnel Display', system-ui, -apple-system, sans-serif` | Display, headings xl/lg, captions, labels |
| `--rf-font-sans` | `'Funnel Sans', system-ui, -apple-system, sans-serif` | Body copy, UI, headings md/sm, buttons |
| `--rf-font-mono` | `'JetBrains Mono', 'Fira Code', monospace` | Code blocks |
| `--rf-font-feature` | `"calt", "kern", "liga"` | OpenType features (contextual alternates + kerning + ligatures) |

Funnel Display + Funnel Sans are loaded via Google Fonts `@import` at the top of `typography.css`. Always apply `font-feature-settings: var(--rf-font-feature)` at the root.

#### Type scale

Each token is a CSS `font` shorthand: `<weight> <size>/<line-height> <family>`.

| Token | Weight | Size | Line height | Family |
|---|---|---|---|---|
| `--rf-text-display-xl` | 600 | 64px | 1.1 | Funnel Display |
| `--rf-text-display-lg` | 600 | 48px | 1.15 | Funnel Display |
| `--rf-text-display-md` | 600 | 36px | 1.2 | Funnel Display |
| `--rf-text-heading-xl` | 600 | 28px | 1.3 | Funnel Display |
| `--rf-text-heading-lg` | 600 | 24px | 1.35 | Funnel Display |
| `--rf-text-heading-md` | 500 | 20px | 1.4 | Funnel Sans |
| `--rf-text-heading-sm` | 500 | 18px | 1.4 | Funnel Sans |
| `--rf-text-body-lg` | 400 | 18px | 1.6 | Funnel Sans |
| `--rf-text-body-md` | 400 | 16px | 1.6 | Funnel Sans |
| `--rf-text-body-md-strong` | 500 | 16px | 1.5 | Funnel Sans |
| `--rf-text-body-sm` | 400 | 14px | 1.6 | Funnel Sans |
| `--rf-text-body-sm-strong` | 500 | 14px | 1.5 | Funnel Sans |
| `--rf-text-body-xs` | 400 | 12px | 1.5 | Funnel Sans |
| `--rf-text-caption` | 400 | 13px | 1.4 | Funnel Display |
| `--rf-text-caption-sm` | 400 | 11px | 1.4 | Funnel Display |
| `--rf-text-label` | 500 | 14px | 1.4 | Funnel Display |
| `--rf-text-button` | 500 | 14px | 1.0 | Funnel Sans |
| `--rf-text-button-sm` | 500 | 13px | 1.0 | Funnel Sans |
| `--rf-text-code` | 400 | 13px | 1.5 | JetBrains Mono |

#### Letter spacing

| Token | Value | Use |
|---|---|---|
| `--rf-tracking-tight` | `-0.01em` | Display headings (negative tracking tightens the eye) |
| `--rf-tracking-normal` | `0` | Default |
| `--rf-tracking-wide` | `0.01em` | Small caps / labels |
| `--rf-tracking-wider` | `0.02em` | Uppercase eyebrows |

### Spacing (`spacing.css`)

8px base grid: `--rf-space-1` (2px) through `--rf-space-16` (96px).

**Radius:** `--rf-radius-xs` (4px) → `sm` (6px) → `md` (8px) → `lg` (12px) → `xl` (16px) → `full` (pill).

**Shadows:** `--rf-shadow-xs` through `--rf-shadow-xl`. Dark theme uses heavier shadows automatically.

## Theming

Themes are applied via `data-theme` attribute on `<html>`. Use the `ThemeProvider` component:

```tsx
const { theme, toggleTheme, setTheme } = useTheme();
```

The provider reads `prefers-color-scheme` on first load and persists the choice to `localStorage`.

### ThemeToggle

A small control that flips light/dark via the active `ThemeProvider`. Two variants:

- `variant="icon"` (default) — a single round button that shows the icon for the theme you'd switch TO (Moon when light, Sun when dark). Best for headers and toolbars.
- `variant="segmented"` — a pill with explicit `Light` / `Dark` choices, ARIA `radiogroup`. Best for settings panels.

```tsx
<ThemeProvider>
  {/* header */}
  <ThemeToggle />
  {/* settings panel */}
  <ThemeToggle variant="segmented" />
</ThemeProvider>
```

Props: `variant?: 'icon' | 'segmented'`, `size?: 'sm' | 'md'`, `ariaLabel?: string`, `className?: string`. Requires a `ThemeProvider` ancestor.

## White-label theming

The design system supports per-tenant white-labelling via `<BrandProvider>`. A tenant can override:

- **Brand accent color** — drives `--rf-color-brand` and every derived variant (`-hover`, `-soft`, `-text`, `-border`)
- **Sidebar color** — drives `--rf-color-sidebar`; sidebar text + overlays auto-flip between light and dark based on the supplied color's WCAG luminance
- **Logo** — a hosted image URL replaces the default Rollfi mark in every `<Logo>` instance under the provider

```tsx
import { ThemeProvider, BrandProvider } from 'rollfi-design-system';

<ThemeProvider>
  <BrandProvider
    brand="#0066ff"
    sidebar="#1a1f2e"
    logoUrl="https://cdn.tenant.com/logo.svg"
    logoTitle="Acme"
  >
    <App />
  </BrandProvider>
</ThemeProvider>
```

Mount once at the app root. Omit any prop to keep the Rollfi default for that token.

### How it works

1. `BrandProvider` writes `--rf-color-brand` and/or `--rf-color-sidebar` as inline custom properties on a wrapper element (uses `display: contents` so layout is untouched).
2. The derived brand variants (`-hover`, `-soft`, `-text`, `-border`) and sidebar overlays are defined in `src/tokens/colors.css` as **CSS `color-mix()` recipes** that read the base. Override the base → every variant re-derives automatically.
3. For light sidebar colors, BrandProvider sets `data-sidebar-mode="light"` on its wrapper. The token rules at the bottom of `colors.css` flip white overlay tints to black and bump text to near-black so the sidebar stays legible.

### Sidebar token reference

When a tenant sets a light sidebar, these tokens auto-flip:

| Token                                | Dark sidebar (default)         | Light sidebar (auto-flip)      |
| ------------------------------------ | ------------------------------ | ------------------------------ |
| `--rf-color-sidebar-text`            | `rgba(255,255,255,0.72)`       | `rgba(0,0,0,0.78)`             |
| `--rf-color-sidebar-text-dim`        | `rgba(255,255,255,0.50)`       | `rgba(0,0,0,0.55)`             |
| `--rf-color-sidebar-text-strong`     | `#ffffff` (hover/active fg)    | `#0a0a0a`                      |
| `--rf-color-sidebar-hover`           | sidebar + 4% white             | sidebar + 4% black             |
| `--rf-color-sidebar-active`          | sidebar + 8% white             | sidebar + 8% black             |
| `--rf-color-sidebar-border`          | `rgba(255,255,255,0.08)`       | `rgba(0,0,0,0.10)`             |

**Custom sidebar slots** (e.g. a user-profile footer, a back-to-library link rendered into Sidebar's `footer` or `logo` slot) must consume these tokens — never `#ffffff` or `rgba(255,255,255,…)` directly — or they'll be invisible under a light-mode tenant theme.

### Brand color recommendations

Pick a brand color with WCAG relative luminance in roughly **0.10–0.45** — this range gives the best contrast both on white and dark surfaces.

- Too light (e.g. `#ffe680`): `brand-text` won't pass AA on white surfaces.
- Too dark (e.g. `#1a1a1a`): brand becomes indistinguishable from regular text.
- Pure-saturated mid-tones (blues, purples, reds, greens) work best.

For accessibility-critical surfaces, manually verify contrast at runtime — or open a future enhancement for auto-computed foreground colors.

### Sidebar luminance threshold

The mode flip happens at relative luminance **0.179** (the WCAG-derived cutoff where black-on-color first beats 4.5:1 contrast). Colors above the threshold are treated as "light"; below as "dark". The choice is deterministic per supplied hex — no interpolation, no flicker.

### Components that pick up the brand

Today: `Pill`, `Calendar` (selected dates), `Docs` (link underlines and quote bars), `Logo` (when using the default SVG mark). Any component you add that uses `--rf-color-brand*` tokens will white-label for free.

### Browser support

Requires `color-mix()` support: Safari 16.4+, Chrome 111+, Firefox 113+ — all shipped in 2023.

## Icons

Rollfi uses [Phosphor Icons](https://phosphoricons.com/) at **regular** weight as the project default. Install:

```bash
npm install @phosphor-icons/react
```

Set the project-wide default once at the root:

```tsx
import { IconContext } from '@phosphor-icons/react';

<IconContext.Provider value={{ weight: 'regular', size: 16 }}>
  <App />
</IconContext.Provider>
```

Then import icons by name and use them inline:

```tsx
import { Envelope, ArrowRight, CheckCircle } from '@phosphor-icons/react';

<Button icon={<ArrowRight />}>Continue</Button>
<Input label="Email" icon={<Envelope />} />
<Alert variant="success" icon={<CheckCircle weight="fill" />}>Saved</Alert>
```

**Sizing convention:**
- 16px — inline with body text, buttons, inputs (default)
- 18px — alerts, list items
- 20–24px — section headers, empty states

**Weight convention:** Always use `regular` (default). The only exception is `fill` for status icons inside Alerts/Toasts — it improves legibility at small sizes against the soft background.

## Components

### Button

```tsx
<Button variant="primary" size="md" loading={false}>Label</Button>
```

**Variants:** `primary` | `secondary` | `tertiary` | `danger` | `ghost`
**Sizes:** `sm` (32px) | `md` (36px) | `lg` (44px)

### Input

```tsx
<Input label="Email" placeholder="you@rollfi.com" error="Required" hint="Help text" />
```

### Select

```tsx
<Select label="Plan" options={[{ value: 'pro', label: 'Pro' }]} placeholder="Choose..." />
```

### Card

```tsx
<Card variant="elevated" padding="md">
  <CardHeader title="Title" description="Subtitle" action={<Button size="sm">Edit</Button>} />
  <p>Content</p>
  <CardFooter><Button>Save</Button></CardFooter>
</Card>
```

**Variants:** `default` | `elevated` | `outlined` | `interactive`

### Table

```tsx
<Table
  columns={[{ key: 'name', header: 'Name', align: 'left' }]}
  data={rows}
  rowKey={row => row.id}
  onRowClick={row => console.log(row)}
/>
```

### Modal

```tsx
<Modal open={isOpen} onClose={() => setOpen(false)} title="Confirm" size="md" footer={<Button>OK</Button>}>
  Content
</Modal>
```

Uses native `<dialog>` with backdrop blur. **Sizes:** `sm` (380px) | `md` (520px) | `lg` (680px).

### Toast

```tsx
const { toast } = useToast();
toast('Saved!', { variant: 'success', duration: 4000 });
```

**Variants:** `default` | `success` | `error` | `warning` | `info`

### Checkbox

```tsx
<Checkbox checked={agreed} onChange={() => setAgreed(!agreed)}>
  I agree to the terms
</Checkbox>
```

**Props:** `checked`, `onChange`, `disabled`, `children` (label text)

### OptionCard

```tsx
<OptionCard
  selected={method === 'direct'}
  onSelect={() => setMethod('direct')}
  title="Direct Deposit"
  description="Receive payments to your bank"
  badge="Recommended"
/>
```

**Props:** `selected`, `onSelect`, `title`, `description?`, `badge?`, `disabled?`

### Feedback family — Alert, Banner, Callout

Three sibling primitives. Pick the one that matches the **shape** of the message, not just the variant:

```tsx
// Inline boxed message inside a form / card / detail view
<Alert variant="warning" icon={<Warning />}>Inaccurate info may delay processing.</Alert>

// Page-level full-width strip (top of view, dashboard, modal)
<Banner variant="danger" icon={<Warning />} action={<Button size="sm">Retry</Button>} dismissible>
  Tax filing submission failed.
</Banner>

// Advisory block with title + explanation (coaching, recommendations)
<Callout variant="info" icon={<Info />} title="Rollfi recommendation">
  Keep approval windows short so reviewers see changes before the deadline.
</Callout>
```

**Variants for all three:** `neutral` | `info` | `success` | `warning` | `danger`.

### SegmentedProgress

```tsx
<SegmentedProgress current={3} total={6} />
```

Multi-step indicator (one segment per step). For continuous fill, use `Progress` below.

### Progress

```tsx
<Progress label="Onboarding" value={3} max={5} variant="success" showValue format={(v, m) => `${v} / ${m} steps`} />
```

Linear filled bar. **Sizes:** `sm` | `md` (default) | `lg`. **Variants:** `default` | `info` | `success` | `warning` | `danger`. **Props:** `value`, `max?`, `label?`, `showValue?`, `format?`, `variant?`, `size?`.

### DetailRow

```tsx
<DetailRow label="SSN" value="123-45-6789" masked />
```

Label-value pair for review/confirmation screens. **Props:** `label`, `value`, `masked?`

### PageHeader

```tsx
<PageHeader title="Personal Information" subtitle="Enter your legal name" />
```

**Props:** `title`, `subtitle?`

### PhoneInput

```tsx
<PhoneInput
  label="Phone"
  value={phone}
  onChange={setPhone}
  countryCode={code}
  onCountryChange={setCode}
/>
```

**Props:** `label?`, `value`, `onChange`, `countryCode`, `onCountryChange`, `hint?`, `error?`, `disabled?`, `countryCodes?`

### Sidebar

```tsx
<Sidebar
  activeId={activeId}
  onSelect={setActiveId}
  logo={<span>rollfi</span>}
  items={[
    { id: 'dash', label: 'Dashboard', icon: <House /> },
    { id: 'team', label: 'Team', icon: <User />, badge: <Badge>3</Badge> },
  ]}
  footer={<UserProfile />}
/>
```

Stays dark in both themes by design. **Props:** `items`, `activeId`, `onSelect`, `logo?`, `footer?`.

### Tabs

```tsx
<Tabs tabs={[{ key: 'a', label: 'A' }, { key: 'b', label: 'B' }]} value={t} onChange={setT} />
```

Pill-style inline tabs. **Props:** `tabs`, `value`, `onChange`.

### Badge

```tsx
<Badge variant="success">Active</Badge>
<Badge variant="teal">Payroll Ready</Badge>
<Badge variant="danger" icon={<XCircle />}>Failed</Badge>
```

**Variants:** `neutral` | `success` | `danger` | `warning` | `info` | `teal` | `purple` | `orange`

### SidePanel

```tsx
<SidePanel open={open} onClose={close} title="Add User" footer={<Buttons />}>
  <Field label="Name"><Input /></Field>
</SidePanel>
```

Slides in from the right. Use for long-form workflows (forms, wizards, detail panes). Use `Modal` for centered confirmation dialogs instead. **Props:** `open`, `onClose`, `title?`, `description?`, `footer?`, `width?` (`md` 480px | `lg` 640px), `children`.

### Stepper

```tsx
<Stepper steps={[{ label: 'Company' }, { label: 'Upload' }]} currentIdx={0} />
```

Horizontal numbered step indicator with active/done states. Use for multi-step wizards. For a simple linear progress bar, use `ProgressBar` instead.

### Switch

```tsx
<Switch checked={on} onChange={setOn} label="Enable notifications" />
```

Boolean on/off control. **Props:** `checked`, `onChange`, `label?`, `disabled?`.

> `Toggle` is reserved for icon-button rows (bold / italic / underline toolbars). For binary on/off, use `Switch`.

### Avatar

```tsx
<Avatar name="Vu Francois" size="md" src="/me.jpg" />
```

Falls back to initials if no `src` is provided. **Sizes:** `sm` (24px) | `md` (32px) | `lg` (40px).

### DropdownMenu

```tsx
<DropdownMenu
  trigger={<Button>Actions ▾</Button>}
  items={[
    { label: 'Edit', icon: <PencilSimple />, onClick: editFn },
    { label: 'Delete', icon: <Trash />, onClick: delFn, danger: true },
  ]}
/>
```

**Props:** `trigger`, `items`, `align?` (`left` | `right`).

### MultiSelect

```tsx
<MultiSelect label="Companies" values={ids} onChange={setIds} options={opts} placeholder="..." />
```

Chip-style multi-value select. **Props:** `label?`, `values`, `onChange`, `options`, `placeholder?`, `hint?`.

### Field

```tsx
<Field label="Email" required hint="We'll never share this">
  <Input placeholder="you@rollfi.com" />
</Field>
```

Use for composite controls or anywhere `Input.label` is not enough. **Props:** `label`, `required?`, `hint?`, `error?`, `children`.

### EmptyState

```tsx
<EmptyState
  icon={<Bell />}
  title="No notifications"
  description="When you have new activity, it'll show up here."
  action={<Button>Refresh</Button>}
/>
```

### Slider

```tsx
<Slider label="Employees" value={n} min={0} max={500} step={10} onChange={setN} format={v => `${v}`} showMinMax />
```

**Props:** `label?`, `value`, `min`, `max`, `step?`, `onChange`, `format?`, `hint?`, `showMinMax?`.

### Table — sortable / expandable / selectable

```tsx
<Table
  columns={[{ key: 'name', header: 'Name', sortable: true }]}
  data={rows}
  rowKey={r => r.id}
  selectable
  selectedKeys={selected}
  onSelectionChange={setSelected}
  expandable={row => <RowDetail row={row} />}
/>
```

### Input & Select Sizes

Both Input and Select support a size prop:

```tsx
<Input label="Name" inputSize="lg" />
<Select label="Plan" size="lg" options={[...]} />
```

**Sizes:** `sm` (32px) | `md` (36px, default) | `lg` (48px)

### Button Full Width

```tsx
<Button fullWidth>Submit</Button>
```

---

## Primitives

### Textarea
```tsx
<Textarea label="Notes" rows={4} hint="Optional context" />
```
Multi-line `<textarea>` styled to match `Input`. **Props:** `label?`, `hint?`, `error?`, `rows?`, plus all native textarea attrs.

### Label
```tsx
<Label htmlFor="email" required>Email</Label>
```
Standalone form label. Auto-appends a red asterisk when `required`.

### Separator
```tsx
<Separator />                                 // horizontal
<Separator orientation="vertical" />          // vertical (set parent height)
```

### Accordion
```tsx
<Accordion type="single" defaultValue="a">
  <AccordionItem value="a">
    <AccordionTrigger>Compliance</AccordionTrigger>
    <AccordionContent>Tax, employee status, bank connectivity.</AccordionContent>
  </AccordionItem>
</Accordion>
```
**Types:** `single` (only one open) | `multiple`. Animates with CSS grid `grid-template-rows` for height transitions without measuring.

### Collapsible
```tsx
<Collapsible>
  <CollapsibleTrigger><Button>Toggle</Button></CollapsibleTrigger>
  <CollapsibleContent>…</CollapsibleContent>
</Collapsible>
```
Single-section disclosure. Same animation strategy as Accordion. Supports controlled mode via `open`/`onOpenChange`.

### Breadcrumb
```tsx
<Breadcrumb items={[{ label: 'Admin' }, { label: 'Payroll' }, { label: 'March review' }]} />
```
Auto-collapses to `…` when `items.length > maxItems` (default 4). **Props:** `items`, `separator?`, `maxItems?`.

### Pagination
```tsx
<Pagination current={page} total={12} onChange={setPage} siblingCount={1} />
```
Prev / numeric / Next. Shows `…` when there are more than `2*siblingCount + 5` pages.

### Banner
See Feedback family above.

### Callout
See Feedback family above.

### Progress
See ProgressBar / Progress section above.

### Spinner
```tsx
<Spinner size="md" />
<span>Loading… <Spinner size="sm" /></span>
```
**Sizes:** `sm` 14px | `md` 16px | `lg` 20px | `xl` 28px. Inherits `currentColor`.

### Skeleton
```tsx
<Skeleton width={200} height={12} />
<Skeleton circle width={32} height={32} />
```
Animated shimmer placeholder. **Props:** `width?`, `height?`, `radius?`, `circle?`.

### StatusDot
```tsx
<StatusDot variant="success" /> Active
<StatusDot variant="danger" pulse /> Action required
```
**Variants:** match `Badge` taxonomy (`neutral`, `success`, `danger`, `warning`, `info`, `teal`, `purple`, `orange`).

### Kbd
```tsx
Open palette: <Kbd>⌘</Kbd> <Kbd>K</Kbd>
```

### Tooltip
```tsx
<Tooltip content="Help text" side="top"><Button>Hover</Button></Tooltip>
```
Portal-rendered, listens to hover + focus, configurable `delay`. **Sides:** `top` | `right` | `bottom` | `left`.

### Popover
```tsx
<Popover trigger={<Button>Open</Button>} side="bottom" align="start">
  <div>Any content here</div>
</Popover>
```
Controlled (`open`/`onOpenChange`) or uncontrolled. Dismisses on Escape and outside click.

---

### RadioGroup
```tsx
<RadioGroup value={v} onChange={setV}>
  <Radio value="weekly">Weekly</Radio>
  <Radio value="biweekly">Bi-weekly</Radio>
</RadioGroup>
```
For richer selectable cards, use `OptionCard` instead.

### ButtonGroup
```tsx
<ButtonGroup>
  <Button variant="secondary">Draft</Button>
  <Button variant="secondary">Preview</Button>
  <Button>Publish</Button>
</ButtonGroup>
```

### SegmentedControl
```tsx
<SegmentedControl value={v} onChange={setV} items={[
  { value: 'list', label: 'List' },
  { value: 'grid', label: 'Grid' },
]} />
```
Pill button group for view-mode switching. Distinct from `Tabs` (which signals navigation).

### Toggle
```tsx
<Toggle pressed={bold} onPressedChange={setBold}><strong>B</strong></Toggle>
```
Pressable icon button (bold/italic/underline-style). For boolean on/off, use `Switch`.

### ToggleGroup
```tsx
<ToggleGroup value={view} onChange={setView}>
  <ToggleGroupItem value="list">≡</ToggleGroupItem>
  <ToggleGroupItem value="grid">▦</ToggleGroupItem>
</ToggleGroup>
```
Supports `type="multiple"` for multi-select toolbars.

### PasswordInput
```tsx
<PasswordInput label="Password" placeholder="Enter password" />
```
Password input with built-in eye / eye-slash reveal toggle.

### NumberStepper
```tsx
<NumberStepper label="Rate" value={n} onChange={setN} min={0} max={50} step={1} />
```
Integer counter with +/- buttons.

### CurrencyInput
```tsx
<CurrencyInput label="Amount" placeholder="0.00" currency="$" />
```
Wraps `Input` with a `$` prefix and decimal input mode.

### MaskedInput
```tsx
<MaskedInput label="SSN" mask="###-##-####" value={ssn} onChange={setSsn} />
```
Pattern: `#` = digit, `A` = letter, anything else literal. Common masks: SSN `###-##-####`, EIN `##-#######`, US Phone `(###) ###-####`.

### TagInput
```tsx
<TagInput label="Tags" value={tags} onChange={setTags} placeholder="Add and press Enter" />
```
Chip-based multi-value input. Defaults: Enter and comma commit, Backspace removes the last chip when the field is empty.

### InputOTP
```tsx
<InputOTP value={code} onChange={setCode} length={6} onComplete={verify} />
```
One-time-passcode entry with auto-advance, paste support, and arrow navigation.

### FileUpload
```tsx
<FileUpload label="Payroll CSV" value={file} onChange={setFile} accept=".csv,.xlsx" maxSize={5_000_000} />
```
Drag-and-drop file picker with size/extension validation. Renders a file chip when a file is selected.

### Combobox
```tsx
<Combobox label="Department" value={v} onChange={setV} options={depts} placeholder="Pick..." />
```
Searchable single-select. For non-searchable, use `Select`. For multi-value, use `MultiSelect`.

### Calendar
```tsx
<Calendar value={date} onChange={setDate} min={today} max={maxDate} />
```
Standalone month calendar. Used by `DatePicker` internally.

### DatePicker
```tsx
<DatePicker label="Cut-off" value={date} onChange={setDate} />
```
Trigger + popover composition of `Calendar`. Provides a default `format` (e.g. "Apr 15, 2026") or supply your own.

### TimePicker
```tsx
<TimePicker label="Release" value="09:30" onChange={setT} step={60} />
```
Wraps native `<input type="time">` with our styling and a leading clock icon.

### AlertDialog / ConfirmationDialog
```tsx
<ConfirmationDialog open={open} onClose={close} title="Save changes?" onConfirm={save} />
<AlertDialog variant="destructive" title="Delete?" confirmLabel="Delete" onConfirm={del} ... />
```
Pre-composed centered modals built on `Modal`. Use `AlertDialog variant="destructive"` for irreversible actions (red confirm button). Use `ConfirmationDialog` for ordinary "Are you sure?" prompts.

### ContextMenu
```tsx
<ContextMenu items={[{ label: 'Edit', onClick: ... }, { label: 'Delete', danger: true, onClick: ... }]}>
  <RowOrSurface />
</ContextMenu>
```
Right-click menu. Wrap any element; the wrapped element receives `onContextMenu`.

### HoverCard
```tsx
<HoverCard trigger={<Button>@user</Button>}>
  <UserPreview />
</HoverCard>
```
Like `Tooltip` but for rich content (cards, previews). Listens to pointer + keeps open while the card is hovered.

### Drawer
```tsx
<Drawer open={open} onClose={close} title="Quick add" footer={<Button>Done</Button>}>...</Drawer>
```
Bottom-anchored sliding sheet for mobile-first surfaces. For desktop right-side panels use `SidePanel` instead.

### Command
```tsx
<Command open={open} onOpenChange={setOpen} items={[
  { id: 'search', label: 'Global search', group: 'Suggestions', icon: ..., shortcut: <><Kbd>⌘</Kbd><Kbd>K</Kbd></>, onSelect: ... },
]} />
```
⌘K-style palette. Filters by `label` and `keywords`, groups by `group`, keyboard nav with ↑/↓/Enter/Esc.

### Pill
```tsx
<Pill icon={<Heart />}>Benefits</Pill>           // brand (vermilion)
<Pill tone="dark" icon={<Star />}>Features</Pill>
<Pill tone="outline" icon={<Lightning />}>Impact</Pill>
<Pill size="sm">PRODUCT</Pill>                   // small uppercase
```
Brand-book content tag. Distinct from `Badge` — pills are content/category labels (marketing surfaces), badges are status/count indicators (product UI).

### AvatarGroup
```tsx
<AvatarGroup max={4} items={[{ name: 'Pam' }, { name: 'Jim' }, ...]} />
```
Stacked avatars with `+N` overflow chip.

### Timeline
```tsx
<Timeline items={[
  { id: '1', title: 'Synced', description: '…', timestamp: '9:08 AM', variant: 'success' },
]} />
```
Vertical event log with colored status dot and connecting line.

### ActivityFeed
```tsx
<ActivityFeed title="Recent activity" action={<Badge>Live</Badge>} items={[
  { id: '1', actorName: 'Kurtik', message: 'published Q2 policy', timestamp: '4m ago' },
]} />
```
Social-style log with leading avatar per row.

### Item
```tsx
<Item icon={<FileText />} title="Payroll packet" description="…" action={<Badge>Ready</Badge>} />
```
Reusable list row. Combine inside a `Card variant="outlined" padding="none"` to get a clean inbox / settings-list layout.

### NotificationItem
```tsx
<NotificationItem variant="danger" icon={<Warning />} title="Failed transaction" description="…" timestamp="5m ago" actions={<Button size="sm">Review</Button>} />
```
Single notification row with optional unread dot, semantic icon background, timestamp, and inline actions.

### Carousel
```tsx
<Carousel showControls showDots>
  <Card>…</Card>
  <Card>…</Card>
</Carousel>
```
Horizontal snap-scroll with chevron controls and optional dot indicators.

### StatCard
```tsx
<StatCard label="Number of companies" value="725" />
<StatCard label="MRR" value="$21,800" helper="+12% vs last month" />

// Custom content (e.g. a selector instead of a number)
<StatCard label="Select client">
  <ClientPicker value={client} onClear={...} />
</StatCard>
```
Operational KPI tile. The label uses the standard `label` type token (14px, weight 500, tertiary color, sentence case — **not** uppercase) for parity with form labels and other titled surfaces. The value uses `display-md` and is anchored to the bottom of the card so a row of stat cards keeps consistent baselines regardless of label length.

**Props:** `label`, `value?` (large display number), `helper?` (small line below the value), `children?` (custom content slot, replaces `value`), `className?`.

### SettingsRow
```tsx
<SettingsRow
  title="Enable notifications"
  description="Get an email when a payroll draft is ready"
  control={<Switch checked={on} onChange={setOn} />}
  active={on}
/>

<SettingsRow
  icon={<Bell />}
  title="Quiet hours"
  description="No notifications between 6 PM and 9 AM"
  control={<Button size="sm" variant="secondary">Configure</Button>}
/>
```
Reusable settings / preferences row. Title + description on the left, a control slot on the right (`Switch`, `Button`, `Badge`, anything). Pass `active` to highlight the row with the success-tinted state — useful for "this feature is enabled" affordances. Pass an `icon` for an icon-tile leading element, and `onClick` to make the whole row clickable (clicks on the control itself don't propagate).

**Props:** `title`, `description?`, `control` (right-side ReactNode), `icon?`, `active?`, `onClick?`, `className?`.

### DataGrid
```tsx
<DataGrid items={[
  { label: 'Account name', value: 'Primary payroll' },
  { label: 'Account',      value: '••• 4491' },
  { label: 'Routing',      value: '••• 8901' },
  { label: 'Type',         value: 'Checking' },
  { label: 'Added',        value: 'Jan 14, 2026' },
]} />

// With a fixed column count
<DataGrid columns={3} gap="lg" items={[...]} />
```
Horizontal flow of label-above-value pairs. Used inside cards (bank account details, pay stub headers, profile metadata) where a row of related mini-stats reads better than stacked `DetailRow`s or a full `Table`. Values get `font-variant-numeric: tabular-nums` so dates/account numbers/amounts line up.

**Props:** `items` (`{ label, value }[]`), `gap?` (`sm` 16px | `md` 24px default | `lg` 32px), `columns?` (forces an N-column grid; without it items flow with `flex-wrap`), `className?`.

> When to use: `DetailRow` for a vertical stack of label/value rows (review screens). `DataGrid` for a horizontal strip inside a card. `StatCard` for the big-number KPI tiles in a dashboard ladder.

### IconTile
```tsx
<IconTile variant="danger"><Clock size={16} /></IconTile>
<IconTile variant="success" size="lg" shape="circle"><Check /></IconTile>
```
Colored container for an icon — used in task lists, settings rows, notification icons, file rows, and anywhere a tinted icon "chip" is needed.

**Variants:** `neutral` (default) | `success` | `danger` | `warning` | `info` | `teal` | `purple` | `orange`
**Sizes:** `sm` (24px) | `md` (32px, default) | `lg` (40px)
**Shapes:** `square` (default, `radius-sm`) | `circle`

### StackedBar
```tsx
<StackedBar
  format={n => `$${n.toLocaleString()}`}
  segments={[
    { label: 'Direct deposits (ACH)', value: 8250, color: 'var(--rf-color-success)' },
    { label: 'Check payments',        value: 3120, color: 'var(--rf-color-accent-teal)' },
    { label: 'Garnishments',          value: 1270, color: 'var(--rf-color-text-tertiary)' },
  ]}
/>
```
Horizontal stacked bar chart with an optional legend (color swatch + label + formatted value). Each segment's width is proportional to its value relative to the total. Auto-rotates through semantic accent tokens when `color` is omitted, or supply per-segment colors.

**Props:** `segments` (`{ label, value, color? }[]`), `total?` (override the auto-summed total), `format?` (number → string for the legend), `height?` (default 10px), `showLegend?` (default true), `className?`.

> When to use: a few categorical values that sum to a meaningful whole (cash breakdown, revenue-by-product, plan distribution, employee count by department, scenario comparison). For continuous progress toward a single target, use `Progress`; for a multi-step indicator, use `Stepper` or `SegmentedProgress`.

### SaveBar
```tsx
<SaveBar
  dirty={hasUnsavedChanges}
  onReset={() => resetForm()}
  onSave={() => saveForm()}
  saving={isSaving}
/>
```
Footer-style strip with a status message + Reset / Save buttons. Highlights warning-yellow with a "You have unsaved changes." message when `dirty` is true. Buttons auto-disable when there's nothing to save and during in-flight saves.

**Props:** `dirty`, `onSave`, `onReset?`, `cleanLabel?` (default "All changes saved."), `dirtyLabel?` (default "You have unsaved changes."), `saveLabel?` (default "Save changes"), `resetLabel?` (default "Reset to defaults"), `saving?`, `className?`.

Pair with batched-save forms (pricing controls, settings panes, profile editors) so users get an unmistakable affordance that there's pending work and a one-click escape hatch.

## Patterns

### App shell

Compose `Sidebar` + main content. Use `PageHeader` (with `action` slot) for the section title, `Tabs` for sub-views, `Table` for data lists.

```tsx
<div style={{ display: 'flex', height: '100vh' }}>
  <Sidebar items={nav} activeId={page} onSelect={setPage} logo={<Logo />} footer={<Profile />} />
  <main style={{ flex: 1, padding: 32, overflow: 'auto' }}>
    <PageHeader title="Companies" subtitle="..." action={<Button>Add User</Button>} />
    <Tabs tabs={[...]} value={tab} onChange={setTab} />
    <Table {...} />
  </main>
</div>
```

### Multi-step wizard

`SidePanel` + `Stepper` + a stack of `Field` rows. Stepper sits at the top of the panel body; field rows fill the panel; primary/secondary buttons in the panel footer.

### Side panel vs. Modal

- Centered short confirmation, ≤ 1–2 controls → `Modal`
- Long form, wizard, or detail view → `SidePanel`

### Status pills

Use `Badge` with the variant that matches the semantic. `teal` is reserved for "payroll ready" / "in progress" states distinct from `info` (which is generic). `neutral` is for non-semantic counts and labels.

## Rules

1. **Use semantic tokens, not raw hex values.** Write `var(--rf-color-text)`, never `#1a1a1a`.
2. **One primary CTA per viewport fold.** The primary button should be scarce — overuse dilutes its weight.
3. **Surface ladder for elevation.** Use `canvas` → `surface` → `surface-elevated` to create depth. Prefer border separation over shadow on dark theme.
4. **Enable `font-feature-settings`.** The `ss03` flag is part of the brand. Without it, Inter renders as generic Inter.
5. **Spacing from the grid.** Use `--rf-space-*` tokens. Card padding is `--rf-space-7` (24px) for standard cards, `--rf-space-5` (16px) for compact.
6. **Radius vocabulary:** `md` (8px) for buttons/inputs, `lg` (12px) for cards, `xl` (16px) for modals, `full` for pills.
7. **All components must work in both themes.** Never hard-code light or dark values.

## Customization

To rebrand: update `src/tokens/colors.css` — swap the light and dark `--rf-color-primary` values and semantic colors. Typography can be changed in `typography.css` by updating `--rf-font-sans`.
