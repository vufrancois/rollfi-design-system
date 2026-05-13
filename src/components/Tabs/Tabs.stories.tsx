import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Tabs } from './Tabs';

const meta = {
  title: 'Navigation / Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  // `tabs` / `value` / `onChange` are supplied per-story via `render`.
  args: { tabs: [], value: '', onChange: () => {} },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const tabs = [
  { key: 'pay-periods', label: 'Pay periods' },
  { key: 'pay-stubs', label: 'Pay stubs' },
  { key: 'taxes', label: 'Tax filings' },
  { key: 'payouts', label: 'Payout account' },
];

// Tabs is a controlled component — the story owns the selected key.
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('pay-periods');
    return (
      <div style={{ width: 560 }}>
        <Tabs tabs={tabs} value={value} onChange={setValue} />
        <div
          style={{
            marginTop: 16,
            padding: 16,
            border: '1px solid var(--rf-color-border)',
            borderRadius: 'var(--rf-radius-md)',
            color: 'var(--rf-color-text-secondary)',
          }}
        >
          Currently viewing: <strong>{tabs.find((t) => t.key === value)?.label}</strong>
        </div>
      </div>
    );
  },
};

export const TwoTabs: Story = {
  render: () => {
    const [value, setValue] = useState('a');
    return (
      <Tabs
        tabs={[{ key: 'a', label: 'Active' }, { key: 'b', label: 'Archived' }]}
        value={value}
        onChange={setValue}
      />
    );
  },
};
