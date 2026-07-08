import type { Meta, StoryObj } from '@storybook/react-vite';
import { StackedBar } from './StackedBar';

const meta = {
  title: 'Data / StackedBar',
  component: StackedBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Horizontal stacked bar for showing a total split across two-to-many categories. ' +
          'Two variants — compact (10px pill, default) and inline-label (28px bar with the ' +
          'formatted value rendered inside each segment).',
      },
    },
  },
  argTypes: {
    inlineLabels: { control: 'boolean' },
    showPercent: { control: 'boolean' },
    showLegend: { control: 'boolean' },
    height: { control: 'number' },
  },
  args: {
    segments: [
      { label: 'Direct deposits (ACH)', value: 8250 },
      { label: 'Check payments', value: 3120 },
      { label: 'Garnishments', value: 1270.5 },
    ],
    format: (n) => `$${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
  },
} satisfies Meta<typeof StackedBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ maxWidth: 640 }}>{children}</div>
);

export const Compact: Story = {
  name: 'Compact (default)',
  render: (args) => <Frame><StackedBar {...args} /></Frame>,
};

export const InlineLabels: Story = {
  name: 'Inline labels (28px bar)',
  render: () => (
    <Frame>
      <StackedBar
        inlineLabels
        format={(n) => `$${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`}
        segments={[
          { label: 'First Platypus Bank ···0000', value: 2598, color: 'var(--rf-color-success)' },
          { label: 'Chase Bank ···4521', value: 650, color: 'var(--rf-color-info)' },
        ]}
      />
    </Frame>
  ),
};

export const PaycheckPreview: Story = {
  name: 'Paycheck preview (inline + percent)',
  render: () => (
    <Frame>
      <div style={{ font: 'var(--rf-text-body-sm)', color: 'var(--rf-color-text-secondary)', marginBottom: 8 }}>
        <strong style={{ color: 'var(--rf-color-text)' }}>Paycheck preview</strong> — based on $3,247.86 net pay
      </div>
      <StackedBar
        inlineLabels
        showPercent
        format={(n) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        segments={[
          { label: 'First Platypus Bank ···0000', value: 2598.29, color: 'var(--rf-color-success)' },
          { label: 'Chase Bank ···4521', value: 649.57, color: 'var(--rf-color-info)' },
        ]}
      />
    </Frame>
  ),
};

export const NoLegend: Story = {
  render: (args) => (
    <Frame><StackedBar {...args} showLegend={false} /></Frame>
  ),
};

export const TwoSegments: Story = {
  render: () => (
    <Frame>
      <StackedBar
        format={(n) => `$${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`}
        segments={[
          { label: 'Cleared', value: 24000, color: 'var(--rf-color-success)' },
          { label: 'Pending', value: 4200, color: 'var(--rf-color-warning)' },
        ]}
      />
    </Frame>
  ),
};
