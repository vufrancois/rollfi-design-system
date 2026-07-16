import { type ReactNode } from 'react';
import './FormSection.css';

interface FormSectionProps {
  /** Small icon rendered inside a rounded surface-elevated square in the head row. */
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Right-side slot in the head row (optional badge, edit link, etc.). */
  action?: ReactNode;
  /** Head-row background tone. `surface-elevated` (default) matches the reference. */
  headTone?: 'surface-elevated' | 'transparent';
  children: ReactNode;
  className?: string;
}

/**
 * Card-shaped form container for onboarding, settings, and multi-section
 * forms. Head row (icon + title + description + optional action) sits
 * above a body slot padded for form fields.
 *
 * Compose with `<FieldRow>` inside the body for 1/2/3-column field
 * layouts.
 */
export function FormSection({
  icon,
  title,
  description,
  action,
  headTone = 'surface-elevated',
  children,
  className = '',
}: FormSectionProps) {
  return (
    <section className={`rf-form-section ${className}`}>
      <header className={`rf-form-section__head rf-form-section__head--${headTone}`}>
        {icon && <span className="rf-form-section__icon" aria-hidden>{icon}</span>}
        <div className="rf-form-section__text">
          <div className="rf-form-section__title">{title}</div>
          {description && <div className="rf-form-section__desc">{description}</div>}
        </div>
        {action && <div className="rf-form-section__action">{action}</div>}
      </header>
      <div className="rf-form-section__body">{children}</div>
    </section>
  );
}

interface FieldRowProps {
  /** Grid columns. `auto` derives from child count (1 → 1 col, 2 → 2 col, 3+ → 3 col). */
  columns?: 1 | 2 | 3 | 'auto';
  children: ReactNode;
  className?: string;
}

/**
 * Grid row for form fields inside a `<FormSection>`. Auto-columns by
 * default; override with `columns` for stability.
 */
export function FieldRow({ columns = 'auto', children, className = '' }: FieldRowProps) {
  const count = Array.isArray(children) ? children.length : 1;
  const resolved: 1 | 2 | 3 =
    columns === 'auto' ? (count >= 3 ? 3 : count === 2 ? 2 : 1) : columns;
  return (
    <div className={`rf-form-section__row rf-form-section__row--${resolved} ${className}`}>
      {children}
    </div>
  );
}
