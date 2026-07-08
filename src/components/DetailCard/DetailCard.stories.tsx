import type { Meta, StoryObj } from '@storybook/react-vite';
import { DetailCard } from './DetailCard';
import { Button } from '../Button/Button';

const meta = {
  title: 'Layout / DetailCard',
  component: DetailCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Two-column key/value card for review pages, and a list variant for editable settings. ' +
          'Header (title + optional badge + optional action), grid or list body, optional footer.',
      },
    },
  },
  argTypes: {
    layout: { control: 'inline-radio', options: ['grid', 'list'] },
    columns: { control: { type: 'inline-radio' }, options: [1, 2, 3] },
  },
  args: { title: '', items: [] },
} satisfies Meta<typeof DetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GridFederal: Story = {
  name: 'Grid — tax details (2 col)',
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <DetailCard
        title="Federal"
        badge="W-4"
        action={<Button variant="secondary" size="sm">Edit</Button>}
        items={[
          { label: 'Filing status', value: 'Single' },
          { label: 'Residency', value: 'US citizen/resident' },
          { label: 'Tax exempt', value: 'No' },
          { label: 'Multiple jobs (2c)', value: 'No' },
          { label: 'Dependents under 17', value: '0 ($0)' },
          { label: 'Other dependents', value: '0 ($0)' },
          { label: 'Deductions (4b)', value: '$0' },
          { label: 'Extra withholding (4c)', value: '$0' },
        ]}
        footer="Last updated: May 15, 2026"
      />
    </div>
  ),
};

export const GridWithMasked: Story = {
  name: 'Grid — masked values (SSN, account)',
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <DetailCard
        title="Personal"
        action={<Button variant="secondary" size="sm">Edit</Button>}
        items={[
          { label: 'Legal name', value: 'John Doe' },
          { label: 'SSN', value: '123-45-6789', masked: true },
          { label: 'Date of birth', value: 'Jan 12, 1990' },
          { label: 'Routing', value: '021000021' },
          { label: 'Account', value: '••• 9482', masked: true },
        ]}
      />
    </div>
  ),
};

export const List: Story = {
  name: 'List — Account & Security',
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <DetailCard
        title="Account & Security"
        layout="list"
        items={[
          {
            label: 'Login email',
            value: 'adlerfr@mailsac.com',
            action: <Button variant="ghost" size="sm">Edit</Button>,
          },
          {
            label: 'Phone number',
            value: '(746) 577-8677',
            action: <Button variant="ghost" size="sm">Edit</Button>,
          },
          {
            label: 'Password',
            value: '••••••••',
            masked: true,
            action: <Button variant="ghost" size="sm">Edit</Button>,
          },
        ]}
      />
    </div>
  ),
};

export const SideBySide: Story = {
  name: 'Side-by-side (Federal + State)',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20 }}>
      <DetailCard
        title="Federal"
        badge="W-4"
        action={<Button variant="secondary" size="sm">Edit</Button>}
        items={[
          { label: 'Filing status', value: 'Single' },
          { label: 'Residency', value: 'US citizen/resident' },
          { label: 'Dependents under 17', value: '0 ($0)' },
          { label: 'Other income (4a)', value: '$0' },
        ]}
        footer="Last updated: May 15, 2026"
      />
      <DetailCard
        title="Washington"
        badge="State"
        action={<Button variant="secondary" size="sm">Edit</Button>}
        items={[
          { label: 'State', value: 'Washington' },
          { label: 'Filing status', value: 'Not set' },
          { label: 'Additional withholding', value: '$0.00' },
        ]}
        footer="Last updated: May 15, 2026"
      />
    </div>
  ),
};
