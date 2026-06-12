import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Table } from './Table';
import { Card } from '../Card/Card';
import { Badge } from '../Badge/Badge';

interface CompanyRow extends Record<string, unknown> {
  id: string;
  name: string;
  plan: string;
  mrr: string;
  mrrSort: number;
  status: 'Active' | 'Trialing' | 'Churned';
}

const ROWS: CompanyRow[] = [
  { id: '1', name: 'Acme Corp',     plan: 'Pro',        mrr: '$2,400',  mrrSort: 2400,  status: 'Active' },
  { id: '2', name: 'Globex Inc',    plan: 'Starter',    mrr: '$600',    mrrSort: 600,   status: 'Active' },
  { id: '3', name: 'Initech',       plan: 'Enterprise', mrr: '$12,000', mrrSort: 12000, status: 'Trialing' },
  { id: '4', name: 'Umbrella LLC',  plan: 'Pro',        mrr: '$2,400',  mrrSort: 2400,  status: 'Churned' },
  { id: '5', name: 'Stark Industries', plan: 'Enterprise', mrr: '$18,000', mrrSort: 18000, status: 'Active' },
  { id: '6', name: 'Wayne Enterprises', plan: 'Pro',     mrr: '$3,200',  mrrSort: 3200,  status: 'Trialing' },
  { id: '7', name: 'WeWork',        plan: 'Starter',    mrr: '$600',    mrrSort: 600,   status: 'Churned' },
];

const statusVariant = (s: CompanyRow['status']) =>
  s === 'Active' ? 'success' : s === 'Trialing' ? 'info' : 'danger';

const baseColumns = [
  { key: 'name',   header: 'Company',                sortable: true },
  { key: 'plan',   header: 'Plan',                   sortable: true, filterable: true },
  { key: 'mrr',    header: 'MRR', align: 'right' as const, sortable: true,
    sortValue: (row: CompanyRow) => row.mrrSort },
  {
    key: 'status',
    header: 'Status',
    filterable: true,
    render: (row: CompanyRow) => <Badge variant={statusVariant(row.status)}>{row.status}</Badge>,
    filterValue: (row: CompanyRow) => row.status,
  },
];

const meta = {
  title: 'Layout / Table',
  component: Table,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { columns: [], data: [], rowKey: (r: CompanyRow) => r.id },
} satisfies Meta<typeof Table<CompanyRow>>;

export default meta;
type Story = StoryObj<typeof meta>;

const Frame = ({ children }: { children: React.ReactNode }) => (
  <Card variant="outlined" padding="none" style={{ minWidth: 720 }}>
    {children}
  </Card>
);

export const Default: Story = {
  name: 'Default (no filtering)',
  render: () => (
    <Frame>
      <Table columns={baseColumns} data={ROWS} rowKey={r => r.id} />
    </Frame>
  ),
};

export const Sortable: Story = {
  name: 'Sortable columns',
  render: () => (
    <Frame>
      <Table columns={baseColumns} data={ROWS} rowKey={r => r.id} />
    </Frame>
  ),
};

export const Searchable: Story = {
  name: 'Search (substring across columns)',
  render: () => (
    <Frame>
      <Table
        columns={baseColumns}
        data={ROWS}
        rowKey={r => r.id}
        searchable
        searchPlaceholder="Search companies, plans, status…"
      />
    </Frame>
  ),
};

export const StructuredFilter: Story = {
  name: 'Filter menu (click "Filter")',
  render: () => (
    <Frame>
      <Table
        columns={baseColumns}
        data={ROWS}
        rowKey={r => r.id}
        filterable
      />
    </Frame>
  ),
};

export const SearchAndFilter: Story = {
  name: 'Search + Filter together',
  render: () => (
    <Frame>
      <Table
        columns={baseColumns}
        data={ROWS}
        rowKey={r => r.id}
        searchable
        filterable
        searchPlaceholder="Search companies…"
      />
    </Frame>
  ),
};

export const ControlledFilters: Story = {
  name: 'Controlled active filters',
  render: () => {
    const [filters, setFilters] = useState<Record<string, string[]>>({
      status: ['Active'],
    });
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p style={{ font: 'var(--rf-text-body-sm)', color: 'var(--rf-color-text-secondary)' }}>
          Pre-filtered to <strong>Status: Active</strong> on mount. Parent owns the state — useful for
          URL-persisted filters.
        </p>
        <code style={{ font: 'var(--rf-text-code)', color: 'var(--rf-color-text-tertiary)' }}>
          {JSON.stringify(filters)}
        </code>
        <Frame>
          <Table
            columns={baseColumns}
            data={ROWS}
            rowKey={r => r.id}
            filterable
            activeFilters={filters}
            onActiveFiltersChange={setFilters}
          />
        </Frame>
      </div>
    );
  },
};

export const EmptyAfterFilter: Story = {
  name: 'Smart empty state',
  render: () => (
    <Frame>
      <Table
        columns={baseColumns}
        data={ROWS}
        rowKey={r => r.id}
        searchable
        filterable
        searchPlaceholder='Try typing "zzz"'
      />
    </Frame>
  ),
};
