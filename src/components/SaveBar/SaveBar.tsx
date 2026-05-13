import { type ReactNode } from 'react';
import './SaveBar.css';

interface SaveBarProps {
  dirty: boolean;
  /** Message shown on the left. Defaults flip based on `dirty`. */
  cleanLabel?: ReactNode;
  dirtyLabel?: ReactNode;
  onSave: () => void;
  onReset?: () => void;
  saveLabel?: string;
  resetLabel?: string;
  saving?: boolean;
  className?: string;
}

export function SaveBar({
  dirty, cleanLabel = 'All changes saved.', dirtyLabel = 'You have unsaved changes.',
  onSave, onReset, saveLabel = 'Save changes', resetLabel = 'Reset to defaults',
  saving, className = '',
}: SaveBarProps) {
  return (
    <div className={`rf-save-bar ${dirty ? 'rf-save-bar--dirty' : ''} ${className}`}>
      <span className="rf-save-bar__status">
        {dirty ? dirtyLabel : cleanLabel}
      </span>
      <div className="rf-save-bar__actions">
        {onReset && (
          <button
            type="button"
            className="rf-save-bar__btn rf-save-bar__btn--secondary"
            onClick={onReset}
            disabled={!dirty || saving}
          >
            {resetLabel}
          </button>
        )}
        <button
          type="button"
          className="rf-save-bar__btn rf-save-bar__btn--primary"
          onClick={onSave}
          disabled={!dirty || saving}
        >
          {saving ? 'Saving…' : saveLabel}
        </button>
      </div>
    </div>
  );
}
