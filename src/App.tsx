import { useEffect, useState, type ReactNode } from 'react';
import {
  IconContext, Info, Warning, CheckCircle, XCircle, MagnifyingGlass, Envelope, ArrowRight,
  House, User, Gear, Bell, CreditCard, ChartBar, Calendar as CalendarIcon, FileText, Lock, Trash,
  Plus, PencilSimple, Download, Upload, Cloud, Heart, Star, Globe, Lightning, Briefcase,
  UserCircle, Eye, EyeSlash, Bank, ArrowLeft, CheckCircle as CheckCircleIcon,
  Clock, X,
} from '@phosphor-icons/react';
import {
  ThemeProvider, useTheme,
  ToastProvider, useToast,
  Button, Input, Select, Modal,
  Card, CardHeader,
  Table,
  Checkbox, OptionCard, Alert,
  SegmentedProgress, DetailRow, PageHeader,
  PhoneInput,
  Sidebar, Tabs, Badge, SidePanel, Stepper, Switch,
  Avatar, DropdownMenu, MultiSelect, Field, EmptyState, Slider,
  Logo, Docs,
  Textarea, Label, Separator,
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  Collapsible, CollapsibleTrigger, CollapsibleContent,
  Breadcrumb, Pagination,
  Banner, Callout, Progress, Spinner, Skeleton,
  StatusDot, Kbd, Tooltip, Popover,
  RadioGroup, Radio, ButtonGroup, SegmentedControl, Toggle, ToggleGroup, ToggleGroupItem,
  PasswordInput, NumberStepper, CurrencyInput, MaskedInput, TagInput, InputOTP, FileUpload, Combobox,
  Calendar, DatePicker, TimePicker,
  AlertDialog, ConfirmationDialog, ContextMenu, HoverCard, Drawer, Command,
  Pill, AvatarGroup, Timeline, ActivityFeed, Item, NotificationItem, Carousel,
  IconTile, StatCard, SettingsRow, DataGrid, StackedBar, SaveBar,
  BrandProvider, ThemeToggle,
} from './components';
import './tokens/index.css';

const sampleData = [
  { id: '1', name: 'Acme Corp', plan: 'Pro', mrr: '$2,400', status: 'Active' },
  { id: '2', name: 'Globex Inc', plan: 'Starter', mrr: '$600', status: 'Active' },
  { id: '3', name: 'Initech', plan: 'Enterprise', mrr: '$12,000', status: 'Trialing' },
  { id: '4', name: 'Umbrella LLC', plan: 'Pro', mrr: '$2,400', status: 'Churned' },
];

const columns = [
  { key: 'name', header: 'Company' },
  { key: 'plan', header: 'Plan' },
  { key: 'mrr', header: 'MRR', align: 'right' as const },
  {
    key: 'status',
    header: 'Status',
    render: (row: typeof sampleData[0]) => (
      <span className={`status-badge status-badge--${row.status.toLowerCase()}`}>
        {row.status}
      </span>
    ),
  },
];

function Demo() {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [selectedOption, setSelectedOption] = useState('option1');
  const [step, setStep] = useState(3);
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [view, setView] = useState<'library' | 'portal' | 'onboarding' | 'docs'>('library');
  const [tabValue, setTabValue] = useState('overview');
  const [toggleOn, setToggleOn] = useState(true);
  const [multi, setMulti] = useState<string[]>(['acme']);
  const [sliderVal, setSliderVal] = useState(150);
  const [wizardStep, setWizardStep] = useState(1);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  if (view === 'portal') {
    return <PortalMock onExit={() => setView('library')} />;
  }
  if (view === 'onboarding') {
    return <OnboardingMock onExit={() => setView('library')} />;
  }
  if (view === 'docs') {
    return <Docs onExit={() => setView('library')} />;
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 64 }}>
        <div>
          <Logo size={40} />
          <p style={{ font: 'var(--rf-text-body-md)', color: 'var(--rf-color-text-secondary)', marginTop: 8 }}>
            Design System
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" onClick={() => setView('docs')}>View Docs</Button>
          <Button variant="secondary" onClick={() => setView('onboarding')}>View Onboarding Mock</Button>
          <Button variant="secondary" onClick={() => setView('portal')}>View Portal Mock</Button>
          <Button variant="secondary" onClick={toggleTheme}>
            {theme === 'light' ? 'Dark' : 'Light'} mode
          </Button>
        </div>
      </header>

      <Section title="Buttons">
        <Row>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="ghost">Ghost</Button>
        </Row>
        <Row>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </Row>
        <Row>
          <Button icon={<ArrowRight size={16} />}>Continue</Button>
          <Button variant="secondary" icon={<Envelope size={16} />}>Email</Button>
        </Row>
        <div style={{ maxWidth: 320 }}>
          <Button fullWidth>Full Width</Button>
        </div>
      </Section>

      <Section title="Inputs">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Input label="Email" placeholder="you@rollfi.com" icon={<Envelope size={16} />} hint="We'll never share your email" />
          <Input label="Password" type="password" placeholder="Enter password" />
          <Input label="Search" placeholder="Search anything..." icon={<MagnifyingGlass size={16} />} />
          <Input label="Disabled" placeholder="Can't touch this" disabled />
        </div>
        <h3 style={{ font: 'var(--rf-text-heading-sm)', margin: '24px 0 12px' }}>Input Sizes</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <Input label="Small" placeholder="sm" inputSize="sm" />
          <Input label="Medium" placeholder="md (default)" inputSize="md" />
          <Input label="Large" placeholder="lg" inputSize="lg" />
        </div>
      </Section>

      <Section title="Select">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Select
            label="Plan"
            placeholder="Choose a plan"
            options={[
              { value: 'starter', label: 'Starter — $49/mo' },
              { value: 'pro', label: 'Pro — $199/mo' },
              { value: 'enterprise', label: 'Enterprise — Custom' },
            ]}
          />
          <Select
            label="Region"
            options={[
              { value: 'us', label: 'United States' },
              { value: 'eu', label: 'Europe' },
              { value: 'ap', label: 'Asia Pacific' },
            ]}
            hint="Select your primary region"
          />
        </div>
      </Section>

      <Section title="Checkbox">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Checkbox checked={checked1} onChange={() => setChecked1(!checked1)}>
            I agree to the terms and conditions
          </Checkbox>
          <Checkbox checked={checked2} onChange={() => setChecked2(!checked2)}>
            Subscribe to newsletter
          </Checkbox>
          <Checkbox checked={false} onChange={() => {}} disabled>
            Disabled option
          </Checkbox>
        </div>
      </Section>

      <Section title="Option Card">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <OptionCard
            selected={selectedOption === 'option1'}
            onSelect={() => setSelectedOption('option1')}
            title="Direct Deposit"
            description="Receive payments directly to your bank account"
            badge="Recommended"
          />
          <OptionCard
            selected={selectedOption === 'option2'}
            onSelect={() => setSelectedOption('option2')}
            title="Paper Check"
            description="Receive a physical check by mail"
          />
        </div>
      </Section>

      <Section title="Alert">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Alert variant="info" icon={<Info size={18} weight="fill" />}>Your account verification is pending review.</Alert>
          <Alert variant="warning" icon={<Warning size={18} weight="fill" />}>Inaccurate information may delay processing.</Alert>
          <Alert variant="success" icon={<CheckCircle size={18} weight="fill" />}>Your information has been verified successfully.</Alert>
          <Alert variant="danger" icon={<XCircle size={18} weight="fill" />}>Please correct the errors before continuing.</Alert>
        </div>
      </Section>

      <Section title="Segmented Progress">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <p style={{ font: 'var(--rf-text-caption)', color: 'var(--rf-color-text-secondary)', marginBottom: 8 }}>Step {step} of 6</p>
            <SegmentedProgress current={step} total={6} />
          </div>
          <Row>
            <Button size="sm" variant="secondary" onClick={() => setStep(Math.max(1, step - 1))}>Back</Button>
            <Button size="sm" onClick={() => setStep(Math.min(6, step + 1))}>Next</Button>
          </Row>
        </div>
      </Section>

      <Section title="Detail Row">
        <Card variant="outlined" padding="md">
          <DetailRow label="Full Name" value="John Doe" />
          <DetailRow label="Email" value="john@rollfi.com" />
          <DetailRow label="SSN" value="123-45-6789" masked />
          <DetailRow label="Department" value="Engineering" />
        </Card>
      </Section>

      <Section title="Page Header">
        <Card variant="outlined" padding="md">
          <PageHeader title="Personal Information" subtitle="Please provide your legal name and contact details" />
          <p style={{ font: 'var(--rf-text-body-sm)', color: 'var(--rf-color-text-tertiary)' }}>
            (Form content would go here)
          </p>
        </Card>
      </Section>

      <Section title="Phone Input">
        <div style={{ maxWidth: 400 }}>
          <PhoneInput
            label="Phone Number"
            value={phone}
            onChange={setPhone}
            countryCode={countryCode}
            onCountryChange={setCountryCode}
            hint="We'll use this for two-factor authentication"
          />
        </div>
      </Section>

      <Section title="Cards">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <Card variant="default">
            <CardHeader title="Default" description="Standard surface card" />
            <p style={{ font: 'var(--rf-text-body-sm)', color: 'var(--rf-color-text-secondary)' }}>
              Uses the surface background with a hairline border.
            </p>
          </Card>
          <Card variant="elevated">
            <CardHeader title="Elevated" description="Shadow-lifted card" />
            <p style={{ font: 'var(--rf-text-body-sm)', color: 'var(--rf-color-text-secondary)' }}>
              Adds a shadow for depth on light theme.
            </p>
          </Card>
          <Card variant="interactive" onClick={() => toast('Card clicked!', { variant: 'info' })}>
            <CardHeader title="Interactive" description="Clickable with hover state" />
            <p style={{ font: 'var(--rf-text-body-sm)', color: 'var(--rf-color-text-secondary)' }}>
              Click me to trigger a toast.
            </p>
          </Card>
        </div>
      </Section>

      <Section title="Table">
        <Card variant="outlined" padding="none">
          <Table
            columns={columns}
            data={sampleData}
            rowKey={row => row.id}
            onRowClick={row => toast(`Clicked ${row.name}`)}
          />
        </Card>
      </Section>

      <Section title="Modal">
        <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Confirm Action"
          description="This will update your billing plan. You can change it anytime."
          footer={
            <>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button onClick={() => { setModalOpen(false); toast('Plan updated!', { variant: 'success' }); }}>
                Confirm
              </Button>
            </>
          }
        >
          <Card variant="outlined" padding="sm">
            <p style={{ font: 'var(--rf-text-body-sm)', color: 'var(--rf-color-text-secondary)' }}>
              You're upgrading from <strong>Starter</strong> to <strong>Pro</strong>.
              Your next invoice will be prorated.
            </p>
          </Card>
        </Modal>
      </Section>

      <Section title="Toasts">
        <Row>
          <Button variant="secondary" onClick={() => toast('Something happened')}>Default</Button>
          <Button variant="secondary" onClick={() => toast('Changes saved', { variant: 'success' })}>Success</Button>
          <Button variant="secondary" onClick={() => toast('Something went wrong', { variant: 'error' })}>Error</Button>
          <Button variant="secondary" onClick={() => toast('Check your input', { variant: 'warning' })}>Warning</Button>
          <Button variant="secondary" onClick={() => toast('New version available', { variant: 'info' })}>Info</Button>
        </Row>
      </Section>

      <Section title="Tabs">
        <Tabs
          tabs={[
            { key: 'overview', label: 'Overview' },
            { key: 'billing', label: 'Billing' },
            { key: 'team', label: 'Team' },
            { key: 'integrations', label: 'Integrations' },
          ]}
          value={tabValue}
          onChange={setTabValue}
        />
        <p style={{ font: 'var(--rf-text-body-sm)', color: 'var(--rf-color-text-secondary)', marginTop: 16 }}>
          Selected: <strong>{tabValue}</strong>
        </p>
      </Section>

      <Section title="Badge">
        <Row>
          <Badge variant="neutral">Neutral</Badge>
          <Badge variant="success">Active</Badge>
          <Badge variant="danger">Failed</Badge>
          <Badge variant="warning">Pending</Badge>
          <Badge variant="info">New</Badge>
          <Badge variant="teal">Payroll Ready</Badge>
          <Badge variant="purple">Beta</Badge>
          <Badge variant="orange">Trial</Badge>
        </Row>
      </Section>

      <Section title="Switch">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Switch checked={toggleOn} onChange={setToggleOn} label="Enable notifications" />
          <Switch checked={false} onChange={() => {}} label="Two-factor authentication" />
          <Switch checked={true} onChange={() => {}} label="Disabled (on)" disabled />
        </div>
      </Section>

      <Section title="Stepper">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Stepper
            steps={[
              { label: 'Company' },
              { label: 'Configure' },
              { label: 'Upload' },
              { label: 'Map' },
              { label: 'Review' },
            ]}
            currentIdx={wizardStep}
          />
          <Row>
            <Button size="sm" variant="secondary" onClick={() => setWizardStep(Math.max(0, wizardStep - 1))}>Back</Button>
            <Button size="sm" onClick={() => setWizardStep(Math.min(4, wizardStep + 1))}>Next</Button>
          </Row>
        </div>
      </Section>

      <Section title="Avatar">
        <Row>
          <Avatar name="Vu Francois" size="sm" />
          <Avatar name="Vu Francois" size="md" />
          <Avatar name="Vu Francois" size="lg" />
          <Avatar name="Acme Corp" />
          <Avatar name="Globex Inc" />
          <Avatar name="Initech Industries" />
        </Row>
      </Section>

      <Section title="Dropdown Menu">
        <DropdownMenu
          trigger={<Button variant="secondary" size="sm">Actions ▾</Button>}
          items={[
            { label: 'Edit', icon: <PencilSimple size={14} />, onClick: () => toast('Edit clicked') },
            { label: 'Download', icon: <Download size={14} />, onClick: () => toast('Download clicked') },
            { label: 'Delete', icon: <Trash size={14} />, onClick: () => toast('Delete clicked', { variant: 'error' }), danger: true },
          ]}
        />
      </Section>

      <Section title="MultiSelect">
        <div style={{ maxWidth: 400 }}>
          <MultiSelect
            label="Assigned Companies"
            placeholder="Select companies..."
            values={multi}
            onChange={setMulti}
            options={[
              { value: 'acme', label: 'Acme Corp' },
              { value: 'globex', label: 'Globex Inc' },
              { value: 'initech', label: 'Initech' },
              { value: 'umbrella', label: 'Umbrella LLC' },
            ]}
            hint="Account Manager will only see these companies"
          />
        </div>
      </Section>

      <Section title="Field">
        <div style={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Field label="Email" required hint="We'll never share this">
            <Input placeholder="you@rollfi.com" />
          </Field>
          <Field label="Company" required>
            <Select placeholder="Choose..." options={[{ value: 'a', label: 'Acme' }]} />
          </Field>
        </div>
      </Section>

      <Section title="StatCard">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, maxWidth: 720 }}>
          <StatCard label="Number of companies" value="725" />
          <StatCard label="Active people" value="782" helper="Across all clients" />
          <StatCard label="MRR" value="$21,800" helper={<span style={{ color: 'var(--rf-color-success-text)' }}>+12% vs last month</span>} />
        </div>
      </Section>

      <Section title="Empty State">
        <Card variant="outlined" padding="none">
          <EmptyState
            icon={<Bell size={24} />}
            title="No notifications"
            description="When you have new activity, it'll show up here."
            action={<Button size="sm" variant="secondary">Refresh</Button>}
          />
        </Card>
      </Section>

      <Section title="Slider">
        <div style={{ maxWidth: 400 }}>
          <Slider
            label="Employee count"
            value={sliderVal}
            min={0}
            max={500}
            step={10}
            onChange={setSliderVal}
            format={v => `${v} employees`}
            showMinMax
            hint="Estimate your monthly billing volume"
          />
        </div>
      </Section>

      <Section title="Side Panel">
        <Button onClick={() => setSidePanelOpen(true)}>Open Side Panel</Button>
        <SidePanel
          open={sidePanelOpen}
          onClose={() => setSidePanelOpen(false)}
          title="Add User"
          description="Invite a new team member to your partner portal."
          footer={
            <>
              <Button variant="secondary" onClick={() => setSidePanelOpen(false)}>Cancel</Button>
              <Button onClick={() => { setSidePanelOpen(false); toast('User invited', { variant: 'success' }); }}>Send invite</Button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Field label="Full name" required>
              <Input placeholder="Jane Smith" />
            </Field>
            <Field label="Email" required>
              <Input placeholder="jane@partner.com" />
            </Field>
            <Field label="Role" required>
              <Select placeholder="Select role..." options={[
                { value: 'admin', label: 'Partner Admin' },
                { value: 'manager', label: 'Account Manager' },
              ]} />
            </Field>
          </div>
        </SidePanel>
      </Section>

      <Section title="Textarea">
        <div style={{ maxWidth: 480 }}>
          <Textarea label="Approval notes" placeholder="Flag reimbursements above $1,000..." hint="Shown to reviewers before release" />
        </div>
      </Section>

      <Section title="Label">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 320 }}>
          <Label>Plain label</Label>
          <Label required>Required label</Label>
        </div>
      </Section>

      <Section title="Separator">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
          <span style={{ font: 'var(--rf-text-body-sm)' }}>Above</span>
          <Separator />
          <span style={{ font: 'var(--rf-text-body-sm)' }}>Below</span>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', height: 24 }}>
            <span>Left</span>
            <Separator orientation="vertical" />
            <span>Middle</span>
            <Separator orientation="vertical" />
            <span>Right</span>
          </div>
        </div>
      </Section>

      <Section title="Accordion">
        <div style={{ maxWidth: 480 }}>
          <Accordion type="single" defaultValue="a">
            <AccordionItem value="a">
              <AccordionTrigger>Compliance checks</AccordionTrigger>
              <AccordionContent>Validate tax setup, employee status, and bank connectivity before release.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="b">
              <AccordionTrigger>Funding confirmation</AccordionTrigger>
              <AccordionContent>Treasury account balance is confirmed before each payroll run.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="c">
              <AccordionTrigger>Scheduled submission</AccordionTrigger>
              <AccordionContent>Release once all checks are green.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Section>

      <Section title="Collapsible">
        <div style={{ maxWidth: 480 }}>
          <Collapsible>
            <CollapsibleTrigger>
              <Button variant="secondary" size="sm">Toggle details</Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Card variant="outlined" padding="md" style={{ marginTop: 12 }}>
                <p style={{ font: 'var(--rf-text-body-sm)', color: 'var(--rf-color-text-secondary)', margin: 0 }}>
                  Hidden by default. Collapsible is the single-section sibling to Accordion.
                </p>
              </Card>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </Section>

      <Section title="Breadcrumb">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Breadcrumb items={[
            { label: 'Admin' },
            { label: 'Payroll' },
            { label: 'March review' },
          ]} />
          <Breadcrumb items={[
            { label: 'Workspace' },
            { label: 'Companies' },
            { label: 'Acme Corp' },
            { label: 'Benefits' },
            { label: 'Medical enrollment' },
          ]} />
        </div>
      </Section>

      <Section title="Pagination">
        <PaginationDemo />
      </Section>

      <Section title="Banner">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Banner variant="info" icon={<Info size={16} />}>Scheduled maintenance tonight from 11:00 PM to 11:30 PM UTC.</Banner>
          <Banner variant="success" icon={<CheckCircle size={16} weight="fill" />}>Payroll draft locked. 42 employees are ready for approval.</Banner>
          <Banner variant="warning" icon={<Warning size={16} weight="fill" />} dismissible onDismiss={() => toast('Dismissed')}>
            Some accounts still need micro-deposit verification.
          </Banner>
          <Banner variant="danger" icon={<XCircle size={16} weight="fill" />} action={<Button size="sm" variant="danger">Retry</Button>}>
            Tax filing submission failed.
          </Banner>
        </div>
      </Section>

      <Section title="Callout">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 640 }}>
          <Callout variant="info" icon={<Info size={16} />} title="Rollfi recommendation">
            Keep approval windows short so payroll changes are visible to reviewers before the submission deadline.
          </Callout>
          <Callout variant="warning" icon={<Warning size={16} />} title="Review before publish">
            Publishing this template will update onboarding defaults for future employees.
          </Callout>
          <Callout title="Imported from your bank feed">
            Accounts are refreshed hourly and can be re-linked without leaving this flow.
          </Callout>
        </div>
      </Section>

      <Section title="Progress">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 480 }}>
          <Progress label="Payroll draft validation" value={68} showValue />
          <Progress label="Benefits enrollment sync" value={42} variant="info" showValue />
          <Progress label="Onboarding checklist" value={3} max={5} variant="success" showValue format={(v, m) => `${v} / ${m} steps`} />
          <Progress label="Compliance review" value={84} variant="warning" showValue format={() => 'At risk'} />
          <Progress value={50} size="sm" />
          <Progress value={50} size="md" />
          <Progress value={50} size="lg" />
        </div>
      </Section>

      <Section title="Spinner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
          <Spinner size="xl" />
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--rf-color-text-secondary)' }}>
            <Spinner size="md" /> Loading…
          </span>
        </div>
      </Section>

      <Section title="Skeleton">
        <Card variant="outlined" padding="md" style={{ maxWidth: 480 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <Skeleton circle width={32} height={32} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <Skeleton width="40%" height={12} />
              <Skeleton width="60%" height={10} />
            </div>
          </div>
          <Skeleton height={12} />
          <div style={{ height: 8 }} />
          <Skeleton height={12} width="85%" />
          <div style={{ height: 8 }} />
          <Skeleton height={12} width="70%" />
        </Card>
      </Section>

      <Section title="StatusDot">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><StatusDot variant="success" /> Active</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><StatusDot variant="warning" /> Pending</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><StatusDot variant="danger" pulse /> Action required</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><StatusDot variant="teal" /> Payroll ready</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><StatusDot variant="neutral" /> Archived</span>
        </div>
      </Section>

      <Section title="Kbd">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, font: 'var(--rf-text-body-sm)' }}>
          <span>Open command palette: <Kbd>⌘</Kbd> <Kbd>K</Kbd></span>
          <span>Save: <Kbd>⌘</Kbd> <Kbd>S</Kbd></span>
          <span>Escape: <Kbd>Esc</Kbd></span>
        </div>
      </Section>

      <Section title="Tooltip">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Tooltip content="Tooltip on top" side="top"><Button variant="secondary" size="sm">Top</Button></Tooltip>
          <Tooltip content="Tooltip on right" side="right"><Button variant="secondary" size="sm">Right</Button></Tooltip>
          <Tooltip content="Tooltip on bottom" side="bottom"><Button variant="secondary" size="sm">Bottom</Button></Tooltip>
          <Tooltip content="Tooltip on left" side="left"><Button variant="secondary" size="sm">Left</Button></Tooltip>
        </div>
      </Section>

      <Section title="Popover">
        <Popover
          trigger={<Button variant="secondary" size="sm">Open popover</Button>}
          side="bottom"
          align="start"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 240 }}>
            <div style={{ font: 'var(--rf-text-body-sm-strong)' }}>Quick settings</div>
            <Switch checked={true} onChange={() => {}} label="Email notifications" />
            <Switch checked={false} onChange={() => {}} label="Slack notifications" />
            <Separator />
            <Button size="sm" variant="ghost">Open full settings</Button>
          </div>
        </Popover>
      </Section>

      <Section title="RadioGroup">
        <Tier2Radios />
      </Section>

      <Section title="ButtonGroup">
        <ButtonGroup>
          <Button variant="secondary" size="sm">Draft</Button>
          <Button variant="secondary" size="sm">Preview</Button>
          <Button size="sm">Publish</Button>
        </ButtonGroup>
      </Section>

      <Section title="SegmentedControl">
        <Tier2Segmented />
      </Section>

      <Section title="Toggle (icon-button)">
        <Tier2Toggle />
      </Section>

      <Section title="ToggleGroup">
        <Tier2ToggleGroup />
      </Section>

      <Section title="PasswordInput">
        <div style={{ maxWidth: 320 }}>
          <PasswordInput label="Password" placeholder="Enter password" hint="Click the eye to reveal" />
        </div>
      </Section>

      <Section title="NumberStepper">
        <Tier2NumStepper />
      </Section>

      <Section title="CurrencyInput">
        <div style={{ maxWidth: 280 }}>
          <CurrencyInput label="Amount" placeholder="0.00" />
        </div>
      </Section>

      <Section title="MaskedInput">
        <Tier2Masked />
      </Section>

      <Section title="TagInput">
        <Tier2Tags />
      </Section>

      <Section title="InputOTP">
        <Tier2OTP />
      </Section>

      <Section title="FileUpload">
        <Tier2File />
      </Section>

      <Section title="Combobox">
        <Tier2Combo />
      </Section>

      <Section title="Calendar">
        <Tier2CalendarDemo />
      </Section>

      <Section title="DatePicker">
        <Tier2DatePickerDemo />
      </Section>

      <Section title="TimePicker">
        <Tier2TimePickerDemo />
      </Section>

      <Section title="AlertDialog & ConfirmationDialog">
        <Tier2Dialogs />
      </Section>

      <Section title="ContextMenu">
        <ContextMenu items={[
          { label: 'Copy', onClick: () => toast('Copied') },
          { label: 'Edit', onClick: () => toast('Edit') },
          { label: 'Delete', onClick: () => toast('Deleted', { variant: 'error' }), danger: true },
        ]}>
          <Card variant="outlined" padding="md" style={{ maxWidth: 360, textAlign: 'center', cursor: 'context-menu' }}>
            Right-click anywhere in this card
          </Card>
        </ContextMenu>
      </Section>

      <Section title="HoverCard">
        <div style={{ display: 'inline-block' }}>
          <HoverCard
            trigger={<Button variant="secondary" size="sm">Hover @michael.scott</Button>}
            side="bottom"
          >
            <div style={{ display: 'flex', gap: 12 }}>
              <Avatar name="Michael Scott" size="md" />
              <div>
                <div style={{ font: 'var(--rf-text-body-sm-strong)' }}>Michael Scott</div>
                <div style={{ font: 'var(--rf-text-caption)', color: 'var(--rf-color-text-tertiary)', marginBottom: 6 }}>Partner Admin</div>
                <div style={{ font: 'var(--rf-text-body-sm)', color: 'var(--rf-color-text-secondary)' }}>
                  Manages 4 companies and processes payroll twice a month.
                </div>
              </div>
            </div>
          </HoverCard>
        </div>
      </Section>

      <Section title="Drawer">
        <Tier2DrawerDemo />
      </Section>

      <Section title="Command (Cmd+K)">
        <Tier2CommandDemo />
      </Section>

      <Section title="Pill">
        <Row>
          <Pill icon={<Heart size={12} weight="fill" />}>Benefits</Pill>
          <Pill tone="dark" icon={<Star size={12} weight="fill" />}>Features</Pill>
          <Pill tone="outline" icon={<Lightning size={12} weight="fill" />}>Impact</Pill>
          <Pill size="sm" tone="brand">Product</Pill>
          <Pill size="sm" tone="dark">Testimonial</Pill>
          <Pill size="sm" tone="outline">Coming soon</Pill>
        </Row>
      </Section>

      <Section title="AvatarGroup">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <AvatarGroup items={[
            { name: 'Michael Scott' },
            { name: 'Pam Beesly' },
            { name: 'Jim Halpert' },
            { name: 'Dwight Schrute' },
            { name: 'Stanley Hudson' },
            { name: 'Kelly Kapoor' },
            { name: 'Oscar Martinez' },
          ]} />
          <AvatarGroup size="sm" items={[
            { name: 'Acme Corp' },
            { name: 'Globex Inc' },
            { name: 'Initech Industries' },
          ]} />
        </div>
      </Section>

      <Section title="Timeline">
        <Timeline items={[
          { id: 't1', title: 'Employee changes synced', description: 'Two salary adjustments and one address update were applied to the draft.', timestamp: '9:08 AM', variant: 'success' },
          { id: 't2', title: 'Funding review required', description: 'Treasury account balance dropped below the same-day debit threshold.', timestamp: '10:12 AM', variant: 'warning' },
          { id: 't3', title: 'Final reminder sent', description: 'Approval owners were notified before the 2:00 PM payroll cut-off.', timestamp: '12:40 PM', variant: 'info' },
        ]} />
      </Section>

      <Section title="ActivityFeed">
        <ActivityFeed
          title="Recent workspace activity"
          action={<Badge variant="success">Live</Badge>}
          items={[
            { id: 'a1', actorName: 'Kurtik', message: 'published Q2 payroll policy', timestamp: '4 minutes ago' },
            { id: 'a2', actorName: 'Diane', message: 'commented on benefits enrollment defaults', timestamp: '21 minutes ago' },
            { id: 'a3', actorName: 'Mia', message: 'merged funding account updates', timestamp: '42 minutes ago' },
          ]}
        />
      </Section>

      <Section title="Item">
        <Card variant="outlined" padding="none">
          <Item icon={<FileText size={18} />} title="Payroll summary packet" description="Consolidated review package with tax totals, reimbursements, and funding notes." action={<Badge variant="success">Ready</Badge>} onClick={() => toast('Opening packet')} />
          <Item icon={<CreditCard size={18} />} title="Treasury funding account" description="Primary settlement account ending in 2481." action={<Badge variant="success">Verified</Badge>} />
          <Item icon={<CheckCircle size={18} />} title="Review queue" description="Three payroll drafts need final owner sign-off." action={<Badge variant="warning">3 pending</Badge>} onClick={() => toast('Opening queue')} />
        </Card>
      </Section>

      <Section title="NotificationItem">
        <Card variant="outlined" padding="none">
          <NotificationItem
            variant="danger"
            icon={<Warning size={14} weight="fill" />}
            title="Failed transaction · Umbrella LLC"
            description="Stanley Hudson's direct deposit was rejected."
            timestamp="5 minutes ago"
            actions={<Button size="sm" variant="secondary">Review</Button>}
          />
          <NotificationItem
            variant="warning"
            icon={<Bell size={14} />}
            title="Bank verification pending · Globex Inc"
            description="Micro-deposits sent 2 days ago. Verify by Apr 18."
            timestamp="2 hours ago"
            read
          />
          <NotificationItem
            variant="info"
            icon={<Info size={14} />}
            title="New user invited"
            description="Jim Halpert accepted the invitation as Account Manager."
            timestamp="Yesterday"
            read
          />
        </Card>
      </Section>

      <Section title="Carousel">
        <Carousel showControls showDots>
          {['Payroll summary', 'Benefits sync', 'Release readiness', 'Compliance review'].map((label, i) => (
            <Card key={label} variant="elevated" padding="md" style={{ width: 240 }}>
              <div style={{ font: 'var(--rf-text-caption)', color: 'var(--rf-color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
                Step {i + 1}
              </div>
              <div style={{ font: 'var(--rf-text-heading-sm)', marginBottom: 4 }}>{label}</div>
              <div style={{ font: 'var(--rf-text-body-sm)', color: 'var(--rf-color-text-secondary)' }}>
                Click a card to drill into the details for this step.
              </div>
            </Card>
          ))}
        </Carousel>
      </Section>

      <Section title="Typography">
        <TypeSpecimens />
      </Section>

      <Section title="Icons">
        <p style={{ font: 'var(--rf-text-body-sm)', color: 'var(--rf-color-text-secondary)', marginBottom: 20 }}>
          Phosphor Icons at regular weight. Browse the full set at{' '}
          <a href="https://phosphoricons.com" target="_blank" rel="noreferrer" style={{ color: 'var(--rf-color-text)' }}>phosphoricons.com</a>.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: 4,
          border: '1px solid var(--rf-color-border)',
          borderRadius: 12,
          padding: 8,
          background: 'var(--rf-color-surface)',
        }}>
          {[
            ['House', House], ['User', User], ['Gear', Gear], ['Bell', Bell],
            ['Envelope', Envelope], ['Calendar', CalendarIcon], ['FileText', FileText], ['CreditCard', CreditCard],
            ['ChartBar', ChartBar], ['Briefcase', Briefcase], ['Globe', Globe], ['Cloud', Cloud],
            ['Lock', Lock], ['MagnifyingGlass', MagnifyingGlass], ['Plus', Plus], ['PencilSimple', PencilSimple],
            ['Trash', Trash], ['Download', Download], ['Upload', Upload], ['ArrowRight', ArrowRight],
            ['Heart', Heart], ['Star', Star], ['Lightning', Lightning], ['CheckCircle', CheckCircle],
          ].map(([name, Icon]) => {
            const Component = Icon as React.ComponentType<{ size?: number }>;
            return (
              <div key={name as string} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                padding: '16px 8px',
                borderRadius: 8,
                color: 'var(--rf-color-text)',
                transition: 'background var(--rf-transition-fast)',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--rf-color-surface-elevated)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <Component size={22} />
                <span style={{ font: 'var(--rf-text-caption-sm)', color: 'var(--rf-color-text-tertiary)' }}>
                  {name as string}
                </span>
              </div>
            );
          })}
        </div>
        <h3 style={{ font: 'var(--rf-text-heading-sm)', margin: '24px 0 12px' }}>Sizes</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, color: 'var(--rf-color-text)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <Lightning size={16} />
            <span style={{ font: 'var(--rf-text-caption-sm)', color: 'var(--rf-color-text-tertiary)' }}>16px</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <Lightning size={18} />
            <span style={{ font: 'var(--rf-text-caption-sm)', color: 'var(--rf-color-text-tertiary)' }}>18px</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <Lightning size={20} />
            <span style={{ font: 'var(--rf-text-caption-sm)', color: 'var(--rf-color-text-tertiary)' }}>20px</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <Lightning size={24} />
            <span style={{ font: 'var(--rf-text-caption-sm)', color: 'var(--rf-color-text-tertiary)' }}>24px</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <Lightning size={32} />
            <span style={{ font: 'var(--rf-text-caption-sm)', color: 'var(--rf-color-text-tertiary)' }}>32px</span>
          </div>
        </div>
        <h3 style={{ font: 'var(--rf-text-heading-sm)', margin: '24px 0 12px' }}>Weights</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, color: 'var(--rf-color-text)' }}>
          {(['thin', 'light', 'regular', 'bold', 'fill', 'duotone'] as const).map(w => (
            <div key={w} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <Heart size={24} weight={w} />
              <span style={{ font: 'var(--rf-text-caption-sm)', color: 'var(--rf-color-text-tertiary)' }}>{w}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Colors">
        <ColorSwatches />
      </Section>

      <Section title="ThemeToggle">
        <p style={{ color: 'var(--rf-color-text-secondary)', marginBottom: 16, maxWidth: 640 }}>
          Two variants: a single icon button for headers/toolbars, and a segmented switch with explicit Light / Dark choices for settings panels. Both compose with the active <code>ThemeProvider</code>.
        </p>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start' }}>
            <span style={{ font: 'var(--rf-text-caption-sm)', color: 'var(--rf-color-text-tertiary)', textTransform: 'uppercase', letterSpacing: 0.4 }}>Icon (md)</span>
            <ThemeToggle />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start' }}>
            <span style={{ font: 'var(--rf-text-caption-sm)', color: 'var(--rf-color-text-tertiary)', textTransform: 'uppercase', letterSpacing: 0.4 }}>Icon (sm)</span>
            <ThemeToggle size="sm" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start' }}>
            <span style={{ font: 'var(--rf-text-caption-sm)', color: 'var(--rf-color-text-tertiary)', textTransform: 'uppercase', letterSpacing: 0.4 }}>Segmented (md)</span>
            <ThemeToggle variant="segmented" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start' }}>
            <span style={{ font: 'var(--rf-text-caption-sm)', color: 'var(--rf-color-text-tertiary)', textTransform: 'uppercase', letterSpacing: 0.4 }}>Segmented (sm)</span>
            <ThemeToggle variant="segmented" size="sm" />
          </div>
        </div>
      </Section>

      <Section title="White-label theming">
        <p style={{ color: 'var(--rf-color-text-secondary)', marginBottom: 16, maxWidth: 640 }}>
          Wrap any subtree in <code>&lt;BrandProvider&gt;</code> to scope a tenant's brand color,
          sidebar color, and logo. Three presets below — every branded surface inside the panel
          updates atomically.
        </p>
        <WhiteLabelPreview />
      </Section>
    </div>
  );
}

// Reads the resolved hex/rgba of a --rf-* token on mount. Re-runs when
// the theme attribute on <html> flips so dark-mode values display correctly.
function useResolvedToken(varName: string): string {
  const [value, setValue] = useState('');
  useEffect(() => {
    const read = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
      setValue(v);
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, [varName]);
  return value;
}

const TYPE_SPECIMENS: { token: string; label: string; weight: number; size: number; lineHeight: number; family: string; sample: string }[] = [
  { token: '--rf-text-display-xl',     label: 'Display XL',     weight: 600, size: 64, lineHeight: 1.1,  family: 'Funnel Display', sample: 'Display XL' },
  { token: '--rf-text-display-lg',     label: 'Display LG',     weight: 600, size: 48, lineHeight: 1.15, family: 'Funnel Display', sample: 'Display LG' },
  { token: '--rf-text-display-md',     label: 'Display MD',     weight: 600, size: 36, lineHeight: 1.2,  family: 'Funnel Display', sample: 'Display MD' },
  { token: '--rf-text-heading-xl',     label: 'Heading XL',     weight: 600, size: 28, lineHeight: 1.3,  family: 'Funnel Display', sample: 'Heading XL' },
  { token: '--rf-text-heading-lg',     label: 'Heading LG',     weight: 600, size: 24, lineHeight: 1.35, family: 'Funnel Display', sample: 'Heading LG' },
  { token: '--rf-text-heading-md',     label: 'Heading MD',     weight: 500, size: 20, lineHeight: 1.4,  family: 'Funnel Sans',    sample: 'Heading MD' },
  { token: '--rf-text-heading-sm',     label: 'Heading SM',     weight: 500, size: 18, lineHeight: 1.4,  family: 'Funnel Sans',    sample: 'Heading SM' },
  { token: '--rf-text-body-lg',        label: 'Body LG',        weight: 400, size: 18, lineHeight: 1.6,  family: 'Funnel Sans',    sample: 'The quick brown fox jumps over the lazy dog' },
  { token: '--rf-text-body-md',        label: 'Body MD',        weight: 400, size: 16, lineHeight: 1.6,  family: 'Funnel Sans',    sample: 'The quick brown fox jumps over the lazy dog' },
  { token: '--rf-text-body-md-strong', label: 'Body MD Strong', weight: 500, size: 16, lineHeight: 1.5,  family: 'Funnel Sans',    sample: 'The quick brown fox jumps over the lazy dog' },
  { token: '--rf-text-body-sm',        label: 'Body SM',        weight: 400, size: 14, lineHeight: 1.6,  family: 'Funnel Sans',    sample: 'The quick brown fox jumps over the lazy dog' },
  { token: '--rf-text-body-sm-strong', label: 'Body SM Strong', weight: 500, size: 14, lineHeight: 1.5,  family: 'Funnel Sans',    sample: 'The quick brown fox jumps over the lazy dog' },
  { token: '--rf-text-body-xs',        label: 'Body XS',        weight: 400, size: 12, lineHeight: 1.5,  family: 'Funnel Sans',    sample: 'The quick brown fox jumps over the lazy dog' },
  { token: '--rf-text-caption',        label: 'Caption',        weight: 400, size: 13, lineHeight: 1.4,  family: 'Funnel Display', sample: 'Metadata and secondary information' },
  { token: '--rf-text-caption-sm',     label: 'Caption SM',     weight: 400, size: 11, lineHeight: 1.4,  family: 'Funnel Display', sample: 'Small caption text' },
  { token: '--rf-text-label',          label: 'Label',          weight: 500, size: 14, lineHeight: 1.4,  family: 'Funnel Display', sample: 'Form Label' },
  { token: '--rf-text-button',         label: 'Button',         weight: 500, size: 14, lineHeight: 1.0,  family: 'Funnel Sans',    sample: 'Button label' },
  { token: '--rf-text-button-sm',      label: 'Button SM',      weight: 500, size: 13, lineHeight: 1.0,  family: 'Funnel Sans',    sample: 'Small button' },
  { token: '--rf-text-code',           label: 'Code',           weight: 400, size: 13, lineHeight: 1.5,  family: 'JetBrains Mono', sample: 'const value = 42;' },
];

function TypeSpecimens() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {TYPE_SPECIMENS.map((spec) => {
        const isDisplay = spec.token.includes('display-');
        return (
          <div key={spec.token} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 24, alignItems: 'baseline', paddingBottom: 16, borderBottom: '1px solid var(--rf-color-border-subtle)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ font: 'var(--rf-text-body-sm-strong)' }}>{spec.label}</div>
              <code style={{ font: 'var(--rf-text-code)', color: 'var(--rf-color-text-tertiary)' }}>{spec.token}</code>
              <div style={{ font: 'var(--rf-text-caption-sm)', color: 'var(--rf-color-text-secondary)' }}>
                {spec.family} · {spec.weight} · {spec.size}px / {spec.lineHeight}
              </div>
            </div>
            <p style={{ font: `var(${spec.token})`, letterSpacing: isDisplay ? 'var(--rf-tracking-tight)' : undefined, margin: 0 }}>
              {spec.sample}
            </p>
          </div>
        );
      })}
    </div>
  );
}

