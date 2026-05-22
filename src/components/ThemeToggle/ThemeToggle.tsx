import { Sun, Moon } from '@phosphor-icons/react';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import './ThemeToggle.css';

type ThemeToggleSize = 'sm' | 'md';
type ThemeToggleVariant = 'icon' | 'segmented';

interface ThemeToggleProps {
  /**
   * `icon` — a single button that flips the theme on click (shows the
   * icon for the theme you'd switch TO). Best for headers/toolbars.
   *
   * `segmented` — a two-segment switch with explicit Light / Dark
   * choices. Best when a control panel is dedicated to appearance.
   */
  variant?: ThemeToggleVariant;
  size?: ThemeToggleSize;
  className?: string;
  /** Optional override for the accessible label. */
  ariaLabel?: string;
}

export function ThemeToggle({
  variant = 'icon',
  size = 'md',
  className = '',
  ariaLabel,
}: ThemeToggleProps) {
  const { theme, toggleTheme, setTheme } = useTheme();
  const iconSize = size === 'sm' ? 14 : 16;

  if (variant === 'segmented') {
    return (
      <div className={`rf-theme-toggle rf-theme-toggle--segmented rf-theme-toggle--${size} ${className}`} role="radiogroup" aria-label="Theme">
        <button
          type="button"
          role="radio"
          aria-checked={theme === 'light'}
          className={`rf-theme-toggle__seg ${theme === 'light' ? 'rf-theme-toggle__seg--active' : ''}`}
          onClick={() => setTheme('light')}
        >
          <Sun size={iconSize} />
          <span>Light</span>
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={theme === 'dark'}
          className={`rf-theme-toggle__seg ${theme === 'dark' ? 'rf-theme-toggle__seg--active' : ''}`}
          onClick={() => setTheme('dark')}
        >
          <Moon size={iconSize} />
          <span>Dark</span>
        </button>
      </div>
    );
  }

  const nextTheme = theme === 'light' ? 'dark' : 'light';
  return (
    <button
      type="button"
      className={`rf-theme-toggle rf-theme-toggle--icon rf-theme-toggle--${size} ${className}`}
      onClick={toggleTheme}
      aria-label={ariaLabel ?? `Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
    >
      {theme === 'light' ? <Moon size={iconSize} /> : <Sun size={iconSize} />}
    </button>
  );
}
