import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePricingStore } from '../stores/pricingStore';
import { useContractStore } from '../stores/contractStore';
import { useDemoStore } from '../stores/demoStore';
import { pricingTiers } from '../data/mockPricing';

const onboardingSteps = [
  {
    number: 1,
    title: 'Set up your restaurant profile',
    description: 'Add your restaurant details, hours, and branding to get started.',
  },
  {
    number: 2,
    title: 'Build your digital menu',
    description: 'Create categories, add items with photos, and set pricing.',
  },
  {
    number: 3,
    title: 'Configure delivery zones',
    description: 'Define your delivery radius, fees, and estimated delivery times.',
  },
  {
    number: 4,
    title: 'Train your staff on the dashboard',
    description: 'Walk your team through order management and daily operations.',
  },
  {
    number: 5,
    title: 'Launch your customer app',
    description: 'Go live and start accepting orders from your customers.',
  },
];

const styles: Record<string, CSSProperties> = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '48px 24px',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
  },
  container: {
    maxWidth: '600px',
    width: '100%',
  },
  checkmarkCircle: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#0d9488',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 24px auto',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: '40px',
    lineHeight: 1,
  },
  heading: {
    fontSize: '32px',
    fontWeight: 700,
    color: '#111827',
    textAlign: 'center',
    margin: '0 0 8px 0',
  },
  subtitle: {
    fontSize: '16px',
    color: '#6b7280',
    textAlign: 'center',
    margin: '0 0 32px 0',
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    padding: '24px',
    marginBottom: '32px',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
  },
  summaryLabel: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
  },
  summaryValue: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#111827',
    margin: 0,
  },
  whatsNextHeading: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 16px 0',
  },
  stepsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '32px',
  },
  stepCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    padding: '16px 20px',
  },
  stepNumber: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    border: '2px solid #0d9488',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 700,
    color: '#0d9488',
    flexShrink: 0,
  },
  stepContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  stepTitle: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#111827',
    margin: 0,
  },
  stepDescription: {
    fontSize: '13px',
    color: '#6b7280',
    margin: 0,
    lineHeight: '1.5',
  },
  buttonsRow: {
    display: 'flex',
    gap: '16px',
  },
  outlineButton: {
    flex: 1,
    padding: '14px',
    fontSize: '15px',
    fontWeight: 600,
    color: '#0d9488',
    backgroundColor: '#ffffff',
    border: '2px solid #0d9488',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  filledButton: {
    flex: 1,
    padding: '14px',
    fontSize: '15px',
    fontWeight: 600,
    color: '#ffffff',
    backgroundColor: '#0d9488',
    border: '2px solid #0d9488',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export const ConfirmationPage = () => {
  const navigate = useNavigate();
  const { selectedPlan, billingCycle, reset: resetPricing } = usePricingStore();
  const { details, reset: resetContract } = useContractStore();
  const { resetDemo } = useDemoStore();

  const tier = pricingTiers.find((t) => t.id === selectedPlan);
  const price = tier
    ? billingCycle === 'annual'
      ? tier.annualPrice
      : tier.monthlyPrice
    : 0;

  const today = new Date();
  const contractDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleStartNewDemo = () => {
    resetPricing();
    resetContract();
    resetDemo();
    navigate('/');
  };

  const handleBackToDashboard = () => {
    navigate('/');
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.checkmarkCircle}>
          <span style={styles.checkmark}>&#10003;</span>
        </div>

        <h1 style={styles.heading}>Welcome Aboard!</h1>
        <p style={styles.subtitle}>
          Your restaurant platform subscription is now active.
        </p>

        <div style={styles.summaryCard}>
          <div style={styles.summaryRow}>
            <p style={styles.summaryLabel}>Restaurant</p>
            <p style={styles.summaryValue}>
              {details.restaurantName || 'Your Restaurant'}
            </p>
          </div>
          <div style={styles.summaryRow}>
            <p style={styles.summaryLabel}>Plan</p>
            <p style={styles.summaryValue}>
              {tier?.name ?? 'No plan selected'}
            </p>
          </div>
          <div style={styles.summaryRow}>
            <p style={styles.summaryLabel}>Price</p>
            <p style={styles.summaryValue}>${price}/mo</p>
          </div>
          <div style={styles.summaryRow}>
            <p style={styles.summaryLabel}>Billing Cycle</p>
            <p style={styles.summaryValue}>
              {billingCycle === 'annual' ? 'Annual' : 'Monthly'}
            </p>
          </div>
          <div style={styles.summaryRow}>
            <p style={styles.summaryLabel}>Contract Date</p>
            <p style={styles.summaryValue}>{contractDate}</p>
          </div>
        </div>

        <h2 style={styles.whatsNextHeading}>What's Next</h2>

        <div style={styles.stepsList}>
          {onboardingSteps.map((step) => (
            <div key={step.number} style={styles.stepCard}>
              <div style={styles.stepNumber}>{step.number}</div>
              <div style={styles.stepContent}>
                <p style={styles.stepTitle}>{step.title}</p>
                <p style={styles.stepDescription}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.buttonsRow}>
          <button style={styles.outlineButton} onClick={handleStartNewDemo}>
            Start New Demo
          </button>
          <button style={styles.filledButton} onClick={handleBackToDashboard}>
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
