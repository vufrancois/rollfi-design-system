import type { Meta, StoryObj } from '@storybook/react-vite';
import { DownloadSimple } from '@phosphor-icons/react';
import { PaystubBreakdown } from './PaystubBreakdown';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';

const meta = {
  title: 'Domain / PaystubBreakdown',
  component: PaystubBreakdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Accordion-driven paystub view. Each section has a header value (auto-formatted; ' +
          'negatives render in danger color), an optional list of line items, and a bottom ' +
          'action slot for a download button. Multi-open by default.',
      },
    },
  },
  args: { sections: [] },
} satisfies Meta<typeof PaystubBreakdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const PAYSTUB_SECTIONS = [
  {
    id: 'earnings',
    label: 'Earnings',
    value: 4615.38,
    lines: [{ label: 'Regular (80.00 hrs)', value: 4615.38 }],
  },
  {
    id: 'taxes',
    label: 'Taxes',
    value: -1067.52,
    lines: [
      { label: 'Federal Income Tax', value: -587.14 },
      { label: 'Social Security', value: -298.91 },
      { label: 'Medicare', value: -74.73 },
      { label: 'State Income Tax', value: -106.75 },
    ],
  },
  {
    id: 'deductions',
    label: 'Deductions',
    value: -300.00,
    lines: [
      { label: '401(k) contribution', value: -250.00 },
      { label: 'Vision insurance', value: -50.00 },
    ],
  },
  {
    id: 'deposit',
    label: 'Deposit Details',
    value: 'Direct Deposit',
    lines: [
      { label: 'First Platypus Bank ···0000', value: 2598.29 },
      { label: 'Chase Bank ···4521', value: 649.57 },
    ],
  },
];

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <Card variant="outlined" padding="md">
        <PaystubBreakdown
          defaultOpen={['earnings', 'taxes']}
          sections={PAYSTUB_SECTIONS}
          action={
            <Button fullWidth icon={<DownloadSimple size={16} weight="bold" />}>
              Download Paystub
            </Button>
          }
        />
      </Card>
    </div>
  ),
};

export const AllCollapsed: Story = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <Card variant="outlined" padding="md">
        <PaystubBreakdown
          sections={PAYSTUB_SECTIONS}
          action={
            <Button fullWidth icon={<DownloadSimple size={16} weight="bold" />}>
              Download Paystub
            </Button>
          }
        />
      </Card>
    </div>
  ),
};

export const AllOpen: Story = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <Card variant="outlined" padding="md">
        <PaystubBreakdown
          defaultOpen={['earnings', 'taxes', 'deductions', 'deposit']}
          sections={PAYSTUB_SECTIONS}
          action={
            <Button fullWidth icon={<DownloadSimple size={16} weight="bold" />}>
              Download Paystub
            </Button>
          }
        />
      </Card>
    </div>
  ),
};

export const WithoutAction: Story = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <Card variant="outlined" padding="md">
        <PaystubBreakdown defaultOpen={['earnings']} sections={PAYSTUB_SECTIONS.slice(0, 3)} />
      </Card>
    </div>
  ),
};
