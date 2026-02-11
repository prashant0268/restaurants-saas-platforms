import type { CSSProperties } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { StatusBadge } from '../components/shared/StatusBadge';
import { StatsCard } from '../components/shared/StatsCard';

const styles: Record<string, CSSProperties> = {
  backBtn: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#374151',
    marginBottom: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 8px 0',
  },
  subtitle: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
  },
  actions: {
    display: 'flex',
    gap: '8px',
  },
  actionBtn: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
  },
  statsRow: {
    display: 'flex',
    gap: '20px',
    marginBottom: '32px',
    flexWrap: 'wrap' as const,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    marginBottom: '24px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 16px 0',
  },
  placeholder: {
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    padding: '32px 24px',
    textAlign: 'center' as const,
    color: '#9ca3af',
    fontSize: '14px',
    border: '1px dashed #e5e7eb',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #f3f4f6',
    fontSize: '14px',
  },
  infoLabel: {
    color: '#6b7280',
    fontWeight: 500,
  },
  infoValue: {
    color: '#111827',
  },
};

export const RestaurantDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <PageContainer title="Restaurant Detail">
      <button style={styles.backBtn} onClick={() => navigate('/restaurants')}>
        &larr; Back to Restaurants
      </button>

      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            Pizza Palace <StatusBadge status="active" />
          </h1>
          <p style={styles.subtitle}>Restaurant ID: {id} | Joined: Jan 15, 2025</p>
        </div>
        <div style={styles.actions}>
          <button
            style={{ ...styles.actionBtn, backgroundColor: '#fee2e2', color: '#991b1b' }}
          >
            Suspend
          </button>
          <button
            style={{ ...styles.actionBtn, backgroundColor: '#dbeafe', color: '#1e40af' }}
          >
            Contact Owner
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={styles.statsRow}>
        <StatsCard title="Total Orders" value="1,234" color="#3b82f6" />
        <StatsCard title="Revenue" value="$45,600" color="#10b981" />
        <StatsCard title="Avg Rating" value="4.5" color="#f59e0b" />
        <StatsCard title="Active Menu Items" value="48" color="#8b5cf6" />
      </div>

      {/* Detail Grid */}
      <div style={styles.grid}>
        {/* Restaurant Info */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Restaurant Information</h3>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Owner</span>
            <span style={styles.infoValue}>John Smith</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Email</span>
            <span style={styles.infoValue}>john@pizzapalace.com</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Phone</span>
            <span style={styles.infoValue}>(555) 123-4567</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Address</span>
            <span style={styles.infoValue}>123 Main St, New York, NY 10001</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Cuisine</span>
            <span style={styles.infoValue}>Italian, Pizza</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Commission Rate</span>
            <span style={styles.infoValue}>15%</span>
          </div>
        </div>

        {/* Menu Overview */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Menu Overview</h3>
          <div style={styles.placeholder}>
            Menu items list placeholder -- Display categories and items
            with prices, availability toggles, and item count per category
          </div>
        </div>

        {/* Recent Orders */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Recent Orders</h3>
          <div style={styles.placeholder}>
            Recent orders table placeholder -- Show order ID, customer,
            amount, status, and date for the latest orders at this restaurant
          </div>
        </div>

        {/* Reviews */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Customer Reviews</h3>
          <div style={styles.placeholder}>
            Reviews list placeholder -- Display customer reviews with
            ratings, comments, and dates. Include average rating breakdown
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
