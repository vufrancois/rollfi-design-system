import type { Meta, StoryObj } from '@storybook/react-vite';
import { Buildings, MapPin, User, Lock } from '@phosphor-icons/react';
import { FormSection, FieldRow } from './FormSection';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';
import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';

const meta = {
  title: 'Layout / FormSection',
  component: FormSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Card container for a titled group of form fields. Head row (icon + title + description + ' +
          'optional action) sits above a body with a `--rf-space-5` gap between children. Pair with ' +
          '`<FieldRow>` for 1/2/3-column field grids that collapse to 1-col at 640px.',
      },
    },
  },
  argTypes: {
    headTone: { control: 'inline-radio', options: ['surface-elevated', 'transparent'] },
  },
  args: { title: '', children: null },
} satisfies Meta<typeof FormSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ maxWidth: 720 }}>{children}</div>
);

export const CompanyInformation: Story = {
  render: () => (
    <Frame>
      <FormSection
        icon={<Buildings size={18} />}
        title="Company information"
        description="Legal name, EIN, and entity type"
      >
        <FieldRow>
          <Input label="Legal company name" placeholder="Acme Corp" required />
          <Input label="DBA (optional)" placeholder="Acme" />
        </FieldRow>
        <FieldRow>
          <Input
            label="Employer Identification Number (EIN)"
            placeholder="12-3456789"
            hint="9 digits, hyphen after the first two"
            required
          />
          <Select
            label="Entity type"
            options={[
              { value: 'llc', label: 'LLC' },
              { value: 'ccorp', label: 'C Corporation' },
              { value: 'scorp', label: 'S Corporation' },
              { value: 'sole', label: 'Sole proprietorship' },
            ]}
          />
        </FieldRow>
      </FormSection>
    </Frame>
  ),
};

export const WithAction: Story = {
  name: 'Head-row action slot',
  render: () => (
    <Frame>
      <FormSection
        icon={<MapPin size={18} />}
        title="Filing address"
        description="Where the IRS should send tax correspondence"
        action={<Button variant="ghost" size="sm">Copy from…</Button>}
      >
        <FieldRow columns={1}>
          <Input label="Street address" placeholder="1600 Amphitheatre Pkwy" required />
        </FieldRow>
        <FieldRow columns={3}>
          <Input label="City" placeholder="Mountain View" required />
          <Select
            label="State"
            options={[
              { value: 'ca', label: 'CA' },
              { value: 'wa', label: 'WA' },
              { value: 'ny', label: 'NY' },
              { value: 'tx', label: 'TX' },
            ]}
          />
          <Input label="ZIP" placeholder="94043" required />
        </FieldRow>
      </FormSection>
    </Frame>
  ),
};

export const TransparentHead: Story = {
  name: 'Transparent head tone',
  render: () => (
    <Frame>
      <FormSection
        icon={<User size={18} />}
        title="Personal information"
        description="Your legal name and contact details"
        headTone="transparent"
      >
        <FieldRow>
          <Input label="Legal first name" required />
          <Input label="Legal last name" required />
        </FieldRow>
      </FormSection>
    </Frame>
  ),
};

export const Stacked: Story = {
  name: 'Multiple sections stacked',
  render: () => (
    <Frame>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <FormSection icon={<User size={18} />} title="Personal">
          <FieldRow>
            <Input label="Legal first name" required />
            <Input label="Legal last name" required />
          </FieldRow>
        </FormSection>
        <FormSection icon={<Lock size={18} />} title="Security">
          <FieldRow columns={1}>
            <Input label="Password" type="password" required />
          </FieldRow>
          <FieldRow columns={1}>
            <Checkbox checked onChange={() => {}}>Enable two-factor authentication</Checkbox>
          </FieldRow>
        </FormSection>
      </div>
    </Frame>
  ),
};

export const FieldRowColumns: Story = {
  name: 'FieldRow column counts',
  render: () => (
    <Frame>
      <FormSection title="FieldRow variants" description="1-col, 2-col, and 3-col grids">
        <FieldRow columns={1}>
          <Input label="1 column" placeholder="Full-width field" />
        </FieldRow>
        <FieldRow columns={2}>
          <Input label="2 columns — a" />
          <Input label="2 columns — b" />
        </FieldRow>
        <FieldRow columns={3}>
          <Input label="3 columns — a" />
          <Input label="3 columns — b" />
          <Input label="3 columns — c" />
        </FieldRow>
      </FormSection>
    </Frame>
  ),
};
