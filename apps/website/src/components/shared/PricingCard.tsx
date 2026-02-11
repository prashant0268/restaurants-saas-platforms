import { type CSSProperties } from 'react';

interface PricingCardProps {
  name: string;
  price: number;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaLabel?: string;
  onCtaClick?: () => void;
}

const styles: Record<string, CSSProperties> = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 16,
    border: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
    padding: 32,
    flex: '1 1 300px',
    maxWidth: 400,
    transition: 'box-shadow 0.2s',
  },
  cardHighlighted: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 16,
    border: '2px solid #e63946',
    backgroundColor: '#ffffff',
    padding: 32,
    flex: '1 1 300px',
    maxWidth: 400,
    boxShadow: '0 8px 30px rgba(230, 57, 70, 0.15)',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -14,
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#e63946',
    color: '#ffffff',
    padding: '4px 20px',
    borderRadius: 20,
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 0.5,
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    color: '#1a1a1a',
    margin: 0,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#6b7280',
    margin: 0,
    marginBottom: 24,
    lineHeight: 1.5,
  },
  priceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 4,
    marginBottom: 32,
  },
  dollar: {
    fontSize: 24,
    fontWeight: 700,
    color: '#1a1a1a',
  },
  amount: {
    fontSize: 48,
    fontWeight: 800,
    color: '#1a1a1a',
    lineHeight: 1,
  },
  period: {
    fontSize: 16,
    color: '#6b7280',
  },
  featureList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    marginBottom: 32,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    flex: 1,
  },
  featureItem: {
    fontSize: 15,
    color: '#374151',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
    lineHeight: 1.5,
  },
  checkIcon: {
    color: '#10b981',
    fontWeight: 700,
    fontSize: 16,
    flexShrink: 0,
    marginTop: 3,
  },
  ctaButton: {
    width: '100%',
    padding: '14px 0',
    fontSize: 16,
    fontWeight: 700,
    border: 'none',
    borderRadius: 10,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};

export const PricingCard = ({
  name,
  price,
  description,
  features,
  highlighted = false,
  ctaLabel = 'Get Started',
  onCtaClick,
}: PricingCardProps) => {
  const ctaStyle: CSSProperties = {
    ...styles.ctaButton,
    backgroundColor: highlighted ? '#e63946' : '#f3f4f6',
    color: highlighted ? '#ffffff' : '#1a1a1a',
  };

  return (
    <div style={highlighted ? styles.cardHighlighted : styles.card}>
      {highlighted && <span style={styles.badge}>Most Popular</span>}
      <h3 style={styles.name}>{name}</h3>
      <p style={styles.description}>{description}</p>
      <div style={styles.priceRow}>
        <span style={styles.dollar}>$</span>
        <span style={styles.amount}>{price}</span>
        <span style={styles.period}>/month</span>
      </div>
      <ul style={styles.featureList}>
        {features.map((feature, idx) => (
          <li key={idx} style={styles.featureItem}>
            <span style={styles.checkIcon}>&#10003;</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button style={ctaStyle} onClick={onCtaClick}>
        {ctaLabel}
      </button>
    </div>
  );
};
