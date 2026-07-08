import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileText, CreditCard, CheckCircle, Warning, Star } from '@phosphor-icons/react';
import { Item } from './Item';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';

const meta = {
  title: 'Display / Item',
  component: Item,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Row-style row for lists and task cards. Icon + title + description + action, ' +
          'with optional colored icon tone and dismissible affordance.',
      },
    },
  },
  argTypes: {
    iconTone: { control: 'inline-radio', options: ['neutral', 'info', 'success', 'warning', 'danger', 'brand'] },
  },
  args: { title: '' },
} satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StackedList: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <Card variant="outlined" padding="none">
        <Item icon={<FileText size={18} />} title="Payroll summary packet" description="Consolidated review package with tax totals." action={<Badge variant="success">Ready</Badge>} onClick={() => {}} />
        <Item icon={<CreditCard size={18} />} title="Treasury funding account" description="Primary settlement account ending in 2481." action={<Badge variant="success">Verified</Badge>} />
        <Item icon={<CheckCircle size={18} />} title="Review queue" description="Three payroll drafts need final owner sign-off." action={<Badge variant="warning">3 pending</Badge>} onClick={() => {}} />
      </Card>
    </div>
  ),
};

export const IconTones: Story = {
  name: 'Colored icon tones',
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <Card variant="outlined" padding="none">
        <Item icon={<CheckCircle size={18} />} iconTone="success" title="Bank verified" description="Micro-deposits confirmed." />
        <Item icon={<Warning size={18} />} iconTone="warning" title="Verification pending" description="Micro-deposits sent 2 days ago." />
        <Item icon={<Warning size={18} />} iconTone="danger" title="Payroll failed" description="Direct deposit was rejected." />
        <Item icon={<FileText size={18} />} iconTone="info" title="Contract updated" description="New PTO policy in effect June 1." />
        <Item icon={<Star size={18} />} iconTone="brand" title="Feature preview" description="Try the new pay simulator." />
      </Card>
    </div>
  ),
};

export const TaskPattern: Story = {
  name: 'Task pattern (bordered + dismissible)',
  render: () => (
    <div style={{ maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Card variant="outlined" padding="none">
        <Item
          icon={<FileText size={18} />}
          iconTone="info"
          title="Complete Federal W-4"
          description="Complete your federal tax holding forms"
          action={<Button size="sm">Complete signing</Button>}
          onDismiss={() => {}}
        />
      </Card>
      <Card variant="outlined" padding="none">
        <Item
          icon={<FileText size={18} />}
          iconTone="info"
          title="Complete Form I-9"
          description="Employment eligibility verification — required within 3 days of hire"
          action={<Button size="sm">Complete</Button>}
          onDismiss={() => {}}
        />
      </Card>
    </div>
  ),
};

export const NoDescription: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <Card variant="outlined" padding="none">
        <Item icon={<CheckCircle size={18} />} iconTone="success" title="Terms accepted" action={<Badge variant="success">Signed</Badge>} />
        <Item icon={<CheckCircle size={18} />} iconTone="success" title="Direct deposit set up" action={<Badge variant="success">Verified</Badge>} />
      </Card>
    </div>
  ),
};
