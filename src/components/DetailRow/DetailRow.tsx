import { type ReactNode } from 'react';
import './DetailRow.css';

interface DetailRowProps {
  label: string;
  value: ReactNode;
  masked?: boolean;
}

export function DetailRow({ label, value, masked }: DetailRowProps) {
  return (
    <div className="rf-detail-row">
      <span className="rf-detail-row__label">{label}</span>
      <span className="rf-detail-row__value">
        {masked ? '••••••••' : value}
      </span>
    </div>
  );
}
