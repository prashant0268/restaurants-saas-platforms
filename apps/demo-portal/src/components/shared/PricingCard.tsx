import type { CSSProperties } from 'react';
import type { PricingTier } from '../../data/mockPricing';
import type { BillingCycle } from '../../stores/pricingStore';

interface PricingCardProps {
  tier: PricingTier;
  billingCycle: BillingCycle;
  isSelected: boolean;
  onSelect: () => void;
}

const styles: Record<string, CSSProperties> = {
  card: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '2px solid #e5e7eb',
    flex: '1',
    minWidth: '280px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    transition: 'all 0.2s ease',
  },
  cardPopular: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 4px 20px rgba(13, 148, 136, 0.2)',
    border: '2px solid #0d9488',
    flex: '1',
    minWidth: '280px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    transform: 'scale(1.02)',
  },
  cardSelected: {
    background: '#f0fdfa',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 4px 20px rgba(13, 148, 136, 0.25)',
    border: '2px solid #0d9488',
    flex: '1',
    minWidth: '280px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute' as const,
    top: '-12px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#0d9488',
    color: '#ffffff',
    padding: '4px 16px',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: 600,
  },
  name: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 8px 0',
  },
  description: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 24px 0',
    lineHeight: '1.5',
  },
  priceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '4px',
    marginBottom: '4px',
  },
  price: {
    fontSize: '48px',
    fontWeight: 800,
    color: '#111827',
    lineHeight: 1,
  },
  period: {
    fontSize: '16px',
    color: '#6b7280',
  },
  totalPrice: {
    fontSize: '13px',
    color: '#6b7280',
    marginTop: '4px',
  },
  setupFee: {
    fontSize: '12px',
    color: '#9ca3af',
    margin: '6px 0 0 0',
  },
  savings: {
    fontSize: '13px',
    color: '#0d9488',
    fontWeight: 500,
    marginBottom: '24px',
  },
  divider: {
    height: '1px',
    backgroundColor: '#e5e7eb',
    margin: '0 0 24px 0',
  },
  limitsList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 24px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  limitItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    color: '#374151',
  },
  limitIcon: {
    color: '#0d9488',
    fontSize: '16px',
  },
  button: {
    marginTop: 'auto',
    padding: '14px 24px',
    borderRadius: '10px',
    border: '2px solid #0d9488',
    backgroundColor: 'transparent',
    color: '#0d9488',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  buttonPrimary: {
    marginTop: 'auto',
    padding: '14px 24px',
    borderRadius: '10px',
    border: '2px solid #0d9488',
    backgroundColor: '#0d9488',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
  },
};

export const PricingCard = ({ tier, billingCycle, isSelected, onSelect }: PricingCardProps) => {
  const getPrice = (): number => {
    if (billingCycle === 'monthly') return tier.monthlyPrice;
    if (billingCycle === 'annual') return tier.annualPrice;
    return tier.threeYearPrice;
  };

  const getSavings = (): { amount: number; discount: number; label: string } => {
    if (billingCycle === 'annual') {
      const monthlyTotal = tier.monthlyPrice * 12;
      const savings = monthlyTotal - tier.annualPrice;
      const discountPercent = Math.round((savings / monthlyTotal) * 100);
      return { amount: savings, discount: discountPercent, label: 'Save per year' };
    }
    if (billingCycle === 'three-year') {
      const monthlyTotal = tier.monthlyPrice * 36;
      const savings = monthlyTotal - tier.threeYearPrice;
      const discountPercent = Math.round((savings / monthlyTotal) * 100);
      return { amount: savings, discount: discountPercent, label: 'Save over 3 years' };
    }
    return { amount: 0, discount: 0, label: '' };
  };

  const price = getPrice();
  const savings = getSavings();

  const getCardStyle = (): CSSProperties => {
    if (isSelected) return styles.cardSelected;
    if (tier.popular) return styles.cardPopular;
    return styles.card;
  };

  const getKeyFeatures = (): string[] => {
    if (tier.id === 'professional') {
      return [
        'Unlimited menu items',
        'Unlimited staff accounts',
        'Mobile ordering app',
        'Loyalty program',
        'Analytics dashboard',
      ];
    }
    return [
      'Everything in Professional',
      'Delivery management',
      'Driver app',
      'Website builder',
      'API access',
    ];
  };

  return (
    <div style={getCardStyle()}>
      {tier.popular && !isSelected && (
        <span style={styles.popularBadge}>Most Popular</span>
      )}
      {isSelected && (
        <span style={{ ...styles.popularBadge, backgroundColor: '#065f46' }}>
          Selected
        </span>
      )}
      <h3 style={styles.name}>{tier.name}</h3>
      <p style={styles.description}>{tier.description}</p>
      {billingCycle === 'monthly' && (
        <>
          <div style={styles.priceRow}>
            <span style={styles.price}>${price}</span>
            <span style={styles.period}>/month</span>
          </div>
          <p style={styles.totalPrice}>${price * 12}/year</p>
          <p style={styles.setupFee}>Setup fee: $500</p>
        </>
      )}
      {billingCycle === 'annual' && (
        <>
          <div style={styles.priceRow}>
            <span style={styles.price}>${(price / 12).toFixed(2)}</span>
            <span style={styles.period}>/month</span>
          </div>
          <p style={styles.totalPrice}>${price}/year (total)</p>
        </>
      )}
      {billingCycle === 'three-year' && (
        <>
          <div style={styles.priceRow}>
            <span style={styles.price}>${(price / 36).toFixed(2)}</span>
            <span style={styles.period}>/month</span>
          </div>
          <p style={styles.totalPrice}>${price}/3 years (total)</p>
        </>
      )}
      {savings.amount > 0 && (
        <p style={styles.savings}>Save {savings.discount}% (${savings.amount})</p>
      )}
      <div style={styles.divider} />
      <ul style={styles.limitsList}>
        {getKeyFeatures().map((feature) => (
          <li key={feature} style={styles.limitItem}>
            <span style={styles.limitIcon}>&#10003;</span>
            {feature}
          </li>
        ))}
      </ul>
      <button
        style={isSelected || tier.popular ? styles.buttonPrimary : styles.button}
        onClick={onSelect}
      >
        {isSelected ? 'Selected' : 'Select Plan'}
      </button>
    </div>
  );
};
