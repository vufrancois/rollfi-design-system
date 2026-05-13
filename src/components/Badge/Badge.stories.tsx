import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckCircle, Warning, XCircle, Info } from '@phosphor-icons/react';
import { Badge } from './Badge';

const meta = {
  title: 'Feedback / Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'success', 'danger', 'warning', 'info', 'teal', 'purple', 'orange'],
    },
  },
  args: { children: 'Active', variant: 'success' },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: { icon: <CheckCircle />, children: 'Active', variant: 'success' },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'inline-flex', gap: 8, flexWrap: 'wrap', maxWidth: 480 }}>
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="success" icon={<CheckCircle />}>Success</Badge>
      <Badge variant="danger" icon={<XCircle />}>Danger</Badge>
      <Badge variant="warning" icon={<Warning />}>Warning</Badge>
      <Badge variant="info" icon={<Info />}>Info</Badge>
      <Badge variant="teal">Payroll ready</Badge>
      <Badge variant="purple">Beta</Badge>
      <Badge variant="orange">Action required</Badge>
    </div>
  ),
};
