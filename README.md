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
npm run dev          # http://localhost:5173
npm run build        # type-check + production bundle
npm run typecheck    # tsc -b --noEmit
npm run lint
```

Node 20+ recommended.

---

## Consuming the library

> ⚠️ This package is currently `"private": true` and ships as **source**, not as a published npm package. A library build target (`vite build --lib` + `exports` map) is a planned follow-up. Until then, the recommended consumption pattern is:
> - Vendor `src/components/`, `src/tokens/`, `src/styles/`, and the font assets into your app, **or**
> - Install this repo as a git dependency and import from `src/components`.

### Imports

```tsx
import { Button, Card, Input, ThemeProvider } from 'rollfi-design-system/src/components';
import 'rollfi-design-system/src/tokens/colors.css';
import 'rollfi-design-system/src/tokens/typography.css';
import 'rollfi-design-system/src/styles/global.css';

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

- [ ] Publishable library build (`vite build --lib` + proper `exports` map, `main`/`module`/`types` fields, bundled `dist/styles.css`).
- [ ] Storybook (or Ladle) to replace the `App.tsx` gallery with isolated per-component stories.
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
