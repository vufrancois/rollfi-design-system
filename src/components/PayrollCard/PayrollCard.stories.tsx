import type { Meta, StoryObj } from '@storybook/react-vite';
import { PayrollCard } from './PayrollCard';
import { Badge } from '../Badge/Badge';

const meta = {
  title: 'Layout / PayrollCard',
  component: PayrollCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Domain-specific summary card for a pay period. Header row (title + trailing accessory), ' +
          '2- or 3-column stat grid, optional full-width action button.',
      },
    },
  },
  args: { title: '', stats: [] },
} satisfies Meta<typeof PayrollCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Upcoming: Story = {
  render: () => (
    <div style={{ maxWidth: 380 }}>
      <PayrollCard
        title="Upcoming payroll"
        trailing={<Badge variant="warning">Upcoming</Badge>}
        stats={[
          { label: 'Payday', value: 'Fri, May 29', emphasized: true },
          { label: 'Pay period', value: 'May 16 – May 29' },
        ]}
        action={{ label: 'View status', onClick: () => {} }}
      />
    </div>
  ),
};

export const Past: Story = {
  render: () => (
    <div style={{ maxWidth: 380 }}>
      <PayrollCard
        title="Last payroll"
        trailing={<span className="rf-payroll-card__amount">$3,247.86</span>}
        stats={[
          { label: 'Payday', value: 'Thu, May 15', emphasized: true },
          { label: 'Pay period', value: 'May 1 – May 15' },
        ]}
        action={{ label: 'View details', onClick: () => {} }}
      />
    </div>
  ),
};

export const ThreeColumnStats: Story = {
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <PayrollCard
        title="This week"
        trailing={<span className="rf-payroll-card__amount">$1,842.10</span>}
        stats={[
          { label: 'Regular', value: '40.0 hrs', emphasized: true },
          { label: 'Overtime', value: '2.5 hrs' },
          { label: 'Gross', value: '$1,842.10' },
        ]}
        action={{ label: 'View timesheet', onClick: () => {}, variant: 'primary' }}
      />
    </div>
  ),
};

export const NoAction: Story = {
  render: () => (
    <div style={{ maxWidth: 380 }}>
      <PayrollCard
        title="Awaiting owner approval"
        trailing={<Badge variant="info">Draft</Badge>}
        stats={[
          { label: 'Payday', value: 'Fri, Jun 12', emphasized: true },
          { label: 'Pay period', value: 'May 30 – Jun 12' },
        ]}
      />
    </div>
  ),
};

export const SideBySide: Story = {
  name: 'Side-by-side (Payroll details pattern)',
  render: () => (
    <>
      <h2 style={{ font: 'var(--rf-text-heading-md)', marginBottom: 16 }}>Payroll details</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
        <PayrollCard
          title="Upcoming payroll"
          trailing={<Badge variant="warning">Upcoming</Badge>}
          stats={[
            { label: 'Payday', value: 'Fri, May 29', emphasized: true },
            { label: 'Pay period', value: 'May 16 – May 29' },
          ]}
          action={{ label: 'View status', onClick: () => {} }}
        />
        <PayrollCard
          title="Last payroll"
          trailing={<span className="rf-payroll-card__amount">$3,247.86</span>}
          stats={[
            { label: 'Payday', value: 'Thu, May 15', emphasized: true },
            { label: 'Pay period', value: 'May 1 – May 15' },
          ]}
          action={{ label: 'View details', onClick: () => {} }}
        />
      </div>
    </>
  ),
};
