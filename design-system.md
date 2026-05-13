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

Semantic tokens that flip automatically between light and dark themes:

| Token | Purpose |
|---|---|
| `--rf-color-primary` | Primary CTA background |
| `--rf-color-on-primary` | Text on primary |
| `--rf-color-canvas` | Page background |
| `--rf-color-surface` | Card/panel background |
| `--rf-color-surface-elevated` | Elevated surface (inputs, table headers) |
| `--rf-color-border` | Default border |
| `--rf-color-border-focus` | Focus ring border |
| `--rf-color-text` | Primary text |
| `--rf-color-text-secondary` | Secondary text |
| `--rf-color-text-tertiary` | Muted/placeholder text |
| `--rf-color-info` / `success` / `warning` / `danger` | Semantic states |
| `--rf-color-accent-teal` (+ `-soft` / `-bg` / `-text` / `-border`) | Highlight accent for payroll/ready statuses (used by Badge `teal` variant) |
| `--rf-color-accent-lime` (+ `-soft` / `-text` / `-border`) | Lime highlight accent |
| `--rf-color-accent-orange` (+ `-soft` / `-text` / `-border`) | Orange highlight accent |
| `--rf-color-accent-purple` (+ `-soft` / `-text` / `-border`) | Purple highlight accent |
| `--rf-color-sidebar` (+ `-active` / `-hover` / `-text` / `-text-dim` / `-border`) | Sidebar — stays dark in both themes |
| `--rf-color-{state}-soft` | Translucent background for badges/toasts |
| `--rf-color-{state}-text` | Text color for semantic states |

### Typography (`typography.css`)

Use the `font` shorthand with CSS variables:

```css
font: var(--rf-text-body-md);
```

**Scale:** `display-xl` (64px) → `display-lg` (48px) → `display-md` (36px) → `heading-xl` (28px) → `heading-lg` (24px) → `heading-md` (20px) → `heading-sm` (18px) → `body-lg` (18px) → `body-md` (16px) → `body-sm` (14px) → `body-xs` (12px) → `caption` (13px) → `caption-sm` (11px)

**Font features:** Always set `font-feature-settings: var(--rf-font-feature)` on the root — this enables the contextual alternates, kerning, and ligatures that give Funnel its calibrated rhythm.

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

### IconTile
```tsx
<IconTile variant="danger"><Clock size={16} /></IconTile>
<IconTile variant="success" size="lg" shape="circle"><Check /></IconTile>
```
Colored container for an icon — used in task lists, settings rows, notification icons, file rows, and anywhere a tinted icon "chip" is needed.

**Variants:** `neutral` (default) | `success` | `danger` | `warning` | `info` | `teal` | `purple` | `orange`
**Sizes:** `sm` (24px) | `md` (32px, default) | `lg` (40px)
**Shapes:** `square` (default, `radius-sm`) | `circle`

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
