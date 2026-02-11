import { type CSSProperties, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { StatusBadge } from '../components/shared/StatusBadge';
import { useLeadsStore } from '../stores/leadsStore';
import type { LeadStatus } from '../stores/leadsStore';

const statusFilters: { label: string; value: LeadStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'New', value: 'new' },
  { label: 'Contacted', value: 'contacted' },
  { label: 'Qualified', value: 'qualified' },
  { label: 'Demo', value: 'demo' },
  { label: 'Converted', value: 'converted' },
  { label: 'Lost', value: 'lost' },
];

const styles: Record<string, CSSProperties> = {
  container: {
    maxWidth: '1400px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    flexWrap: 'wrap' as const,
    gap: '16px',
  },
  filterChips: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap' as const,
  },
  chip: {
    padding: '8px 16px',
    borderRadius: '9999px',
    border: '1px solid #d1d5db',
    backgroundColor: '#ffffff',
    color: '#374151',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  chipActive: {
    padding: '8px 16px',
    borderRadius: '9999px',
    border: '1px solid #3b82f6',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
  },
  addButton: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
  },
  card: {
    background: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: '14px',
  },
  th: {
    textAlign: 'left' as const,
    padding: '14px 16px',
    borderBottom: '2px solid #e5e7eb',
    color: '#6b7280',
    fontWeight: 600,
    fontSize: '12px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    backgroundColor: '#f9fafb',
  },
  td: {
    padding: '14px 16px',
    borderBottom: '1px solid #f3f4f6',
    color: '#374151',
  },
  row: {
    cursor: 'pointer',
    transition: 'background-color 0.15s ease',
  },
  restaurantName: {
    fontWeight: 600,
    color: '#111827',
  },
  sourceLabel: {
    fontSize: '12px',
    color: '#6b7280',
    textTransform: 'capitalize' as const,
  },
  resultCount: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 16px 0',
  },
};

export const LeadsPage = () => {
  const navigate = useNavigate();
  const { leads, filterStatus, setFilterStatus } = useLeadsStore();
  const [sortField] = useState<'restaurantName' | 'lastActivity'>('lastActivity');

  const filteredLeads = filterStatus === 'all'
    ? leads
    : leads.filter((l) => l.status === filterStatus);

  const sortedLeads = [...filteredLeads].sort((a, b) => {
    if (sortField === 'lastActivity') {
      return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
    }
    return a.restaurantName.localeCompare(b.restaurantName);
  });

  return (
    <>
      <Header title="Leads" />
      <div style={styles.container}>
        <div style={styles.toolbar}>
          <div style={styles.filterChips}>
            {statusFilters.map((filter) => (
              <button
                key={filter.value}
                style={filterStatus === filter.value ? styles.chipActive : styles.chip}
                onClick={() => setFilterStatus(filter.value)}
              >
                {filter.label}
                {filter.value !== 'all' && (
                  <span style={{ marginLeft: '6px', opacity: 0.7 }}>
                    {leads.filter((l) =>
                      filter.value === 'all' ? true : l.status === filter.value
                    ).length}
                  </span>
                )}
              </button>
            ))}
          </div>
          <button style={styles.addButton}>+ New Lead</button>
        </div>

        <p style={styles.resultCount}>
          Showing {sortedLeads.length} of {leads.length} leads
        </p>

        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Restaurant</th>
                <th style={styles.th}>Source</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Value</th>
                <th style={styles.th}>Assigned To</th>
                <th style={styles.th}>Last Activity</th>
              </tr>
            </thead>
            <tbody>
              {sortedLeads.map((lead) => (
                <tr
                  key={lead.id}
                  style={styles.row}
                  onClick={() => navigate(`/leads/${lead.id}`)}
                >
                  <td style={{ ...styles.td, ...styles.restaurantName }}>
                    {lead.contactName}
                  </td>
                  <td style={styles.td}>{lead.restaurantName}</td>
                  <td style={styles.td}>
                    <span style={styles.sourceLabel}>
                      {lead.source.replace('_', ' ')}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <StatusBadge status={lead.status} />
                  </td>
                  <td style={styles.td}>${lead.estimatedValue}/mo</td>
                  <td style={styles.td}>{lead.assignedTo}</td>
                  <td style={styles.td}>{lead.lastActivity}</td>
                </tr>
              ))}
              {sortedLeads.length === 0 && (
                <tr>
                  <td
                    style={{ ...styles.td, textAlign: 'center', padding: '40px 16px' }}
                    colSpan={7}
                  >
                    No leads found for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
