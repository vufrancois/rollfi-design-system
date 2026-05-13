import './SegmentedProgress.css';

interface SegmentedProgressProps {
  current: number;
  total: number;
}

export function SegmentedProgress({ current, total }: SegmentedProgressProps) {
  return (
    <div className="rf-segmented-progress" role="progressbar" aria-valuenow={current} aria-valuemin={1} aria-valuemax={total}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`rf-segmented-progress__segment ${i < current ? 'rf-segmented-progress__segment--active' : ''}`}
        />
      ))}
    </div>
  );
}
