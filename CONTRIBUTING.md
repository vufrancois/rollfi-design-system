# Contributing

This guide covers how to add, modify, and ship components in the Rollfi Design System.

---

## Principles

1. **Tokens over hardcoded values.** Every color, spacing value, radius, shadow, and type style comes from a `--rf-*` CSS custom property. If a token doesn't exist for what you need, add one in `src/tokens/`. **Critical for white-labelling**: any new component that uses a brand or sidebar accent MUST consume `--rf-color-brand*` / `--rf-color-sidebar*` tokens (never raw hex like `#FF2F1C`) — that's the only way per-tenant `<BrandProvider>` overrides flow through automatically.
2. **Hand-authored CSS.** No Tailwind, no styled-components, no CSS-in-JS. Each component owns a sibling `.css` file.
3. **BEM, prefixed `rf-`.** `.rf-<component>__<element>--<modifier>`. Keep classes flat — avoid descendant selectors deeper than one level.
4. **Light + dark must both work.** Pull colors from semantic tokens (`--rf-color-text`, `--rf-color-surface`, etc.), not raw hex.
5. **Composition over configuration.** Prefer multiple small components (`Card`, `CardHeader`, `CardFooter`) over one big component with many props.
6. **Accessibility is required, not optional.** Keyboard nav, focus rings, ARIA roles, contrast — handled before merging.

---

## Adding a new component

### 1. Create the directory

```
src/components/MyComponent/
  MyComponent.tsx
  MyComponent.css
```

### 2. The `.tsx`

```tsx
import './MyComponent.css';

interface MyComponentProps {
  variant?: 'default' | 'subtle';
  children: React.ReactNode;
}

export function MyComponent({ variant = 'default', children }: MyComponentProps) {
  return (
    <div className={`rf-my-component rf-my-component--${variant}`}>
      {children}
    </div>
  );
}
```

### 3. The `.css`

```css
.rf-my-component {
  padding: 12px 16px;
  border-radius: var(--rf-radius-md);
  background: var(--rf-color-surface);
  color: var(--rf-color-text);
  font: var(--rf-text-body-md);
}

.rf-my-component--subtle {
  background: var(--rf-color-surface-elevated);
}
```

### 4. Export it

Add a line to `src/components/index.ts`:

```ts
export { MyComponent } from './MyComponent/MyComponent';
```

### 5. Demo it

Add a `<Section title="MyComponent">…</Section>` to the library demo in `src/App.tsx` (above the `DEMO / MOCK CODE BELOW` banner), **and** add a Storybook story (see "Adding a story" below).

### 6. Document it

Add a `### MyComponent` entry in `design-system.md` with:
- One-line description
- A usage example
- Full props table
- "When to use" / "When not to use" notes

### 7. Verify

```bash
npm run typecheck
npm run lint
npm run dev          # eyeball it in both light + dark themes
```

---

## Modifying an existing component

- If the change is **additive** (new optional prop, new variant), proceed normally.
- If the change is **breaking** (renamed prop, removed variant, changed default behavior):
  - Add a deprecation note in `design-system.md`.
  - If feasible, keep an alias re-export with a `@deprecated` JSDoc.
  - Flag it for the next major version bump.

---

## Tokens

Tokens live in `src/tokens/`:

- `colors.css` — semantic colors, both themes
- `typography.css` — font stacks + the `--rf-text-*` shorthand variables
- `spacing.css`, `radius.css`, `shadows.css` — other primitives

When adding a new token:

1. Pick a **semantic** name (`--rf-color-warning-text`), not a **literal** name (`--rf-color-yellow-800`).
2. Add the token in both `[data-theme="light"]` and `[data-theme="dark"]` blocks.
3. Document the token + intent in `design-system.md`.

---

## Conflict reconciliations to be aware of

When working from prior references (rollfi-ui Storybook, etc.) note these renames in our system:

| External / legacy name | Our name            | Why                                                                                          |
| ---------------------- | ------------------- | -------------------------------------------------------------------------------------------- |
| `Toggle` (boolean)     | `Switch`            | We reserve `Toggle` for icon-button toggles (bold/italic/underline), per Radix convention.   |
| `Alert` (page-level)   | `Banner`            | Our `Alert` is an inline boxed message; page-level strips are `Banner`.                      |
| `Alert` (advisory)     | `Callout`           | Title + body explanation lives in `Callout`, not `Alert`.                                    |
| `Progress` (segmented) | `SegmentedProgress` | Our `Progress` is a filled bar; multi-step indicators are `SegmentedProgress` or `Stepper`. |

