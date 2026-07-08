# Changelog

All notable changes to the Rollfi Design System land here. This project follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.1] — 2026-05-14

### Changed

- **`CompanySelect`** — auto-collapses to a non-interactive static display when there is nothing to choose. Trigger condition: `options.length + (allowAll ? 1 : 0) <= 1`. In static mode the trigger renders as a plain `<div>` (no `<button>`, no chevron, no click affordance) — same visual box (`--rf-radius-md`, `--rf-color-border`, avatar + name) so it lines up next to the interactive combobox variant in a shared header row. No API change; single-tenant apps get the right UX for free.

### Added

- New `Static (1 option, no combo)` Storybook story under **Layout / CompanySelect**.
- Library-demo `CompanySelect` Section showcasing both variants side-by-side under UPPERCASE eyebrows.

## [0.2.0] — 2026-05-14

Broad expansion of the design system with **11 new components**, extensions to **6 existing primitives**, a **top-bar refactor** of the partner-portal mock, and full **Spacing / Motion / Z-index** token documentation. Bundle: 267 KB → 300 KB (~88 KB gzipped) for the new surface area.

### Added — New components

| Component | Family | What it's for |
| --- | --- | --- |
| **`ThemeToggle`** | Theming | Light/dark switch with `icon` and `segmented` variants. Reads from the active `ThemeProvider`. |
| **`BrandProvider`** *(existing but promoted this cycle)* | Theming | Scopes tenant white-label overrides (brand color, sidebar color, logo URL) to a subtree; derived variants recompute via CSS `color-mix()`. |
| **`UserMenu`** | Overlay | Avatar-led trigger button with a Help / Settings / theme-flip / Sign-out panel. Header shows the user's full name + role; items support `danger`, `disabled`, `dividerAfter`, and `trailing` accessories. |
| **`CompanySelect`** | Layout | Combobox-flavored multi-tenant company picker. Always-on search, autofocus, ↑↓/Home/End/Enter keyboard nav, optional "All companies" affordance, `role="combobox"` + `aria-activedescendant`. |
| **`PayPeriodSelect`** | Domain | Rich dropdown for picking a pay period. Trigger shows selected pay date + range + type badge; menu rows expand the same data with optional `paid` / `pending` / `failed` / `draft` status pulses. Sorted by `payDate` (default newest first). |
| **`PayrollCard`** | Layout | Summary card for a pay period. Header + stat grid (2 or 3 col) + optional full-width action. Supports Badge or big-total accessory via the `trailing` slot. |
| **`DetailCard`** | Layout | Two-column key/value card for review pages, with a `list` variant for editable settings (per-row Edit action + hairline dividers). |
| **`PaystubBreakdown`** | Domain | Accordion-driven paystub view. Header values auto-format currency (negatives red) or render verbatim strings; supports a bottom action slot for the download button. |
| **`ClockWidget`** | Domain | Employee time-tracking card with three states (`idle` / `working` / `break`). Owns wall-clock tick + elapsed timers internally; uncontrolled by default, `status` + callbacks opt into controlled mode for server persistence. |

### Added — Extended components

- **`Accordion`** — `AccordionTrigger` gained an optional `trailing` slot rendered just before the chevron. Enables badges/amounts/statuses in accordion headers; underpins `PaystubBreakdown`.
- **`DetailRow`** — new `layout="stacked"` variant (uppercase eyebrow label above a `body-md-strong` value) for info-card layouts. `inline` remains default.
- **`IconTile`** — new `outlined` boolean (Button-weight rim; matches the fill hue on colored tones) and new `xl` size (48 px). The base now reserves a `1px solid transparent` slot so toggling `outlined` doesn't shift adjacent content.
- **`Item`** — new `iconTone` (`neutral` | `info` | `success` | `warning` | `danger` | `brand`) and `onDismiss` prop. Enables the task-card pattern (info-tinted icon + primary action + top-right dismiss X). Rows auto-reserve right-side space so the action button doesn't shift when dismiss is added.
- **`Sidebar`** — items accept `children: SidebarItem[]` for one level of collapsible sub-nav. Multi-open, auto-expands the parent that owns the active id, optional controlled `expandedIds` / `onExpandedChange` for URL-persisted expansion.
- **`StackedBar`** — new `inlineLabels` (renders `format(value)` inside each segment; bar grows to 28 px, corners switch to `radius-sm`) and `showPercent` (appends `(NN%)` to legend values) for the "paycheck preview" pattern.
- **`Table`** — two independent filter modes that compose freely:
  - **Search** (`searchable`) — magnifier-iconed input, case-insensitive substring across columns; `filterKeys`, `filterFn`, `filterValue` / `onFilterChange` for controlled mode.
  - **Structured filter menu** (`filterable`) — Filter button + Popover checkbox list; per-column opt-in via `Column.filterable`; active selections render as removable chips below the toolbar with a Clear-all link.
  - Smart empty state: `No results for "xyz"` when narrowed by search, `No rows match the current filters` when narrowed only by the structured filter.

