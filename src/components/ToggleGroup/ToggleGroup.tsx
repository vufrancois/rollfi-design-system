import { type ReactNode, createContext, useContext } from 'react';
import './ToggleGroup.css';

type ToggleGroupType = 'single' | 'multiple';
type ToggleGroupSize = 'sm' | 'md' | 'lg';

interface ToggleGroupContextValue {
  type: ToggleGroupType;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  size: ToggleGroupSize;
}

const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null);

interface SingleProps {
  type?: 'single';
  value: string;
  onChange: (value: string) => void;
}

interface MultipleProps {
  type: 'multiple';
  value: string[];
  onChange: (value: string[]) => void;
}

type ToggleGroupProps = (SingleProps | MultipleProps) & {
  size?: ToggleGroupSize;
  children: ReactNode;
};

export function ToggleGroup(props: ToggleGroupProps) {
  const { size = 'md', children } = props;
  const isMultiple = props.type === 'multiple';
  return (
    <ToggleGroupContext.Provider value={{
      type: isMultiple ? 'multiple' : 'single',
      value: props.value,
      onChange: props.onChange as (v: string | string[]) => void,
      size,
    }}>
      <div className={`rf-toggle-group rf-toggle-group--${size}`} role="group">
        {children}
      </div>
    </ToggleGroupContext.Provider>
  );
}

interface ToggleGroupItemProps {
  value: string;
  children: ReactNode;
  disabled?: boolean;
}

export function ToggleGroupItem({ value, children, disabled }: ToggleGroupItemProps) {
  const ctx = useContext(ToggleGroupContext);
  if (!ctx) return null;
  const isOn = ctx.type === 'multiple'
    ? (ctx.value as string[]).includes(value)
    : ctx.value === value;
  const handleClick = () => {
    if (ctx.type === 'multiple') {
      const v = ctx.value as string[];
      ctx.onChange(v.includes(value) ? v.filter(x => x !== value) : [...v, value]);
    } else {
      ctx.onChange(value === ctx.value ? '' : value);
    }
  };
  return (
    <button
      type="button"
      aria-pressed={isOn}
      disabled={disabled}
      className={`rf-toggle-group__item ${isOn ? 'rf-toggle-group__item--on' : ''}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
