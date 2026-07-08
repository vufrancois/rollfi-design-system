import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ClockWidget, type ClockStatus } from './ClockWidget';

const meta = {
  title: 'Domain / ClockWidget',
  component: ClockWidget,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Employee time-tracking card. Owns its wall-clock tick + elapsed timers internally. ' +
          'Three states — idle (big clock + Clock In button), working (dual-stat panel + Clock ' +
          'Out / Start Break), break (End Break).',
      },
    },
  },
  argTypes: {
    status: { control: 'inline-radio', options: [undefined, 'idle', 'working', 'break'] },
    title: { control: 'text' },
  },
  args: {},
} satisfies Meta<typeof ClockWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Uncontrolled: Story = {
  name: 'Uncontrolled (self-contained)',
  render: () => <ClockWidget />,
};

export const StartsWorking: Story = {
  name: 'Controlled — starts in working',
  render: () => {
    const [status, setStatus] = useState<ClockStatus>('working');
    const [clockInTime] = useState(new Date());
    return (
      <ClockWidget
        status={status}
        onStatusChange={setStatus}
        clockInTime={clockInTime}
      />
    );
  },
};

export const StartsBreak: Story = {
  name: 'Controlled — starts on break',
  render: () => {
    const [status, setStatus] = useState<ClockStatus>('break');
    const [clockInTime] = useState(new Date());
    return (
      <ClockWidget
        status={status}
        onStatusChange={setStatus}
        clockInTime={clockInTime}
      />
    );
  },
};

export const CustomTitle: Story = {
  render: () => <ClockWidget title="Shift timer" />,
};
