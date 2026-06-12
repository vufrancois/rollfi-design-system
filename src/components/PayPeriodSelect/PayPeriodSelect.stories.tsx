import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { PayPeriodSelect, type PayPeriodOption } from './PayPeriodSelect';

const PERIODS: PayPeriodOption[] = [
  { id: 'pp-1', payDate: '2026-05-15', payBeginDate: '2026-05-01', payEndDate: '2026-05-15', type: 'Regular',   status: 'pending' },
  { id: 'pp-2', payDate: '2026-04-30', payBeginDate: '2026-04-16', payEndDate: '2026-04-30', type: 'Regular',   status: 'failed'  },
  { id: 'pp-3', payDate: '2026-04-15', payBeginDate: '2026-04-01', payEndDate: '2026-04-15', type: 'Regular',   status: 'paid'    },
  { id: 'pp-4', payDate: '2026-04-08', payBeginDate: '2026-04-08', payEndDate: '2026-04-08', type: 'Off-cycle', status: 'paid'    },
  { id: 'pp-5', payDate: '2026-03-31', payBeginDate: '2026-03-16', payEndDate: '2026-03-31', type: 'Regular',   status: 'paid'    },
  { id: 'pp-6', payDate: '2026-03-22', payBeginDate: '2026-03-22', payEndDate: '2026-03-22', type: 'Dismissal', status: 'paid'    },
];

const meta = {
  title: 'Domain / PayPeriodSelect',
  component: PayPeriodSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Domain-specific dropdown for picking a pay period. Trigger shows the selected pay date + range + type badge; menu rows expand the same data with optional status pulses. Sorted by payDate (default: newest first).',
      },
    },
  },
  argTypes: {
    sortBy: { control: 'inline-radio', options: ['paydate-desc', 'paydate-asc'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
  },
  args: {
    options: PERIODS,
    value: null,
    onChange: () => {},
    label: 'Pay period',
    placeholder: 'Select pay period',
  },
} satisfies Meta<typeof PayPeriodSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>('pp-2');
    return (
      <div style={{ width: 320 }}>
        <PayPeriodSelect {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

export const Empty: Story = {
  name: 'Empty (no periods)',
  render: (args) => (
    <div style={{ width: 320 }}>
      <PayPeriodSelect {...args} options={[]} value={null} placeholder="No periods available" />
    </div>
  ),
};

export const Unselected: Story = {
  name: 'Unselected (placeholder)',
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    return (
      <div style={{ width: 320 }}>
        <PayPeriodSelect {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

export const OldestFirst: Story = {
  name: 'Sort: oldest first',
  render: (args) => {
    const [value, setValue] = useState<string | null>('pp-6');
    return (
      <div style={{ width: 320 }}>
        <PayPeriodSelect {...args} value={value} onChange={setValue} sortBy="paydate-asc" />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: (args) => (
    <div style={{ width: 320 }}>
      <PayPeriodSelect {...args} value="pp-2" disabled />
    </div>
  ),
};

export const StatusVariants: Story = {
  name: 'Status pulses',
  render: () => {
    const variants: PayPeriodOption[] = [
      { id: 'pp-a', payDate: '2026-05-15', payBeginDate: '2026-05-01', payEndDate: '2026-05-15', type: 'Regular', status: 'failed'  },
      { id: 'pp-b', payDate: '2026-04-30', payBeginDate: '2026-04-16', payEndDate: '2026-04-30', type: 'Regular', status: 'pending' },
      { id: 'pp-c', payDate: '2026-04-15', payBeginDate: '2026-04-01', payEndDate: '2026-04-15', type: 'Regular', status: 'paid'    },
      { id: 'pp-d', payDate: '2026-03-31', payBeginDate: '2026-03-16', payEndDate: '2026-03-31', type: 'Regular', status: 'draft'   },
    ];
    const [value, setValue] = useState<string | null>('pp-a');
    return (
      <div style={{ width: 320 }}>
        <PayPeriodSelect
          options={variants}
          value={value}
          onChange={setValue}
          label="Click to see all four status colors"
        />
      </div>
    );
  },
};

export const TypeVariants: Story = {
  name: 'Type badges',
  render: () => {
    const variants: PayPeriodOption[] = [
      { id: 'a', payDate: '2026-05-15', payBeginDate: '2026-05-01', payEndDate: '2026-05-15', type: 'Regular'   },
      { id: 'b', payDate: '2026-05-10', payBeginDate: '2026-05-10', payEndDate: '2026-05-10', type: 'Off-cycle' },
      { id: 'c', payDate: '2026-05-05', payBeginDate: '2026-05-05', payEndDate: '2026-05-05', type: 'Dismissal' },
      { id: 'd', payDate: '2026-04-30', payBeginDate: '2026-04-16', payEndDate: '2026-04-30', type: 'Bonus'     },
    ];
    const [value, setValue] = useState<string | null>('a');
    return (
      <div style={{ width: 320 }}>
        <PayPeriodSelect
          options={variants}
          value={value}
          onChange={setValue}
          label="Regular → info · Off-cycle → warning · Dismissal → purple · other → neutral"
        />
      </div>
    );
  },
};
