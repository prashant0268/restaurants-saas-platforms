import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { PricingCard } from '../components/shared/PricingCard';
import { FeatureComparisonTable } from '../components/shared/FeatureComparisonTable';
import { pricingTiers, comparisonFeatures } from '../data/mockPricing';
import { usePricingStore } from '../stores/pricingStore';

const styles: Record<string, CSSProperties> = {
  page: {
    padding: '0',
  },
  billingCycleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '32px',
  },
  billingCycleButton: {
    padding: '10px 20px',
    fontSize: '15px',
    fontWeight: 500,
    color: '#6b7280',
    backgroundColor: '#ffffff',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  billingCycleButtonActive: {
    padding: '10px 20px',
    fontSize: '15px',
    fontWeight: 600,
    color: '#ffffff',
    backgroundColor: '#0d9488',
    border: '2px solid #0d9488',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  saveBadge: {
    fontSize: '11px',
    fontWeight: 600,
    color: '#0d9488',
    backgroundColor: '#ccfbf1',
    padding: '2px 8px',
    borderRadius: '9999px',
    marginLeft: '8px',
    display: 'inline-block',
  },
  cardsRow: {
    display: 'flex',
    gap: '24px',
    marginBottom: '32px',
    alignItems: 'stretch',
  },
  continueButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '48px',
  },
  continueButton: {
    width: '100%',
    maxWidth: '400px',
    padding: '14px 24px',
    fontSize: '16px',
    fontWeight: 600,
    color: '#ffffff',
    backgroundColor: '#0d9488',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease',
  },
  comparisonSection: {
    marginTop: '16px',
  },
  comparisonHeading: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 20px 0',
    textAlign: 'center' as const,
  },
};

export const PricingPage = () => {
  const navigate = useNavigate();
  const { selectedPlan, billingCycle, selectPlan, setBillingCycle } = usePricingStore();

  return (
    <div style={styles.page}>
      <Header
        title="Pricing Plans"
        subtitle="Choose the perfect plan for your restaurant"
      />

      <div style={styles.billingCycleContainer}>
        <button
          style={billingCycle === 'monthly' ? styles.billingCycleButtonActive : styles.billingCycleButton}
          onClick={() => setBillingCycle('monthly')}
        >
          Monthly
        </button>
        <button
          style={billingCycle === 'annual' ? styles.billingCycleButtonActive : styles.billingCycleButton}
          onClick={() => setBillingCycle('annual')}
        >
          Annual <span style={styles.saveBadge}>Save 16%</span>
        </button>
        <button
          style={billingCycle === 'three-year' ? styles.billingCycleButtonActive : styles.billingCycleButton}
          onClick={() => setBillingCycle('three-year')}
        >
          3 Years <span style={styles.saveBadge}>Save up to 61%</span>
        </button>
      </div>

      <div style={styles.cardsRow}>
        {pricingTiers.map((tier) => (
          <PricingCard
            key={tier.id}
            tier={tier}
            billingCycle={billingCycle}
            isSelected={selectedPlan === tier.id}
            onSelect={() => selectPlan(tier.id)}
          />
        ))}
      </div>

      {selectedPlan && (
        <div style={styles.continueButtonContainer}>
          <button
            style={styles.continueButton}
            onClick={() => navigate('/contract')}
          >
            Continue to Contract
          </button>
        </div>
      )}

      <div style={styles.comparisonSection}>
        <h2 style={styles.comparisonHeading}>Compare All Features</h2>
        <FeatureComparisonTable features={comparisonFeatures} />
      </div>
    </div>
  );
};
