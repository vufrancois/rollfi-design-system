import type { Meta, StoryObj } from '@storybook/react-vite';
import { DetailRow } from './DetailRow';
import { Card } from '../Card/Card';

const meta = {
  title: 'Display / DetailRow',
  component: DetailRow,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    layout: { control: 'inline-radio', options: ['inline', 'stacked'] },
    masked: { control: 'boolean' },
  },
  args: { label: 'Email', value: 'john@rollfi.com' },
} satisfies Meta<typeof DetailRow>;

export default meta;
type Story = StoryObj<typeof meta>;

const Frame = ({ children }: { children: React.ReactNode }) => (
  <Card variant="outlined" padding="md" style={{ width: 320 }}>
    {children}
  </Card>
);

export const Inline: Story = {
  render: () => (
    <Frame>
      <DetailRow label="Full name" value="John Doe" />
      <DetailRow label="Email" value="john@rollfi.com" />
      <DetailRow label="SSN" value="123-45-6789" masked />
      <DetailRow label="Department" value="Engineering" />
    </Frame>
  ),
};

export const Stacked: Story = {
  render: () => (
    <Frame>
      <DetailRow layout="stacked" label="Full name" value="John Doe" />
      <DetailRow layout="stacked" label="Email" value="john@rollfi.com" />
      <DetailRow layout="stacked" label="SSN" value="123-45-6789" masked />
      <DetailRow layout="stacked" label="Department" value="Engineering" />
    </Frame>
  ),
};

export const StackedInfoCard: Story = {
  name: 'Stacked — info card composition',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 220px)', gap: 16 }}>
      <Card variant="outlined" padding="md">
        <DetailRow layout="stacked" label="Total companies" value="725" />
      </Card>
      <Card variant="outlined" padding="md">
        <DetailRow layout="stacked" label="Active people" value="782" />
      </Card>
      <Card variant="outlined" padding="md">
        <DetailRow layout="stacked" label="Pending payroll" value="$42,310.18" />
      </Card>
      <Card variant="outlined" padding="md">
        <DetailRow layout="stacked" label="Action required" value="3 companies" />
      </Card>
    </div>
  ),
};

export const SideBySide: Story = {
  name: 'Inline vs Stacked side-by-side',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 280px)', gap: 16 }}>
      <Frame>
        <DetailRow label="Full name" value="John Doe" />
        <DetailRow label="Email" value="john@rollfi.com" />
        <DetailRow label="Department" value="Engineering" />
      </Frame>
      <Frame>
        <DetailRow layout="stacked" label="Full name" value="John Doe" />
        <DetailRow layout="stacked" label="Email" value="john@rollfi.com" />
        <DetailRow layout="stacked" label="Department" value="Engineering" />
      </Frame>
    </div>
  ),
};