### Added — Partner-portal chrome

Restructured the top of the portal mock into a proper application header with clear personal-action and view-context areas:

- **Employer / Employee view switcher** (`SegmentedControl`) — flips the visible role and the label surfaced in the UserMenu.
- **CompanySelect** — combobox company picker with an "All companies" affordance.
- **Notifications** — moved from sidebar `secondaryItems` to a bell icon button in the header, with a red `3` count badge overlay. Opens the existing SidePanel.
- **Vertical divider** between the notification button and UserMenu to group personal-actions.
- **UserMenu** — replaces the sidebar-footer user block. Dark/Light mode moved into this menu; Sign out removed from the sidebar entirely.
- **Sidebar footer** — new "Back to Partner Portal" button that resets `viewAs` → `'employer'` and `activeNav` → `'dashboard'`. Uses sidebar tokens so it respects the light-sidebar tenant flip.
- **Sidebar sub-items** — Payroll activity exposes Payments / Tax filings children; Billing exposes Report / Pricing / Simulation / Payout account children. `ActivityView` and `BillingView` accept optional controlled `subTab` + `onSubTabChange` so in-view Tab clicks and sidebar sub-item clicks stay in sync.

### Added — Docs & demos

- **Spacing / Radius / Shadows / Motion / Z-index** — full token reference tables in `design-system.md`, plus visual reference sections in the library demo (each swatch shows token name + resolved px).
- **Color reference** — every color token now shows explicit light + dark hex/rgba values; the library demo reads the values live from `getComputedStyle` and re-reads on theme flip.
- **Typography reference** — every type token shows family + weight + size + line-height inline next to the specimen.
- **White-label theming** — new "White-label demo · viewing as" bar with 4 tenant presets (Rollfi / Acme / Nova / Mint). The Mint preset exercises the `data-sidebar-mode="light"` auto-contrast flip.
- **`--rf-color-sidebar-text-strong`** — new token for sidebar hover/active foreground so light-sidebar tenants get near-black hover text instead of a broken white-on-pale-gray state.

### Added — Storybook

New stories under `Layout /`, `Overlay /`, `Domain /`, `Data /`, `Display /`, `Theming /`:

- `Accordion`, `Item`, `StackedBar`, `IconTile` — 4 previously-story-less primitives get initial coverage.
- `PayrollCard`, `DetailCard`, `PaystubBreakdown`, `ClockWidget` — full 4-to-6 story per component.
- `UserMenu`, `CompanySelect`, `PayPeriodSelect`, `ThemeToggle`, `Table`, `Sidebar`, `DetailRow`, `BrandProvider` — stories added or expanded to cover the new features.

Total library bundle: `dist-lib/index.cjs` **267 KB → 300 KB** (~88 KB gzipped). All Storybook + Vercel demo + `dist-lib` builds pass.

### Fixed

- Sidebar hover/active foreground previously hardcoded `#ffffff` — invisible on light-sidebar tenants. Now uses `--rf-color-sidebar-text-strong`, which flips to `#0a0a0a` under `data-sidebar-mode="light"`.
- Portal mock's back-link and user footer text also hardcoded white; switched to `--rf-color-sidebar-text` / `-text-dim` so they follow the same flip.

### Removed

- Sign-out row from the sidebar `secondaryItems` (now lives in the UserMenu).
- User avatar + name block from the sidebar footer (now lives in the UserMenu).
- Standalone `ThemeToggle` from the portal top bar (moved into the UserMenu's Dark/Light row).
- Legacy `ProgressBar` alias re-export was already gone; this cycle formally documents the deprecation policy.

---

## [0.1.0] — 2026-05-11

Initial versioned release. Baseline library with Tier-1 and Tier-2 primitives, ThemeProvider, semantic color / typography / spacing tokens, portal-mock and onboarding-mock demos, README + CONTRIBUTING + `design-system.md`, publishable library build target (`dist-lib/`), Storybook bootstrap. See `README.md` for the full inventory.

[Unreleased]: https://github.com/vufrancois/rollfi-design-system/compare/v0.2.1...HEAD
[0.2.1]: https://github.com/vufrancois/rollfi-design-system/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/vufrancois/rollfi-design-system/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/vufrancois/rollfi-design-system/releases/tag/v0.1.0