const COLOR_SWATCHES: { label: string; token: string; group: string }[] = [
  { group: 'Brand & primary', label: 'Primary',         token: '--rf-color-primary' },
  { group: 'Brand & primary', label: 'On primary',      token: '--rf-color-on-primary' },
  { group: 'Brand & primary', label: 'Brand',           token: '--rf-color-brand' },
  { group: 'Brand & primary', label: 'Brand soft',      token: '--rf-color-brand-soft' },
  { group: 'Brand & primary', label: 'Brand text',      token: '--rf-color-brand-text' },
  { group: 'Surfaces',        label: 'Canvas',          token: '--rf-color-canvas' },
  { group: 'Surfaces',        label: 'Surface',         token: '--rf-color-surface' },
  { group: 'Surfaces',        label: 'Elevated',        token: '--rf-color-surface-elevated' },
  { group: 'Surfaces',        label: 'Border',          token: '--rf-color-border' },
  { group: 'Surfaces',        label: 'Border strong',   token: '--rf-color-border-strong' },
  { group: 'Text',            label: 'Text',            token: '--rf-color-text' },
  { group: 'Text',            label: 'Text secondary',  token: '--rf-color-text-secondary' },
  { group: 'Text',            label: 'Text tertiary',   token: '--rf-color-text-tertiary' },
  { group: 'Semantic',        label: 'Info',            token: '--rf-color-info' },
  { group: 'Semantic',        label: 'Success',         token: '--rf-color-success' },
  { group: 'Semantic',        label: 'Warning',         token: '--rf-color-warning' },
  { group: 'Semantic',        label: 'Danger',          token: '--rf-color-danger' },
  { group: 'Accent',          label: 'Teal',            token: '--rf-color-accent-teal' },
  { group: 'Accent',          label: 'Lime',            token: '--rf-color-accent-lime' },
  { group: 'Accent',          label: 'Orange',          token: '--rf-color-accent-orange' },
  { group: 'Accent',          label: 'Purple',          token: '--rf-color-accent-purple' },
  { group: 'Sidebar',         label: 'Sidebar',         token: '--rf-color-sidebar' },
  { group: 'Sidebar',         label: 'Sidebar text',    token: '--rf-color-sidebar-text' },
  { group: 'Sidebar',         label: 'Sidebar strong',  token: '--rf-color-sidebar-text-strong' },
];

function ColorSwatch({ label, token }: { label: string; token: string }) {
  const value = useResolvedToken(token);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{
        width: '100%', height: 64,
        backgroundColor: `var(${token})`,
        border: '1px solid var(--rf-color-border)',
        borderRadius: 8,
      }} />
      <div style={{ font: 'var(--rf-text-body-sm-strong)' }}>{label}</div>
      <code style={{ font: 'var(--rf-text-code)', color: 'var(--rf-color-text-tertiary)', fontSize: 11 }}>{token}</code>
      <code style={{ font: 'var(--rf-text-code)', color: 'var(--rf-color-text-secondary)' }}>{value || '—'}</code>
    </div>
  );
}

