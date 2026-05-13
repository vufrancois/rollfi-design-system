import { type ReactNode } from 'react';
import './ButtonGroup.css';

interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
}

export function ButtonGroup({ children, className = '' }: ButtonGroupProps) {
  return <div className={`rf-button-group ${className}`} role="group">{children}</div>;
}
