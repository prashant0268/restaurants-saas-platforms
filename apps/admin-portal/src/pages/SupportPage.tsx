import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { DataTable } from '../components/shared/DataTable';
import { StatusBadge } from '../components/shared/StatusBadge';
import { StatsCard } from '../components/shared/StatsCard';

const styles: Record<string, CSSProperties> = {
  title: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 24px 0',
  },
  statsRow: {
    display: 'flex',
    gap: '20px',
    marginBottom: '32px',
    flexWrap: 'wrap' as const,
  },
  filterBar: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
    flexWrap: 'wrap' as const,
  },
  searchInput: {
    padding: '10px 16px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    minWidth: '280px',
    outline: 'none',
  },
  filterSelect: {
    padding: '10px 16px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
  },
  viewBtn: {
    padding: '6px 14px',
    borderRadius: '6px',
    border: 'none',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    backgroundColor: '#dbeafe',
    color: '#1e40af',
  },
};

const columns = [
  { key: 'ticketId', header: 'Ticket ID', width: '12%' },
  { key: 'subject', header: 'Subject', width: '25%' },
  { key: 'submittedBy', header: 'Submitted By', width: '15%' },
  { key: 'category', header: 'Category', width: '12%' },
  { key: 'status', header: 'Status', width: '10%' },
  { key: 'priority', header: 'Priority', width: '10%' },
  { key: 'date', header: 'Date', width: '10%' },
  { key: 'actions', header: 'Actions', width: '6%' },
];

export const SupportPage = () => {
  const navigate = useNavigate();

  const sampleData = [
    {
      ticketId: '#TKT-891',
      subject: 'Order never delivered but charged',
      submittedBy: 'Alice Johnson',
      category: 'Dispute',
      status: <StatusBadge status="open" />,
      priority: <StatusBadge status="cancelled" label="High" />,
      date: 'Feb 9, 2026',
      actions: (
        <button style={styles.viewBtn} onClick={() => navigate('/support/891')}>
          View
        </button>
      ),
    },
    {
      ticketId: '#TKT-890',
      subject: 'Cannot update restaurant menu',
      submittedBy: 'Pizza Palace',
      category: 'Technical',
      status: <StatusBadge status="in_progress" />,
      priority: <StatusBadge status="pending" label="Medium" />,
      date: 'Feb 8, 2026',
      actions: (
        <button style={styles.viewBtn} onClick={() => navigate('/support/890')}>
          View
        </button>
      ),
    },
    {
      ticketId: '#TKT-889',
      subject: 'Driver was rude during delivery',
      submittedBy: 'Bob Williams',
      category: 'Complaint',
      status: <StatusBadge status="resolved" />,
      priority: <StatusBadge status="active" label="Low" />,
      date: 'Feb 7, 2026',
      actions: (
        <button style={styles.viewBtn} onClick={() => navigate('/support/889')}>
          View
        </button>
      ),
    },
    {
      ticketId: '#TKT-888',
      subject: 'Payout not received for January',
      submittedBy: 'Sushi Hub',
      category: 'Financial',
      status: <StatusBadge status="open" />,
      priority: <StatusBadge status="cancelled" label="High" />,
      date: 'Feb 6, 2026',
      actions: (
        <button style={styles.viewBtn} onClick={() => navigate('/support/888')}>
          View
        </button>
      ),
    },
  ];

  return (
    <PageContainer title="Support">
      <h1 style={styles.title}>Support Tickets</h1>

      {/* Stats */}
      <div style={styles.statsRow}>
        <StatsCard title="Open Tickets" value="23" color="#ef4444" />
        <StatsCard title="In Progress" value="15" color="#f59e0b" />
        <StatsCard title="Resolved Today" value="8" color="#10b981" />
        <StatsCard title="Avg Resolution Time" value="4.2h" color="#3b82f6" />
      </div>

      {/* Filters */}
      <div style={styles.filterBar}>
        <input
          type="text"
          placeholder="Search tickets by ID, subject, or user..."
          style={styles.searchInput}
        />
        <select style={styles.filterSelect}>
          <option value="">All Statuses</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
        <select style={styles.filterSelect}>
          <option value="">All Categories</option>
          <option value="dispute">Dispute</option>
          <option value="technical">Technical</option>
          <option value="complaint">Complaint</option>
          <option value="financial">Financial</option>
        </select>
        <select style={styles.filterSelect}>
          <option value="">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Tickets Table */}
      <DataTable
        columns={columns}
        data={sampleData}
        emptyMessage="No support tickets found"
      />
    </PageContainer>
  );
};
