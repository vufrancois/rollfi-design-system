/**
 * WCAG 2.x relative-luminance helpers, used by BrandProvider to decide
 * whether a tenant-supplied sidebar color is light or dark so we can
 * flip text + overlay colors for contrast.
 *
 * Pure functions, no deps. Fail-safe: unparseable input returns 0
 * (treated as "dark"), so a bad config can't blow up the UI.
 */

/** Parse #RGB / #RRGGBB / rgb(...)  → [r, g, b] in 0–255, or null. */
function parseColor(input: string): [number, number, number] | null {
  if (typeof input !== 'string') return null;
  const s = input.trim();

  // #RRGGBB or #RGB
  if (s.startsWith('#')) {
    let hex = s.slice(1);
    if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
    if (hex.length !== 6) return null;
    const n = parseInt(hex, 16);
    if (Number.isNaN(n)) return null;
    return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
  }

  // rgb(r, g, b) or rgba(r, g, b, a)
  const m = s.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (m) return [Number(m[1]), Number(m[2]), Number(m[3])];

  return null;
}

/**
 * WCAG 2.x relative luminance ∈ [0, 1].
 * 0 = black, 1 = white. Threshold ≈ 0.179 is the cutoff where
 * black-on-X first beats 4.5:1 contrast (AA for normal text).
 */
export function relativeLuminance(color: string): number {
  const rgb = parseColor(color);
  if (!rgb) return 0;
  const [r, g, b] = rgb.map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** True when the color is light enough that dark text reads better on it than light text. */
export function isLightColor(color: string, threshold = 0.179): boolean {
  return relativeLuminance(color) > threshold;
}
