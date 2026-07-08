import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './Accordion';
import { Badge } from '../Badge/Badge';

const meta = {
  title: 'Layout / Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { children: null },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ maxWidth: 480 }}>{children}</div>
);

export const Single: Story = {
  render: () => (
    <Frame>
      <Accordion type="single" defaultValue="a">
        <AccordionItem value="a">
          <AccordionTrigger>Personal information</AccordionTrigger>
          <AccordionContent>Legal name, date of birth, address, phone.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>Tax withholding</AccordionTrigger>
          <AccordionContent>W-4 filing status, dependents, extra withholding.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="c">
          <AccordionTrigger>Direct deposit</AccordionTrigger>
          <AccordionContent>Routing + account, split percentages.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </Frame>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Frame>
      <Accordion type="multiple" defaultValue={['a', 'c']}>
        <AccordionItem value="a">
          <AccordionTrigger>Personal information</AccordionTrigger>
          <AccordionContent>Legal name, date of birth, address, phone.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>Tax withholding</AccordionTrigger>
          <AccordionContent>W-4 filing status, dependents, extra withholding.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="c">
          <AccordionTrigger>Direct deposit</AccordionTrigger>
          <AccordionContent>Routing + account, split percentages.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </Frame>
  ),
};

export const WithTrailing: Story = {
  name: 'Trigger with trailing slot',
  render: () => (
    <Frame>
      <Accordion type="multiple" defaultValue={['a']}>
        <AccordionItem value="a">
          <AccordionTrigger trailing={<Badge variant="success">Complete</Badge>}>
            Personal information
          </AccordionTrigger>
          <AccordionContent>All fields verified on May 12, 2026.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger trailing={<Badge variant="warning">Action required</Badge>}>
            Tax withholding
          </AccordionTrigger>
          <AccordionContent>W-4 needs signature.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="c">
          <AccordionTrigger trailing={<span>$3,247.86</span>}>
            Last paycheck
          </AccordionTrigger>
          <AccordionContent>Deposited May 15, 2026.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </Frame>
  ),
};
