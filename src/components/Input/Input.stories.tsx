import type { Meta, StoryObj } from '@storybook/react-vite';
import { MagnifyingGlass, Envelope } from '@phosphor-icons/react';
import { Input } from './Input';

const meta = {
  title: 'Form / Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    inputSize: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Email',
    placeholder: 'you@rollfi.com',
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHint: Story = {
  args: { hint: "We'll never share your email." },
};

export const WithError: Story = {
  args: { error: 'That email is already in use.' },
};

export const WithIcon: Story = {
  args: { icon: <MagnifyingGlass />, placeholder: 'Search…', label: 'Search' },
};

export const WithPrefix: Story = {
  args: { prefix: <Envelope />, label: 'Email', placeholder: 'you@rollfi.com' },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <Input {...args} inputSize="sm" label="Small" />
      <Input {...args} inputSize="md" label="Medium" />
      <Input {...args} inputSize="lg" label="Large" />
    </div>
  ),
};

export const Disabled: Story = { args: { disabled: true, value: 'john@rollfi.com' } };
