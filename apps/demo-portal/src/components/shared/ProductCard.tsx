import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  icon: string;
  title: string;
  description: string;
  route: string;
  features?: string[];
}

const styles: Record<string, CSSProperties> = {
  card: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  iconRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  icon: {
    fontSize: '32px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#111827',
    margin: 0,
  },
  description: {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: '1.6',
    margin: 0,
  },
  link: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#0d9488',
    marginTop: 'auto',
  },
};

export const ProductCard = ({ icon, title, description, route, features: _features }: ProductCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      style={styles.card}
      onClick={() => navigate(route)}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = '#0d9488';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 12px rgba(13, 148, 136, 0.15)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = '#e5e7eb';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
      }}
    >
      <div style={styles.iconRow}>
        <span style={styles.icon}>{icon}</span>
        <h3 style={styles.title}>{title}</h3>
      </div>
      <p style={styles.description}>{description}</p>
      <span style={styles.link}>View Demo &rarr;</span>
    </div>
  );
};
