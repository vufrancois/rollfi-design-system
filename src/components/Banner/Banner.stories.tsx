import type { Meta, StoryObj } from '@storybook/react-vite';
import { Info, CheckCircle, Warning, XCircle } from '@phosphor-icons/react';
import { Banner } from './Banner';
import { Button } from '../Button/Button';

const meta = {
  title: 'Feedback / Banner',
  component: Banner,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['neutral', 'info', 'success', 'warning', 'danger'] },
    dismissible: { control: 'boolean' },
    onDismiss: { action: 'dismissed' },
  },
  args: {
    variant: 'info',
    icon: <Info />,
    children: 'A new pay period is open — submit before Friday at 3pm PT.',
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Success: Story = {
  args: { variant: 'success', icon: <CheckCircle />, children: 'Payroll submitted successfully.' },
};

export const WarningVariant: Story = {
  name: 'Warning',
  args: { variant: 'warning', icon: <Warning />, children: '2 employees are missing direct-deposit info.' },
};

export const Danger: Story = {
  args: { variant: 'danger', icon: <XCircle />, children: 'Failed to sync — retry?' },
};

export const WithAction: Story = {
  args: {
    variant: 'warning',
    icon: <Warning />,
    children: '2 employees are missing direct-deposit info.',
    action: <Button size="sm" variant="secondary">Resolve</Button>,
  },
};

export const Dismissible: Story = {
  args: { dismissible: true },
};
