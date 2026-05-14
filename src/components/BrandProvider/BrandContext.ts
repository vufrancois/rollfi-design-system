import { createContext, useContext } from 'react';

export interface BrandContextValue {
  /** URL of a tenant-supplied logo. When set, `<Logo>` renders it instead of the default SVG mark. */
  logoUrl?: string;
  /** Alt text override for the tenant logo. Defaults to "Logo". */
  logoTitle?: string;
}

export const BrandContext = createContext<BrandContextValue>({});

/**
 * Hook to read the active brand context. Returns an empty object when no
 * `<BrandProvider>` is mounted — components that consume this should
 * gracefully fall back to their non-branded defaults.
 */
export function useBrand(): BrandContextValue {
  return useContext(BrandContext);
}
