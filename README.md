# Rollfi Design System

A tokenized React design system for Rollfi: ~80 components, light/dark themes, semantic CSS custom properties, hand-authored CSS (no Tailwind, no Radix). Built for production use inside the Rollfi Partner Portal and downstream client products.

**Live preview:** _(your Vercel URL)_

---

## What's in this repo

This repo serves two purposes:

1. **The design system library** — components, tokens, fonts. Lives under `src/components/`, `src/tokens/`, and `src/styles/`. Everything exported from [`src/components/index.ts`](./src/components/index.ts) is part of the public API.
2. **A demo app** — `src/App.tsx` renders a component gallery + an onboarding mock + a full Partner Portal mock. The demo exists to exercise the library; it is **not** part of the library surface.

The boundary between the two is marked with a banner comment in `App.tsx` (search for `DEMO / MOCK CODE BELOW`). Everything above the banner is library demo; everything below is application-specific mock code.

Authoritative usage documentation: [`design-system.md`](./design-system.md).

---

## Quick start

```bash
npm install
npm run dev              # demo app at http://localhost:5173
npm run storybook        # component catalog at http://localhost:6006
npm run build            # demo app production bundle (dist/)
npm run build:lib        # publishable library (dist-lib/)
npm run build-storybook  # static Storybook site (storybook-static/)
npm run typecheck        # tsc -b --noEmit
npm run lint
```

Node 20+ recommended.

---

## Consuming the library

The library ships a publishable build under `dist-lib/` via:

```bash
npm run build:lib
```

This produces:
- `dist-lib/index.mjs` (ESM) + `dist-lib/index.cjs` (CJS)
- `dist-lib/styles.css` — tokens + every component's CSS concatenated into one file
- `dist-lib/src/lib.d.ts` (type entry, with full per-component `.d.ts` tree)

> ⚠️ The package is still `"private": true`. Consumers can either install from a git URL or, once the team is ready, flip `private` to `false` and `npm publish`.

### Install (git dependency)

```bash
npm install github:vufrancois/rollfi-design-system
```

### Imports

```tsx
import { Button, Card, Input, ThemeProvider } from 'rollfi-design-system';
import 'rollfi-design-system/styles.css';

export function App() {
  return (
    <ThemeProvider>
      <Card>
        <Input label="Email" />
        <Button>Continue</Button>
      </Card>
    </ThemeProvider>
  );
}
```

The `styles.css` import is required exactly once at the root of your app and includes both the design tokens and every component's CSS. Tree-shaking still works on the JS bundle (the package declares `"sideEffects": ["**/*.css"]`).

### Theming

Wrap your app in `<ThemeProvider>`. It writes `data-theme="light" | "dark"` to the root, and every component reads its colors from `--rf-*` CSS variables that resolve against that attribute.

```tsx
<ThemeProvider defaultTheme="light">
  <YourApp />
</ThemeProvider>
```

Tokens are defined in `src/tokens/colors.css` (semantic colors), `src/tokens/typography.css` (font stacks + scale), plus spacing / radius / shadow files. See `design-system.md` for the full token reference.

### Peer dependencies

```json
{
  "react": ">=18",
  "react-dom": ">=18",
  "@phosphor-icons/react": "^2.1"
}
```

---

## Repo layout

```
src/
  components/         ← THE LIBRARY (public API surface)
    <Name>/
      <Name>.tsx
      <Name>.css
    index.ts          ← barrel re-export
  tokens/             ← --rf-* CSS variables (colors, type, spacing, radius, shadows)
  styles/             ← global resets + font-face declarations
  assets/             ← Funnel Display + Funnel Sans font files
  App.tsx             ← demo app (library gallery + portal/onboarding mock)
  main.tsx            ← demo app entry
design-system.md      ← usage docs + per-component API + tokens reference
CONTRIBUTING.md       ← how to add or modify a component
```

---

## Components (80+ exports)

