import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardHeader, CardFooter } from './Card';
import { Button } from '../Button/Button';

const meta = {
  title: 'Layout / Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'elevated', 'outlined', 'interactive'] },
    padding: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
  },
  args: { variant: 'default', padding: 'md', children: null },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'A simple card with default padding.',
  },
};

export const WithHeader: Story = {
  render: (args) => (
    <Card {...args} style={{ width: 380 }}>
      <CardHeader title="Acme Industries" description="Onboarding · 3 of 8 tasks complete" />
      <p style={{ color: 'var(--rf-color-text-secondary)' }}>
        2 items remain before this company can run payroll.
      </p>
    </Card>
  ),
};

export const WithHeaderAndFooter: Story = {
  render: (args) => (
    <Card {...args} style={{ width: 420 }}>
      <CardHeader
        title="Direct deposit"
        description="Connect a bank account to fund payroll runs."
        action={<Button size="sm" variant="tertiary">Edit</Button>}
      />
      <div style={{ padding: '12px 0', color: 'var(--rf-color-text-secondary)' }}>
        No account connected yet. Plaid or manual entry both work.
      </div>
      <CardFooter>
        <Button variant="secondary">Skip</Button>
        <Button>Connect account</Button>
      </CardFooter>
    </Card>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(2, 240px)' }}>
      {(['default', 'elevated', 'outlined', 'interactive'] as const).map((v) => (
        <Card key={v} variant={v}>
          <strong>{v}</strong>
          <p style={{ marginTop: 8, color: 'var(--rf-color-text-secondary)' }}>
            Card variant: <code>{v}</code>
          </p>
        </Card>
      ))}
    </div>
  ),
};
