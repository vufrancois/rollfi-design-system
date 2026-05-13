import { type CSSProperties } from 'react';
import './Skeleton.css';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  radius?: number | string;
  circle?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function Skeleton({ width, height, radius, circle, className = '', style }: SkeletonProps) {
  const css: CSSProperties = {
    width,
    height,
    borderRadius: circle ? '50%' : radius,
    ...style,
  };
  return <span className={`rf-skeleton ${className}`} style={css} aria-hidden="true" />;
}