function ColorSwatches() {
  const groups = Array.from(new Set(COLOR_SWATCHES.map(s => s.group)));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {groups.map(group => (
        <div key={group}>
          <h3 style={{ font: 'var(--rf-text-heading-sm)', color: 'var(--rf-color-text-secondary)', marginBottom: 12 }}>{group}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
            {COLOR_SWATCHES.filter(s => s.group === group).map(s => (
              <ColorSwatch key={s.token} label={s.label} token={s.token} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function WhiteLabelPreview() {
  const presets = [
    { name: 'Rollfi (default)', brand: undefined, sidebar: undefined },
    { name: 'Acme Blue', brand: '#0066ff', sidebar: '#1a1f2e' },
    { name: 'Nova Purple', brand: '#7c3aed', sidebar: undefined },
    { name: 'Mint (light sidebar)', brand: '#16a34a', sidebar: '#f4f4f6' },
  ];
  const [active, setActive] = useState(0);
  const p = presets[active];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {presets.map((preset, i) => (
          <Button
            key={preset.name}
            variant={i === active ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setActive(i)}
          >
            {preset.name}
          </Button>
        ))}
      </div>
      <BrandProvider brand={p.brand} sidebar={p.sidebar}>
        <div
          style={{
            border: '1px solid var(--rf-color-border)',
            borderRadius: 'var(--rf-radius-md)',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: '200px 1fr',
            height: 280,
          }}
        >
          <div style={{ background: 'var(--rf-color-sidebar)', padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ marginBottom: 8 }}>
              <Logo size={24} color="var(--rf-color-sidebar-text)" />
            </div>
            {['Dashboard', 'Activity', 'Users'].map((label, i) => (
              <div
                key={label}
                style={{
                  padding: '8px 10px',
                  borderRadius: 'var(--rf-radius-sm)',
                  font: 'var(--rf-text-body-sm)',
                  color: i === 0 ? 'var(--rf-color-sidebar-text)' : 'var(--rf-color-sidebar-text-dim)',
                  background: i === 0 ? 'var(--rf-color-sidebar-active)' : 'transparent',
                }}
              >
                {label}
              </div>
            ))}
          </div>
          <div style={{ padding: 24, background: 'var(--rf-color-canvas)', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Logo size={32} />
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Pill>Brand pill</Pill>
              <Pill tone="outline">Outline pill</Pill>
            </div>
            <a href="#" style={{ color: 'var(--rf-color-brand-text)', font: 'var(--rf-text-body-sm)' }}>
              A link in --rf-color-brand-text
            </a>
            <div
              style={{
                background: 'var(--rf-color-brand-soft)',
                border: '1px solid var(--rf-color-brand-border)',
                color: 'var(--rf-color-brand-text)',
                padding: '8px 12px',
                borderRadius: 'var(--rf-radius-sm)',
                font: 'var(--rf-text-body-sm)',
                width: 'fit-content',
              }}
            >
              Brand-soft surface
            </div>
          </div>
        </div>
      </BrandProvider>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 64 }}>
      <h2 style={{
        font: 'var(--rf-text-heading-lg)',
        marginBottom: 24,
        paddingBottom: 12,
        borderBottom: '1px solid var(--rf-color-border)',
      }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function PaginationDemo() {
  const [page, setPage] = useState(1);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Pagination current={page} total={12} onChange={setPage} />
      <span style={{ font: 'var(--rf-text-caption)', color: 'var(--rf-color-text-tertiary)' }}>Current page: {page}</span>
    </div>
  );
}

// ── Tier 2 demo helpers ──

function Tier2Radios() {
  const [val, setVal] = useState('weekly');
  return (
    <RadioGroup value={val} onChange={setVal}>
      <Radio value="weekly">Weekly payroll cadence</Radio>
      <Radio value="biweekly">Bi-weekly payroll cadence</Radio>
      <Radio value="monthly">Monthly payroll cadence</Radio>
      <Radio value="hold" disabled>Hold (disabled)</Radio>
    </RadioGroup>
  );
}

function Tier2Segmented() {
  const [v, setV] = useState('list');
  return (
    <SegmentedControl
      value={v}
      onChange={setV}
      items={[
        { value: 'list', label: 'List' },
        { value: 'grid', label: 'Grid' },
        { value: 'board', label: 'Board' },
      ]}
    />
  );
}

function Tier2Toggle() {
  const [bold, setBold] = useState(true);
  return (
    <Row>
      <Toggle pressed={bold} onPressedChange={setBold}><strong>B</strong></Toggle>
      <Toggle pressed={false} onPressedChange={() => {}}><em>I</em></Toggle>
      <Toggle pressed={false} onPressedChange={() => {}}><span style={{ textDecoration: 'underline' }}>U</span></Toggle>
    </Row>
  );
}

function Tier2ToggleGroup() {
  const [view, setView] = useState('grid');
  return (
    <ToggleGroup value={view} onChange={setView}>
      <ToggleGroupItem value="list">≡</ToggleGroupItem>
      <ToggleGroupItem value="grid">▦</ToggleGroupItem>
      <ToggleGroupItem value="map">◎</ToggleGroupItem>
    </ToggleGroup>
  );
}

function Tier2NumStepper() {
  const [n, setN] = useState(8);
  return <NumberStepper label="Per-employee rate" value={n} onChange={setN} min={0} max={50} hint={`Current: $${n}`} />;
}

function Tier2Masked() {
  const [ssn, setSsn] = useState('');
  const [phone, setPhone] = useState('');
  return (
    <div style={{ maxWidth: 320, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <MaskedInput label="SSN" mask="###-##-####" value={ssn} onChange={setSsn} />
      <MaskedInput label="Phone" mask="(###) ###-####" value={phone} onChange={setPhone} />
    </div>
  );
}

function Tier2Tags() {
  const [tags, setTags] = useState<string[]>(['operations', 'payroll']);
  return <div style={{ maxWidth: 400 }}><TagInput label="Tags" value={tags} onChange={setTags} placeholder="Add tag and press Enter" /></div>;
}

function Tier2OTP() {
  const [code, setCode] = useState('');
  return (
    <div>
      <InputOTP label="Verification code" value={code} onChange={setCode} length={6} hint="Sent to ••• 4521" />
    </div>
  );
}

function Tier2File() {
  const [file, setFile] = useState<File | null>(null);
  return <div style={{ maxWidth: 480 }}><FileUpload label="Payroll CSV" value={file} onChange={setFile} accept=".csv,.xlsx" maxSize={5 * 1024 * 1024} hint="Drop a CSV or XLSX from your prior provider" /></div>;
}

function Tier2Combo() {
  const [v, setV] = useState('');
  return (
    <div style={{ maxWidth: 320 }}>
      <Combobox
        label="Department"
        value={v}
        onChange={setV}
        placeholder="Pick a department..."
        options={[
          { value: 'eng', label: 'Engineering' },
          { value: 'fin', label: 'Finance' },
          { value: 'hr', label: 'People & HR' },
          { value: 'ops', label: 'Operations' },
          { value: 'sales', label: 'Sales' },
          { value: 'support', label: 'Support' },
        ]}
      />
    </div>
  );
}

function Tier2CalendarDemo() {
  const [d, setD] = useState<Date | null>(new Date());
  return <Calendar value={d} onChange={setD} />;
}

function Tier2DatePickerDemo() {
  const [d, setD] = useState<Date | null>(null);
  return <DatePicker label="Payroll cut-off" value={d} onChange={setD} hint="Pick the final day for adjustments" />;
}

function Tier2TimePickerDemo() {
  const [t, setT] = useState('09:30');
  return <TimePicker label="Release time" value={t} onChange={setT} hint="When the payroll auto-releases" />;
}

function Tier2Dialogs() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [destructiveOpen, setDestructiveOpen] = useState(false);
  const { toast } = useToast();
  return (
    <Row>
      <Button variant="secondary" onClick={() => setConfirmOpen(true)}>Confirm action</Button>
      <Button variant="danger" onClick={() => setDestructiveOpen(true)}>Destructive action</Button>
      <ConfirmationDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Save changes?"
        description="Your edits will be applied to the current payroll draft."
        confirmLabel="Save"
        onConfirm={() => { setConfirmOpen(false); toast('Saved', { variant: 'success' }); }}
      />
      <AlertDialog
        open={destructiveOpen}
        onClose={() => setDestructiveOpen(false)}
        variant="destructive"
        title="Delete this company?"
        description="This will permanently remove the company and all associated records. This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={() => { setDestructiveOpen(false); toast('Deleted', { variant: 'error' }); }}
      />
    </Row>
  );
}

function Tier2DrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Quick add"
        description="Bottom-anchored drawer for mobile-first surfaces."
        footer={<Button onClick={() => setOpen(false)}>Done</Button>}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Field label="Name"><Input placeholder="Acme Corp" /></Field>
          <Field label="Tax ID"><MaskedInput mask="##-#######" value="" onChange={() => {}} /></Field>
        </div>
      </Drawer>
    </>
  );
}

function Tier2CommandDemo() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Open command palette <Kbd>⌘</Kbd><Kbd>K</Kbd>
      </Button>
      <Command
        open={open}
        onOpenChange={setOpen}
        items={[
          { id: 'cal', label: 'Calendar', group: 'Suggestions', icon: <CalendarIcon size={14} />, onSelect: () => toast('Calendar'), shortcut: <><Kbd>G</Kbd><Kbd>C</Kbd></> },
          { id: 'search', label: 'Global search', group: 'Suggestions', icon: <MagnifyingGlass size={14} />, onSelect: () => toast('Search'), shortcut: <><Kbd>⌘</Kbd><Kbd>K</Kbd></> },
          { id: 'profile', label: 'Profile', group: 'Workspace', icon: <User size={14} />, onSelect: () => toast('Profile') },
          { id: 'billing', label: 'Billing', group: 'Workspace', icon: <CreditCard size={14} />, onSelect: () => toast('Billing') },
          { id: 'settings', label: 'Settings', group: 'Workspace', icon: <Gear size={14} />, onSelect: () => toast('Settings') },
        ]}
      />
    </>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//
//   ▼ DEMO / MOCK CODE BELOW — NOT PART OF THE DESIGN SYSTEM LIBRARY ▼
//
//   Everything below this line (OnboardingMock + the Portal mock views,
//   their mock data, and their helper components) exists ONLY to demo and
//   exercise the design system. Do NOT consume these from a downstream app.
//   The library surface is exported from `src/components/index.ts`.
//
//   When splitting this repo into a publishable library vs a demo app,
//   everything below this banner should move out of the library build.
//
// ═══════════════════════════════════════════════════════════════════════════

function OnboardingMock({ onExit }: { onExit: () => void }) {
  const [step, setStep] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showSsn, setShowSsn] = useState(false);
  const [data, setData] = useState({
    firstName: 'Angel',
    lastName: 'Orizi',
    middleName: '',
    phone: '(386) 847-0006',
    phoneCountry: '+1',
    email: 'angelorizi@mailsac.com',
    jobTitle: 'Sales',
    workLocation: 'Main',
    ssn: '',
    dob: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    fedFilingStatus: '',
    fedMultipleJobs: '',
    fedDepsUnder17: '',
    fedDepsOther: '',
    fedExtraWithholding: '',
    stateFilingStatus: '',
    stateAllowance: '',
    stateAdditional: '',
    bankMethod: 'plaid',
    routingNumber: '',
    accountNumber: '',
    confirmAccountNumber: '',
    accountHolderName: '',
    accountType: '',
  });
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [addressChoice, setAddressChoice] = useState<'suggested' | 'entered'>('suggested');

  const stepKeys = ['welcome', 'password', 'about', 'personal', 'federal', 'state', 'bank', 'confirm', 'done'];
  const current = stepKeys[step];
  const totalProgress = stepKeys.length - 2;
  const currentProgress = Math.max(0, Math.min(step, totalProgress));

  const pwRules = [
    { label: 'At least 8 characters', test: (v: string) => v.length >= 8 },
    { label: 'Lowercase letter', test: (v: string) => /[a-z]/.test(v) },
    { label: 'Uppercase letter', test: (v: string) => /[A-Z]/.test(v) },
    { label: 'Special character (!@#$%*)', test: (v: string) => /[!@#$%*&^()_+\-=]/.test(v) },
    { label: 'A number', test: (v: string) => /\d/.test(v) },
  ];
  const pwValid = pwRules.every(r => r.test(password)) && password === confirmPw && confirmPw.length > 0;

  const go = (d: number) => setStep(s => Math.max(0, Math.min(stepKeys.length - 1, s + d)));
  const goTo = (i: number) => setStep(i);

  const goBackBar = (
    <button
      type="button"
      onClick={onExit}
      style={{
        position: 'fixed', top: 16, left: 16,
        background: 'var(--rf-color-surface)', border: '1px solid var(--rf-color-border)',
        borderRadius: 'var(--rf-radius-md)', padding: '6px 10px',
        font: 'var(--rf-text-caption)', color: 'var(--rf-color-text-secondary)',
        cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, zIndex: 10,
      }}
    >
      <ArrowLeft size={12} /> Back to library
    </button>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--rf-color-canvas)', display: 'flex', justifyContent: 'center', overflowY: 'auto' }}>
      {goBackBar}
      <div key={step} style={{ width: '100%', maxWidth: 480, padding: '48px 28px 64px' }}>
        {current !== 'welcome' && current !== 'done' && (
          <div style={{ marginBottom: 32 }}>
            <SegmentedProgress current={currentProgress} total={totalProgress} />
          </div>
        )}

        {current === 'welcome' && (
          <div style={{ paddingTop: 32, textAlign: 'center' }}>
            <div style={{
              width: 56, height: 56, borderRadius: 14, margin: '0 auto 28px',
              background: 'var(--rf-color-primary)', color: 'var(--rf-color-on-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <UserCircle size={28} />
            </div>
            <h1 style={{ font: 'var(--rf-text-display-md)', letterSpacing: 'var(--rf-tracking-tight)', margin: '0 0 12px', color: 'var(--rf-color-text)' }}>
              Welcome, {data.firstName}
            </h1>
            <p style={{ font: 'var(--rf-text-body-md)', color: 'var(--rf-color-text-secondary)', margin: '0 auto 8px', maxWidth: 340 }}>
              <strong style={{ color: 'var(--rf-color-text)', fontWeight: 500 }}>Acme Corp</strong> has invited you to complete your onboarding.
            </p>
            <p style={{ font: 'var(--rf-text-body-sm)', color: 'var(--rf-color-text-tertiary)', margin: '0 auto 32px', maxWidth: 320 }}>
              This should take about 5–10 minutes. You'll set up your account, confirm your details, and complete your tax forms.
            </p>
            <Button onClick={() => go(1)} size="lg">Get started →</Button>
          </div>
        )}

        {current === 'password' && (
          <>
            <PageHeader title="Create your password" subtitle="Choose a strong password to secure your account." />
            <Card variant="outlined" padding="md" style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {pwRules.map((r, i) => {
                  const idle = password.length === 0;
                  const pass = r.test(password);
                  const color = idle ? 'var(--rf-color-text-tertiary)' : pass ? 'var(--rf-color-success-text)' : 'var(--rf-color-danger-text)';
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, font: 'var(--rf-text-body-sm)', color }}>
                      <span style={{ width: 14, display: 'inline-flex', justifyContent: 'center' }}>
                        {idle ? '○' : pass ? '✓' : '✗'}
                      </span>
                      {r.label}
                    </div>
                  );
                })}
              </div>
            </Card>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
              <Input inputSize="lg" label="Password" type="password" placeholder="Create a password" value={password} onChange={e => setPassword(e.target.value)} />
              <Input
                inputSize="lg"
                label="Confirm password"
                type="password"
                placeholder="Re-enter password"
                value={confirmPw}
                onChange={e => setConfirmPw(e.target.value)}
                error={confirmPw.length > 0 && password !== confirmPw ? "Passwords don't match" : undefined}
              />
            </div>
            <Button fullWidth size="lg" onClick={() => go(1)} disabled={!pwValid}>Continue</Button>
          </>
        )}

        {current === 'about' && (
          <>
            <PageHeader
              title="About you"
              subtitle="Please use your legal name exactly as it appears on official documents. This is required for tax and payroll purposes."
            />
            <div style={{ marginBottom: 20 }}>
              <Alert variant="warning" icon={<Warning size={18} weight="fill" />}>
                Inaccurate information will result in incorrect tax forms, leading to fines, penalties, and delayed payments.
              </Alert>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <Input inputSize="lg" label="Legal first name" value={data.firstName} onChange={e => setData({ ...data, firstName: e.target.value })} />
                <Input inputSize="lg" label="Legal last name" value={data.lastName} onChange={e => setData({ ...data, lastName: e.target.value })} />
              </div>
              <Input inputSize="lg" label="Legal middle name" placeholder="Optional" value={data.middleName} onChange={e => setData({ ...data, middleName: e.target.value })} />
              <PhoneInput
                label="Phone number"
                value={data.phone}
                onChange={v => setData({ ...data, phone: v })}
                countryCode={data.phoneCountry}
                onCountryChange={c => setData({ ...data, phoneCountry: c })}
              />
              <Input inputSize="lg" label="Email" type="email" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <Input inputSize="lg" label="Job title" value={data.jobTitle} disabled />
                <Input inputSize="lg" label="Work location" value={data.workLocation} disabled />
              </div>
            </div>
            <div style={{ marginBottom: 24 }}>
              <Checkbox checked={agreed} onChange={() => setAgreed(!agreed)}>
                I agree to the <a href="#" onClick={e => e.preventDefault()} style={{ color: 'var(--rf-color-text)', fontWeight: 500 }}>Terms of Service</a>, <a href="#" onClick={e => e.preventDefault()} style={{ color: 'var(--rf-color-text)', fontWeight: 500 }}>Privacy Policy</a> &amp; <a href="#" onClick={e => e.preventDefault()} style={{ color: 'var(--rf-color-text)', fontWeight: 500 }}>Payroll Terms</a>
              </Checkbox>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Button variant="secondary" size="lg" onClick={() => go(-1)}>Back</Button>
              <Button size="lg" fullWidth onClick={() => go(1)} disabled={!agreed}>Continue</Button>
            </div>
          </>
        )}

        {current === 'personal' && (
          <>
            <PageHeader title="Personal information" subtitle="For security and tax purposes, we need to verify your identity." />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
              <Field label="Social Security Number" required>
                <Input
                  inputSize="lg"
                  type={showSsn ? 'text' : 'password'}
                  placeholder="XXX-XX-XXXX"
                  value={data.ssn}
                  onChange={e => setData({ ...data, ssn: e.target.value })}
                  suffix={
                    <button type="button" onClick={() => setShowSsn(!showSsn)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--rf-color-text-tertiary)', display: 'inline-flex', pointerEvents: 'auto' }}>
                      {showSsn ? <EyeSlash size={16} /> : <Eye size={16} />}
                    </button>
                  }
                />
              </Field>
              <Input inputSize="lg" label="Date of birth" type="date" value={data.dob} onChange={e => setData({ ...data, dob: e.target.value })} />
              <Input inputSize="lg" label="Address" placeholder="Street address" value={data.address1} onChange={e => setData({ ...data, address1: e.target.value })} />
              <Input inputSize="lg" label="Address line 2" placeholder="Apt, suite (optional)" value={data.address2} onChange={e => setData({ ...data, address2: e.target.value })} />
              <Input inputSize="lg" label="City" value={data.city} onChange={e => setData({ ...data, city: e.target.value })} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <Select size="lg" label="State" placeholder="State" options={[
                  { value: 'CA', label: 'California' },
                  { value: 'NY', label: 'New York' },
                  { value: 'TX', label: 'Texas' },
                  { value: 'WA', label: 'Washington' },
                ]} value={data.state} onChange={e => setData({ ...data, state: e.target.value })} />
                <Input inputSize="lg" label="ZIP code" placeholder="00000" value={data.zip} onChange={e => setData({ ...data, zip: e.target.value })} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Button variant="secondary" size="lg" onClick={() => go(-1)}>Back</Button>
              <Button size="lg" fullWidth onClick={() => setAddressModalOpen(true)} disabled={!(data.ssn && data.dob && data.address1 && data.city && data.state && data.zip)}>Continue</Button>
            </div>

            <Modal
              open={addressModalOpen}
              onClose={() => setAddressModalOpen(false)}
              title="Verify your address"
              description="We found a suggested match for the address you entered. Please select which one to use."
              size="sm"
              footer={
                <>
                  <Button variant="secondary" onClick={() => setAddressModalOpen(false)}>Go back</Button>
                  <Button onClick={() => { setAddressModalOpen(false); go(1); }}>Use this address</Button>
                </>
              }
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <OptionCard
                  selected={addressChoice === 'suggested'}
                  onSelect={() => setAddressChoice('suggested')}
                  title="Suggested address"
                  description={`${data.address1}, ${data.city}, ${data.state} ${data.zip}-1234`}
                  badge="Recommended"
                />
                <OptionCard
                  selected={addressChoice === 'entered'}
                  onSelect={() => setAddressChoice('entered')}
                  title="Address as entered"
                  description={`${data.address1}${data.address2 ? ', ' + data.address2 : ''}, ${data.city}, ${data.state} ${data.zip}`}
                />
              </div>
            </Modal>
          </>
        )}

        {current === 'federal' && (
          <>
            <PageHeader title="Federal withholding" subtitle="These entries correspond to Form W-4 and determine how much income tax to withhold." />
            <p style={{ font: 'var(--rf-text-caption)', color: 'var(--rf-color-text-tertiary)', margin: '-20px 0 24px' }}>
              Use the <a href="https://www.irs.gov/individuals/tax-withholding-estimator" target="_blank" rel="noreferrer" style={{ color: 'var(--rf-color-text)', fontWeight: 500 }}>IRS Calculator</a> if you're unsure.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
              <Select size="lg" label="Filing status (1c)" placeholder="Select filing status" options={[
                { value: 'single', label: 'Single or Married filing separately' },
                { value: 'married', label: 'Married filing jointly' },
                { value: 'hoh', label: 'Head of Household' },
              ]} value={data.fedFilingStatus} onChange={e => setData({ ...data, fedFilingStatus: e.target.value })} />
              <Select size="lg" label="Multiple jobs (2c)" placeholder="Select" hint="Check if you or your spouse hold more than one job." options={[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
              ]} value={data.fedMultipleJobs} onChange={e => setData({ ...data, fedMultipleJobs: e.target.value })} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <Input inputSize="lg" label="Dependents under 17" placeholder="0" type="number" value={data.fedDepsUnder17} onChange={e => setData({ ...data, fedDepsUnder17: e.target.value })} />
                <Input inputSize="lg" label="Other dependents" placeholder="0" type="number" value={data.fedDepsOther} onChange={e => setData({ ...data, fedDepsOther: e.target.value })} />
              </div>
              <Input inputSize="lg" label="Extra withholding (4c)" prefix="$" placeholder="0" hint="Optional" value={data.fedExtraWithholding} onChange={e => setData({ ...data, fedExtraWithholding: e.target.value })} />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Button variant="secondary" size="lg" onClick={() => go(-1)}>Back</Button>
              <Button size="lg" fullWidth onClick={() => go(1)} disabled={!data.fedFilingStatus}>Continue</Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
              <Button variant="ghost" size="sm" onClick={() => go(1)}>Skip for now →</Button>
            </div>
          </>
        )}

        {current === 'state' && (
          <>
            <PageHeader title="California tax withholding" subtitle="Complete the fields below for California income tax withholding." />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
              <Select size="lg" label="Filing status" placeholder="Select filing status" hint="Head of Household applies to unmarried individuals with a qualifying relative." options={[
                { value: 'single', label: 'Single' },
                { value: 'married', label: 'Married filing jointly' },
                { value: 'hoh', label: 'Head of Household' },
              ]} value={data.stateFilingStatus} onChange={e => setData({ ...data, stateFilingStatus: e.target.value })} />
              <Input inputSize="lg" label="Withholding allowance" type="number" placeholder="0" hint="Consult your state's withholding form if unsure." value={data.stateAllowance} onChange={e => setData({ ...data, stateAllowance: e.target.value })} />
              <Input inputSize="lg" label="Additional withholding" prefix="$" placeholder="0.00" hint="Extra flat amount per pay period." value={data.stateAdditional} onChange={e => setData({ ...data, stateAdditional: e.target.value })} />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Button variant="secondary" size="lg" onClick={() => go(-1)}>Back</Button>
              <Button size="lg" fullWidth onClick={() => go(1)} disabled={!data.stateFilingStatus}>Continue</Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
              <Button variant="ghost" size="sm" onClick={() => go(1)}>Skip for now →</Button>
            </div>
          </>
        )}

        {current === 'bank' && (
          <>
            <PageHeader title="Direct deposit" subtitle="Link your bank account so you get paid automatically." />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              <OptionCard
                selected={data.bankMethod === 'plaid'}
                onSelect={() => setData({ ...data, bankMethod: 'plaid' })}
                title="Instant connection"
                description="Powered by Plaid"
                badge="Recommended"
              />
              <OptionCard
                selected={data.bankMethod === 'manual'}
                onSelect={() => setData({ ...data, bankMethod: 'manual' })}
                title="Manual account linking"
                description="Enter routing and account numbers"
              />
            </div>
            {data.bankMethod === 'manual' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
                <Input inputSize="lg" label="Name of account holder" placeholder="Full legal name" value={data.accountHolderName} onChange={e => setData({ ...data, accountHolderName: e.target.value })} />
                <Input inputSize="lg" label="Routing number" placeholder="9 digits" value={data.routingNumber} onChange={e => setData({ ...data, routingNumber: e.target.value })} />
                <Input inputSize="lg" label="Account number" value={data.accountNumber} onChange={e => setData({ ...data, accountNumber: e.target.value })} />
                <Input
                  inputSize="lg"
                  label="Confirm account number"
                  value={data.confirmAccountNumber}
                  onChange={e => setData({ ...data, confirmAccountNumber: e.target.value })}
                  error={data.confirmAccountNumber.length > 0 && data.accountNumber !== data.confirmAccountNumber ? "Account numbers don't match" : undefined}
                />
                <Select size="lg" label="Account type" placeholder="Select account type" options={[
                  { value: 'checking', label: 'Checking' },
                  { value: 'savings', label: 'Savings' },
                ]} value={data.accountType} onChange={e => setData({ ...data, accountType: e.target.value })} />
              </div>
            )}
            <div style={{ display: 'flex', gap: 10 }}>
              <Button variant="secondary" size="lg" onClick={() => go(-1)}>Back</Button>
              <Button size="lg" fullWidth onClick={() => go(1)} icon={data.bankMethod === 'plaid' ? <Bank size={16} /> : undefined}>
                {data.bankMethod === 'plaid' ? 'Connect bank' : 'Continue'}
              </Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
              <Button variant="ghost" size="sm" onClick={() => go(1)}>Skip for now →</Button>
            </div>
          </>
        )}

        {current === 'confirm' && (
          <>
            <PageHeader title="Review & submit" subtitle="Confirm everything looks correct before submitting." />
            <div style={{ marginBottom: 16 }}>
              <Alert variant="warning" icon={<Warning size={18} weight="fill" />}>
                Please review carefully. Incorrect information will result in incorrect tax filings, leading to fines and penalties.
              </Alert>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Card variant="outlined" padding="md">
                <CardHeader title="Employee details" action={<Button variant="ghost" size="sm" onClick={() => goTo(2)}>Edit</Button>} />
                <div style={{ marginTop: 12 }}>
                  <DetailRow label="Name" value={`${data.firstName} ${data.middleName ? data.middleName + ' ' : ''}${data.lastName}`} />
                  <DetailRow label="Phone" value={data.phone} />
                  <DetailRow label="Email" value={data.email} />
                  <DetailRow label="Job title" value={data.jobTitle} />
                </div>
              </Card>
              <Card variant="outlined" padding="md">
                <CardHeader title="Personal information" action={<Button variant="ghost" size="sm" onClick={() => goTo(3)}>Edit</Button>} />
                <div style={{ marginTop: 12 }}>
                  <DetailRow label="SSN / ITIN" value={data.ssn || '———'} masked />
                  <DetailRow label="Date of birth" value={data.dob || '———'} />
                  <DetailRow label="Address" value={`${data.address1 || '—'}, ${data.city || '—'}, ${data.state || '—'} ${data.zip || ''}`} />
                </div>
              </Card>
              <Card variant="outlined" padding="md">
                <CardHeader title="Federal withholding" action={<Button variant="ghost" size="sm" onClick={() => goTo(4)}>Edit</Button>} />
                <div style={{ marginTop: 12 }}>
                  <DetailRow label="Filing status" value={data.fedFilingStatus || '———'} />
                  <DetailRow label="Multiple jobs" value={data.fedMultipleJobs === 'yes' ? 'Yes' : 'No'} />
                  <DetailRow label="Dependents" value={`${data.fedDepsUnder17 || 0} under 17, ${data.fedDepsOther || 0} other`} />
                  <DetailRow label="Extra withholding" value={data.fedExtraWithholding ? `$${data.fedExtraWithholding}` : '$0'} />
                </div>
              </Card>
              <Card variant="outlined" padding="md">
                <CardHeader title="California withholding" action={<Button variant="ghost" size="sm" onClick={() => goTo(5)}>Edit</Button>} />
                <div style={{ marginTop: 12 }}>
                  <DetailRow label="Filing status" value={data.stateFilingStatus || '———'} />
                  <DetailRow label="Allowance" value={data.stateAllowance || '0'} />
                  <DetailRow label="Additional" value={data.stateAdditional ? `$${data.stateAdditional}` : '$0'} />
                </div>
              </Card>
              <Card variant="outlined" padding="md">
                <CardHeader title="Direct deposit" action={<Button variant="ghost" size="sm" onClick={() => goTo(6)}>Edit</Button>} />
                <div style={{ marginTop: 12 }}>
                  <DetailRow label="Method" value={data.bankMethod === 'plaid' ? 'Instant verification (Plaid)' : 'Manual entry'} />
                  {data.accountHolderName && <DetailRow label="Account holder" value={data.accountHolderName} />}
                  {data.routingNumber && <DetailRow label="Routing" value={`••••${data.routingNumber.slice(-4)}`} />}
                  {data.accountNumber && <DetailRow label="Account" value={`••••${data.accountNumber.slice(-4)}`} />}
                  {data.accountType && <DetailRow label="Type" value={data.accountType} />}
                </div>
              </Card>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <Button variant="secondary" size="lg" onClick={() => go(-1)}>Back</Button>
              <Button size="lg" fullWidth onClick={() => go(1)}>Submit</Button>
            </div>
          </>
        )}

        {current === 'done' && (
          <div style={{ paddingTop: 64, textAlign: 'center' }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%', margin: '0 auto 24px',
              background: 'var(--rf-color-success)', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <CheckCircleIcon size={32} weight="fill" />
            </div>
            <h1 style={{ font: 'var(--rf-text-display-md)', letterSpacing: 'var(--rf-tracking-tight)', margin: '0 0 12px', color: 'var(--rf-color-text)' }}>
              All done for now!
            </h1>
            <p style={{ font: 'var(--rf-text-body-md)', color: 'var(--rf-color-text-secondary)', margin: '0 auto 4px', maxWidth: 340 }}>
              We are verifying the submitted information.
            </p>
            <p style={{ font: 'var(--rf-text-body-sm)', color: 'var(--rf-color-text-tertiary)', margin: '0 auto 32px', maxWidth: 320 }}>
              Any additional information needed will appear in the tasks section on your dashboard.
            </p>
            <Button size="lg" onClick={() => { setStep(0); }}>Continue to dashboard →</Button>
          </div>
        )}
      </div>
    </div>
  );
}

interface CompanyTask { task: string; description: string; blocking?: boolean; }
interface CompanyAddOns { timeTracking: boolean; pto: boolean; }
interface PortalCompany {
  id: string;
  name: string;
  employees: number;
  plan: string;
  addOns: CompanyAddOns;
  status: string;
  mrr: number;
  daysUntilPayroll: number;
  hasFailedTx?: boolean;
  tasks: CompanyTask[];
  [key: string]: unknown;
}

const PORTAL_COMPANIES: PortalCompany[] = [
  {
    id: 'a1b2c3d4-0001', name: 'Acme Corp', employees: 124, plan: 'Pro', status: 'active', mrr: 2400, daysUntilPayroll: 4,
    addOns: { timeTracking: true, pto: true },
    tasks: [],
  },
  {
    id: 'a1b2c3d4-0002', name: 'Globex Inc', employees: 38, plan: 'Starter', status: 'payroll_ready', mrr: 600, daysUntilPayroll: 1,
    addOns: { timeTracking: false, pto: false },
    tasks: [
      { task: 'Form 8655 Signature request', description: 'Form 8655 allows us to file and pay taxes on your behalf.' },
      { task: 'Workers\' comp policy', description: 'Provide proof of workers\' compensation coverage.' },
    ],
  },
  {
    id: 'a1b2c3d4-0003', name: 'Initech Industries', employees: 412, plan: 'Enterprise', status: 'active', mrr: 12000, daysUntilPayroll: 12,
    addOns: { timeTracking: true, pto: false },
    tasks: [
      { task: 'Missing State tax information', description: 'Missing State Tax Registration Details for TX.' },
      { task: 'Workers\' comp policy', description: 'Provide proof of workers\' compensation coverage.' },
    ],
  },
  {
    id: 'a1b2c3d4-0004', name: 'Umbrella LLC', employees: 22, plan: 'Pro', status: 'action_required', mrr: 2400, daysUntilPayroll: -2,
    hasFailedTx: true,
    addOns: { timeTracking: false, pto: true },
    tasks: [
      { task: 'Bank verification', description: 'Verify routing and account numbers for direct deposit.', blocking: true },
      { task: 'EIN confirmation', description: 'Upload your IRS-issued EIN confirmation letter.' },
      { task: 'Missing State tax information', description: 'Missing State Tax Registration Details for CA.' },
    ],
  },
  {
    id: 'a1b2c3d4-0005', name: 'Stark Enterprises', employees: 86, plan: 'Pro', status: 'active', mrr: 2400, daysUntilPayroll: 7,
    addOns: { timeTracking: false, pto: false },
    tasks: [
      { task: 'Form 8655 Signature request', description: 'Form 8655 allows us to file and pay taxes on your behalf.' },
    ],
  },
  {
    id: 'a1b2c3d4-0006', name: 'WeWork', employees: 64, plan: 'Pro', status: 'payroll_ready', mrr: 2400, daysUntilPayroll: 0,
    addOns: { timeTracking: true, pto: true },
    tasks: [],
  },
];

// Task domain classification — for grouping in the Implementations card details
type TaskDomain = 'compliance' | 'banking' | 'payroll_config' | 'documents' | 'other';

const taskDomain = (name: string): TaskDomain => {
  const n = name.toLowerCase();
  if (n.includes('kyb') || n.includes('form') || n.includes('signature') || n.includes('registration') || n.includes('state tax') || n.includes('ein')) return 'compliance';
  if (n.includes('bank') || n.includes('account') || n.includes('check') || n.includes('deposit')) return 'banking';
  if (n.includes('wage') || n.includes('schedule') || n.includes('payroll') || n.includes('run')) return 'payroll_config';
  if (n.includes('i-9') || n.includes('w-4') || n.includes('document') || n.includes('workers')) return 'documents';
  return 'other';
};

const DOMAIN_LABELS: Record<TaskDomain, { label: string; variant: 'danger' | 'orange' | 'teal' | 'purple' | 'neutral' }> = {
  compliance: { label: 'Compliance & KYB', variant: 'danger' },
  banking: { label: 'Banking setup', variant: 'orange' },
  payroll_config: { label: 'Payroll config', variant: 'teal' },
  documents: { label: 'Documents', variant: 'purple' },
  other: { label: 'Other', variant: 'neutral' },
};

// ─── Payroll history mocks ──────────────────────────────────────────────
interface PayrollImport {
  id: string;
  company: string;
  period: string;
  employeeCount: number;
  recordCount: number;
  source: string;
  importedAt: string; // ISO
  importedBy: string;
  status: 'completed' | 'completed_with_warnings' | 'processing' | 'failed';
  warningCount?: number;
}

interface ExistingPayroll {
  priorProviderPayrollThisYear: boolean;
  firstRollfiPaycheck: string | null;
  paychecksOnRollfi: number;
}

const MOCK_IMPORTS: PayrollImport[] = [
  { id: 'imp_001', company: 'WeWork', period: '2026-01-01 → 2026-04-30', employeeCount: 41, recordCount: 312, source: 'Gusto CSV', importedAt: '2026-04-29T14:22:00Z', importedBy: 'Pam Beesly', status: 'completed' },
  { id: 'imp_002', company: 'Pets.com', period: '2026-01-01 → 2026-03-31', employeeCount: 17, recordCount: 102, source: 'ADP CSV', importedAt: '2026-04-12T09:14:00Z', importedBy: 'Jim Halpert', status: 'completed' },
  { id: 'imp_003', company: 'Juicero', period: '2026-01-01 → 2026-03-31', employeeCount: 28, recordCount: 168, source: 'Paychex CSV', importedAt: '2026-04-08T16:48:00Z', importedBy: 'Dwight Schrute', status: 'completed_with_warnings', warningCount: 3 },
];

const MOCK_EXISTING_PAYROLL: Record<string, ExistingPayroll> = {
  'WeWork':            { priorProviderPayrollThisYear: true,  firstRollfiPaycheck: '2026-04-15', paychecksOnRollfi: 2 },
  'Theranos':          { priorProviderPayrollThisYear: false, firstRollfiPaycheck: '2026-03-01', paychecksOnRollfi: 4 },
  'Quibi':             { priorProviderPayrollThisYear: true,  firstRollfiPaycheck: '2026-05-15', paychecksOnRollfi: 0 },
  'Pets.com':          { priorProviderPayrollThisYear: true,  firstRollfiPaycheck: '2026-05-01', paychecksOnRollfi: 0 },
  'Juicero':           { priorProviderPayrollThisYear: true,  firstRollfiPaycheck: null,         paychecksOnRollfi: 0 },
  'FTX':               { priorProviderPayrollThisYear: false, firstRollfiPaycheck: null,         paychecksOnRollfi: 0 },
  'Solyndra':          { priorProviderPayrollThisYear: true,  firstRollfiPaycheck: '2026-03-15', paychecksOnRollfi: 3 },
};

function fmtIsoDate(iso: string | null): string {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[m - 1]} ${d}, ${y}`;
}

function fmtIsoDateTime(iso: string): string {
  const d = new Date(iso);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const hr = d.getHours();
  const min = String(d.getMinutes()).padStart(2, '0');
  const ampm = hr >= 12 ? 'PM' : 'AM';
  const hr12 = hr % 12 || 12;
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} · ${hr12}:${min} ${ampm}`;
}

// ─── Bank account mocks ────────────────────────────────────────────────
interface BankAccount {
  id: string;
  companyId: string;
  bankName: string;
  accountName: string;
  accountType: 'checking' | 'savings';
  accountNumber: string;
  routingNumber: string;
  status: 'active' | 'pending_verification' | 'inactive';
  method: 'plaid' | 'manual';
  addedOn: string;
  microDepositsSentOn?: string;
}

const MOCK_BANK_ACCOUNTS: Record<string, BankAccount[]> = {
  'a1b2c3d4-0001': [
    { id: 'ba-ac-001', companyId: 'a1b2c3d4-0001', bankName: 'Silicon Valley Bank', accountName: 'Primary payroll', accountType: 'checking', accountNumber: '••• 4491', routingNumber: '••• 8901', status: 'active', method: 'plaid', addedOn: '2026-01-14' },
  ],
  'a1b2c3d4-0002': [
    { id: 'ba-gb-001', companyId: 'a1b2c3d4-0002', bankName: 'Chase Bank', accountName: 'Operating account', accountType: 'checking', accountNumber: '••• 7723', routingNumber: '••• 0021', status: 'pending_verification', method: 'manual', addedOn: '2026-04-28', microDepositsSentOn: '2026-04-29' },
  ],
  'a1b2c3d4-0003': [
    { id: 'ba-in-001', companyId: 'a1b2c3d4-0003', bankName: 'Bank of America', accountName: 'Payroll funding', accountType: 'checking', accountNumber: '••• 9910', routingNumber: '••• 3456', status: 'active', method: 'plaid', addedOn: '2026-02-01' },
    { id: 'ba-in-002', companyId: 'a1b2c3d4-0003', bankName: 'Citibank', accountName: 'Backup account', accountType: 'savings', accountNumber: '••• 1234', routingNumber: '••• 7890', status: 'inactive', method: 'manual', addedOn: '2025-11-10' },
  ],
  'a1b2c3d4-0004': [],
  'a1b2c3d4-0005': [
    { id: 'ba-st-001', companyId: 'a1b2c3d4-0005', bankName: 'First Republic', accountName: 'Main account', accountType: 'checking', accountNumber: '••• 5566', routingNumber: '••• 1122', status: 'active', method: 'manual', addedOn: '2026-03-15' },
  ],
  'a1b2c3d4-0006': [
    { id: 'ba-ww-001', companyId: 'a1b2c3d4-0006', bankName: 'Mercury', accountName: 'Operating', accountType: 'checking', accountNumber: '••• 2200', routingNumber: '••• 4400', status: 'active', method: 'plaid', addedOn: '2026-01-20' },
  ],
};

interface EmployeeDirectDeposit {
  userId: string;
  name: string;
  jobTitle: string;
  email: string;
  paymentMethod: 'Direct Deposit' | 'Check';
  linkStatus: 'linked' | 'pending' | 'not_linked';
  linkedAccountNumber?: string;
  linkType?: 'plaid' | 'manual';
  inviteExpiresAt?: string;
}

const MOCK_EMPLOYEE_DDS: Record<string, EmployeeDirectDeposit[]> = {
  'a1b2c3d4-0001': [
    { userId: 'e1', name: 'Pam Beesly', jobTitle: 'Receptionist', email: 'pam@acme.com', paymentMethod: 'Direct Deposit', linkStatus: 'linked', linkedAccountNumber: '••• 4521', linkType: 'plaid' },
    { userId: 'e2', name: 'Jim Halpert', jobTitle: 'Sales', email: 'jim@acme.com', paymentMethod: 'Direct Deposit', linkStatus: 'pending', inviteExpiresAt: '2026-05-20' },
    { userId: 'e3', name: 'Dwight Schrute', jobTitle: 'Asst. to the RM', email: 'dwight@acme.com', paymentMethod: 'Direct Deposit', linkStatus: 'not_linked' },
    { userId: 'e4', name: 'Stanley Hudson', jobTitle: 'Sales', email: 'stanley@acme.com', paymentMethod: 'Check', linkStatus: 'not_linked' },
  ],
  'a1b2c3d4-0002': [
    { userId: 'g1', name: 'Mia Thompson', jobTitle: 'Operations Lead', email: 'mia@globex.com', paymentMethod: 'Direct Deposit', linkStatus: 'linked', linkedAccountNumber: '••• 7791', linkType: 'manual' },
    { userId: 'g2', name: 'Alex Park', jobTitle: 'Designer', email: 'alex@globex.com', paymentMethod: 'Direct Deposit', linkStatus: 'not_linked' },
  ],
};

// ─── Payroll Activity mocks ────────────────────────────────────────────
type PayPeriodType = 'Regular' | 'Off-Cycle' | 'Missing' | 'Dismissal';
type TxStatus = 'processed' | 'inProcess' | 'submitted' | 'failed' | 'returned' | 'cancelled';
type LinkType = 'Plaid' | 'Manual' | 'CustomProvider';

interface PayPeriod {
  payPeriodId: string;
  payDate: string;
  payBeginDate: string;
  payEndDate: string;
  payPeriodType: PayPeriodType;
}

interface PayrollTransaction {
  requestReferenceId: string;
  transactionName: 'AchDebit' | 'AchCredit' | 'Check';
  source: 'EmployerBankAccount' | 'RollfiClearing';
  destination: 'EmployeeBankAccount' | 'CheckPayment' | 'TaxAgency';
  sourceAccount?: string;
  destinationAccount?: string;
  transferAmount: number;
  status: TxStatus;
  employeeName?: string;
  linkType?: LinkType;
}

interface CashRequirementsReport {
  totalElectronicFundsTransfer: number;
  totalDirectDeposits: number;
  cashRequiredForCheckPayments: number;
  garnishments: number;
}

interface PeriodData {
  payrollTransaction: PayrollTransaction[];
  cashRequirementsReport: CashRequirementsReport;
}

interface PayStubLine { label: string; current: number; ytd?: number; }
interface PayStub {
  userId: string;
  employeeName: string;
  jobTitle: string;
  payPeriod: string;
  paymentMethod: 'Direct Deposit' | 'Check';
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  earnings: PayStubLine[];
  deductions: PayStubLine[];
  taxes: PayStubLine[];
  grossTotal: number;
  netTotal: number;
  ytdGrossTotal: number;
}

const MOCK_PAY_PERIODS: Record<string, PayPeriod[]> = {
  'a1b2c3d4-0001': [
    { payPeriodId: 'pp-acme-3', payDate: '2026-04-30', payBeginDate: '2026-04-16', payEndDate: '2026-04-30', payPeriodType: 'Regular' },
    { payPeriodId: 'pp-acme-2', payDate: '2026-04-15', payBeginDate: '2026-04-01', payEndDate: '2026-04-15', payPeriodType: 'Regular' },
    { payPeriodId: 'pp-acme-1', payDate: '2026-03-31', payBeginDate: '2026-03-16', payEndDate: '2026-03-31', payPeriodType: 'Regular' },
    { payPeriodId: 'pp-acme-oc', payDate: '2026-04-10', payBeginDate: '2026-04-10', payEndDate: '2026-04-10', payPeriodType: 'Off-Cycle' },
  ],
  'a1b2c3d4-0002': [
    { payPeriodId: 'pp-gbx-1', payDate: '2026-04-30', payBeginDate: '2026-04-01', payEndDate: '2026-04-30', payPeriodType: 'Regular' },
  ],
  'a1b2c3d4-0003': [
    { payPeriodId: 'pp-init-1', payDate: '2026-04-30', payBeginDate: '2026-04-16', payEndDate: '2026-04-30', payPeriodType: 'Regular' },
  ],
};

const MOCK_PERIOD_DATA: Record<string, PeriodData> = {
  'pp-acme-2': {
    payrollTransaction: [
      { requestReferenceId: 'RF-29481', transactionName: 'AchDebit', source: 'EmployerBankAccount', destination: 'TaxAgency', sourceAccount: '4491', transferAmount: 12640.50, status: 'processed' },
      { requestReferenceId: 'RF-29482', transactionName: 'AchCredit', source: 'RollfiClearing', destination: 'EmployeeBankAccount', destinationAccount: '4521', transferAmount: 2450.00, status: 'processed', employeeName: 'Pam Beesly', linkType: 'Plaid' },
      { requestReferenceId: 'RF-29483', transactionName: 'AchCredit', source: 'RollfiClearing', destination: 'EmployeeBankAccount', destinationAccount: '7782', transferAmount: 2860.00, status: 'processed', employeeName: 'Jim Halpert', linkType: 'Plaid' },
      { requestReferenceId: 'RF-29484', transactionName: 'Check', source: 'RollfiClearing', destination: 'CheckPayment', transferAmount: 3120.00, status: 'inProcess', employeeName: 'Dwight Schrute' },
      { requestReferenceId: 'RF-29485', transactionName: 'AchCredit', source: 'RollfiClearing', destination: 'EmployeeBankAccount', destinationAccount: '1199', transferAmount: 2940.00, status: 'failed', employeeName: 'Stanley Hudson', linkType: 'Manual' },
    ],
    cashRequirementsReport: {
      totalElectronicFundsTransfer: 12640.50,
      totalDirectDeposits: 8250.00,
      cashRequiredForCheckPayments: 3120.00,
      garnishments: 1270.50,
    },
  },
  'pp-acme-3': {
    payrollTransaction: [
      { requestReferenceId: 'RF-29501', transactionName: 'AchDebit', source: 'EmployerBankAccount', destination: 'TaxAgency', sourceAccount: '4491', transferAmount: 13420.00, status: 'inProcess' },
      { requestReferenceId: 'RF-29502', transactionName: 'AchCredit', source: 'RollfiClearing', destination: 'EmployeeBankAccount', destinationAccount: '4521', transferAmount: 2450.00, status: 'submitted', employeeName: 'Pam Beesly', linkType: 'Plaid' },
      { requestReferenceId: 'RF-29503', transactionName: 'AchCredit', source: 'RollfiClearing', destination: 'EmployeeBankAccount', destinationAccount: '7782', transferAmount: 2860.00, status: 'submitted', employeeName: 'Jim Halpert', linkType: 'Plaid' },
    ],
    cashRequirementsReport: {
      totalElectronicFundsTransfer: 13420.00,
      totalDirectDeposits: 5310.00,
      cashRequiredForCheckPayments: 0,
      garnishments: 0,
    },
  },
};

const MOCK_PAY_STUBS: Record<string, PayStub[]> = {
  'pp-acme-2': [
    {
      userId: 'e1', employeeName: 'Pam Beesly', jobTitle: 'Receptionist', payPeriod: 'Apr 1 – Apr 15, 2026',
      paymentMethod: 'Direct Deposit', paymentStatus: 'Paid',
      earnings: [
        { label: 'Regular pay', current: 2800.00, ytd: 16800.00 },
        { label: 'Bonus', current: 250.00, ytd: 500.00 },
      ],
      deductions: [{ label: 'Medical premium', current: 142.00, ytd: 852.00 }],
      taxes: [
        { label: 'Federal income tax', current: 312.50, ytd: 1875.00 },
        { label: 'State income tax (NY)', current: 145.50, ytd: 873.00 },
      ],
      grossTotal: 3050.00, netTotal: 2450.00, ytdGrossTotal: 17300.00,
    },
    {
      userId: 'e2', employeeName: 'Jim Halpert', jobTitle: 'Sales', payPeriod: 'Apr 1 – Apr 15, 2026',
      paymentMethod: 'Direct Deposit', paymentStatus: 'Paid',
      earnings: [{ label: 'Regular pay', current: 3500.00, ytd: 21000.00 }],
      deductions: [{ label: 'Medical premium', current: 142.00, ytd: 852.00 }],
      taxes: [
        { label: 'Federal income tax', current: 358.00, ytd: 2148.00 },
        { label: 'State income tax (NY)', current: 140.00, ytd: 840.00 },
      ],
      grossTotal: 3500.00, netTotal: 2860.00, ytdGrossTotal: 21000.00,
    },
    {
      userId: 'e3', employeeName: 'Dwight Schrute', jobTitle: 'Asst. to the RM', payPeriod: 'Apr 1 – Apr 15, 2026',
      paymentMethod: 'Check', paymentStatus: 'Pending',
      earnings: [{ label: 'Regular pay', current: 3700.00, ytd: 22200.00 }],
      deductions: [],
      taxes: [
        { label: 'Federal income tax', current: 425.00, ytd: 2550.00 },
        { label: 'State income tax (NY)', current: 155.00, ytd: 930.00 },
      ],
      grossTotal: 3700.00, netTotal: 3120.00, ytdGrossTotal: 22200.00,
    },
    {
      userId: 'e4', employeeName: 'Stanley Hudson', jobTitle: 'Sales', payPeriod: 'Apr 1 – Apr 15, 2026',
      paymentMethod: 'Direct Deposit', paymentStatus: 'Failed',
      earnings: [{ label: 'Regular pay', current: 3600.00, ytd: 21600.00 }],
      deductions: [{ label: 'Medical premium', current: 142.00, ytd: 852.00 }],
      taxes: [
        { label: 'Federal income tax', current: 368.00, ytd: 2208.00 },
        { label: 'State income tax (NY)', current: 150.00, ytd: 900.00 },
      ],
      grossTotal: 3600.00, netTotal: 2940.00, ytdGrossTotal: 21600.00,
    },
  ],
};

// ─── Tax filings mocks ─────────────────────────────────────────────────
type DocCategory = 'Quarterly filings' | 'Annual filings' | 'Employee tax forms' | 'Contractor forms';

interface TaxDoc {
  documentId: string;
  documentType: string;
  fileName: string;
  description: string;
  category: DocCategory;
  period: string;
  generatedOn: string | null;
  status: 'available' | 'pending';
}

const TAX_CATEGORY_ORDER: DocCategory[] = ['Quarterly filings', 'Annual filings', 'Employee tax forms', 'Contractor forms'];
const TAX_CATEGORY_BADGE: Record<DocCategory, 'teal' | 'info' | 'purple' | 'orange'> = {
  'Quarterly filings': 'teal',
  'Annual filings': 'info',
  'Employee tax forms': 'purple',
  'Contractor forms': 'orange',
};

const MOCK_TAX_DOCS: Record<string, TaxDoc[]> = {
  'a1b2c3d4-0001': [
    { documentId: 'd1', documentType: '941', fileName: 'Form 941 Q1 2026.pdf', description: 'Quarterly federal payroll tax return', category: 'Quarterly filings', period: 'Q1 2026', generatedOn: '2026-04-15', status: 'available' },
    { documentId: 'd2', documentType: '940', fileName: 'Form 940 2025.pdf', description: 'Annual federal unemployment tax', category: 'Annual filings', period: '2025', generatedOn: '2026-01-31', status: 'available' },
    { documentId: 'd3', documentType: 'W-2', fileName: 'W-2 batch 2025.zip', description: 'Employee wage and tax statements', category: 'Employee tax forms', period: '2025', generatedOn: '2026-01-31', status: 'available' },
    { documentId: 'd4', documentType: 'NY State Quarterly', fileName: 'NY-45 Q1 2026.pdf', description: 'New York state quarterly return', category: 'Quarterly filings', period: 'Q1 2026', generatedOn: '2026-04-30', status: 'available' },
    { documentId: 'd5', documentType: '1099-NEC', fileName: '1099-NEC 2025.zip', description: 'Contractor non-employee compensation', category: 'Contractor forms', period: '2025', generatedOn: '2026-01-31', status: 'available' },
    { documentId: 'd6', documentType: '941', fileName: 'Form 941 Q2 2026.pdf', description: 'Quarterly federal payroll tax return', category: 'Quarterly filings', period: 'Q2 2026', generatedOn: null, status: 'pending' },
  ],
  'a1b2c3d4-0002': [
    { documentId: 'd7', documentType: '941', fileName: 'Form 941 Q1 2026.pdf', description: 'Quarterly federal payroll tax return', category: 'Quarterly filings', period: 'Q1 2026', generatedOn: '2026-04-15', status: 'available' },
  ],
};

// ─── Billing mocks ─────────────────────────────────────────────────────
interface BillingRow {
  companyId: string;
  company: string;
  zenithCompanyId: string;
  totalActiveUsers: number;
  totalPaidUsers: number;
  W2Filings: number;
  k1099Filings: number;
  quarterlyTaxPackage: number;
  achReturns: number;
  oneDayPayrollEnabled: boolean;
  EINs: number;
  bankMethod: 'plaid' | 'manual';
  [key: string]: unknown;
}

const MOCK_BILLING: BillingRow[] = [
  { companyId: 'a1b2c3d4-0001', company: 'Acme Corp',          zenithCompanyId: 'ZN-29481', totalActiveUsers: 124, totalPaidUsers: 119, W2Filings: 110, k1099Filings: 9,  quarterlyTaxPackage: 1, achReturns: 0, oneDayPayrollEnabled: true,  EINs: 1, bankMethod: 'plaid' },
  { companyId: 'a1b2c3d4-0002', company: 'Globex Inc',         zenithCompanyId: 'ZN-29482', totalActiveUsers: 38,  totalPaidUsers: 36,  W2Filings: 34,  k1099Filings: 2,  quarterlyTaxPackage: 1, achReturns: 1, oneDayPayrollEnabled: false, EINs: 1, bankMethod: 'manual' },
  { companyId: 'a1b2c3d4-0003', company: 'Initech Industries', zenithCompanyId: 'ZN-29483', totalActiveUsers: 412, totalPaidUsers: 401, W2Filings: 388, k1099Filings: 13, quarterlyTaxPackage: 2, achReturns: 0, oneDayPayrollEnabled: true,  EINs: 2, bankMethod: 'plaid' },
  { companyId: 'a1b2c3d4-0004', company: 'Umbrella LLC',       zenithCompanyId: 'ZN-29484', totalActiveUsers: 22,  totalPaidUsers: 20,  W2Filings: 18,  k1099Filings: 2,  quarterlyTaxPackage: 1, achReturns: 3, oneDayPayrollEnabled: false, EINs: 1, bankMethod: 'plaid' },
  { companyId: 'a1b2c3d4-0005', company: 'Stark Enterprises',  zenithCompanyId: 'ZN-29485', totalActiveUsers: 86,  totalPaidUsers: 84,  W2Filings: 80,  k1099Filings: 4,  quarterlyTaxPackage: 1, achReturns: 0, oneDayPayrollEnabled: false, EINs: 1, bankMethod: 'manual' },
  { companyId: 'a1b2c3d4-0006', company: 'WeWork',             zenithCompanyId: 'ZN-29486', totalActiveUsers: 64,  totalPaidUsers: 60,  W2Filings: 56,  k1099Filings: 4,  quarterlyTaxPackage: 1, achReturns: 0, oneDayPayrollEnabled: true,  EINs: 1, bankMethod: 'plaid' },
];

const BILLING_MONTHS = [
  { key: '2026-05', label: 'May 2026',   startDate: '2026-05-01', endDate: '2026-05-31', current: true  },
  { key: '2026-04', label: 'April 2026', startDate: '2026-04-01', endDate: '2026-04-30', current: false },
  { key: '2026-03', label: 'March 2026', startDate: '2026-03-01', endDate: '2026-03-31', current: false },
  { key: '2026-02', label: 'February 2026', startDate: '2026-02-01', endDate: '2026-02-28', current: false },
];

interface PricingRate { type: 'flat' | 'tiered'; value: number; }
const DEFAULT_PRICING: Record<string, PricingRate> = {
  perActiveEmployee:        { type: 'flat', value: 6.00 },
  perEinMonthly:            { type: 'flat', value: 8.00 },
  perQuarterlyPackage:      { type: 'flat', value: 50.00 },
  oneDayPayrollMonthly:     { type: 'flat', value: 25.00 },
  timeTrackingPerEmployee:  { type: 'flat', value: 4.00 },
  ptoPerEin:                { type: 'flat', value: 10.00 },
  ptoPerEmployee:           { type: 'flat', value: 2.00 },
};
const DEFAULT_FEES = {
  newCompanyOnboarding: 250.00,
  expeditedFiling: 75.00,
  manualCorrection: 50.00,
};

const RATE_FIELDS = [
  { key: 'perActiveEmployee',     label: 'Per active employee',     helper: 'Charged monthly per employee with an active payroll profile' },
  { key: 'perEinMonthly',         label: 'Per EIN, monthly',        helper: 'Charged monthly for each tax-filing EIN' },
  { key: 'perQuarterlyPackage',   label: 'Per quarterly package',   helper: 'Quarterly tax filing package fee' },
  { key: 'oneDayPayrollMonthly',  label: '1-Day Payroll subscription', helper: 'Monthly add-on for guaranteed same-day payroll' },
];

interface PayoutAccount {
  bankName: string;
  accountName: string;
  accountType: 'checking' | 'savings';
  accountNumber: string;
  method: 'plaid' | 'manual';
  status: 'active' | 'pending_verification';
  addedOn: string;
  microDepositsSentOn?: string;
}

const MOCK_PAYOUT_ACCOUNT: PayoutAccount = {
  bankName: 'JPMorgan Chase',
  accountName: 'Rollfi Partner Revenue',
  accountType: 'checking',
  accountNumber: '••• 9920',
  method: 'plaid',
  status: 'active',
  addedOn: '2025-09-15',
};

// Onboarding readiness derived from tasks
const companyReadiness = (tasks: CompanyTask[]): 'complete' | 'payroll_ready' | 'action_required' => {
  if (!tasks || tasks.length === 0) return 'complete';
  if (tasks.some(t => t.blocking)) return 'action_required';
  return 'payroll_ready';
};
const readinessLabel = (r: string) =>
  r === 'complete' ? 'Complete' : r === 'payroll_ready' ? 'Payroll ready' : 'Action required';
const readinessBadgeVariant = (r: string) =>
  r === 'complete' ? 'success' : r === 'payroll_ready' ? 'teal' : 'danger';

// Relative deadline formatter ("Past due" / "Due today" / "X days") with semantic color
function deadlineDisplay(days: number) {
  const isPast = days < 0;
  const isSoon = days >= 0 && days <= 3;
  const danger = isPast || isSoon;
  const label = isPast ? 'Past due' : days === 0 ? 'Due today' : `${days} ${days === 1 ? 'day' : 'days'}`;
  return { label, danger };
}

function ClientSelectorCard({ client, onClear }: { client: string; onClear: () => void }) {
  return (
    <StatCard label="Select client">
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '9px 12px',
        border: '1px solid var(--rf-color-border)',
        borderRadius: 'var(--rf-radius-sm)',
        background: 'var(--rf-color-surface)',
      }}>
        <span style={{ flex: 1, font: 'var(--rf-text-body-sm-strong)' }}>
          {client || <span style={{ color: 'var(--rf-color-text-tertiary)', fontWeight: 400 }}>Select a client…</span>}
        </span>
        {client && (
          <button
            type="button"
            onClick={onClear}
            style={{ background: 'transparent', border: 'none', color: 'var(--rf-color-text-tertiary)', cursor: 'pointer', display: 'flex', padding: 2 }}
            aria-label="Clear client"
          >
            <X size={12} />
          </button>
        )}
      </div>
    </StatCard>
  );
}

function DashboardView() {
  const { toast } = useToast();
  const [client, setClient] = useState('Rollfi');
  const [search, setSearch] = useState('');

  const filtered = PORTAL_COMPANIES.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  const failedCompanies = PORTAL_COMPANIES.filter(c => c.hasFailedTx).map(c => c.name);

  return (
    <>
      <PageHeader
        title="Welcome"
        subtitle="michael.scott@rollfi.xyz"
        action={<Button variant="secondary" size="sm" icon={<Plus size={14} />}>Add new company</Button>}
      />

      {failedCompanies.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <Banner
            variant="danger"
            icon={<Warning size={18} weight="fill" />}
            action={<Button variant="danger" size="sm" onClick={() => toast('Opening activity')}>View activity</Button>}
          >
            <div style={{ font: 'var(--rf-text-body-sm-strong)' }}>Transaction failures require attention</div>
            <div>
              {failedCompanies.length === 1
                ? `${failedCompanies[0]} has a failed payroll transaction.`
                : `${failedCompanies.join(', ')} have failed payroll transactions.`}
              {' '}Open Payroll activity to investigate and resolve.
            </div>
          </Banner>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        <ClientSelectorCard client={client} onClear={() => setClient('')} />
        <StatCard label="Number of companies" value="725" />
        <StatCard label="Number of active people" value="782" />
      </div>

      <Card variant="outlined" padding="none">
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--rf-color-border)' }}>
          <div style={{ maxWidth: 320 }}>
            <Input
              icon={<MagnifyingGlass size={14} />}
              placeholder="Search companies"
              inputSize="sm"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        <Table
          columns={[
            { key: 'name', header: 'Company', sortable: true, render: row => (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Avatar name={row.name as string} size="sm" />
                <span style={{ font: 'var(--rf-text-body-sm-strong)' }}>{row.name as string}</span>
                {row.hasFailedTx ? (
                  <Badge variant="danger" icon={<Warning size={9} weight="fill" />}>Failed tx</Badge>
                ) : null}
              </div>
            ) },
            { key: 'readiness', header: 'Onboarding status', sortable: true, sortValue: row => companyReadiness(row.tasks as CompanyTask[]), render: row => {
              const r = companyReadiness(row.tasks as CompanyTask[]);
              return <Badge variant={readinessBadgeVariant(r)}>{readinessLabel(r)}</Badge>;
            } },
            { key: 'daysUntilPayroll', header: 'Days till payroll deadline', sortable: true, render: row => {
              const d = row.daysUntilPayroll as number;
              const { label, danger } = deadlineDisplay(d);
              return <span style={{ font: 'var(--rf-text-body-sm-strong)', color: danger ? 'var(--rf-color-danger-text)' : 'var(--rf-color-text)' }}>{label}</span>;
            } },
            { key: 'tasks', header: 'Tasks', align: 'right', sortable: true, sortValue: row => (row.tasks as CompanyTask[]).length, render: row => {
              const count = (row.tasks as CompanyTask[]).length;
              const r = companyReadiness(row.tasks as CompanyTask[]);
              return <Badge variant={readinessBadgeVariant(r)}>{count}</Badge>;
            } },
          ]}
          data={filtered}
          rowKey={r => r.id as string}
          emptyMessage="No companies match your search."
          expandable={row => {
            const tasks = row.tasks as CompanyTask[];
            return (
              <div style={{ padding: '16px 24px 20px' }}>
                <Card variant="default" padding="md">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <CheckCircle size={14} weight="fill" style={{ color: 'var(--rf-color-danger)' }} />
                    <span style={{ font: 'var(--rf-text-body-sm-strong)' }}>Tasks for {row.name as string}</span>
                  </div>
                  {tasks.length === 0 ? (
                    <div style={{ padding: '14px 0', font: 'var(--rf-text-body-sm)', color: 'var(--rf-color-text-secondary)' }}>
                      All tasks are complete — this company is fully onboarded.
                    </div>
                  ) : tasks.map((t, i) => (
                    <div key={i} style={{
                      display: 'flex', gap: 12, alignItems: 'flex-start',
                      padding: '14px 0',
                      borderTop: i === 0 ? 'none' : '1px solid var(--rf-color-border-subtle)',
                    }}>
                      <IconTile variant="danger" size="md"><Clock size={16} /></IconTile>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ font: 'var(--rf-text-body-sm-strong)', marginBottom: 2 }}>{t.task}</div>
                        <div style={{ font: 'var(--rf-text-body-sm)', color: 'var(--rf-color-text-secondary)', lineHeight: 1.55 }}>{t.description}</div>
                      </div>
                    </div>
                  ))}
                </Card>
              </div>
            );
          }}
        />
      </Card>
    </>
  );
}

function ReadinessKpiCard({ label, count, variant }: { label: string; count: number; variant: 'danger' | 'teal' | 'success' }) {
  const color = variant === 'danger' ? 'var(--rf-color-danger-text)'
    : variant === 'teal' ? 'var(--rf-color-accent-teal-text)'
    : 'var(--rf-color-success-text)';
  return (
    <StatCard label={label} value={<span style={{ color }}>{count}</span>} />
  );
}

function CompanyReadinessCard({ company }: { company: PortalCompany }) {
  const [expanded, setExpanded] = useState(false);
  const [addOns, setAddOns] = useState(company.addOns);
  const readiness = companyReadiness(company.tasks);
  const taskCount = company.tasks.length;

  const domainGroups = company.tasks.reduce<Record<TaskDomain, CompanyTask[]>>((acc, t) => {
    const d = taskDomain(t.task);
    (acc[d] ||= []).push(t);
    return acc;
  }, {} as Record<TaskDomain, CompanyTask[]>);

  return (
    <Card variant="default" padding="md">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, gap: 12 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ font: 'var(--rf-text-body-md-strong)', color: 'var(--rf-color-text)' }}>{company.name}</div>
          <div style={{ font: 'var(--rf-text-caption-sm)', color: 'var(--rf-color-text-tertiary)', fontFamily: 'var(--rf-font-mono)' }}>
            {company.id.slice(0, 13)}…
          </div>
        </div>
        <Badge variant={readinessBadgeVariant(readiness)}>{taskCount} {taskCount === 1 ? 'task' : 'tasks'}</Badge>
      </div>

      {taskCount > 0 && (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 12 }}>
            {company.tasks.map((t, i) => (
              <div key={i} style={{ font: 'var(--rf-text-body-sm)', color: 'var(--rf-color-text-secondary)', lineHeight: 1.5 }}>
                {t.blocking && (
                  <span style={{
                    font: 'var(--rf-text-caption-sm)',
                    fontWeight: 700,
                    color: 'var(--rf-color-danger-text)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginRight: 6,
                  }}>
                    ⚠ Blocks payroll
                  </span>
                )}
                {t.task}
              </div>
            ))}
          </div>

          <Button variant="secondary" size="sm" fullWidth onClick={() => setExpanded(!expanded)}>
            {expanded ? 'Hide details' : 'View details'}
          </Button>

          {expanded && (
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--rf-color-border-subtle)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {Object.entries(domainGroups).map(([d, tasks]) => {
                const cfg = DOMAIN_LABELS[d as TaskDomain];
                return (
                  <div key={d}>
                    <Badge variant={cfg.variant}>{cfg.label}</Badge>
                    <div style={{ font: 'var(--rf-text-caption)', color: 'var(--rf-color-text-secondary)', marginTop: 4 }}>
                      {tasks.length} {tasks.length === 1 ? 'item' : 'items'}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--rf-color-border-subtle)' }}>
        <div style={{ font: 'var(--rf-text-caption-sm)', fontWeight: 700, color: 'var(--rf-color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
          Add-ons
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <SettingsRow
            title="Time Tracking"
            description="Per employee / mo"
            active={addOns.timeTracking}
            control={<Switch checked={addOns.timeTracking} onChange={v => setAddOns({ ...addOns, timeTracking: v })} />}
          />
          <SettingsRow
            title="PTO"
            description="Per EIN + per employee / mo"
            active={addOns.pto}
            control={<Switch checked={addOns.pto} onChange={v => setAddOns({ ...addOns, pto: v })} />}
          />
        </div>
      </div>
    </Card>
  );
}

const READINESS_SECTIONS: { key: ReturnType<typeof companyReadiness>; label: string; description: string; icon: ReactNode; variant: 'danger' | 'teal' | 'success' }[] = [
  { key: 'action_required', label: 'Action required', description: 'KYB/KYC or bank account not yet cleared. Cannot run payroll until resolved.', icon: <Warning size={18} weight="fill" />, variant: 'danger' },
  { key: 'payroll_ready', label: 'Payroll ready', description: 'KYB/KYC passed and bank account linked. Can run payroll. Remaining tasks needed for full onboarding.', icon: <CheckCircle size={18} weight="fill" />, variant: 'teal' },
  { key: 'complete', label: 'Complete', description: 'All onboarding tasks done. Fully onboarded.', icon: <CheckCircle size={18} weight="fill" />, variant: 'success' },
];

function ReadinessTab() {
  const groups = {
    action_required: PORTAL_COMPANIES.filter(c => companyReadiness(c.tasks) === 'action_required'),
    payroll_ready:   PORTAL_COMPANIES.filter(c => companyReadiness(c.tasks) === 'payroll_ready'),
    complete:        PORTAL_COMPANIES.filter(c => companyReadiness(c.tasks) === 'complete'),
  };

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        <ReadinessKpiCard label="Action required" count={groups.action_required.length} variant="danger" />
        <ReadinessKpiCard label="Payroll ready" count={groups.payroll_ready.length} variant="teal" />
        <ReadinessKpiCard label="Complete" count={groups.complete.length} variant="success" />
      </div>

      {READINESS_SECTIONS.map(section => {
        const companies = groups[section.key];
        if (companies.length === 0) return null;
        const color = section.variant === 'danger' ? 'var(--rf-color-danger-text)'
          : section.variant === 'teal' ? 'var(--rf-color-accent-teal-text)'
          : 'var(--rf-color-success-text)';
        return (
          <div key={section.key} style={{ marginBottom: 24 }}>
            <div style={{
              display: 'flex', alignItems: 'baseline', gap: 8,
              marginBottom: 12,
              paddingBottom: 8,
              borderBottom: '2px solid var(--rf-color-border)',
            }}>
              <span style={{ color, display: 'inline-flex', alignSelf: 'center' }}>{section.icon}</span>
              <span style={{ font: 'var(--rf-text-heading-sm)', color: 'var(--rf-color-text)' }}>{section.label}</span>
              <span style={{ font: 'var(--rf-text-caption)', color: 'var(--rf-color-text-secondary)', flex: 1, lineHeight: 1.4 }}>{section.description}</span>
              <span style={{ font: 'var(--rf-text-body-sm-strong)', color: 'var(--rf-color-text-secondary)', flexShrink: 0 }}>
                {companies.length} {companies.length === 1 ? 'company' : 'companies'}
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 12 }}>
              {companies.map(c => <CompanyReadinessCard key={c.id} company={c} />)}
            </div>
          </div>
        );
      })}
    </>
  );
}

// ─── Payroll history derived rows ───
interface PayrollHistoryRow {
  id: string;
  name: string;
  priorPayroll: boolean;
  firstRollfiPaycheck: string | null;
  paychecksOnRollfi: number;
  imports: PayrollImport[];
  successfulImport?: PayrollImport;
  hasMigrated: boolean;
  needsImport: boolean;
  atRisk: boolean;
  status: 'migrated' | 'needs_import' | 'at_risk' | 'not_required';
  [key: string]: unknown;
}

function buildPayrollHistoryRows(): PayrollHistoryRow[] {
  const companyNames = Object.keys(MOCK_EXISTING_PAYROLL);
  return companyNames.map(name => {
    const data = MOCK_EXISTING_PAYROLL[name];
    const imports = MOCK_IMPORTS.filter(i => i.company === name);
    const successfulImport = imports.find(i => i.status === 'completed' || i.status === 'completed_with_warnings');
    const hasMigrated = data.paychecksOnRollfi > 0 || !!successfulImport;
    const needsImport = data.priorProviderPayrollThisYear && !successfulImport;
    const atRisk = data.priorProviderPayrollThisYear && !successfulImport && data.paychecksOnRollfi > 0;
    const status: PayrollHistoryRow['status'] =
      atRisk ? 'at_risk'
        : hasMigrated ? 'migrated'
        : needsImport ? 'needs_import'
        : 'not_required';
    return {
      id: name,
      name,
      priorPayroll: data.priorProviderPayrollThisYear,
      firstRollfiPaycheck: data.firstRollfiPaycheck,
      paychecksOnRollfi: data.paychecksOnRollfi,
      imports,
      successfulImport,
      hasMigrated,
      needsImport,
      atRisk,
      status,
    };
  });
}

function ImportStatusBadge({ imp }: { imp: PayrollImport }) {
  const map = {
    completed: { label: 'Completed', variant: 'success' as const, icon: null },
    completed_with_warnings: { label: `${imp.warningCount ?? 0} warning${imp.warningCount === 1 ? '' : 's'}`, variant: 'warning' as const, icon: <Warning size={11} /> },
    processing: { label: 'Processing', variant: 'info' as const, icon: null },
    failed: { label: 'Failed', variant: 'danger' as const, icon: <XCircle size={11} weight="fill" /> },
  };
  const cfg = map[imp.status];
  return <Badge variant={cfg.variant} icon={cfg.icon ?? undefined}>{cfg.label}</Badge>;
}

function PayrollHistoryStatusBadge({ status }: { status: PayrollHistoryRow['status'] }) {
  switch (status) {
    case 'migrated':     return <Badge variant="success">Migrated</Badge>;
    case 'needs_import': return <Badge variant="info">Needs import</Badge>;
    case 'at_risk':      return <Badge variant="warning">At risk</Badge>;
    case 'not_required': return <Badge variant="neutral">Not required</Badge>;
  }
}

function PayrollHistoryTab({ onOpenWizard }: { onOpenWizard: () => void }) {
  const rows = buildPayrollHistoryRows();
  const atRiskCount = rows.filter(r => r.atRisk).length;
  const migratedCount = rows.filter(r => r.hasMigrated).length;
  const needsImportCount = rows.filter(r => r.needsImport && !r.atRisk).length;
  const employeesOnboarded = MOCK_IMPORTS.reduce((sum, i) => sum + i.employeeCount, 0);
  const atRiskColor = 'var(--rf-color-warning-text)';

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Callout variant="info" icon={<Info size={16} />} title="When to import payroll history">
          Run this when onboarding a company that already ran payroll elsewhere this year. Importing those records keeps YTD wages, tax withholdings, and benefit caps accurate so year-end W-2s and 1099s reflect the full year. A company counts as migrated once it has either a completed import or its first Rollfi paycheck.
        </Callout>
      </div>

      {atRiskCount > 0 && (
        <div style={{ marginBottom: 16 }}>
          <Callout variant="warning" icon={<Warning size={16} />} title={`${atRiskCount} compan${atRiskCount === 1 ? 'y' : 'ies'} migrated without a payroll history import`}>
            Running payroll on Rollfi before importing YTD history risks amended tax filings, IRS penalties, and state agency fines at year-end. Import history for these companies as soon as possible.
          </Callout>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard label="Migrated" value={<span style={{ color: 'var(--rf-color-success-text)' }}>{migratedCount}</span>} />
        <StatCard label="Needs import" value={<span style={{ color: 'var(--rf-color-info-text)' }}>{needsImportCount}</span>} />
        <StatCard label="At risk" value={<span style={{ color: atRiskColor }}>{atRiskCount}</span>} />
        <StatCard label="Employees onboarded" value={employeesOnboarded} />
      </div>

      <Card variant="default" padding="none">
        <Table
          columns={[
            { key: 'name', header: 'Company', sortable: true, render: row => (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Avatar name={row.name as string} size="sm" />
                <span style={{ font: 'var(--rf-text-body-sm-strong)' }}>{row.name as string}</span>
                {(row as PayrollHistoryRow).atRisk && (
                  <Badge variant="warning" icon={<Warning size={9} weight="fill" />}>At risk</Badge>
                )}
              </div>
            ) },
            { key: 'priorPayroll', header: 'Prior payroll', render: row => (
              <span style={{ color: 'var(--rf-color-text-secondary)' }}>
                {(row as PayrollHistoryRow).priorPayroll ? 'Yes' : 'No'}
              </span>
            ) },
            { key: 'historyImport', header: 'History import', render: row => {
              const r = row as PayrollHistoryRow;
              if (r.successfulImport) {
                return (
                  <div>
                    <ImportStatusBadge imp={r.successfulImport} />
                    <div style={{ font: 'var(--rf-text-caption-sm)', color: 'var(--rf-color-text-tertiary)', marginTop: 4 }}>
                      {r.successfulImport.period}
                    </div>
                  </div>
                );
              }
              if (r.imports.length > 0) {
                return <ImportStatusBadge imp={r.imports[r.imports.length - 1]} />;
              }
              if (r.needsImport) {
                return <Button size="sm" onClick={onOpenWizard}>Import now</Button>;
              }
              return <span style={{ font: 'var(--rf-text-body-sm)', color: 'var(--rf-color-text-tertiary)' }}>Not required</span>;
            } },
            { key: 'firstRollfiPaycheck', header: 'First Rollfi paycheck', render: row => {
              const date = (row as PayrollHistoryRow).firstRollfiPaycheck;
              return date
                ? <span style={{ fontVariantNumeric: 'tabular-nums', color: 'var(--rf-color-text-secondary)' }}>{fmtIsoDate(date)}</span>
                : <span style={{ color: 'var(--rf-color-text-tertiary)' }}>Not yet</span>;
            } },
            { key: 'status', header: 'Status', render: row => (
              <PayrollHistoryStatusBadge status={(row as PayrollHistoryRow).status} />
            ) },
          ]}
          data={rows}
          rowKey={r => r.id as string}
          expandable={row => {
            const r = row as PayrollHistoryRow;
            if (r.imports.length === 0) return null;
            return (
              <div style={{ padding: '14px 24px 18px' }}>
                <div style={{ font: 'var(--rf-text-caption-sm)', fontWeight: 700, color: 'var(--rf-color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
                  Import history
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {r.imports.map(imp => (
                    <div key={imp.id} style={{
                      display: 'grid',
                      gridTemplateColumns: '1.6fr 1fr 1fr 1.2fr 0.9fr',
                      gap: 16, alignItems: 'center',
                      padding: '10px 14px',
                      background: 'var(--rf-color-surface)',
                      border: '1px solid var(--rf-color-border)',
                      borderRadius: 'var(--rf-radius-md)',
                    }}>
                      <div>
                        <div style={{ font: 'var(--rf-text-body-sm-strong)' }}>{imp.period}</div>
                        <div style={{ font: 'var(--rf-text-caption-sm)', color: 'var(--rf-color-text-tertiary)', marginTop: 1 }}>{imp.source}</div>
                      </div>
                      <span style={{ font: 'var(--rf-text-body-sm)', color: 'var(--rf-color-text-secondary)' }}>{imp.employeeCount} employees</span>
                      <span style={{ font: 'var(--rf-text-body-sm)', color: 'var(--rf-color-text-secondary)' }}>{imp.recordCount.toLocaleString()} records</span>
                      <span style={{ font: 'var(--rf-text-caption-sm)', color: 'var(--rf-color-text-tertiary)' }}>{fmtIsoDateTime(imp.importedAt)}</span>
                      <span style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <ImportStatusBadge imp={imp} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          }}
        />
      </Card>
    </>
  );
}

function MethodBadge({ method }: { method: 'plaid' | 'manual' }) {
  return method === 'plaid'
    ? <Badge variant="teal">Plaid</Badge>
    : <Badge variant="neutral">Manual ACH</Badge>;
}

function BankStatusBadge({ status }: { status: BankAccount['status'] }) {
  if (status === 'active')               return <Badge variant="success">Active</Badge>;
  if (status === 'pending_verification') return <Badge variant="warning">Pending verification</Badge>;
  return <Badge variant="neutral">Inactive</Badge>;
}

function BankAccountCard({ account, onVerify, onUpdate, onDeactivate }: {
  account: BankAccount;
  onVerify: (a: BankAccount) => void;
  onUpdate: (a: BankAccount) => void;
  onDeactivate: (a: BankAccount) => void;
}) {
  const isInactive = account.status === 'inactive';
  const isPending = account.status === 'pending_verification';
  return (
    <Card variant="default" padding="md" style={{ opacity: isInactive ? 0.65 : 1, borderColor: isPending ? 'var(--rf-color-warning-border)' : undefined }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ font: 'var(--rf-text-body-md-strong)' }}>{account.bankName}</span>
            <MethodBadge method={account.method} />
            <BankStatusBadge status={account.status} />
          </div>
          <DataGrid
            gap="md"
            items={[
              { label: 'Account name', value: account.accountName },
              { label: 'Account', value: account.accountNumber },
              { label: 'Routing', value: account.routingNumber },
              { label: 'Type', value: account.accountType.charAt(0).toUpperCase() + account.accountType.slice(1) },
              { label: 'Added', value: fmtIsoDate(account.addedOn) },
            ]}
          />
        </div>
        {!isInactive && (
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            {isPending && (
              <Button size="sm" icon={<CheckCircle size={12} />} onClick={() => onVerify(account)}>
                Verify deposits
              </Button>
            )}
            {account.status === 'active' && (
              <Button variant="secondary" size="sm" icon={<PencilSimple size={12} />} onClick={() => onUpdate(account)}>
                Update
              </Button>
            )}
            <Button variant="secondary" size="sm" onClick={() => onDeactivate(account)}>
              Deactivate
            </Button>
          </div>
        )}
      </div>
      {isPending && (
        <div style={{ marginTop: 14 }}>
          <Callout variant="warning">
            Micro deposits were sent on {account.microDepositsSentOn ? fmtIsoDate(account.microDepositsSentOn) : 'recently'}. Check the bank statement and click "Verify deposits" to confirm the amounts and activate this account.
          </Callout>
        </div>
      )}
    </Card>
  );
}

function EmployeeDDRow({ emp, onSendInvite }: { emp: EmployeeDirectDeposit; onSendInvite: (e: EmployeeDirectDeposit) => void }) {
  const isDD = emp.paymentMethod === 'Direct Deposit';
  return (
    <Card variant="default" padding="sm" style={{ opacity: isDD ? 1 : 0.55 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr 1.2fr auto', gap: 16, alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Avatar name={emp.name} size="sm" />
          <div style={{ minWidth: 0 }}>
            <div style={{ font: 'var(--rf-text-body-sm-strong)' }}>{emp.name}</div>
            <div style={{ font: 'var(--rf-text-caption-sm)', color: 'var(--rf-color-text-tertiary)' }}>{emp.jobTitle} · {emp.email}</div>
          </div>
        </div>
        <span style={{ font: 'var(--rf-text-body-sm)', color: 'var(--rf-color-text-secondary)' }}>{emp.paymentMethod}</span>
        <div>
          {!isDD ? (
            <span style={{ font: 'var(--rf-text-body-sm)', color: 'var(--rf-color-text-tertiary)' }}>Check — no link needed</span>
          ) : emp.linkStatus === 'linked' ? (
            <div>
              <MethodBadge method={emp.linkType!} />
              <div style={{ font: 'var(--rf-text-caption-sm)', color: 'var(--rf-color-text-tertiary)', marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>{emp.linkedAccountNumber}</div>
            </div>
          ) : emp.linkStatus === 'pending' ? (
            <div>
              <Badge variant="warning">Invite pending</Badge>
              <div style={{ font: 'var(--rf-text-caption-sm)', color: 'var(--rf-color-text-tertiary)', marginTop: 4 }}>
                Expires {emp.inviteExpiresAt ? fmtIsoDate(emp.inviteExpiresAt) : ''}
              </div>
            </div>
          ) : (
            <span style={{ font: 'var(--rf-text-body-sm-strong)', color: 'var(--rf-color-danger-text)' }}>Not linked</span>
          )}
        </div>
        <div>
          {isDD && (
            <Button variant="secondary" size="sm" onClick={() => onSendInvite(emp)}>
              {emp.linkStatus === 'pending' ? 'Resend Plaid link' : emp.linkStatus === 'linked' ? 'Resend link' : 'Send Plaid link'}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

// ─── Bank account panels ───────────────────────────────────────────────

function ConnectAccountPanel({ open, onClose, companyName, existing, onSubmit }: {
  open: boolean;
  onClose: () => void;
  companyName: string;
  existing: BankAccount | null;
  onSubmit: () => void;
}) {
  const [method, setMethod] = useState<'plaid' | 'manual'>(existing?.method ?? 'plaid');
  const [bankName, setBankName] = useState(existing?.bankName ?? '');
  const [accountName, setAccountName] = useState(existing?.accountName ?? '');
  const [accountType, setAccountType] = useState<'checking' | 'savings'>(existing?.accountType ?? 'checking');
  const [routing, setRouting] = useState('');
  const [acct, setAcct] = useState('');
  const [acctConfirm, setAcctConfirm] = useState('');
  const isEdit = !!existing;
  const accountsMatch = !!acct && acct === acctConfirm;
  const canSubmit = method === 'plaid' || (bankName && accountName && acct && accountsMatch && routing);
  return (
    <SidePanel
      open={open}
      onClose={onClose}
      width="lg"
      title={isEdit ? 'Update bank account' : 'Connect bank account'}
      description={companyName}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          {method === 'manual' && (
            <Button onClick={onSubmit} disabled={!canSubmit}>Save account</Button>
          )}
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {!isEdit && (
          <Field label="Connection method" required>
            <RadioGroup value={method} onChange={v => setMethod(v as 'plaid' | 'manual')}>
              <OptionCard
                selected={method === 'plaid'}
                onSelect={() => setMethod('plaid')}
                title="Plaid"
                description="Instant verification via bank login. No micro deposits needed."
                badge="Recommended"
              />
              <OptionCard
                selected={method === 'manual'}
                onSelect={() => setMethod('manual')}
                title="Manual ACH"
                description="Enter routing and account numbers. Verified via two micro deposits."
              />
            </RadioGroup>
          </Field>
        )}

        {method === 'plaid' && (
          <Callout variant="info" icon={<Bank size={16} />} title="Connect via Plaid">
            Plaid Link opens a secure window where {companyName} logs into their bank to authorize the connection. Verification is instant — no account numbers entered manually.
          </Callout>
        )}

        {method === 'manual' && (
          <>
            <Field label="Account name" required>
              <Input value={accountName} onChange={e => setAccountName(e.target.value)} placeholder="e.g. Primary payroll, Operating account" />
            </Field>
            <Field label="Bank name" required>
              <Input value={bankName} onChange={e => setBankName(e.target.value)} placeholder="e.g. Chase Bank" />
            </Field>
            <Field label="Account type" required>
              <SegmentedControl
                value={accountType}
                onChange={v => setAccountType(v as 'checking' | 'savings')}
                fullWidth
                items={[{ value: 'checking', label: 'Checking' }, { value: 'savings', label: 'Savings' }]}
              />
            </Field>
            <Field label="Routing number" required>
              <Input value={routing} onChange={e => setRouting(e.target.value)} placeholder="9-digit ABA routing number" inputMode="numeric" />
            </Field>
            <Field label="Account number" required>
              <Input value={acct} onChange={e => setAcct(e.target.value)} placeholder="Account number" inputMode="numeric" />
            </Field>
            <Field
              label="Confirm account number"
              required
              hint={!acctConfirm ? undefined : accountsMatch ? 'Account numbers match.' : undefined}
              error={acctConfirm && !accountsMatch ? 'Account numbers do not match.' : undefined}
            >
              <Input value={acctConfirm} onChange={e => setAcctConfirm(e.target.value)} placeholder="Re-enter account number" inputMode="numeric" />
            </Field>
            <Callout variant="warning" title="Verification via micro deposits">
              After saving, Rollfi sends two small deposits (under $1 each) to this account. The account holder confirms the exact amounts to complete verification. This takes 1 to 2 business days.
            </Callout>
          </>
        )}
      </div>
    </SidePanel>
  );
}

function VerifyDepositsPanel({ open, onClose, account, companyName, onVerified }: {
  open: boolean;
  onClose: () => void;
  account: BankAccount | null;
  companyName: string;
  onVerified: () => void;
}) {
  const [a1, setA1] = useState('');
  const [a2, setA2] = useState('');
  const canSubmit = !!a1 && !!a2 && parseFloat(a1) > 0 && parseFloat(a2) > 0;
  if (!account) return null;
  return (
    <SidePanel
      open={open}
      onClose={onClose}
      title="Verify micro deposits"
      description={`${companyName} · ${account.bankName} ${account.accountNumber}`}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button disabled={!canSubmit} onClick={onVerified}>Verify account</Button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Callout variant="info" icon={<Info size={16} />} title="Find the two deposits in your bank statement">
          Rollfi sent two small deposits to {account.accountNumber} on {account.microDepositsSentOn ? fmtIsoDate(account.microDepositsSentOn) : 'the account\'s registered date'}. Enter the exact amounts below to confirm ownership.
        </Callout>
        <Field label="First deposit amount" required>
          <CurrencyInput value={a1} onChange={e => setA1(e.target.value)} placeholder="0.00" />
        </Field>
        <Field label="Second deposit amount" required>
          <CurrencyInput value={a2} onChange={e => setA2(e.target.value)} placeholder="0.00" />
        </Field>
        <div style={{ font: 'var(--rf-text-caption)', color: 'var(--rf-color-text-tertiary)', lineHeight: 1.5 }}>
          Both amounts must match exactly. If the amounts are incorrect, the verification will fail and new micro deposits will need to be sent.
        </div>
      </div>
    </SidePanel>
  );
}

function SendPlaidInvitePanel({ open, onClose, employee, companyName, onSent }: {
  open: boolean;
  onClose: () => void;
  employee: EmployeeDirectDeposit | null;
  companyName: string;
  onSent: (e: EmployeeDirectDeposit) => void;
}) {
  const [sent, setSent] = useState(false);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  if (!employee) return null;
  return (
    <SidePanel
      open={open}
      onClose={() => { setSent(false); onClose(); }}
      title={sent ? 'Invite sent' : 'Send Plaid link'}
      description={`${companyName} · ${employee.name}`}
      footer={
        <>
          <Button variant="secondary" onClick={() => { setSent(false); onClose(); }}>{sent ? 'Close' : 'Cancel'}</Button>
          {!sent && <Button onClick={() => { setSent(true); onSent(employee); }}>Send Plaid link</Button>}
        </>
      }
    >
      {!sent ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Callout variant="info" icon={<Info size={16} />} title="How this works">
            Rollfi sends a secure Plaid Link URL to {employee.email}. The employee opens the link, logs into their bank, and authorizes the direct deposit connection. The link expires in 7 days.
          </Callout>
          <div>
            <div style={{ font: 'var(--rf-text-caption-sm)', fontWeight: 700, color: 'var(--rf-color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
              Sending to
            </div>
            <div style={{ font: 'var(--rf-text-body-md-strong)' }}>{employee.email}</div>
            <div style={{ font: 'var(--rf-text-caption)', color: 'var(--rf-color-text-tertiary)', marginTop: 4 }}>
              If this email is incorrect, update it via the employee record before sending.
            </div>
          </div>
          {employee.linkStatus === 'pending' && (
            <Callout variant="warning" title="Previous invite still active">
              An invite was already sent to {employee.email} and expires {employee.inviteExpiresAt ? fmtIsoDate(employee.inviteExpiresAt) : 'soon'}. Sending again will invalidate the previous link.
            </Callout>
          )}
        </div>
      ) : (
        <EmptyState
          icon={<CheckCircle size={28} weight="fill" />}
          title={`Invite sent to ${employee.email}`}
          description={`The link expires on ${fmtIsoDate(expiresAt)}. Once the employee completes linking, their account will appear as linked here.`}
        />
      )}
    </SidePanel>
  );
}

function DeactivateAccountDialog({ open, onClose, account, onConfirm, isLastActive }: {
  open: boolean;
  onClose: () => void;
  account: BankAccount | null;
  onConfirm: () => void;
  isLastActive: boolean;
}) {
  if (!account) return null;
  if (isLastActive) {
    return (
      <AlertDialog
        open={open}
        onClose={onClose}
        variant="destructive"
        title="Cannot deactivate the last active account"
        description="At least one active bank account must remain. Add a replacement account before deactivating this one — otherwise payroll cannot run."
        confirmLabel="Got it"
        cancelLabel="Close"
        onConfirm={onClose}
      />
    );
  }
  return (
    <AlertDialog
      open={open}
      onClose={onClose}
      variant="destructive"
      title={`Deactivate ${account.bankName}?`}
      description={`${account.accountName} (${account.accountNumber}) will be moved to inactive. Inactive accounts are kept for compliance history but cannot be reactivated.`}
      confirmLabel="Deactivate"
      onConfirm={onConfirm}
    />
  );
}

function BankAccountsTab() {
  const sorted = [...PORTAL_COMPANIES].sort((a, b) => a.name.localeCompare(b.name));
  const [selectedId, setSelectedId] = useState(sorted[0].id);
  const [panel, setPanel] = useState<'add' | 'edit' | 'verify' | 'plaid_invite' | null>(null);
  const [editingAccount, setEditingAccount] = useState<BankAccount | null>(null);
  const [verifyingAccount, setVerifyingAccount] = useState<BankAccount | null>(null);
  const [invitingEmployee, setInvitingEmployee] = useState<EmployeeDirectDeposit | null>(null);
  const [deactivating, setDeactivating] = useState<BankAccount | null>(null);
  const { toast } = useToast();

  const selected = PORTAL_COMPANIES.find(c => c.id === selectedId)!;
  const accounts = MOCK_BANK_ACCOUNTS[selectedId] || [];
  const activeAccounts = accounts.filter(a => a.status !== 'inactive');
  const activeCount = accounts.filter(a => a.status === 'active').length;
  const hasNoAccounts = activeAccounts.length === 0;
  const employees = MOCK_EMPLOYEE_DDS[selectedId] || [];
  const ddEmployees = employees.filter(e => e.paymentMethod === 'Direct Deposit');
  const linkedCount = ddEmployees.filter(e => e.linkStatus === 'linked').length;

  const closeAll = () => { setPanel(null); setEditingAccount(null); setVerifyingAccount(null); setInvitingEmployee(null); };
  const isDeactivatingLastActive = !!deactivating && deactivating.status === 'active' && activeCount <= 1;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 20, alignItems: 'start' }}>
      <div style={{ position: 'sticky', top: 24 }}>
        <Field label="Company">
          <Select
            value={selectedId}
            onChange={e => { setSelectedId(e.target.value); closeAll(); }}
            options={sorted.map(c => ({ value: c.id, label: c.name }))}
          />
        </Field>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ font: 'var(--rf-text-heading-md)', letterSpacing: 'var(--rf-tracking-tight)' }}>{selected.name}</div>
            <div style={{ font: 'var(--rf-text-body-sm)', color: 'var(--rf-color-text-secondary)', marginTop: 2 }}>
              {hasNoAccounts ? 'No bank account connected. Connect one to enable payroll.' : `${activeCount} active account${activeCount === 1 ? '' : 's'}`}
            </div>
          </div>
          <Button size="sm" icon={<Plus size={14} />} onClick={() => { setEditingAccount(null); setPanel('add'); }}>
            Connect account
          </Button>
        </div>

        {hasNoAccounts && (
          <Callout variant="danger" icon={<Warning size={16} weight="fill" />} title="No bank account connected">
            Payroll cannot run until a verified bank account is linked. Connect an account via Plaid or manual ACH.
          </Callout>
        )}

        {accounts.length === 0 ? (
          <Card variant="default" padding="lg">
            <EmptyState
              icon={<CreditCard size={24} />}
              title={`No accounts on record for ${selected.name}`}
              description="Connect a bank account to enable payroll funding for this company."
              action={<Button size="sm" icon={<Plus size={14} />} onClick={() => { setEditingAccount(null); setPanel('add'); }}>Connect account</Button>}
            />
          </Card>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {accounts.map(a => (
              <BankAccountCard
                key={a.id}
                account={a}
                onVerify={acct => { setVerifyingAccount(acct); setPanel('verify'); }}
                onUpdate={acct => { setEditingAccount(acct); setPanel('edit'); }}
                onDeactivate={acct => setDeactivating(acct)}
              />
            ))}
          </div>
        )}

        {accounts.some(a => a.status === 'inactive') && (
          <div style={{ font: 'var(--rf-text-caption)', color: 'var(--rf-color-text-tertiary)', padding: '0 4px' }}>
            Inactive accounts are shown for compliance history. They cannot be reactivated and must be re-added if needed.
          </div>
        )}

        {ddEmployees.length > 0 && (
          <div style={{ marginTop: 8 }}>
            <div style={{
              display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
              borderBottom: '2px solid var(--rf-color-border)',
              paddingBottom: 8, marginBottom: 12,
            }}>
              <span style={{ font: 'var(--rf-text-heading-sm)', letterSpacing: 'var(--rf-tracking-tight)' }}>Employee direct deposit</span>
              <span style={{ font: 'var(--rf-text-caption)', color: 'var(--rf-color-text-secondary)' }}>
                {linkedCount} of {ddEmployees.length} linked
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {employees.map(e => (
                <EmployeeDDRow
                  key={e.userId}
                  emp={e}
                  onSendInvite={emp => { setInvitingEmployee(emp); setPanel('plaid_invite'); }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Side panels */}
      <ConnectAccountPanel
        open={panel === 'add' || panel === 'edit'}
        onClose={closeAll}
        companyName={selected.name}
        existing={panel === 'edit' ? editingAccount : null}
        onSubmit={() => { toast(panel === 'edit' ? 'Account updated' : 'Account connected', { variant: 'success' }); closeAll(); }}
      />
      <VerifyDepositsPanel
        open={panel === 'verify'}
        onClose={closeAll}
        account={verifyingAccount}
        companyName={selected.name}
        onVerified={() => { toast('Account verified', { variant: 'success' }); closeAll(); }}
      />
      <SendPlaidInvitePanel
        open={panel === 'plaid_invite'}
        onClose={closeAll}
        employee={invitingEmployee}
        companyName={selected.name}
        onSent={() => { toast('Plaid invite sent', { variant: 'success' }); }}
      />
      <DeactivateAccountDialog
        open={!!deactivating}
        onClose={() => setDeactivating(null)}
        account={deactivating}
        isLastActive={isDeactivatingLastActive}
        onConfirm={() => { toast(`${deactivating?.bankName} deactivated`, { variant: 'error' }); setDeactivating(null); }}
      />
    </div>
  );
}

function ImplementationsView() {
  const [subTab, setSubTab] = useState('readiness');
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  return (
    <>
      <PageHeader
        title="Implementations"
        subtitle="Onboarding readiness & payroll history"
        action={subTab === 'readiness' ? (
          <Button size="sm" variant="secondary" onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 1500); }}>
            {loading ? <Spinner size="sm" /> : 'Refresh'}
          </Button>
        ) : subTab === 'history' ? (
          <Button size="sm" icon={<Upload size={14} />} onClick={() => setWizardOpen(true)}>Import history</Button>
        ) : undefined}
      />
      <div style={{ marginBottom: 20 }}>
        <Tabs
          tabs={[
            { key: 'readiness', label: 'Readiness' },
            { key: 'history', label: 'Payroll history' },
            { key: 'bank_accounts', label: 'Bank accounts' },
          ]}
          value={subTab}
          onChange={setSubTab}
        />
      </div>

      {subTab === 'readiness' && loading && (
        <Card variant="outlined" padding="md">
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < 4 ? '1px solid var(--rf-color-border-subtle)' : undefined }}>
              <Skeleton circle width={28} height={28} />
              <div style={{ flex: 1 }}><Skeleton width="40%" height={12} /></div>
              <Skeleton width={70} height={20} radius={10} />
              <Skeleton width={70} height={20} radius={10} />
              <Skeleton width={70} height={20} radius={10} />
            </div>
          ))}
        </Card>
      )}

      {subTab === 'readiness' && !loading && <ReadinessTab />}

      {subTab === 'history' && <PayrollHistoryTab onOpenWizard={() => setWizardOpen(true)} />}

      {subTab === 'bank_accounts' && <BankAccountsTab />}

      <SidePanel
        open={wizardOpen}
        onClose={() => setWizardOpen(false)}
        title="Import payroll history"
        description="Bring historical payroll data into Rollfi"
        width="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setWizardStep(Math.max(0, wizardStep - 1))} disabled={wizardStep === 0}>Back</Button>
            {wizardStep < 4 ? (
              <Button onClick={() => setWizardStep(wizardStep + 1)}>Next</Button>
            ) : (
              <Button onClick={() => { setWizardOpen(false); setWizardStep(0); toast('Import complete', { variant: 'success' }); }}>Finish</Button>
            )}
          </>
        }
      >
        <div style={{ marginBottom: 24 }}>
          <Stepper
            steps={[{ label: 'Company' }, { label: 'Configure' }, { label: 'Upload' }, { label: 'Map' }, { label: 'Review' }]}
            currentIdx={wizardStep}
          />
        </div>
        {wizardStep === 0 && (
          <Field label="Select company" required>
            <Select placeholder="Choose..." options={PORTAL_COMPANIES.map(c => ({ value: c.id, label: c.name }))} />
          </Field>
        )}
        {wizardStep === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Field label="Worker type" required>
              <Select placeholder="Choose..." options={[
                { value: 'w2', label: 'W-2' },
                { value: '1099', label: '1099' },
                { value: 'both', label: 'Both (runs two imports)' },
              ]} />
            </Field>
            <Field label="Pay period type" required>
              <Select placeholder="Choose..." options={[
                { value: 'regular', label: 'Regular' },
                { value: 'off', label: 'Off-Cycle' },
                { value: 'missing', label: 'Missing' },
              ]} />
            </Field>
          </div>
        )}
        {wizardStep === 2 && (
          <Field label="Upload CSV" required hint="Maximum file size 25 MB">
            <Input placeholder="payroll_q1_2026.csv" icon={<Upload size={14} />} />
          </Field>
        )}
        {wizardStep === 3 && (
          <Alert variant="info" icon={<Info size={18} weight="fill" />}>
            Column mapping detected automatically. Review the field mapping before continuing.
          </Alert>
        )}
        {wizardStep === 4 && (
          <Card variant="outlined" padding="md">
            <DetailRow label="Company" value="Acme Corp" />
            <DetailRow label="Worker type" value="W-2" />
            <DetailRow label="Pay period type" value="Regular" />
            <DetailRow label="File" value="payroll_q1_2026.csv" />
            <DetailRow label="Records" value="312" />
          </Card>
        )}
      </SidePanel>
    </>
  );
}

// ─── Payroll Activity helpers ───
const fmtUsd = (n: number) =>
  '$' + (n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function TxStatusBadge({ status }: { status: TxStatus }) {
  const map: Record<TxStatus, { label: string; variant: 'success' | 'info' | 'danger' | 'neutral' | 'warning' }> = {
    processed:  { label: 'Processed',  variant: 'success' },
    inProcess:  { label: 'Processing', variant: 'info' },
    submitted:  { label: 'Submitted',  variant: 'info' },
    failed:     { label: 'Failed',     variant: 'danger' },
    returned:   { label: 'Returned',   variant: 'danger' },
    cancelled:  { label: 'Cancelled',  variant: 'neutral' },
  };
  const cfg = map[status] ?? { label: status, variant: 'neutral' };
  return <Badge variant={cfg.variant}>{cfg.label}</Badge>;
}

function PayPeriodTypeBadge({ type }: { type: PayPeriodType }) {
  const map: Record<PayPeriodType, 'neutral' | 'purple' | 'danger' | 'warning'> = {
    'Regular': 'neutral',
    'Off-Cycle': 'purple',
    'Missing': 'danger',
    'Dismissal': 'warning',
  };
  return <Badge variant={map[type]}>{type}</Badge>;
}

function BankLinkBadge({ link }: { link?: LinkType }) {
  if (!link) return <span style={{ color: 'var(--rf-color-text-tertiary)' }}>—</span>;
  if (link === 'Plaid')          return <Badge variant="teal">Plaid</Badge>;
  if (link === 'Manual')         return <Badge variant="neutral">Manual ACH</Badge>;
  if (link === 'CustomProvider') return <Badge variant="purple">Custom</Badge>;
  return null;
}

// ─── PayStubPanel (portal-specific composition) ───
function PayStubSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <div style={{
        font: 'var(--rf-text-caption-sm)',
        fontWeight: 700,
        color: 'var(--rf-color-text-tertiary)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: 6,
        paddingBottom: 8,
        borderBottom: '1px solid var(--rf-color-border)',
      }}>
        {title}
      </div>
      <div>{children}</div>
    </section>
  );
}

function PayStubPanel({ stub, open, onClose }: { stub: PayStub | null; open: boolean; onClose: () => void }) {
  if (!stub) return null;
  const totalTaxes = stub.taxes.reduce((s, t) => s + t.current, 0);
  const totalDeductions = stub.deductions.reduce((s, d) => s + d.current, 0);
  const paymentBadge =
    stub.paymentStatus === 'Paid' ? <Badge variant="success">Paid</Badge>
      : stub.paymentStatus === 'Pending' ? <Badge variant="warning">Pending</Badge>
      : <Badge variant="danger">Failed</Badge>;

  return (
    <SidePanel
      open={open}
      onClose={onClose}
      width="lg"
      title={stub.employeeName}
      description={`${stub.jobTitle} · ${stub.payPeriod}`}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Close</Button>
          <Button icon={<Download size={14} />}>Download stub</Button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Card variant="default" padding="md">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
            <div>
              <div style={{ font: 'var(--rf-text-caption)', color: 'var(--rf-color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Net pay</div>
              <div style={{ font: 'var(--rf-text-display-md)', letterSpacing: 'var(--rf-tracking-tight)', color: 'var(--rf-color-success-text)', fontVariantNumeric: 'tabular-nums' }}>
                {fmtUsd(stub.netTotal)}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
              {paymentBadge}
              <span style={{ font: 'var(--rf-text-caption)', color: 'var(--rf-color-text-tertiary)' }}>{stub.paymentMethod}</span>
            </div>
          </div>
        </Card>

        <PayStubSection title="Earnings">
          {stub.earnings.map(e => (
            <DetailRow key={e.label} label={e.label} value={
              <span style={{ fontVariantNumeric: 'tabular-nums' }}>
                {fmtUsd(e.current)}
                {e.ytd !== undefined && <span style={{ color: 'var(--rf-color-text-tertiary)', marginLeft: 8 }}>{fmtUsd(e.ytd)} YTD</span>}
              </span>
            } />
          ))}
          <DetailRow label={<strong>Gross pay</strong>} value={<strong style={{ fontVariantNumeric: 'tabular-nums' }}>{fmtUsd(stub.grossTotal)}</strong>} />
        </PayStubSection>

        <PayStubSection title="Tax withholding">
          {stub.taxes.map(t => (
            <DetailRow key={t.label} label={t.label} value={
              <span style={{ color: 'var(--rf-color-danger-text)', fontVariantNumeric: 'tabular-nums' }}>−{fmtUsd(t.current)}</span>
            } />
          ))}
          <DetailRow label={<strong>Total tax withheld</strong>} value={<strong style={{ color: 'var(--rf-color-danger-text)', fontVariantNumeric: 'tabular-nums' }}>−{fmtUsd(totalTaxes)}</strong>} />
        </PayStubSection>

        {stub.deductions.length > 0 && (
          <PayStubSection title="Deductions">
            {stub.deductions.map(d => (
              <DetailRow key={d.label} label={d.label} value={
                <span style={{ color: 'var(--rf-color-danger-text)', fontVariantNumeric: 'tabular-nums' }}>−{fmtUsd(d.current)}</span>
              } />
            ))}
            <DetailRow label={<strong>Total deductions</strong>} value={<strong style={{ color: 'var(--rf-color-danger-text)', fontVariantNumeric: 'tabular-nums' }}>−{fmtUsd(totalDeductions)}</strong>} />
          </PayStubSection>
        )}

        <PayStubSection title="YTD summary">
          <div style={{ paddingTop: 4 }}>
            <DataGrid items={[
              { label: 'Gross YTD', value: fmtUsd(stub.ytdGrossTotal) },
              { label: 'Net YTD', value: fmtUsd(stub.ytdGrossTotal - stub.taxes.reduce((s, t) => s + (t.ytd ?? 0), 0)) },
            ]} />
          </div>
        </PayStubSection>
      </div>
    </SidePanel>
  );
}

// ─── Payments tab ───
function PaymentsTab() {
  const sorted = [...PORTAL_COMPANIES].sort((a, b) => a.name.localeCompare(b.name));
  const [companyId, setCompanyId] = useState(sorted[0].id);
  const [periodId, setPeriodId] = useState<string | null>('pp-acme-2');
  const [stub, setStub] = useState<PayStub | null>(null);

  const company = PORTAL_COMPANIES.find(c => c.id === companyId)!;
  const periods = MOCK_PAY_PERIODS[companyId] || [];
  const period = periods.find(p => p.payPeriodId === periodId) ?? null;
  const data = periodId ? MOCK_PERIOD_DATA[periodId] ?? null : null;
  const stubs = periodId ? MOCK_PAY_STUBS[periodId] ?? [] : [];
  const txs = (data?.payrollTransaction ?? []).filter(t => t.destination === 'EmployeeBankAccount' || t.destination === 'CheckPayment');
  const hasFailed = txs.some(t => t.status === 'failed');
  const hasPending = txs.some(t => t.status === 'inProcess');
  const debit = data?.payrollTransaction?.find(tx => tx.transactionName === 'AchDebit' && tx.source === 'EmployerBankAccount');

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 20, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, position: 'sticky', top: 24 }}>
        <Field label="Company">
          <Select
            value={companyId}
            onChange={e => { setCompanyId(e.target.value); setPeriodId(null); setStub(null); }}
            options={sorted.map(c => ({ value: c.id, label: c.name }))}
          />
        </Field>

        {periods.length > 0 ? (
          <Card variant="default" padding="none">
            <div style={{ padding: '12px 16px', background: 'var(--rf-color-surface-elevated)', borderBottom: '1px solid var(--rf-color-border)', font: 'var(--rf-text-caption-sm)', fontWeight: 700, color: 'var(--rf-color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Pay periods
            </div>
            {periods.map((p, i) => {
              const active = p.payPeriodId === periodId;
              const periodHasFailed = MOCK_PERIOD_DATA[p.payPeriodId]?.payrollTransaction?.some(t => t.status === 'failed');
              return (
                <button
                  key={p.payPeriodId}
                  type="button"
                  onClick={() => { setPeriodId(p.payPeriodId); setStub(null); }}
                  style={{
                    width: '100%', textAlign: 'left',
                    padding: '11px 16px',
                    border: 'none',
                    borderBottom: i < periods.length - 1 ? '1px solid var(--rf-color-border-subtle)' : 'none',
                    borderLeft: active ? '3px solid var(--rf-color-primary)' : '3px solid transparent',
                    background: active ? 'var(--rf-color-surface-elevated)' : 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                    <span style={{ font: 'var(--rf-text-body-sm-strong)' }}>Pay {fmtIsoDate(p.payDate)}</span>
                    <PayPeriodTypeBadge type={p.payPeriodType} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ font: 'var(--rf-text-caption-sm)', color: 'var(--rf-color-text-tertiary)' }}>
                      {fmtIsoDate(p.payBeginDate)} to {fmtIsoDate(p.payEndDate)}
                    </span>
                    {periodHasFailed && <StatusDot variant="danger" pulse />}
                  </div>
                </button>
              );
            })}
          </Card>
        ) : (
          <Card variant="default" padding="md">
            <span style={{ font: 'var(--rf-text-body-sm)', color: 'var(--rf-color-text-tertiary)' }}>
              No processed pay periods for {company.name}.
            </span>
          </Card>
        )}
      </div>

      {!period ? (
        <Card variant="default" padding="lg">
          <EmptyState
            icon={<ChartBar size={24} />}
            title="Select a pay period"
            description="Choose a pay period from the list to see transaction details and employee pay stubs."
          />
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <div style={{ font: 'var(--rf-text-heading-md)', letterSpacing: 'var(--rf-tracking-tight)' }}>
              {company.name} · {fmtIsoDate(period.payBeginDate)} to {fmtIsoDate(period.payEndDate)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
              <span style={{ font: 'var(--rf-text-body-sm)', color: 'var(--rf-color-text-secondary)' }}>Pay date {fmtIsoDate(period.payDate)}</span>
              <PayPeriodTypeBadge type={period.payPeriodType} />
            </div>
          </div>

          {hasFailed && (
            <Callout variant="danger" icon={<Warning size={16} weight="fill" />}>
              One or more transactions failed. Review the transaction table below.
            </Callout>
          )}
          {hasPending && !hasFailed && (
            <Callout variant="info" icon={<Clock size={16} />}>
              Some transactions are still processing.
            </Callout>
          )}

          {debit && (
            <Card variant="default" padding="none" style={{ borderColor: debit.status === 'processed' ? 'var(--rf-color-success-border)' : debit.status === 'failed' ? 'var(--rf-color-danger-border)' : 'var(--rf-color-warning-border)' }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 20px',
                background: debit.status === 'processed' ? 'var(--rf-color-success-bg)' : debit.status === 'failed' ? 'var(--rf-color-danger-bg)' : 'var(--rf-color-warning-bg)',
                borderBottom: `1px solid ${debit.status === 'processed' ? 'var(--rf-color-success-border)' : debit.status === 'failed' ? 'var(--rf-color-danger-border)' : 'var(--rf-color-warning-border)'}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ font: 'var(--rf-text-body-sm-strong)' }}>Employer ACH debit</span>
                  <span style={{ font: 'var(--rf-text-caption)', color: 'var(--rf-color-text-secondary)' }}>Funds pulled from company account to fund payroll</span>
                </div>
                <TxStatusBadge status={debit.status} />
              </div>
              <div style={{ padding: '16px 20px' }}>
                <DataGrid columns={4} gap="md" items={[
                  { label: 'Account debited', value: `••• ${debit.sourceAccount}` },
                  { label: 'Total amount', value: <strong style={{ font: 'var(--rf-text-heading-md)', letterSpacing: 'var(--rf-tracking-tight)' }}>{fmtUsd(debit.transferAmount)}</strong> },
                  { label: 'Trace number', value: <span style={{ font: 'var(--rf-text-code)' }}>#{debit.requestReferenceId}</span> },
                  { label: 'Transaction type', value: 'ACH Debit' },
                ]} />
              </div>
              {data?.cashRequirementsReport && (
                <div style={{ padding: '14px 20px', borderTop: '1px solid var(--rf-color-border)', background: 'var(--rf-color-surface-elevated)' }}>
                  <StackedBar
                    format={fmtUsd}
                    segments={[
                      { label: 'Direct deposits (ACH)', value: data.cashRequirementsReport.totalDirectDeposits, color: 'var(--rf-color-success)' },
                      { label: 'Check payments',        value: data.cashRequirementsReport.cashRequiredForCheckPayments, color: 'var(--rf-color-accent-teal)' },
                      { label: 'Garnishments',          value: data.cashRequirementsReport.garnishments, color: 'var(--rf-color-text-tertiary)' },
                    ]}
                  />
                </div>
              )}
            </Card>
          )}

          <Card variant="default" padding="none">
            <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--rf-color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ font: 'var(--rf-text-heading-sm)', letterSpacing: 'var(--rf-tracking-tight)' }}>Employee payments</span>
              <span style={{ font: 'var(--rf-text-caption)', color: 'var(--rf-color-text-secondary)' }}>{txs.length} transaction{txs.length === 1 ? '' : 's'}</span>
            </div>
            <Table
              columns={[
                { key: 'trace', header: 'Trace #', render: row => <span style={{ font: 'var(--rf-text-code)', color: 'var(--rf-color-text-tertiary)' }}>#{row.requestReferenceId as string}</span> },
                { key: 'employee', header: 'Employee', render: row => {
                  const name = (row.employeeName as string) || (row.destination === 'CheckPayment' ? 'Check payment' : 'Direct deposit');
                  return (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Avatar name={name} size="sm" />
                      <span style={{ font: 'var(--rf-text-body-sm-strong)' }}>{name}</span>
                    </div>
                  );
                } },
                { key: 'link', header: 'Bank link', render: row => row.destination === 'CheckPayment' ? <span style={{ color: 'var(--rf-color-text-tertiary)' }}>—</span> : <BankLinkBadge link={row.linkType as LinkType | undefined} /> },
                { key: 'account', header: 'Account', render: row => (
                  <span style={{ font: 'var(--rf-text-body-sm)', color: 'var(--rf-color-text-secondary)' }}>
                    {row.destination === 'CheckPayment' ? 'Check' : `••• ${row.destinationAccount}`}
                  </span>
                ) },
                { key: 'amount', header: 'Amount', align: 'right', render: row => (
                  <span style={{ font: 'var(--rf-text-body-sm-strong)', color: row.destination === 'CheckPayment' ? 'var(--rf-color-text-secondary)' : 'var(--rf-color-success-text)', fontVariantNumeric: 'tabular-nums' }}>
                    {fmtUsd(row.transferAmount as number)}
                  </span>
                ) },
                { key: 'status', header: 'Status', render: row => <TxStatusBadge status={row.status as TxStatus} /> },
              ]}
              data={txs.map(tx => ({ ...tx, id: tx.requestReferenceId }))}
              rowKey={r => r.id as string}
              onRowClick={row => {
                const found = stubs.find(s => s.employeeName === (row.employeeName as string));
                if (found) setStub(found);
              }}
            />
          </Card>

          {stubs.length > 0 && (
            <Card variant="default" padding="none">
              <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--rf-color-border)' }}>
                <div style={{ font: 'var(--rf-text-heading-sm)', letterSpacing: 'var(--rf-tracking-tight)' }}>Employee pay stubs</div>
                <div style={{ font: 'var(--rf-text-caption)', color: 'var(--rf-color-text-secondary)', marginTop: 2 }}>Click any row to view the full pay stub breakdown.</div>
              </div>
              <Table
                columns={[
                  { key: 'employeeName', header: 'Employee', render: row => (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Avatar name={row.employeeName as string} size="sm" />
                      <span style={{ font: 'var(--rf-text-body-sm-strong)' }}>{row.employeeName as string}</span>
                    </div>
                  ) },
                  { key: 'grossTotal', header: 'Gross', align: 'right', render: row => <span style={{ fontVariantNumeric: 'tabular-nums' }}>{fmtUsd(row.grossTotal as number)}</span> },
                  { key: 'netTotal', header: 'Net', align: 'right', render: row => <span style={{ font: 'var(--rf-text-body-sm-strong)', color: 'var(--rf-color-success-text)', fontVariantNumeric: 'tabular-nums' }}>{fmtUsd(row.netTotal as number)}</span> },
                  { key: 'taxes', header: 'Taxes', align: 'right', render: row => <span style={{ color: 'var(--rf-color-text-secondary)', fontVariantNumeric: 'tabular-nums' }}>{fmtUsd((row.taxes as PayStubLine[]).reduce((s, t) => s + t.current, 0))}</span> },
                  { key: 'ytdGrossTotal', header: 'YTD Gross', align: 'right', render: row => <span style={{ color: 'var(--rf-color-text-tertiary)', fontVariantNumeric: 'tabular-nums' }}>{fmtUsd(row.ytdGrossTotal as number)}</span> },
                ]}
                data={stubs.map(s => ({ ...s, id: s.userId }))}
                rowKey={r => r.id as string}
                onRowClick={row => setStub(stubs.find(s => s.userId === row.userId) ?? null)}
              />
            </Card>
          )}
        </div>
      )}

      <PayStubPanel stub={stub} open={!!stub} onClose={() => setStub(null)} />
    </div>
  );
}

// ─── Tax filings tab ───
function TaxFilingsTab() {
  const sorted = [...PORTAL_COMPANIES].sort((a, b) => a.name.localeCompare(b.name));
  const [companyId, setCompanyId] = useState(sorted[0].id);
  const [category, setCategory] = useState<'All' | DocCategory>('All');
  const { toast } = useToast();

  const company = PORTAL_COMPANIES.find(c => c.id === companyId)!;
  const docs = MOCK_TAX_DOCS[companyId] || [];
  const availableCategories: ('All' | DocCategory)[] = [
    'All',
    ...TAX_CATEGORY_ORDER.filter(c => docs.some(d => d.category === c)),
  ];
  const filtered = docs.filter(d => category === 'All' || d.category === category);
  const grouped = TAX_CATEGORY_ORDER.reduce<Record<string, TaxDoc[]>>((acc, cat) => {
    const items = filtered.filter(d => d.category === cat);
    if (items.length) acc[cat] = items;
    return acc;
  }, {});

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 20, alignItems: 'start' }}>
      <div style={{ position: 'sticky', top: 24 }}>
        <Field label="Company">
          <Select
            value={companyId}
            onChange={e => { setCompanyId(e.target.value); setCategory('All'); }}
            options={sorted.map(c => ({ value: c.id, label: c.name }))}
          />
        </Field>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <div>
            <div style={{ font: 'var(--rf-text-heading-md)', letterSpacing: 'var(--rf-tracking-tight)' }}>{company.name}</div>
            <div style={{ font: 'var(--rf-text-body-sm)', color: 'var(--rf-color-text-secondary)', marginTop: 2 }}>
              {docs.length} document{docs.length === 1 ? '' : 's'} available
            </div>
          </div>
          {availableCategories.length > 1 && (
            <SegmentedControl
              size="sm"
              value={category}
              onChange={v => setCategory(v as 'All' | DocCategory)}
              items={availableCategories.map(c => ({ value: c, label: c === 'All' ? 'All' : c.replace(/ filings| forms/, '') }))}
            />
          )}
        </div>

        {docs.length === 0 ? (
          <Card variant="default" padding="lg">
            <EmptyState
              icon={<FileText size={24} />}
              title={`No tax filing packages for ${company.name} yet`}
              description="Documents will appear here once Rollfi generates a filing or W-2 / 1099 batch for this company."
            />
          </Card>
        ) : Object.keys(grouped).length === 0 ? (
          <Card variant="default" padding="lg">
            <EmptyState
              icon={<FileText size={24} />}
              title="No documents in this category"
              description="Try selecting a different filter above."
            />
          </Card>
        ) : Object.entries(grouped).map(([cat, items]) => {
          const variant = TAX_CATEGORY_BADGE[cat as DocCategory];
          return (
            <Card key={cat} variant="default" padding="none">
              <div style={{
                padding: '12px 20px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: 'var(--rf-color-surface-elevated)',
                borderBottom: '1px solid var(--rf-color-border)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Badge variant={variant}>{cat}</Badge>
                </div>
                <span style={{ font: 'var(--rf-text-caption)', color: 'var(--rf-color-text-secondary)' }}>
                  {items.length} document{items.length === 1 ? '' : 's'}
                </span>
              </div>
              <Table
                columns={[
                  { key: 'fileName', header: 'Document', render: row => (
                    <div>
                      <div style={{ font: 'var(--rf-text-body-sm-strong)' }}>{row.fileName as string}</div>
                      <div style={{ font: 'var(--rf-text-caption-sm)', color: 'var(--rf-color-text-tertiary)', marginTop: 2 }}>{row.description as string}</div>
                    </div>
                  ) },
                  { key: 'documentType', header: 'Type', render: row => <Badge variant={variant}>{row.documentType as string}</Badge> },
                  { key: 'period', header: 'Period', render: row => <span style={{ fontVariantNumeric: 'tabular-nums', color: 'var(--rf-color-text-secondary)' }}>{row.period as string}</span> },
                  { key: 'generatedOn', header: 'Generated', render: row => row.generatedOn
                    ? <span style={{ fontVariantNumeric: 'tabular-nums', color: 'var(--rf-color-text-secondary)' }}>{fmtIsoDate(row.generatedOn as string)}</span>
                    : <span style={{ color: 'var(--rf-color-text-tertiary)' }}>Pending</span> },
                  { key: 'status', header: 'Status', render: row => row.status === 'available'
                    ? <Badge variant="success">Available</Badge>
                    : <Badge variant="neutral">Pending</Badge> },
                  { key: 'actions', header: '', align: 'right', render: row => (
                    <Button
                      size="sm"
                      variant="secondary"
                      icon={<Download size={12} />}
                      disabled={row.status !== 'available'}
                      onClick={() => toast(`Downloading ${row.fileName as string}`)}
                    >
                      Download
                    </Button>
                  ) },
                ]}
                data={items.map(d => ({ ...d, id: d.documentId }))}
                rowKey={r => r.id as string}
              />
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function ActivityView() {
  const [subTab, setSubTab] = useState('payments');
  return (
    <>
      <PageHeader title="Payroll activity" subtitle="Money movement and tax filing packages" />
      <div style={{ marginBottom: 20 }}>
        <Tabs
          tabs={[
            { key: 'payments', label: 'Payments' },
            { key: 'tax_filings', label: 'Tax filings' },
          ]}
          value={subTab}
          onChange={setSubTab}
        />
      </div>
      {subTab === 'payments' && <PaymentsTab />}
      {subTab === 'tax_filings' && <TaxFilingsTab />}
    </>
  );
}

// ─── Billing helpers ───
function PayrollSpeedBadge({ row }: { row: BillingRow }) {
  if (row.oneDayPayrollEnabled) return <Badge variant="success">1-Day</Badge>;
  if (row.bankMethod === 'plaid') return <Badge variant="teal">2-Day</Badge>;
  return <Badge variant="purple">4-Day</Badge>;
}

function BillingReportTab() {
  const [periodKey, setPeriodKey] = useState(BILLING_MONTHS[1].key);
  const [detailed, setDetailed] = useState(false);
  const [search, setSearch] = useState('');

  const period = BILLING_MONTHS.find(m => m.key === periodKey) ?? BILLING_MONTHS[1];
  const isCurrent = period.current;
  const filtered = MOCK_BILLING.filter(c =>
    c.company.toLowerCase().includes(search.toLowerCase()) ||
    c.zenithCompanyId.toLowerCase().includes(search.toLowerCase())
  );
  const totals = MOCK_BILLING.reduce(
    (acc, c) => ({ companies: acc.companies + 1, active: acc.active + c.totalActiveUsers, paid: acc.paid + c.totalPaidUsers }),
    { companies: 0, active: 0, paid: 0 }
  );

  return (
    <>
      <Card variant="default" padding="md" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
          <div style={{ flex: 1, maxWidth: 320 }}>
            <Field label="Billing period" hint={`${fmtIsoDate(period.startDate)} to ${fmtIsoDate(period.endDate)}`}>
              <Select
                value={periodKey}
                onChange={e => setPeriodKey(e.target.value)}
                options={BILLING_MONTHS.map(m => ({ value: m.key, label: m.label + (m.current ? ' (current)' : '') }))}
              />
            </Field>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {isCurrent && (
              <div style={{
                padding: '8px 14px',
                background: 'var(--rf-color-warning-bg)',
                border: '1px solid var(--rf-color-warning-border)',
                borderRadius: 'var(--rf-radius-sm)',
                font: 'var(--rf-text-caption)',
                color: 'var(--rf-color-warning-text)',
              }}>
                Current month — figures update as payroll runs.
              </div>
            )}
            <Switch checked={detailed} onChange={setDetailed} label="Detailed" />
            <Button size="sm" icon={<Download size={14} />}>Export</Button>
          </div>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard label="Companies billed" value={totals.companies} />
        <StatCard label="Active employees" value={totals.active} />
        <StatCard label="Paid employees" value={totals.paid} />
      </div>

      <Card variant="default" padding="none">
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--rf-color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <span style={{ font: 'var(--rf-text-body-sm)', color: 'var(--rf-color-text-secondary)' }}>
            {filtered.length} compan{filtered.length === 1 ? 'y' : 'ies'} · {period.label}
          </span>
          <div style={{ maxWidth: 280, width: '100%' }}>
            <Input
              icon={<MagnifyingGlass size={14} />}
              placeholder="Search companies"
              inputSize="sm"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        <Table
          columns={[
            { key: 'company', header: 'Company', sortable: true, render: row => (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                <Avatar name={row.company as string} size="sm" />
                <div style={{ minWidth: 0 }}>
                  <div style={{ font: 'var(--rf-text-body-sm-strong)' }}>{row.company as string}</div>
                  <div style={{ font: 'var(--rf-text-caption-sm)', color: 'var(--rf-color-text-tertiary)', fontFamily: 'var(--rf-font-mono)' }}>{row.zenithCompanyId as string}</div>
                </div>
              </div>
            ) },
            { key: 'totalActiveUsers', header: 'Active', align: 'right', sortable: true, render: row => <span style={{ fontVariantNumeric: 'tabular-nums' }}>{row.totalActiveUsers as number}</span> },
            { key: 'totalPaidUsers', header: 'Paid', align: 'right', sortable: true, render: row => <span style={{ fontVariantNumeric: 'tabular-nums' }}>{row.totalPaidUsers as number}</span> },
            { key: 'filings', header: 'Tax filings', render: row => (
              <span style={{ font: 'var(--rf-text-caption)', color: 'var(--rf-color-text-secondary)', fontVariantNumeric: 'tabular-nums' }}>
                W-2 <strong style={{ color: 'var(--rf-color-text)' }}>{row.W2Filings as number}</strong> · 1099 <strong style={{ color: 'var(--rf-color-text)' }}>{row.k1099Filings as number}</strong> · Q <strong style={{ color: 'var(--rf-color-text)' }}>{row.quarterlyTaxPackage as number}</strong>
              </span>
            ) },
            { key: 'achReturns', header: 'Returns', align: 'right', sortable: true, render: row => {
              const n = row.achReturns as number;
              return n > 0
                ? <span style={{ font: 'var(--rf-text-body-sm-strong)', color: 'var(--rf-color-danger-text)', fontVariantNumeric: 'tabular-nums' }}>{n}</span>
                : <span style={{ color: 'var(--rf-color-text-tertiary)' }}>—</span>;
            } },
            { key: 'speed', header: 'Payroll speed', render: row => <PayrollSpeedBadge row={row as BillingRow} /> },
          ]}
          data={filtered}
          rowKey={r => r.zenithCompanyId as string}
          emptyMessage="No companies match your search."
          expandable={detailed ? (row => (
            <div style={{ padding: '14px 24px 18px' }}>
              <div style={{ font: 'var(--rf-text-caption-sm)', fontWeight: 700, color: 'var(--rf-color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
                Per-EIN paychecks
              </div>
              <DataGrid columns={4} items={[
                { label: 'EINs', value: row.EINs as number },
                { label: 'W-2 filings', value: row.W2Filings as number },
                { label: '1099 filings', value: row.k1099Filings as number },
                { label: 'Quarterly packages', value: row.quarterlyTaxPackage as number },
              ]} />
            </div>
          )) : undefined}
        />
      </Card>
    </>
  );
}

function PricingControlsTab() {
  const [pricing, setPricing] = useState<Record<string, PricingRate>>(DEFAULT_PRICING);
  const [fees, setFees] = useState(DEFAULT_FEES);
  const [tt, setTT] = useState(true);
  const [pto, setPto] = useState(true);
  const [dirty, setDirty] = useState(false);
  const { toast } = useToast();

  const setRate = (key: string, val: number) => { setPricing({ ...pricing, [key]: { ...pricing[key], value: val } }); setDirty(true); };
  const setFee = (key: keyof typeof DEFAULT_FEES, val: number) => { setFees({ ...fees, [key]: val }); setDirty(true); };
  const reset = () => { setPricing(DEFAULT_PRICING); setFees(DEFAULT_FEES); setTT(true); setPto(true); setDirty(false); };
  const save = () => { setDirty(false); toast('Pricing saved', { variant: 'success' }); };

  // Compute total revenue from MOCK_BILLING
  const revenue = MOCK_BILLING.reduce((acc, c) => {
    const r = (k: string) => pricing[k]?.value ?? 0;
    let gross =
      r('perActiveEmployee') * c.totalActiveUsers +
      r('perEinMonthly') * c.EINs +
      r('perQuarterlyPackage') * c.quarterlyTaxPackage +
      (c.oneDayPayrollEnabled ? r('oneDayPayrollMonthly') : 0);
    if (tt) gross += r('timeTrackingPerEmployee') * c.totalActiveUsers;
    if (pto) gross += r('ptoPerEin') * c.EINs + r('ptoPerEmployee') * c.totalActiveUsers;
    return acc + gross;
  }, 0);
  const tieredCount = Object.values(pricing).filter(v => v.type === 'tiered').length;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Card variant="default" padding="md">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
            <div style={{ font: 'var(--rf-text-heading-sm)', letterSpacing: 'var(--rf-tracking-tight)' }}>Recurring rates</div>
            <span style={{ font: 'var(--rf-text-caption)', color: 'var(--rf-color-text-tertiary)' }}>{tieredCount} of {RATE_FIELDS.length} tiered</span>
          </div>
          <div style={{ font: 'var(--rf-text-body-sm)', color: 'var(--rf-color-text-secondary)', marginBottom: 16, lineHeight: 1.5 }}>
            Recurring per-unit charges billed against <code style={{ background: 'var(--rf-color-surface-elevated)', padding: '1px 6px', borderRadius: 4, font: 'var(--rf-text-code)' }}>generateZenithBillingReport</code>. Toggle a rate to tiered for volume-based brackets.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {RATE_FIELDS.map(f => (
              <Field key={f.key} label={f.label} hint={f.helper}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <Input prefix="$" value={String(pricing[f.key]?.value ?? 0)} onChange={e => setRate(f.key, parseFloat(e.target.value) || 0)} />
                  <Switch
                    checked={pricing[f.key]?.type === 'tiered'}
                    onChange={v => { setPricing({ ...pricing, [f.key]: { ...pricing[f.key], type: v ? 'tiered' : 'flat' } }); setDirty(true); }}
                    label="Tiered"
                  />
                </div>
              </Field>
            ))}
          </div>
        </Card>

        <Card variant="default" padding="md">
          <div style={{ font: 'var(--rf-text-heading-sm)', letterSpacing: 'var(--rf-tracking-tight)', marginBottom: 4 }}>One-time fees</div>
          <div style={{ font: 'var(--rf-text-body-sm)', color: 'var(--rf-color-text-secondary)', marginBottom: 16 }}>
            Charged once at the event. Use for setup, expedited work, or out-of-band corrections.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Field label="New company onboarding"><Input prefix="$" value={String(fees.newCompanyOnboarding)} onChange={e => setFee('newCompanyOnboarding', parseFloat(e.target.value) || 0)} /></Field>
            <Field label="Expedited filing"><Input prefix="$" value={String(fees.expeditedFiling)} onChange={e => setFee('expeditedFiling', parseFloat(e.target.value) || 0)} /></Field>
            <Field label="Manual correction"><Input prefix="$" value={String(fees.manualCorrection)} onChange={e => setFee('manualCorrection', parseFloat(e.target.value) || 0)} /></Field>
          </div>
        </Card>

        <Card variant="default" padding="md">
          <div style={{ font: 'var(--rf-text-heading-sm)', letterSpacing: 'var(--rf-tracking-tight)', marginBottom: 4 }}>Add-on products</div>
          <div style={{ font: 'var(--rf-text-body-sm)', color: 'var(--rf-color-text-secondary)', marginBottom: 16 }}>
            Charged only for companies with the feature enabled per-company in Implementations.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: -4 }}>
              <span style={{ font: 'var(--rf-text-body-md-strong)' }}>Time Tracking</span>
              <Badge variant="teal">Feature flagged</Badge>
            </div>
            <Field label="Per employee, monthly"><Input prefix="$" value={String(pricing.timeTrackingPerEmployee.value)} onChange={e => setRate('timeTrackingPerEmployee', parseFloat(e.target.value) || 0)} /></Field>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, marginBottom: -4 }}>
              <span style={{ font: 'var(--rf-text-body-md-strong)' }}>PTO</span>
              <Badge variant="teal">Feature flagged</Badge>
            </div>
            <Field label="Per EIN, monthly"><Input prefix="$" value={String(pricing.ptoPerEin.value)} onChange={e => setRate('ptoPerEin', parseFloat(e.target.value) || 0)} /></Field>
            <Field label="Per employee, monthly"><Input prefix="$" value={String(pricing.ptoPerEmployee.value)} onChange={e => setRate('ptoPerEmployee', parseFloat(e.target.value) || 0)} /></Field>
          </div>
        </Card>

        <SaveBar dirty={dirty} onReset={reset} onSave={save} />
      </div>

      <div style={{ position: 'sticky', top: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <StatCard
          label="Total revenue (current period)"
          value={<span style={{ fontVariantNumeric: 'tabular-nums' }}>${revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>}
        />
        <Card variant="default" padding="md">
          <div style={{ font: 'var(--rf-text-caption)', color: 'var(--rf-color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Rate breakdown</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <DetailRow label="Per active employee" value={<span style={{ fontVariantNumeric: 'tabular-nums' }}>${pricing.perActiveEmployee.value.toFixed(2)}</span>} />
            <DetailRow label="Per EIN" value={<span style={{ fontVariantNumeric: 'tabular-nums' }}>${pricing.perEinMonthly.value.toFixed(2)}</span>} />
            <DetailRow label="Per quarterly package" value={<span style={{ fontVariantNumeric: 'tabular-nums' }}>${pricing.perQuarterlyPackage.value.toFixed(2)}</span>} />
            <DetailRow label="1-Day Payroll add-on" value={<span style={{ fontVariantNumeric: 'tabular-nums' }}>${pricing.oneDayPayrollMonthly.value.toFixed(2)}</span>} />
          </div>
        </Card>
        <Card variant="default" padding="md">
          <div style={{ font: 'var(--rf-text-caption)', color: 'var(--rf-color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Counts</div>
          <DetailRow label="Companies billed" value={MOCK_BILLING.length} />
          <DetailRow label="Tiered rates" value={tieredCount} />
          <DetailRow label="Active add-on companies" value={(tt ? MOCK_BILLING.length : 0) + (pto ? MOCK_BILLING.length : 0)} />
        </Card>
      </div>
    </div>
  );
}

interface Scenario {
  id: string;
  name: string;
  companies: number;
  avgEmployees: number;
  payFreq: 'weekly' | 'biweekly' | 'semimonthly' | 'monthly';
  einPerCompany: number;
  oneDayPct: number;
}

const DEFAULT_SCENARIO: Omit<Scenario, 'id'> = {
  name: 'Base case', companies: 25, avgEmployees: 40, payFreq: 'biweekly', einPerCompany: 1, oneDayPct: 20,
};

function simulateRevenue(s: Scenario, p: Record<string, PricingRate>) {
  const totalEmps = s.companies * s.avgEmployees;
  const totalEins = s.companies * s.einPerCompany;
  const monthly =
    (p.perActiveEmployee.value * totalEmps) +
    (p.perEinMonthly.value * totalEins) +
    (p.perQuarterlyPackage.value * (totalEins / 3)) +
    (p.oneDayPayrollMonthly.value * s.companies * (s.oneDayPct / 100));
  return { monthly, annual: monthly * 12, totalEmps };
}

function SimulationTab() {
  const [scenarios, setScenarios] = useState<Scenario[]>([{ ...DEFAULT_SCENARIO, id: 's1' }]);
  const results = scenarios.map(s => simulateRevenue(s, DEFAULT_PRICING));
  const maxAnnual = Math.max(...results.map(r => r.annual), 1);
  const names = ['Base case', 'Growth case', 'Stretch case'];
  const update = (id: string, patch: Partial<Scenario>) =>
    setScenarios(scenarios.map(s => s.id === id ? { ...s, ...patch } : s));
  const add = () => {
    if (scenarios.length >= 3) return;
    setScenarios([...scenarios, {
      ...DEFAULT_SCENARIO,
      id: 's' + Math.random().toString(36).slice(2, 6),
      name: names[scenarios.length] || `Scenario ${scenarios.length + 1}`,
      companies: DEFAULT_SCENARIO.companies * (scenarios.length + 1),
      avgEmployees: DEFAULT_SCENARIO.avgEmployees + scenarios.length * 10,
    }]);
  };
  const remove = (id: string) => setScenarios(scenarios.filter(s => s.id !== id));

  return (
    <>
      <Callout variant="warning" icon={<Lightning size={16} weight="fill" />} title="Model your revenue potential">
        Dial in your expected portfolio size and mix to see what your payroll product generates. Rates pull from your current price book. Add up to 3 scenarios to compare a base, growth, and stretch case side by side.
      </Callout>

      {scenarios.length > 1 && (
        <Card variant="default" padding="md" style={{ marginTop: 16 }}>
          <div style={{ font: 'var(--rf-text-heading-sm)', letterSpacing: 'var(--rf-tracking-tight)', marginBottom: 12 }}>Side-by-side comparison</div>
          <StackedBar
            format={n => `$${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`}
            segments={scenarios.map((s, i) => ({
              label: s.name,
              value: results[i].annual,
              color: ['var(--rf-color-success)', 'var(--rf-color-accent-teal)', 'var(--rf-color-accent-purple)'][i],
            }))}
          />
        </Card>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${scenarios.length}, 1fr)`, gap: 16, marginTop: 16 }}>
        {scenarios.map((s, i) => {
          const r = results[i];
          return (
            <Card key={s.id} variant="default" padding="md">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <div style={{ font: 'var(--rf-text-heading-sm)', letterSpacing: 'var(--rf-tracking-tight)' }}>{s.name}</div>
                  <div style={{ font: 'var(--rf-text-caption)', color: 'var(--rf-color-text-tertiary)' }}>{r.totalEmps.toLocaleString()} employees served</div>
                </div>
                {scenarios.length > 1 && (
                  <Button variant="ghost" size="sm" onClick={() => remove(s.id)}>Remove</Button>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 16 }}>
                <NumberStepper label="Companies" value={s.companies} min={1} max={500} step={5} onChange={v => update(s.id, { companies: v })} />
                <NumberStepper label="Avg employees per company" value={s.avgEmployees} min={1} max={500} step={5} onChange={v => update(s.id, { avgEmployees: v })} />
                <Field label="Pay frequency">
                  <Select
                    value={s.payFreq}
                    onChange={e => update(s.id, { payFreq: e.target.value as Scenario['payFreq'] })}
                    options={[
                      { value: 'weekly', label: 'Weekly' },
                      { value: 'biweekly', label: 'Bi-weekly' },
                      { value: 'semimonthly', label: 'Semi-monthly' },
                      { value: 'monthly', label: 'Monthly' },
                    ]}
                  />
                </Field>
                <Slider label="1-Day Payroll adoption" value={s.oneDayPct} min={0} max={100} step={5} format={v => `${v}%`} onChange={v => update(s.id, { oneDayPct: v })} hint="Companies on the 1-Day Payroll plan" />
              </div>

              <div style={{ paddingTop: 12, borderTop: '1px solid var(--rf-color-border-subtle)' }}>
                <DataGrid columns={2} items={[
                  { label: 'Monthly revenue', value: <span style={{ fontVariantNumeric: 'tabular-nums' }}>${r.monthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span> },
                  { label: 'Annual revenue', value: <span style={{ font: 'var(--rf-text-heading-sm)', color: 'var(--rf-color-success-text)', fontVariantNumeric: 'tabular-nums' }}>${r.annual.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span> },
                ]} />
              </div>

              {scenarios.length > 1 && (
                <Progress
                  className="rf-mt-3"
                  label="Share of total"
                  value={r.annual}
                  max={maxAnnual}
                  variant="success"
                  showValue
                  format={v => `${Math.round((v / maxAnnual) * 100)}%`}
                />
              )}
            </Card>
          );
        })}
      </div>

      {scenarios.length < 3 && (
        <div style={{ marginTop: 16 }}>
          <Button variant="secondary" size="sm" icon={<Plus size={14} />} onClick={add}>Add scenario</Button>
        </div>
      )}
    </>
  );
}

function PayoutAccountTab() {
  const [account, setAccount] = useState<PayoutAccount | null>(MOCK_PAYOUT_ACCOUNT);
  const [removing, setRemoving] = useState(false);
  const { toast } = useToast();

  return (
    <>
      <Callout variant="info" icon={<CreditCard size={16} />} title="Partner payout account">
        This is the account Rollfi uses to send your share of payroll revenue. Only one account is supported. Connect via Plaid for instant verification, or enter your routing and account number manually.
      </Callout>

      {!account ? (
        <Card variant="default" padding="lg" style={{ marginTop: 16 }}>
          <EmptyState
            icon={<CreditCard size={24} />}
            title="No payout account connected"
            description="Connect a bank account to receive payroll revenue payouts. Payouts are held until a verified account is on file."
            action={<Button icon={<Plus size={14} />} onClick={() => { setAccount(MOCK_PAYOUT_ACCOUNT); toast('Payout account connected', { variant: 'success' }); }}>Connect payout account</Button>}
          />
        </Card>
      ) : (
        <Card variant="default" padding="none" style={{ marginTop: 16, borderColor: account.status === 'pending_verification' ? 'var(--rf-color-warning-border)' : 'var(--rf-color-success-border)' }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 20px',
            background: account.status === 'pending_verification' ? 'var(--rf-color-warning-bg)' : 'var(--rf-color-success-bg)',
            borderBottom: `1px solid ${account.status === 'pending_verification' ? 'var(--rf-color-warning-border)' : 'var(--rf-color-success-border)'}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ font: 'var(--rf-text-body-sm-strong)' }}>Payout account</span>
              <MethodBadge method={account.method} />
              {account.status === 'active' ? <Badge variant="success">Active</Badge> : <Badge variant="warning">Pending verification</Badge>}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {account.status === 'pending_verification' && (
                <Button size="sm" icon={<CheckCircle size={12} />}>Verify deposits</Button>
              )}
              <Button variant="secondary" size="sm" onClick={() => setRemoving(true)}>Remove</Button>
            </div>
          </div>
          <div style={{ padding: '20px' }}>
            <DataGrid columns={4} items={[
              { label: 'Bank', value: account.bankName },
              { label: 'Account name', value: account.accountName },
              { label: 'Account', value: account.accountNumber },
              { label: 'Type', value: account.accountType.charAt(0).toUpperCase() + account.accountType.slice(1) },
            ]} />
          </div>
        </Card>
      )}

      <AlertDialog
        open={removing}
        onClose={() => setRemoving(false)}
        variant="destructive"
        title="Remove payout account?"
        description="Rollfi will hold all future payouts until a new verified account is connected. Existing scheduled payouts are unaffected."
        confirmLabel="Remove"
        onConfirm={() => { setAccount(null); setRemoving(false); toast('Payout account removed', { variant: 'error' }); }}
      />
    </>
  );
}

function BillingView() {
  const [subTab, setSubTab] = useState('report');
  return (
    <>
      <PageHeader title="Billing" />
      <div style={{ marginBottom: 20 }}>
        <Tabs
          tabs={[
            { key: 'report', label: 'Report' },
            { key: 'pricing', label: 'Pricing controls' },
            { key: 'simulation', label: 'Simulation' },
            { key: 'payout', label: 'Payout account' },
          ]}
          value={subTab}
          onChange={setSubTab}
        />
      </div>
      {subTab === 'report' && <BillingReportTab />}
      {subTab === 'pricing' && <PricingControlsTab />}
      {subTab === 'simulation' && <SimulationTab />}
      {subTab === 'payout' && <PayoutAccountTab />}
    </>
  );
}

function UsersView() {
  const [addOpen, setAddOpen] = useState(false);
  const [page, setPage] = useState(1);
  const { toast } = useToast();
  const users = [
    { id: 'u1', name: 'Michael Scott', email: 'michael.scott@rollfi.xyz', dateAdded: '2025-09-12', role: 'Partner Admin', scope: 'All companies' },
    { id: 'u2', name: 'Pam Beesly', email: 'pam.beesly@rollfi.xyz', dateAdded: '2025-11-04', role: 'Account Manager', scope: '3 companies' },
    { id: 'u3', name: 'Jim Halpert', email: 'jim.halpert@rollfi.xyz', dateAdded: '2026-01-20', role: 'Account Manager', scope: '5 companies' },
    { id: 'u4', name: 'Dwight Schrute', email: 'dwight.schrute@rollfi.xyz', dateAdded: '2026-03-08', role: 'Partner Admin', scope: 'All companies' },
  ];
  return (
    <>
      <PageHeader
        title="Users"
        subtitle="Manage your team's access"
        action={<Button size="sm" icon={<Plus size={14} />} onClick={() => setAddOpen(true)}>Add new user</Button>}
      />
      <Card variant="outlined" padding="none">
        <Table
          columns={[
            { key: 'name', header: 'Name', sortable: true, render: row => (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Avatar name={row.name as string} size="sm" />
                <div>
                  <div style={{ font: 'var(--rf-text-body-sm-strong)' }}>{row.name as string}</div>
                  <div style={{ font: 'var(--rf-text-caption)', color: 'var(--rf-color-text-tertiary)' }}>{row.email as string}</div>
                </div>
              </div>
            ) },
            { key: 'dateAdded', header: 'Date added', sortable: true },
            { key: 'role', header: 'Role', render: row => (
              <Badge variant={(row.role as string) === 'Partner Admin' ? 'purple' : 'info'}>{row.role as string}</Badge>
            ) },
            { key: 'scope', header: 'Scope' },
            { key: 'actions', header: '', render: row => (
              <DropdownMenu
                trigger={<button type="button" style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--rf-color-text-tertiary)', padding: 4 }}>•••</button>}
                items={[
                  { label: 'Edit', icon: <PencilSimple size={14} />, onClick: () => toast(`Editing ${row.name}`) },
                  { label: 'Remove', icon: <Trash size={14} />, onClick: () => toast('User removed', { variant: 'error' }), danger: true },
                ]}
              />
            ) },
          ]}
          data={users}
          rowKey={r => r.id as string}
        />
      </Card>

      <div style={{ marginTop: 16 }}>
        <Pagination current={page} total={8} onChange={setPage} />
      </div>

      <SidePanel
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add team member"
        description="Invite a Partner Admin or Account Manager"
        footer={
          <>
            <Button variant="secondary" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={() => { setAddOpen(false); toast('Invite sent', { variant: 'success' }); }}>Send invite</Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="First name" required><Input placeholder="Jane" /></Field>
            <Field label="Last name" required><Input placeholder="Smith" /></Field>
          </div>
          <Field label="Email" required><Input placeholder="jane@partner.com" /></Field>
          <Field label="Role" required hint="Account Managers only see assigned companies">
            <Select placeholder="Select role..." options={[
              { value: 'admin', label: 'Partner Admin' },
              { value: 'manager', label: 'Account Manager' },
            ]} />
          </Field>
          <Field label="Assigned companies">
            <MultiSelect
              values={[]}
              onChange={() => {}}
              options={PORTAL_COMPANIES.map(c => ({ value: c.id, label: c.name }))}
              placeholder="Select companies..."
            />
          </Field>
        </div>
      </SidePanel>
    </>
  );
}

const TENANT_PRESETS = [
  { id: 'rollfi', label: 'Rollfi', brand: undefined,  sidebar: undefined,  logoUrl: undefined },
  { id: 'acme',   label: 'Acme',   brand: '#0066ff',  sidebar: '#1a1f2e',  logoUrl: 'https://placehold.co/120x40/0066ff/white?text=ACME&font=lato' },
  { id: 'nova',   label: 'Nova',   brand: '#7c3aed',  sidebar: undefined,  logoUrl: 'https://placehold.co/120x40/7c3aed/white?text=NOVA&font=lato' },
  { id: 'mint',   label: 'Mint',   brand: '#16a34a',  sidebar: '#f4f4f6',  logoUrl: 'https://placehold.co/120x40/16a34a/white?text=MINT&font=lato' },
];

function PortalMock({ onExit }: { onExit: () => void }) {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [notifOpen, setNotifOpen] = useState(false);
  const [tenantId, setTenantId] = useState('rollfi');
  const tenant = TENANT_PRESETS.find(t => t.id === tenantId) ?? TENANT_PRESETS[0];

  return (
    <BrandProvider
      brand={tenant.brand}
      sidebar={tenant.sidebar}
      logoUrl={tenant.logoUrl}
      logoTitle={tenant.label}
    >
    <div style={{ display: 'flex', height: '100vh', background: 'var(--rf-color-canvas)' }}>
      <Sidebar
        activeId={activeNav}
        onSelect={setActiveNav}
        logo={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: 8 }}>
            <Logo size={22} />
            <button
              type="button"
              onClick={onExit}
              style={{ background: 'transparent', border: 'none', color: 'var(--rf-color-sidebar-text-dim)', cursor: 'pointer', font: 'var(--rf-text-caption-sm)' }}
              aria-label="Back to library"
            >
              ← Library
            </button>
          </div>
        }
        items={[
          { id: 'dashboard', label: 'Dashboard', icon: <House size={16} /> },
          { id: 'implementations', label: 'Implementations', icon: <Lightning size={16} /> },
          { id: 'activity', label: 'Payroll activity', icon: <ChartBar size={16} />, badge: <Badge variant="danger">1</Badge> },
          { id: 'billing', label: 'Billing', icon: <CreditCard size={16} /> },
          { id: 'users', label: 'Users', icon: <User size={16} /> },
        ]}
        secondaryItems={[
          { id: 'notifications', label: 'Notifications', icon: <Bell size={16} />, badge: <Badge variant="danger">3</Badge>, onClick: () => setNotifOpen(true) },
          { id: 'signout', label: 'Sign out', icon: <ArrowLeft size={16} />, onClick: () => {} },
        ]}
        footer={
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 4 }}>
            <Avatar name="Michael Scott" size="sm" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ font: 'var(--rf-text-caption)', color: 'var(--rf-color-sidebar-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Michael Scott</div>
              <div style={{ font: 'var(--rf-text-caption-sm)', color: 'var(--rf-color-sidebar-text-dim)' }}>Partner Admin</div>
            </div>
          </div>
        }
      />

      <main style={{ flex: 1, overflow: 'auto' }}>
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 40px',
            background: 'var(--rf-color-surface-elevated)',
            borderBottom: '1px solid var(--rf-color-border)',
            position: 'sticky', top: 0, zIndex: 10,
          }}
        >
          <span style={{ font: 'var(--rf-text-caption-sm)', color: 'var(--rf-color-text-tertiary)', textTransform: 'uppercase', letterSpacing: 0.4 }}>
            White-label demo · viewing as
          </span>
          <div style={{ display: 'inline-flex', gap: 6, flex: 1 }}>
            {TENANT_PRESETS.map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTenantId(t.id)}
                style={{
                  font: 'var(--rf-text-caption)',
                  padding: '4px 10px',
                  borderRadius: 'var(--rf-radius-full)',
                  border: '1px solid ' + (t.id === tenantId ? 'var(--rf-color-brand-border)' : 'var(--rf-color-border)'),
                  background: t.id === tenantId ? 'var(--rf-color-brand-soft)' : 'var(--rf-color-surface)',
                  color: t.id === tenantId ? 'var(--rf-color-brand-text)' : 'var(--rf-color-text-secondary)',
                  cursor: 'pointer',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
          <ThemeToggle variant="segmented" size="sm" />
        </div>
        <div style={{ padding: '32px 40px 56px' }}>
          {activeNav === 'dashboard' && <DashboardView />}
          {activeNav === 'implementations' && <ImplementationsView />}
          {activeNav === 'activity' && <ActivityView />}
          {activeNav === 'billing' && <BillingView />}
          {activeNav === 'users' && <UsersView />}
        </div>
      </main>

      <SidePanel
        open={notifOpen}
        onClose={() => setNotifOpen(false)}
        title="Notifications"
        footer={<Button variant="ghost" size="sm" onClick={() => setNotifOpen(false)}>Mark all read</Button>}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Alert variant="danger" icon={<Warning size={18} weight="fill" />}>
            <div style={{ font: 'var(--rf-text-body-sm-strong)', marginBottom: 2 }}>Failed transaction · Umbrella LLC</div>
            <div>Stanley Hudson's direct deposit was rejected. Apr 15, 2026.</div>
          </Alert>
          <Alert variant="warning" icon={<Warning size={18} />}>
            <div style={{ font: 'var(--rf-text-body-sm-strong)', marginBottom: 2 }}>Bank verification pending · Globex Inc</div>
            <div>Micro-deposits sent 2 days ago. Verify by Apr 18.</div>
          </Alert>
          <Alert variant="info" icon={<Info size={18} />}>
            <div style={{ font: 'var(--rf-text-body-sm-strong)', marginBottom: 2 }}>New user invited</div>
            <div>Jim Halpert accepted the invitation as Account Manager.</div>
          </Alert>
        </div>
      </SidePanel>
    </div>
    </BrandProvider>
  );
}

export default function App() {
  return (
    <IconContext.Provider value={{ weight: 'regular', size: 16 }}>
      <ThemeProvider>
        <ToastProvider>
          <Demo />
        </ToastProvider>
      </ThemeProvider>
    </IconContext.Provider>
  );
}
