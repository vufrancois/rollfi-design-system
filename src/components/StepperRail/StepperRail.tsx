import { type ReactNode } from 'react';
import { Check, Question } from '@phosphor-icons/react';
import './StepperRail.css';

export type StepperRailStatus = 'pending' | 'done' | 'conditional';
export type StepperRailTag = 'required' | 'optional' | 'conditional' | 'new';

export interface StepperRailStep {
  id: string;
  label: string;
  /** Small dim line under the label (e.g. "EIN, entity type & more"). */
  meta?: string;
  /** Colored pill next to the label. */
  tag?: StepperRailTag;
  /**
   * Explicit status. If omitted, steps before `activeId` become `done`,
   * the step at `activeId` is active, and steps after are `pending`.
   */
  status?: StepperRailStatus;
  /** Renders greyed-out and non-clickable — for steps skipped in this branch. */
  disabled?: boolean;
}

interface StepperRailProps {
  steps: StepperRailStep[];
  activeId: string;
  onSelect?: (id: string) => void;
  /** Show a top progress bar + label + percent. */
  showProgress?: boolean;
  /** Uppercase label above the progress bar. Default `Onboarding progress`. */
  progressLabel?: string;
  /** Explicit percent (0–100). If omitted, auto-derived from done count. */
  progressPercent?: number;
  /** Slot rendered above the progress bar / steps (e.g. logo + product name). */
  header?: ReactNode;
  /** Slot rendered below the steps (e.g. "Onboarding for Acme" partner badge). */
  footer?: ReactNode;
  /** Rail width. Default `280px`. */
  width?: number | string;
  className?: string;
}

export function StepperRail({
  steps,
  activeId,
  onSelect,
  showProgress = false,
  progressLabel = 'Onboarding progress',
  progressPercent,
  header,
  footer,
  width = 280,
  className = '',
}: StepperRailProps) {
  const activeIndex = steps.findIndex(s => s.id === activeId);

  const resolvedStatus = (step: StepperRailStep, idx: number): StepperRailStatus | 'active' => {
    if (step.id === activeId) return 'active';
    if (step.status) return step.status;
    if (idx < activeIndex) return 'done';
    return 'pending';
  };

  const doneCount = steps.filter((s, i) => s.status === 'done' || (s.status === undefined && i < activeIndex)).length;
  const pct = progressPercent ?? (steps.length > 1 ? Math.round((doneCount / (steps.length - 1)) * 100) : 0);

  return (
    <aside className={`rf-stepper-rail ${className}`} style={{ width }}>
      {header && <div className="rf-stepper-rail__header">{header}</div>}

      {showProgress && (
        <div className="rf-stepper-rail__progress">
          <div className="rf-stepper-rail__progress-label">{progressLabel}</div>
          <div className="rf-stepper-rail__progress-track">
            <div className="rf-stepper-rail__progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <div className="rf-stepper-rail__progress-pct">{pct}%</div>
        </div>
      )}

      <nav className="rf-stepper-rail__nav" aria-label="Onboarding steps">
        {steps.map((step, i) => {
          const status = resolvedStatus(step, i);
          const interactive = !step.disabled && !!onSelect;
          return (
            <button
              key={step.id}
              type="button"
              className={`rf-stepper-rail__step rf-stepper-rail__step--${status} ${step.disabled ? 'rf-stepper-rail__step--disabled' : ''}`}
              onClick={interactive ? () => onSelect!(step.id) : undefined}
              disabled={!interactive}
              aria-current={status === 'active' ? 'step' : undefined}
            >
              <span className={`rf-stepper-rail__node rf-stepper-rail__node--${status}`} aria-hidden>
                {status === 'done' ? (
                  <Check size={12} weight="bold" />
                ) : status === 'conditional' ? (
                  <Question size={12} weight="bold" />
                ) : (
                  i + 1
                )}
              </span>
              <span className="rf-stepper-rail__info">
                <span className="rf-stepper-rail__name">{step.label}</span>
                {step.meta && <span className="rf-stepper-rail__meta">{step.meta}</span>}
                {step.tag && (
                  <span className={`rf-stepper-rail__tag rf-stepper-rail__tag--${step.tag}`}>
                    {step.tag === 'required' && 'Required'}
                    {step.tag === 'optional' && 'Optional'}
                    {step.tag === 'conditional' && 'Conditional'}
                    {step.tag === 'new' && 'New'}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </nav>

      {footer && <div className="rf-stepper-rail__footer">{footer}</div>}
    </aside>
  );
}
