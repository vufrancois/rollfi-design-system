import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CompanySelect, type CompanyOption } from './CompanySelect';

const COMPANIES: CompanyOption[] = [
  { id: '1', name: 'Acme Corp' },
  { id: '2', name: 'Globex Inc' },
  { id: '3', name: 'Initech Industries' },
  { id: '4', name: 'Umbrella LLC' },
  { id: '5', name: 'Stark Enterprises' },
  { id: '6', name: 'Wayne Enterprises' },
  { id: '7', name: 'WeWork' },
  { id: '8', name: 'Hooli' },
  { id: '9', name: 'Pied Piper' },
  { id: '10', name: 'Massive Dynamic' },
  { id: '11', name: 'Soylent Corp' },
  { id: '12', name: 'Tyrell Corporation' },
];

const meta = {
  title: 'Layout / CompanySelect',
  component: CompanySelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Combobox-flavored company picker. Always-on search input with autofocus, ' +
          'full keyboard nav (↑/↓, Home/End, Enter to select), brand-outlined active row, ' +
          'optional "All companies" affordance.',
      },
    },
  },
  argTypes: {
    searchable: { control: 'boolean' },
    allowAll: { control: 'boolean' },
    compact: { control: 'boolean' },
    align: { control: 'inline-radio', options: ['start', 'center', 'end'] },
    placeholder: { control: 'text' },
    allLabel: { control: 'text' },
  },
  args: {
    options: COMPANIES,
    value: null,
    onChange: () => {},
  },
} satisfies Meta<typeof CompanySelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(args.value ?? null);
    return <div style={{ minWidth: 260 }}><CompanySelect {...args} value={value} onChange={setValue} /></div>;
  },
};

export const Static: Story = {
  name: 'Static (1 option, no combo)',
  render: () => (
    <div style={{ minWidth: 260 }}>
      <CompanySelect
        options={[{ id: 'a', name: 'Acme Corp' }]}
        value="a"
        onChange={() => {}}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Auto-collapses to a non-interactive display when there is nothing to choose: a single option and no `allowAll`. No chevron, no click affordance — same visual box (`--rf-radius-md`, `--rf-color-border`) so it lines up next to the interactive variant in a shared header.',
      },
    },
  },
};

export const WithAllOption: Story = {
  name: 'With "All companies" row',
  args: { allowAll: true },
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    return <div style={{ minWidth: 260 }}><CompanySelect {...args} value={value} onChange={setValue} /></div>;
  },
};

export const Preselected: Story = {
  args: { value: '3' },
  render: (args) => {
    const [value, setValue] = useState<string | null>('3');
    return <div style={{ minWidth: 260 }}><CompanySelect {...args} value={value} onChange={setValue} /></div>;
  },
};

export const WithMeta: Story = {
  name: 'Rows with meta line',
  render: () => {
    const options: CompanyOption[] = COMPANIES.slice(0, 6).map((c, i) => ({
      ...c,
      meta: `${['Pro', 'Starter', 'Enterprise'][i % 3]} · ${[124, 38, 412, 92, 256, 18][i]} employees`,
    }));
    const [value, setValue] = useState<string | null>('1');
    return <div style={{ minWidth: 320 }}><CompanySelect options={options} value={value} onChange={setValue} /></div>;
  },
};

export const Compact: Story = {
  name: 'Compact (avatar only)',
  args: { compact: true, value: '1' },
  render: (args) => {
    const [value, setValue] = useState<string | null>('1');
    return <CompanySelect {...args} value={value} onChange={setValue} />;
  },
};

export const Empty: Story = {
  name: 'Empty (no companies)',
  args: { options: [], placeholder: 'No companies available' },
  render: (args) => (
    <div style={{ minWidth: 260 }}><CompanySelect {...args} value={null} onChange={() => {}} /></div>
  ),
};

export const NoSearch: Story = {
  name: 'Search disabled',
  args: { searchable: false, options: COMPANIES.slice(0, 4) },
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    return <div style={{ minWidth: 260 }}><CompanySelect {...args} value={value} onChange={setValue} /></div>;
  },
};

export const LongList: Story = {
  name: 'Long list (scrollable)',
  args: {
    options: Array.from({ length: 40 }, (_, i) => ({
      id: `c-${i}`,
      name: `Company ${String.fromCharCode(65 + (i % 26))}${i}`,
    })),
    allowAll: true,
  },
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    return <div style={{ minWidth: 260 }}><CompanySelect {...args} value={value} onChange={setValue} /></div>;
  },
};
