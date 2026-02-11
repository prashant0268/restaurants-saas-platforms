import type { CSSProperties } from 'react';
import { Header } from '../components/layout/Header';
import { StatsCard } from '../components/shared/StatsCard';
import { StatusBadge } from '../components/shared/StatusBadge';

interface Commission {
  id: string;
  restaurant: string;
  plan: string;
  commissionRate: number;
  amount: number;
  status: 'pending' | 'approved' | 'paid';
  saleDate: string;
  paidDate?: string;
  salesRep: string;
}

const mockCommissions: Commission[] = [
  {
    id: '1',
    restaurant: 'Sushi Zen',
    plan: 'Professional',
    commissionRate: 20,
    amount: 19.80,
    status: 'approved',
    saleDate: '2026-01-25',
    salesRep: 'Sarah Johnson',
  },
  {
    id: '2',
    restaurant: 'Taco Fiesta',
    plan: 'Enterprise',
    commissionRate: 15,
    amount: 29.85,
    status: 'pending',
    saleDate: '2026-02-08',
    salesRep: 'Sarah Johnson',
  },
  {
    id: '3',
    restaurant: 'Pizza Palace',
    plan: 'Basic',
    commissionRate: 25,
    amount: 12.25,
    status: 'paid',
    saleDate: '2025-11-15',
    paidDate: '2025-12-01',
    salesRep: 'Mike Chen',
  },
  {
    id: '4',
    restaurant: 'Thai Garden',
    plan: 'Enterprise',
    commissionRate: 15,
    amount: 29.85,
    status: 'paid',
    saleDate: '2025-10-01',
    paidDate: '2025-11-01',
    salesRep: 'Sarah Johnson',
  },
  {
    id: '5',
    restaurant: 'Burger Bros',
    plan: 'Basic',
    commissionRate: 25,
    amount: 12.25,
    status: 'paid',
    saleDate: '2025-08-01',
    paidDate: '2025-09-01',
    salesRep: 'Mike Chen',
  },
];

const styles: Record<string, CSSProperties> = {
  container: {
    maxWidth: '1400px',
  },
  statsRow: {
    display: 'flex',
    gap: '20px',
    marginBottom: '32px',
    flexWrap: 'wrap' as const,
  },
  section: {
    marginBottom: '32px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 20px 0',
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
  rateCell: {
    fontWeight: 600,
    color: '#3b82f6',
  },
  amountCell: {
    fontWeight: 600,
    color: '#059669',
  },
};

export const CommissionsPage = () => {
  const pendingTotal = mockCommissions
    .filter((c) => c.status === 'pending')
    .reduce((sum, c) => sum + c.amount, 0);
  const approvedTotal = mockCommissions
    .filter((c) => c.status === 'approved')
    .reduce((sum, c) => sum + c.amount, 0);
  const paidTotal = mockCommissions
    .filter((c) => c.status === 'paid')
    .reduce((sum, c) => sum + c.amount, 0);
  const totalEarned = mockCommissions.reduce((sum, c) => sum + c.amount, 0);

  return (
    <>
      <Header title="Commissions" />
      <div style={styles.container}>
        <div style={styles.statsRow}>
          <StatsCard
            title="Total Earned"
            value={`$${totalEarned.toFixed(2)}`}
            color="#3b82f6"
          />
          <StatsCard
            title="Pending"
            value={`$${pendingTotal.toFixed(2)}`}
            color="#f59e0b"
          />
          <StatsCard
            title="Approved"
            value={`$${approvedTotal.toFixed(2)}`}
            color="#8b5cf6"
          />
          <StatsCard
            title="Paid"
            value={`$${paidTotal.toFixed(2)}`}
            color="#10b981"
          />
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Commission History</h3>
          <div style={styles.card}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Restaurant</th>
                  <th style={styles.th}>Plan</th>
                  <th style={styles.th}>Commission Rate</th>
                  <th style={styles.th}>Amount</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Sale Date</th>
                  <th style={styles.th}>Paid Date</th>
                  <th style={styles.th}>Sales Rep</th>
                </tr>
              </thead>
              <tbody>
                {mockCommissions.map((commission) => (
                  <tr key={commission.id}>
                    <td style={{ ...styles.td, fontWeight: 600 }}>
                      {commission.restaurant}
                    </td>
                    <td style={styles.td}>{commission.plan}</td>
                    <td style={{ ...styles.td, ...styles.rateCell }}>
                      {commission.commissionRate}%
                    </td>
                    <td style={{ ...styles.td, ...styles.amountCell }}>
                      ${commission.amount.toFixed(2)}
                    </td>
                    <td style={styles.td}>
                      <StatusBadge status={commission.status} />
                    </td>
                    <td style={styles.td}>{commission.saleDate}</td>
                    <td style={styles.td}>
                      {commission.paidDate ?? '-'}
                    </td>
                    <td style={styles.td}>{commission.salesRep}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
