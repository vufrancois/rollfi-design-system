import { Avatar } from '../Avatar/Avatar';
import './AvatarGroup.css';

type AvatarGroupSize = 'sm' | 'md' | 'lg';

interface AvatarItem {
  name: string;
  src?: string;
}

interface AvatarGroupProps {
  items: AvatarItem[];
  max?: number;
  size?: AvatarGroupSize;
}

export function AvatarGroup({ items, max = 4, size = 'md' }: AvatarGroupProps) {
  const visible = items.slice(0, max);
  const overflow = items.length - visible.length;
  return (
    <div className={`rf-avatar-group rf-avatar-group--${size}`}>
      {visible.map((it, i) => (
        <span key={i} className="rf-avatar-group__item">
          <Avatar name={it.name} src={it.src} size={size} />
        </span>
      ))}
      {overflow > 0 && (
        <span className={`rf-avatar-group__item rf-avatar-group__overflow rf-avatar rf-avatar--${size}`}>
          +{overflow}
        </span>
      )}
    </div>
  );
}
