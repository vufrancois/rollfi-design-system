import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageHeader } from './PageHeader';
import { Button } from '../Button/Button';

const meta = {
  title: 'Layout / PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    eyebrow: { control: 'text' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
  },
  args: {
    title: 'Personal information',
    subtitle: 'Please provide your legal name and contact details',
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAction: Story = {
  args: {
    title: 'Company overview',
    subtitle: 'Manage employees, payroll, and integrations',
    action: (
      <>
        <Button variant="secondary">Export</Button>
        <Button>+ Add employee</Button>
      </>
    ),
  },
};

export const WithEyebrow: Story = {
  name: 'Eyebrow (step kicker)',
  args: {
    eyebrow: 'Step 2 of 6',
    title: 'Company information',
    subtitle: 'Legal entity details — must match your IRS records exactly.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'The `eyebrow` prop renders a small uppercase kicker in `--rf-color-brand-text` above the title. ' +
          'Use for step numbering (`Step 2 of 6`), status tags (`Beta`, `New`), or category labels.',
      },
    },
  },
};

export const TitleOnly: Story = {
  args: { title: 'Documents', subtitle: undefined },
};
