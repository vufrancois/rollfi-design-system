import { type CSSProperties, type ReactNode, useMemo } from 'react';
import { isLightColor } from '../../utils/luminance';
import { BrandContext } from './BrandContext';
import './BrandProvider.css';

export interface BrandProviderProps {
  /**
   * Tenant brand accent color. Any CSS color string (`#FF2F1C`, `rgb(...)`, `oklch(...)`).
   * Overrides `--rf-color-brand`; derived variants (`-hover`, `-soft`, `-text`, `-border`)
   * recompute automatically via `color-mix()` in `tokens/colors.css`.
   */
  brand?: string;
  /**
   * Tenant sidebar background color. Sidebar text + overlay colors auto-flip
   * between dark and light based on the supplied color's WCAG relative luminance.
   */
  sidebar?: string;
  /** URL of a tenant-hosted logo image. When set, every `<Logo>` in the subtree renders it. */
  logoUrl?: string;
  /** Alt text for the tenant logo. */
  logoTitle?: string;
  /** Additional class on the wrapper element. */
  className?: string;
  children: ReactNode;
}

/**
 * Scopes a tenant white-label theme to its React subtree.
 *
 *   <ThemeProvider>
 *     <BrandProvider brand="#0066ff" sidebar="#1a1f2e" logoUrl="https://...">
 *       <App />
 *     </BrandProvider>
 *   </ThemeProvider>
 *
 * Mount once at the app root. No tenant config → emits no overrides and
 * the design system renders with its Rollfi defaults.
 */
export function BrandProvider({
  brand,
  sidebar,
  logoUrl,
  logoTitle,
  className = '',
  children,
}: BrandProviderProps) {
  const style = useMemo<CSSProperties>(() => {
    const s: Record<string, string> = {};
    if (brand) s['--rf-color-brand'] = brand;
    if (sidebar) s['--rf-color-sidebar'] = sidebar;
    return s as CSSProperties;
  }, [brand, sidebar]);

  // Sidebar mode: if tenant supplied a light sidebar color we flip the
  // overlay/text recipes to use dark tints. Defaults to `dark` (current behavior).
  const sidebarMode = sidebar && isLightColor(sidebar) ? 'light' : 'dark';

  const brandValue = useMemo(() => ({ logoUrl, logoTitle }), [logoUrl, logoTitle]);

  return (
    <BrandContext.Provider value={brandValue}>
      <div
        className={`rf-brand-provider ${className}`}
        style={style}
        data-sidebar-mode={sidebarMode}
      >
        {children}
      </div>
    </BrandContext.Provider>
  );
}
