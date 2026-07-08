import type { Meta, StoryObj } from '@storybook/react-vite';
import { CreditCard, FileText, CheckCircle, Warning, XCircle, Bank, Star, Bell } from '@phosphor-icons/react';
import { IconTile } from './IconTile';

const meta = {
  title: 'Display / IconTile',
  component: IconTile,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Decorative icon container. Not interactive. Sizes sm (24) / md (32) / lg (40) / xl (48). ' +
          'Pass `outlined` for a Button-weight rim — on the neutral tone that gives the muted ' +
          'surface + thin outline look; on colored tones the border matches the fill hue.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['neutral', 'info', 'success', 'warning', 'danger', 'teal', 'purple', 'orange'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl'] },
    shape: { control: 'inline-radio', options: ['square', 'circle'] },
    outlined: { control: 'boolean' },
  },
  args: { children: null },
} satisfies Meta<typeof IconTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outlined: Story = {
  args: { outlined: true, size: 'xl' },
  render: (args) => (
    <IconTile {...args}><CreditCard size={24} /></IconTile>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
      <IconTile outlined size="sm"><CreditCard size={14} /></IconTile>
      <IconTile outlined size="md"><CreditCard size={16} /></IconTile>
      <IconTile outlined size="lg"><CreditCard size={20} /></IconTile>
      <IconTile outlined size="xl"><CreditCard size={24} /></IconTile>
    </div>
  ),
};

export const Filled: Story = {
  name: 'Filled tones (no outline)',
  render: () => (
    <div style={{ display: 'inline-flex', gap: 12 }}>
      <IconTile size="lg" variant="neutral"><CreditCard size={20} /></IconTile>
      <IconTile size="lg" variant="info"><FileText size={20} /></IconTile>
      <IconTile size="lg" variant="success"><CheckCircle size={20} /></IconTile>
      <IconTile size="lg" variant="warning"><Warning size={20} /></IconTile>
      <IconTile size="lg" variant="danger"><XCircle size={20} /></IconTile>
      <IconTile size="lg" variant="teal"><Bank size={20} /></IconTile>
      <IconTile size="lg" variant="purple"><Star size={20} /></IconTile>
      <IconTile size="lg" variant="orange"><Bell size={20} /></IconTile>
    </div>
  ),
};

export const OutlinedTones: Story = {
  name: 'Outlined tones (border matches fill)',
  render: () => (
    <div style={{ display: 'inline-flex', gap: 12 }}>
      <IconTile outlined size="lg" variant="neutral"><CreditCard size={20} /></IconTile>
      <IconTile outlined size="lg" variant="info"><FileText size={20} /></IconTile>
      <IconTile outlined size="lg" variant="success"><CheckCircle size={20} /></IconTile>
      <IconTile outlined size="lg" variant="warning"><Warning size={20} /></IconTile>
      <IconTile outlined size="lg" variant="danger"><XCircle size={20} /></IconTile>
      <IconTile outlined size="lg" variant="teal"><Bank size={20} /></IconTile>
      <IconTile outlined size="lg" variant="purple"><Star size={20} /></IconTile>
      <IconTile outlined size="lg" variant="orange"><Bell size={20} /></IconTile>
    </div>
  ),
};

export const Circle: Story = {
  render: () => (
    <div style={{ display: 'inline-flex', gap: 12 }}>
      <IconTile shape="circle" size="lg" variant="success"><CheckCircle size={20} /></IconTile>
      <IconTile shape="circle" outlined size="lg"><CreditCard size={20} /></IconTile>
    </div>
  ),
};
