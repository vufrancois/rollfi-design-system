import './Avatar.css';

type AvatarSize = 'sm' | 'md' | 'lg';

interface AvatarProps {
  name: string;
  src?: string;
  size?: AvatarSize;
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(s => s[0]?.toUpperCase() ?? '')
    .join('');
}

export function Avatar({ name, src, size = 'md' }: AvatarProps) {
  return (
    <span className={`rf-avatar rf-avatar--${size}`} aria-label={name} role="img">
      {src ? (
        <img src={src} alt={name} className="rf-avatar__img" />
      ) : (
        <span className="rf-avatar__initials">{initials(name) || '?'}</span>
      )}
    </span>
  );
}
