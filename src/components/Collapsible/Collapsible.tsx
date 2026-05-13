import { type ReactNode, createContext, useContext, useState } from 'react';
import './Collapsible.css';

interface CollapsibleContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CollapsibleContext = createContext<CollapsibleContextValue | null>(null);

interface CollapsibleProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  className?: string;
}

export function Collapsible({ open: openProp, defaultOpen = false, onOpenChange, children, className = '' }: CollapsibleProps) {
  const [internal, setInternal] = useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : internal;
  const setOpen = (next: boolean) => {
    if (!isControlled) setInternal(next);
    onOpenChange?.(next);
  };
  return (
    <CollapsibleContext.Provider value={{ open, setOpen }}>
      <div className={`rf-collapsible ${className}`}>{children}</div>
    </CollapsibleContext.Provider>
  );
}

export function CollapsibleTrigger({ children, asChild = false }: { children: ReactNode; asChild?: boolean }) {
  const ctx = useContext(CollapsibleContext);
  if (!ctx) return null;
  if (asChild) {
    return (
      <span onClick={() => ctx.setOpen(!ctx.open)} role="button" aria-expanded={ctx.open}>
        {children}
      </span>
    );
  }
  return (
    <button
      type="button"
      className="rf-collapsible__trigger"
      onClick={() => ctx.setOpen(!ctx.open)}
      aria-expanded={ctx.open}
    >
      {children}
    </button>
  );
}

export function CollapsibleContent({ children }: { children: ReactNode }) {
  const ctx = useContext(CollapsibleContext);
  if (!ctx) return null;
  return (
    <div className={`rf-collapsible__content ${ctx.open ? 'rf-collapsible__content--open' : ''}`}>
      <div className="rf-collapsible__content-inner">{children}</div>
    </div>
  );
}
