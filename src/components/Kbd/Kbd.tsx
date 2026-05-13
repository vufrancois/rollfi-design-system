import { type ReactNode } from 'react';
import './Kbd.css';

interface KbdProps {
  children: ReactNode;
  className?: string;
}

export function Kbd({ children, className = '' }: KbdProps) {
  return <kbd className={`rf-kbd ${className}`}>{children}</kbd>;
}
