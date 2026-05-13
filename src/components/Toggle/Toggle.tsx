import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import './Toggle.css';

interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Toggle({ pressed, onPressedChange, size = 'md', children, className = '', ...props }: ToggleProps) {
  return (
    <button
      type="button"
      role="button"
      aria-pressed={pressed}
      data-state={pressed ? 'on' : 'off'}
      className={`rf-toggle-btn rf-toggle-btn--${size} ${pressed ? 'rf-toggle-btn--on' : ''} ${className}`}
      onClick={() => onPressedChange(!pressed)}
      {...props}
    >
      {children}
    </button>
  );
}