---

## Pull request checklist

- [ ] New/changed component has a `<Section>` demo in `App.tsx`.
- [ ] `design-system.md` updated with API + usage example.
- [ ] Works in both `light` and `dark` themes.
- [ ] No hardcoded hex / px / shadow values — everything via `--rf-*` tokens.
- [ ] Keyboard accessible (focus visible, arrow nav where applicable, `Esc` closes overlays).
- [ ] `npm run typecheck && npm run lint` pass.
- [ ] Screenshot or short video attached to the PR for any visual change.

---

## Style guide cheatsheet

```css
/* Surfaces */
background: var(--rf-color-surface);            /* default panel */
background: var(--rf-color-surface-elevated);   /* raised / hover */
background: var(--rf-color-canvas);             /* page background */

/* Text */
color: var(--rf-color-text);                    /* primary */
color: var(--rf-color-text-secondary);          /* labels */
color: var(--rf-color-text-tertiary);           /* captions / hints */
color: var(--rf-color-text-disabled);

/* Borders */
border: 1px solid var(--rf-color-border);
border: 1px solid var(--rf-color-border-strong);
outline: 2px solid var(--rf-color-border-focus); /* focus ring */

/* Radii */
border-radius: var(--rf-radius-sm);   /* 6px - inputs */
border-radius: var(--rf-radius-md);   /* 10px - cards */
border-radius: var(--rf-radius-lg);   /* 16px - panels */
border-radius: var(--rf-radius-full); /* pills */

/* Type shorthand */
font: var(--rf-text-body-md);
font: var(--rf-text-caption-sm);
font: var(--rf-text-button-sm);

/* Motion */
transition: background var(--rf-transition-fast);
```

---

## Deprecation policy

When a public API is deprecated:

1. Add a `@deprecated` JSDoc comment with a pointer to the replacement.
2. Keep the alias export through at least one minor version.
3. Document the deprecation in `design-system.md` + `README.md`.
4. Remove the alias only on a major-version bump.

No deprecated APIs currently. When the first deprecation lands, document it in `README.md` so consumers see it before upgrading.

---

## Adding a story

Stories live colocated with their component:

```
src/components/MyComponent/
  MyComponent.tsx
  MyComponent.css
  MyComponent.stories.tsx
```

Use CSF3 (`Meta` + named `Story` exports). The preview decorator already wraps every story in `ThemeProvider`, the Phosphor `IconContext.Provider`, and side-effect-imports `src/tokens/index.css` — story files only need to render the component.

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MyComponent } from './MyComponent';

const meta = {
  title: 'Layout / MyComponent',
  component: MyComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'subtle'] },
  },
  args: { variant: 'default', children: 'Hello' },
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Subtle: Story = { args: { variant: 'subtle' } };
```

### What to cover

At minimum:
- A `Default` story (no args overrides).
- One story per variant.
- The error / empty / loading state if the component has one.
- For controlled components (`Tabs`, `Modal`, `Switch`, `DatePicker`, etc.): use a `render` function that owns the state with `useState`.

### Title conventions

Group stories by component family using `/` in the title:

| Family       | Examples                                          |
| ------------ | ------------------------------------------------- |
| `Form`       | Button, Input, Textarea, Switch, RadioGroup       |
| `Layout`     | Card, Separator, Accordion, Tabs                  |
| `Navigation` | Breadcrumb, Pagination, Stepper                   |
| `Feedback`   | Toast, Banner, Callout, Alert, Badge, Spinner     |
| `Overlay`    | Modal, SidePanel, Tooltip, Popover, AlertDialog   |
| `Display`    | Avatar, StatCard, DetailRow, IconTile             |
| `Theming`    | ThemeProvider + theming docs                      |

### Verifying

- `npm run storybook` — story shows up in the sidebar, renders correctly in both light and dark via the toolbar paintbrush.
- Open the **Accessibility** panel — resolve any critical violations from `@storybook/addon-a11y` before merging.
- `npm run build-storybook` — story is included in the static build.

### Conventions for naming a story export

Story names must not collide with imports in scope. If you import `Warning` from `@phosphor-icons/react`, name the variant story `WarningVariant` and use `name: 'Warning'` to control how it displays in the sidebar:

```tsx
export const WarningVariant: Story = {
  name: 'Warning',
  args: { variant: 'warning', icon: <Warning /> },
};
```
