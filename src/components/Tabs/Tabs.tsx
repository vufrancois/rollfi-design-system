import './Tabs.css';

interface Tab {
  key: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  value: string;
  onChange: (key: string) => void;
}

export function Tabs({ tabs, value, onChange }: TabsProps) {
  return (
    <div className="rf-tabs" role="tablist">
      {tabs.map(tab => (
        <button
          key={tab.key}
          role="tab"
          type="button"
          aria-selected={value === tab.key}
          className={`rf-tabs__tab ${value === tab.key ? 'rf-tabs__tab--active' : ''}`}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
