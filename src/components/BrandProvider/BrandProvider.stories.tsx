import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrandProvider } from './BrandProvider';
import { Logo } from '../Logo/Logo';
import { Pill } from '../Pill/Pill';
import { Sidebar } from '../Sidebar/Sidebar';
import { Card } from '../Card/Card';
import { House, ChartBar, Users, Gear } from '@phosphor-icons/react';

const meta = {
  title: 'Theming / BrandProvider',
  component: BrandProvider,
  tags: ['autodocs'],
  argTypes: {
    brand: { control: 'color' },
    sidebar: { control: 'color' },
    logoUrl: { control: 'text' },
    logoTitle: { control: 'text' },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Scopes a tenant white-label theme to its subtree: brand accent color, sidebar color, and logo. Wraps any consuming component — Pill, Calendar, Docs, Sidebar, Logo — and they recolor automatically. Mounted once at the app root in production. No props → defaults to Rollfi branding.',
      },
    },
  },
  args: { children: null },
} satisfies Meta<typeof BrandProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <House /> },
  { id: 'activity', label: 'Activity', icon: <ChartBar /> },
  { id: 'users', label: 'Users', icon: <Users /> },
  { id: 'settings', label: 'Settings', icon: <Gear /> },
];

function Preview() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', height: '100vh' }}>
      <Sidebar
        logo={<Logo size={26} />}
        items={navItems}
        activeId="dashboard"
        onSelect={() => {}}
      />
      <div
        style={{
          padding: 32,
          background: 'var(--rf-color-canvas)',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <Logo size={40} />
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Pill>Brand pill</Pill>
          <Pill tone="outline">Outline pill</Pill>
        </div>
        <Card style={{ maxWidth: 400 }}>
          <p style={{ marginBottom: 12 }}>Card body — surface stays neutral.</p>
          <a href="#" style={{ color: 'var(--rf-color-brand-text)' }}>
            A link using the brand-text token
          </a>
        </Card>
      </div>
    </div>
  );
}

export const RollfiDefault: Story = {
  name: 'Rollfi default (no overrides)',
  render: () => (
    <BrandProvider>
      <Preview />
    </BrandProvider>
  ),
};

export const AcmeBlue: Story = {
  name: 'Acme — blue brand, navy sidebar',
  args: { brand: '#0066ff', sidebar: '#1a1f2e' },
  render: (args) => (
    <BrandProvider {...args}>
      <Preview />
    </BrandProvider>
  ),
};

export const NovaPurple: Story = {
  name: 'Nova — purple brand, default sidebar',
  args: { brand: '#7c3aed' },
  render: (args) => (
    <BrandProvider {...args}>
      <Preview />
    </BrandProvider>
  ),
};

export const LightSidebar: Story = {
  name: 'Light sidebar — auto-contrast flip',
  args: { brand: '#16a34a', sidebar: '#f4f4f6' },
  render: (args) => (
    <BrandProvider {...args}>
      <Preview />
    </BrandProvider>
  ),
};

export const WithCustomLogo: Story = {
  name: 'Custom logo URL',
  args: {
    brand: '#ff6905',
    logoUrl: 'https://placehold.co/120x40/ff6905/white?text=ACME',
    logoTitle: 'Acme',
  },
  render: (args) => (
    <BrandProvider {...args}>
      <Preview />
    </BrandProvider>
  ),
};

/**
 * Interactive Playground — use the Controls panel to paint your own
 * tenant theme live. Brand + sidebar accept any CSS color.
 */
export const Playground: Story = {
  args: {
    brand: '#FF2F1C',
    sidebar: '#0A0A0A',
    logoUrl: '',
    logoTitle: '',
  },
  render: (args) => (
    <BrandProvider
      {...args}
      logoUrl={args.logoUrl || undefined}
      logoTitle={args.logoTitle || undefined}
    >
      <Preview />
    </BrandProvider>
  ),
};