Form: `Button`, `Input`, `Textarea`, `Select`, `Combobox`, `MultiSelect`, `Checkbox`, `RadioGroup`, `Switch`, `Toggle`, `ToggleGroup`, `SegmentedControl`, `Slider`, `NumberStepper`, `CurrencyInput`, `MoneyInput`, `MaskedInput`, `PhoneInput`, `PasswordInput`, `TagInput`, `InputOTP`, `FileUpload`, `Calendar`, `DatePicker`, `TimePicker`, `Field`, `Label`.

Layout: `Card`, `Table`, `DataGrid`, `Tabs`, `Sidebar`, `PageHeader`, `Separator`, `Accordion`, `Collapsible`, `Carousel`.

Navigation: `Breadcrumb`, `Pagination`, `Stepper`, `SegmentedProgress`.

Feedback: `Toast` (+ `ToastProvider`, `useToast`), `Alert`, `Banner`, `Callout`, `Progress`, `Spinner`, `Skeleton`, `EmptyState`, `StatusDot`, `Badge`.

Overlay: `Modal`, `SidePanel`, `AlertDialog`, `Dropdown`, `DropdownMenu`, `Tooltip`, `Popover`, `Drawer`, `Command`.

Indicators / display: `Avatar`, `Logo`, `DetailRow`, `StatCard`, `IconTile`, `SettingsRow`, `StackedBar`, `SaveBar`, `Kbd`, `OptionCard`, `NotificationItem`.

Theming: `ThemeProvider`, `useTheme`.

Full per-component API in [`design-system.md`](./design-system.md).

---

## Deprecated aliases

| Old name      | Replacement         | Notes                                                                                                                                                                  |
| ------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Toggle`\*    | `Switch`            | The boolean on/off control was renamed. The new `Toggle` is the icon-button primitive. If you imported `Toggle` expecting a boolean switch, change the import to `Switch`. |
| `ProgressBar` | `SegmentedProgress` | Re-exported as an alias. Will be removed in the next major.                                                                                                            |

---

## Conventions

- One component = one directory: `src/components/<Name>/<Name>.tsx` + `<Name>.css`.
- BEM class names, prefixed `rf-`: `.rf-<name>__<element>--<modifier>`.
- All colors, spacing, radii, shadows, and type come from `--rf-*` tokens. No hardcoded hex values inside components.
- No Tailwind. No Radix. No CSS-in-JS. Vanilla `.css` files imported by the component module.
- Dark mode is opt-in per page via `<ThemeProvider>`. Components must work in both themes.
- The sidebar palette stays dark in both themes, by design.

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the full "how to add a component" walkthrough.

---

## Browser support

Modern evergreen browsers (Chrome, Safari, Firefox, Edge — last 2 major versions). The library uses CSS custom properties, `:has()` in a few places, and the native `<dialog>` element — all baseline-supported.

---

## Roadmap (handover items)

The following are known gaps for the receiving engineering team to address:

- [x] Publishable library build (`vite build --lib` + `exports` map, `main`/`module`/`types`, bundled `dist-lib/styles.css`).
- [ ] Flip `"private": false` and publish to npm (or a private registry).
- [x] Storybook bootstrap (config, theme decorator, Phosphor icon defaults, 9 reference stories). Client team writes the remaining ~70 stories.
- [ ] Unit tests (Vitest + Testing Library) — currently none.
- [ ] Visual regression coverage (Chromatic / Playwright snapshots).
- [ ] Accessibility audit per component (focus rings, ARIA roles, keyboard nav — especially overlay primitives).
- [ ] Extract `App.tsx` portal + onboarding mocks into a separate `apps/portal-mock` workspace so the library can be built in isolation.
- [ ] Style Dictionary / Figma token sync.
- [ ] Changesets-based versioning + `CHANGELOG.md`.
- [ ] License selection.

---

## License

TBD — assign a license before public distribution.
