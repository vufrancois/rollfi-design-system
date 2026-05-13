import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';

const meta = {
  title: 'Overlay / Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    onClose: { action: 'close' },
  },
  args: {
    title: 'Delete pay period?',
    description: 'This will discard the in-progress draft. You cannot undo this action.',
    size: 'md',
    // `open` / `onClose` / `children` are owned by each story's `render`.
    open: false,
    onClose: () => {},
    children: null,
  },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Open-state demo — the trigger is part of the story so reviewers can
// see Modal in both its closed and open visual states.
export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 40 }}>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={() => setOpen(false)}>Delete period</Button>
            </>
          }
        >
          <p style={{ color: 'var(--rf-color-text-secondary)' }}>
            The draft contains 18 employees and $42,310 in net pay. Deletion is permanent.
          </p>
        </Modal>
      </div>
    );
  },
};

export const Small: Story = { ...Default, args: { ...meta.args, size: 'sm' } };
export const Large: Story = { ...Default, args: { ...meta.args, size: 'lg' } };
