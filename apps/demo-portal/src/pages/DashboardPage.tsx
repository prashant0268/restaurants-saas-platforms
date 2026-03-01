import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { ProductCard } from '../components/shared/ProductCard';
import { products } from '../data/mockProducts';

const quickStats = [
  { label: 'Products', value: '6', icon: '&#128230;' },
  { label: 'Pricing Plans', value: '3', icon: '&#128176;' },
  { label: 'E-signatures', value: '&#9989;', icon: '&#9997;&#65039;' },
  { label: 'Live Demos', value: '&#9989;', icon: '&#127916;' },
];

const styles: Record<string, CSSProperties> = {
  page: {
    padding: '0',
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '32px',
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  statIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    backgroundColor: '#ccfbf1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    flexShrink: 0,
  },
  statInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  statValue: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#111827',
    margin: 0,
  },
  statLabel: {
    fontSize: '13px',
    color: '#6b7280',
    margin: 0,
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 16px 0',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    marginBottom: '40px',
  },
  quickActions: {
    marginTop: '8px',
  },
  actionsRow: {
    display: 'flex',
    gap: '16px',
    marginTop: '16px',
  },
  actionButton: {
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#ffffff',
    backgroundColor: '#0d9488',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  actionButtonOutline: {
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#0d9488',
    backgroundColor: '#ffffff',
    border: '2px solid #0d9488',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <Header
        title="Product Showcase"
        subtitle="Walk through our restaurant platform products"
      />

      <div style={styles.statsRow}>
        {quickStats.map((stat) => (
          <div key={stat.label} style={styles.statCard}>
            <div
              style={styles.statIcon}
              dangerouslySetInnerHTML={{ __html: stat.icon }}
            />
            <div style={styles.statInfo}>
              <p
                style={styles.statValue}
                dangerouslySetInnerHTML={{ __html: stat.value }}
              />
              <p style={styles.statLabel}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 style={styles.sectionTitle}>All Products</h2>
      <div style={styles.productGrid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            icon={product.icon}
            title={product.name}
            description={product.description}
            route={product.route}
            features={product.features}
          />
        ))}
      </div>

      <div style={styles.quickActions}>
        <h2 style={styles.sectionTitle}>Quick Actions</h2>
        <div style={styles.actionsRow}>
          <button
            style={styles.actionButton}
            onClick={() => navigate('/pricing')}
          >
            Start Pricing Discussion
          </button>
          <button
            style={styles.actionButtonOutline}
            onClick={() => navigate('/contract')}
          >
            Create Contract
          </button>
        </div>
      </div>
    </div>
  );
};
