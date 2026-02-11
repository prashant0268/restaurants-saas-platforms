import type { CSSProperties } from 'react';
import { Header } from '../components/layout/Header';
import { StatusBadge } from '../components/shared/StatusBadge';

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  popular?: boolean;
}

interface Subscription {
  id: string;
  restaurant: string;
  plan: string;
  status: 'active' | 'inactive';
  startDate: string;
  nextBilling: string;
  amount: number;
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 49,
    period: '/month',
    features: [
      'Single location',
      'Basic menu management',
      'Order tracking',
      'Email support',
      'Basic analytics',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 99,
    period: '/month',
    popular: true,
    features: [
      'Up to 5 locations',
      'Advanced menu management',
      'Real-time order tracking',
      'Priority support',
      'Advanced analytics',
      'Customer insights',
      'Marketing tools',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    period: '/month',
    features: [
      'Unlimited locations',
      'White-label solution',
      'API access',
      'Dedicated account manager',
      'Custom integrations',
      'Advanced reporting',
      'SLA guarantee',
      '24/7 phone support',
    ],
  },
];

const activeSubscriptions: Subscription[] = [
  {
    id: '1',
    restaurant: 'Sushi Zen',
    plan: 'Professional',
    status: 'active',
    startDate: '2026-01-25',
    nextBilling: '2026-02-25',
    amount: 99,
  },
  {
    id: '2',
    restaurant: 'Pizza Palace',
    plan: 'Basic',
    status: 'active',
    startDate: '2025-11-15',
    nextBilling: '2026-02-15',
    amount: 49,
  },
  {
    id: '3',
    restaurant: 'Thai Garden',
    plan: 'Enterprise',
    status: 'active',
    startDate: '2025-10-01',
    nextBilling: '2026-02-28',
    amount: 199,
  },
  {
    id: '4',
    restaurant: 'Burger Bros',
    plan: 'Basic',
    status: 'inactive',
    startDate: '2025-08-01',
    nextBilling: '-',
    amount: 49,
  },
];

const styles: Record<string, CSSProperties> = {
  container: {
    maxWidth: '1400px',
  },
  section: {
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 20px 0',
  },
  plansRow: {
    display: 'flex',
    gap: '24px',
    flexWrap: 'wrap' as const,
  },
  planCard: {
    flex: '1',
    minWidth: '280px',
    background: '#ffffff',
    borderRadius: '12px',
    padding: '32px 24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
    position: 'relative' as const,
    display: 'flex',
    flexDirection: 'column' as const,
  },
  planCardPopular: {
    flex: '1',
    minWidth: '280px',
    background: '#ffffff',
    borderRadius: '12px',
    padding: '32px 24px',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)',
    border: '2px solid #3b82f6',
    position: 'relative' as const,
    display: 'flex',
    flexDirection: 'column' as const,
  },
  popularBadge: {
    position: 'absolute' as const,
    top: '-12px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    padding: '4px 16px',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: 600,
  },
  planName: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 8px 0',
    textAlign: 'center' as const,
  },
  planPrice: {
    fontSize: '40px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 4px 0',
    textAlign: 'center' as const,
  },
  planPeriod: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: 400,
  },
  featuresList: {
    listStyle: 'none',
    padding: 0,
    margin: '24px 0',
    flex: 1,
  },
  featureItem: {
    padding: '8px 0',
    fontSize: '14px',
    color: '#374151',
    borderBottom: '1px solid #f3f4f6',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  featureCheck: {
    color: '#10b981',
    fontWeight: 700,
  },
  selectButton: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    backgroundColor: '#ffffff',
    color: '#374151',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  selectButtonPrimary: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
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
};

export const SubscriptionsPage = () => {
  const totalMRR = activeSubscriptions
    .filter((s) => s.status === 'active')
    .reduce((sum, s) => sum + s.amount, 0);

  return (
    <>
      <Header title="Subscriptions" />
      <div style={styles.container}>
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Subscription Plans</h3>
          <div style={styles.plansRow}>
            {plans.map((plan) => (
              <div
                key={plan.id}
                style={plan.popular ? styles.planCardPopular : styles.planCard}
              >
                {plan.popular && (
                  <span style={styles.popularBadge}>Most Popular</span>
                )}
                <h4 style={styles.planName}>{plan.name}</h4>
                <p style={styles.planPrice}>
                  ${plan.price}
                  <span style={styles.planPeriod}>{plan.period}</span>
                </p>
                <ul style={styles.featuresList}>
                  {plan.features.map((feature) => (
                    <li key={feature} style={styles.featureItem}>
                      <span style={styles.featureCheck}>{'\u2713'}</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  style={
                    plan.popular
                      ? styles.selectButtonPrimary
                      : styles.selectButton
                  }
                >
                  Select {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            Active Subscriptions (MRR: ${totalMRR.toLocaleString()})
          </h3>
          <div style={styles.card}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Restaurant</th>
                  <th style={styles.th}>Plan</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Start Date</th>
                  <th style={styles.th}>Next Billing</th>
                  <th style={styles.th}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {activeSubscriptions.map((sub) => (
                  <tr key={sub.id}>
                    <td style={{ ...styles.td, fontWeight: 600 }}>
                      {sub.restaurant}
                    </td>
                    <td style={styles.td}>{sub.plan}</td>
                    <td style={styles.td}>
                      <StatusBadge status={sub.status} />
                    </td>
                    <td style={styles.td}>{sub.startDate}</td>
                    <td style={styles.td}>{sub.nextBilling}</td>
                    <td style={styles.td}>${sub.amount}/mo</td>
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
