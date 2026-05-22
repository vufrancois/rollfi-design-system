import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { House, ChartBar, CreditCard, User, Lightning } from '@phosphor-icons/react';
import { Sidebar } from './Sidebar';
import { Badge } from '../Badge/Badge';

const meta = {
  title: 'Navigation / Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { items: [], activeId: '', onSelect: () => {} },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '232px 1fr', height: '100vh' }}>
      {children}
      <div style={{ padding: 32, background: 'var(--rf-color-canvas)', color: 'var(--rf-color-text-secondary)' }}>
        Active section content renders here.
      </div>
    </div>
  );
}

export const Flat: Story = {
  name: 'Flat nav (no children)',
  render: () => {
    const [active, setActive] = useState('dashboard');
    return (
      <Frame>
        <Sidebar
          activeId={active}
          onSelect={setActive}
          items={[
            { id: 'dashboard', label: 'Dashboard', icon: <House size={16} /> },
            { id: 'team', label: 'Team', icon: <User size={16} /> },
            { id: 'reports', label: 'Reports', icon: <ChartBar size={16} />, badge: <Badge variant="danger">2</Badge> },
          ]}
        />
      </Frame>
    );
  },
};

export const WithSubItems: Story = {
  name: 'Nested sub-items',
  render: () => {
    const [active, setActive] = useState('billing_report');
    return (
      <Frame>
        <Sidebar
          activeId={active}
          onSelect={setActive}
          items={[
            { id: 'dashboard', label: 'Dashboard', icon: <House size={16} /> },
            { id: 'implementations', label: 'Implementations', icon: <Lightning size={16} /> },
            {
              id: 'activity', label: 'Payroll activity', icon: <ChartBar size={16} />,
              badge: <Badge variant="danger">1</Badge>,
              children: [
                { id: 'activity_payments', label: 'Payments' },
                { id: 'activity_tax_filings', label: 'Tax filings' },
              ],
            },
            {
              id: 'billing', label: 'Billing', icon: <CreditCard size={16} />,
              children: [
                { id: 'billing_report', label: 'Report' },
                { id: 'billing_pricing', label: 'Pricing controls' },
                { id: 'billing_simulation', label: 'Simulation' },
                { id: 'billing_payout', label: 'Payout account' },
              ],
            },
            { id: 'users', label: 'Users', icon: <User size={16} /> },
          ]}
        />
      </Frame>
    );
  },
};

export const DeepLinkAutoExpand: Story = {
  name: 'Deep link → parent auto-expands',
  render: () => {
    // Starts with a sub-item active; the parent group should be open on mount.
    const [active, setActive] = useState('billing_simulation');
    return (
      <Frame>
        <Sidebar
          activeId={active}
          onSelect={setActive}
          items={[
            { id: 'dashboard', label: 'Dashboard', icon: <House size={16} /> },
            {
              id: 'billing', label: 'Billing', icon: <CreditCard size={16} />,
              children: [
                { id: 'billing_report', label: 'Report' },
                { id: 'billing_pricing', label: 'Pricing controls' },
                { id: 'billing_simulation', label: 'Simulation' },
                { id: 'billing_payout', label: 'Payout account' },
              ],
            },
          ]}
        />
      </Frame>
    );
  },
};
