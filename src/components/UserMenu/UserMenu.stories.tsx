import type { Meta, StoryObj } from '@storybook/react-vite';
import { Question, GearSix, SunDim, MoonStars, SignOut } from '@phosphor-icons/react';
import { UserMenu, type UserMenuItem } from './UserMenu';

const meta = {
  title: 'Overlay / UserMenu',
  component: UserMenu,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    compact: { control: 'boolean' },
    align: { control: 'inline-radio', options: ['left', 'right'] },
  },
  args: {
    name: 'Michael Scott',
    role: 'Partner Admin',
    items: [],
  },
} satisfies Meta<typeof UserMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseItems: UserMenuItem[] = [
  { label: 'Help & support', icon: <Question size={16} />, onClick: () => {} },
  { label: 'Settings', icon: <GearSix size={16} />, onClick: () => {}, dividerAfter: true },
  { label: 'Dark mode', icon: <MoonStars size={16} />, onClick: () => {}, dividerAfter: true },
  { label: 'Sign out', icon: <SignOut size={16} />, onClick: () => {}, danger: true },
];

export const Default: Story = {
  args: { items: baseItems },
};

export const Compact: Story = {
  name: 'Compact (avatar only)',
  args: { items: baseItems, compact: true },
};

export const NoRole: Story = {
  name: 'Without role line',
  args: { items: baseItems, role: undefined },
};

export const LeftAligned: Story = {
  args: { items: baseItems, align: 'left' },
};

export const LongName: Story = {
  name: 'Name truncation',
  args: { items: baseItems, name: 'Wernstrom Wolfgang van der Linde', role: 'Senior Implementations Manager' },
};

export const ThemeFlipping: Story = {
  name: 'Dark / Light label flips',
  render: () => {
    const items: UserMenuItem[] = [
      { label: 'Help & support', icon: <Question size={16} />, onClick: () => {} },
      { label: 'Settings', icon: <GearSix size={16} />, onClick: () => {}, dividerAfter: true },
      {
        label: 'Light mode',
        icon: <SunDim size={16} />,
        onClick: () => {},
        dividerAfter: true,
      },
      { label: 'Sign out', icon: <SignOut size={16} />, onClick: () => {}, danger: true },
    ];
    return <UserMenu name="Michael Scott" role="Partner Admin" items={items} />;
  },
};
