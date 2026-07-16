import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { StepperRail, type StepperRailStep } from './StepperRail';

const STEPS: StepperRailStep[] = [
  { id: 'admin-profile',    label: 'Your profile',                meta: 'Your account',              tag: 'required' },
  { id: 'company-info',     label: 'Company information',         meta: 'EIN, entity type & more',   tag: 'required' },
  { id: 'company-location', label: 'Company location',            meta: 'Filing & mailing address',  tag: 'required' },
  { id: 'beneficial-owner', label: 'Beneficial Owner or Officer', meta: 'Ownership & identity',      tag: 'required' },
  { id: 'bank-account',     label: 'Bank account',                meta: 'Connect for payroll',       tag: 'required' },
  { id: 'needed-forms',     label: 'Needed forms',                meta: 'POA & IRS authorization',   tag: 'optional' },
  { id: 'complete',         label: 'All done!' },
];

const meta = {
  title: 'Navigation / StepperRail',
  component: StepperRail,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Vertical stepper for multi-step flows. Lives in a dark sidebar rail with a progress bar, ' +
          'per-step tag pills, and click navigation. Status auto-derives from position vs `activeId` ' +
          '(done ✓ / active / pending), or override per step. Respects the light-sidebar tenant flip.',
      },
    },
  },
  args: { steps: [], activeId: '' },
} satisfies Meta<typeof StepperRail>;

export default meta;
type Story = StoryObj<typeof meta>;

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ height: '100vh', display: 'flex' }}>{children}</div>
);

export const Default: Story = {
  render: () => {
    const [activeId, setActiveId] = useState('company-info');
    return (
      <Frame>
        <StepperRail
          steps={STEPS.map((s, i) => ({ ...s, status: i < STEPS.findIndex(x => x.id === activeId) ? 'done' as const : s.status }))}
          activeId={activeId}
          onSelect={setActiveId}
        />
      </Frame>
    );
  },
};

export const WithProgress: Story = {
  render: () => {
    const [activeId, setActiveId] = useState('bank-account');
    return (
      <Frame>
        <StepperRail
          steps={STEPS.map((s, i) => ({ ...s, status: i < STEPS.findIndex(x => x.id === activeId) ? 'done' as const : s.status }))}
          activeId={activeId}
          onSelect={setActiveId}
          showProgress
          progressLabel="Onboarding progress"
        />
      </Frame>
    );
  },
};

export const AllTagVariants: Story = {
  name: 'Tag variants (required / optional / conditional / new)',
  render: () => {
    const steps: StepperRailStep[] = [
      { id: 'a', label: 'Required step', meta: 'Cannot proceed without this', tag: 'required' },
      { id: 'b', label: 'Optional step', meta: 'Can be skipped', tag: 'optional' },
      { id: 'c', label: 'Conditional step', meta: 'Only if applicable', tag: 'conditional', status: 'conditional' },
      { id: 'd', label: 'New feature', meta: 'Recently added', tag: 'new' },
    ];
    const [activeId, setActiveId] = useState('a');
    return (
      <Frame>
        <StepperRail steps={steps} activeId={activeId} onSelect={setActiveId} showProgress />
      </Frame>
    );
  },
};

export const WithHeaderAndFooter: Story = {
  render: () => {
    const [activeId, setActiveId] = useState('admin-profile');
    return (
      <Frame>
        <StepperRail
          steps={STEPS.map((s, i) => ({ ...s, status: i < STEPS.findIndex(x => x.id === activeId) ? 'done' as const : s.status }))}
          activeId={activeId}
          onSelect={setActiveId}
          showProgress
          header={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--rf-color-sidebar-text-strong)', font: 'var(--rf-text-body-md-strong)' }}>
              <span>rollfi</span>
              <button type="button" style={{ background: 'transparent', border: 'none', color: 'var(--rf-color-sidebar-text-dim)', cursor: 'pointer', font: 'var(--rf-text-caption-sm)' }}>
                ← Library
              </button>
            </div>
          }
          footer={
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ font: 'var(--rf-text-caption-sm)', color: 'var(--rf-color-sidebar-text-dim)', textTransform: 'uppercase', letterSpacing: 0.4 }}>
                Onboarding for
              </span>
              <span style={{ font: 'var(--rf-text-body-sm-strong)', color: 'var(--rf-color-sidebar-text)' }}>
                Acme Corp
              </span>
            </div>
          }
        />
      </Frame>
    );
  },
};

export const CompactNoNav: Story = {
  name: 'Read-only (no onSelect)',
  render: () => (
    <Frame>
      <StepperRail
        steps={STEPS.map((s, i) => ({ ...s, status: i < 2 ? 'done' as const : s.status }))}
        activeId="company-location"
      />
    </Frame>
  ),
};
