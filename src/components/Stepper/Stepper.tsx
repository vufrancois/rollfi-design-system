import './Stepper.css';

interface Step {
  label: string;
}

interface StepperProps {
  steps: Step[];
  currentIdx: number;
}

export function Stepper({ steps, currentIdx }: StepperProps) {
  return (
    <ol className="rf-stepper">
      {steps.map((step, i) => {
        const state = i < currentIdx ? 'done' : i === currentIdx ? 'active' : 'idle';
        return (
          <li key={step.label} className={`rf-stepper__step rf-stepper__step--${state}`}>
            <div className="rf-stepper__circle">
              {state === 'done' ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <span className="rf-stepper__label">{step.label}</span>
            {i < steps.length - 1 && <span className="rf-stepper__line" aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  );
}
