import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatCard } from './StatCard';
import { Badge } from '../Badge/Badge';

const meta = {
  title: 'Display / StatCard',
  component: StatCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    label: 'Total companies',
    value: '128',
  },
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelper: Story = {
  args: {
    label: 'Total companies',
    value: '128',
    helper: <Badge variant="success">+4 this month</Badge>,
  },
};

export const CurrencyValue: Story = {
  args: {
    label: 'Pending payroll',
    value: '$42,310.18',
    helper: 'Across 3 companies',
  },
};

export const Grid: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(3, 220px)' }}>
      <StatCard label="Total companies" value="128" helper="+4 this month" />
      <StatCard label="Active payroll runs" value="14" helper={<Badge variant="teal">Payroll ready</Badge>} />
      <StatCard
        label="Action required"
        value="3"
        helper={<Badge variant="danger">Blocking</Badge>}
      />
    </div>
  ),
};
