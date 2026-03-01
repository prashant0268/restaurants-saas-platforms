import { useState } from 'react';
import type { CSSProperties, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { usePricingStore } from '../stores/pricingStore';
import { useContractStore } from '../stores/contractStore';
import { pricingTiers } from '../data/mockPricing';

const styles: Record<string, CSSProperties> = {
  page: {
    padding: '0',
  },
  twoColumn: {
    display: 'flex',
    gap: '24px',
    alignItems: 'flex-start',
  },
  formColumn: {
    flex: 2,
  },
  sidebarColumn: {
    flex: 1,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    padding: '28px',
  },
  sectionHeader: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 20px 0',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginBottom: '16px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#374151',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    fontSize: '14px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    outline: 'none',
    backgroundColor: '#ffffff',
    color: '#111827',
    boxSizing: 'border-box',
  },
  inputDisabled: {
    width: '100%',
    padding: '10px 14px',
    fontSize: '14px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    outline: 'none',
    backgroundColor: '#f3f4f6',
    color: '#6b7280',
    boxSizing: 'border-box',
    cursor: 'not-allowed',
  },
  row: {
    display: 'flex',
    gap: '16px',
  },
  rowItem: {
    flex: 1,
  },
  divider: {
    height: '1px',
    backgroundColor: '#e5e7eb',
    margin: '24px 0',
    border: 'none',
  },
  checkboxRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '16px',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    accentColor: '#0d9488',
    cursor: 'pointer',
  },
  checkboxLabel: {
    fontSize: '14px',
    color: '#374151',
    cursor: 'pointer',
  },
  button: {
    width: '100%',
    padding: '14px',
    fontSize: '15px',
    fontWeight: 600,
    color: '#ffffff',
    backgroundColor: '#0d9488',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '8px',
  },
  summaryHeading: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 20px 0',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  summaryLabel: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
  },
  summaryValue: {
    fontSize: '14px',
    color: '#111827',
    fontWeight: 500,
    margin: 0,
  },
  summaryDivider: {
    height: '1px',
    backgroundColor: '#e5e7eb',
    margin: '16px 0',
    border: 'none',
  },
  dueTodayLabel: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#111827',
    margin: 0,
  },
  dueTodayValue: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#0d9488',
    margin: 0,
  },
  note: {
    fontSize: '12px',
    color: '#9ca3af',
    margin: '16px 0 0 0',
    lineHeight: '1.5',
  },
  errorMessage: {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    fontSize: '13px',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #fecaca',
    margin: '0 0 16px 0',
  },
};

export const PaymentPage = () => {
  const navigate = useNavigate();
  const { selectedPlan, billingCycle } = usePricingStore();
  const { details } = useContractStore();

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingState, setBillingState] = useState('');
  const [billingZip, setBillingZip] = useState('');
  const [useRestaurantAddress, setUseRestaurantAddress] = useState(false);
  const [error, setError] = useState('');

  const tier = pricingTiers.find((t) => t.id === selectedPlan);
  const price = tier
    ? billingCycle === 'annual'
      ? tier.annualPrice
      : tier.monthlyPrice
    : 0;

  const handleUseRestaurantAddress = (checked: boolean) => {
    setUseRestaurantAddress(checked);
    if (checked) {
      setBillingAddress(details.address);
      setBillingCity(details.city);
      setBillingState(details.state);
      setBillingZip(details.zipCode);
    } else {
      setBillingAddress('');
      setBillingCity('');
      setBillingState('');
      setBillingZip('');
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (
      !cardNumber.trim() ||
      !expiry.trim() ||
      !cvc.trim() ||
      !cardholderName.trim() ||
      !billingAddress.trim() ||
      !billingCity.trim() ||
      !billingState.trim() ||
      !billingZip.trim()
    ) {
      setError('Please fill in all required fields.');
      return;
    }

    navigate('/confirmation');
  };

  const maskedCardNumber = cardNumber.length > 4
    ? '\u2022\u2022\u2022\u2022 '.repeat(Math.floor((cardNumber.length - 1) / 4)) +
      cardNumber.slice(-4)
    : cardNumber;

  return (
    <div style={styles.page}>
      <Header title="Payment" subtitle="Complete your subscription setup" />

      <div style={styles.twoColumn}>
        <div style={styles.formColumn}>
          <form style={styles.card} onSubmit={handleSubmit}>
            {error && <p style={styles.errorMessage}>{error}</p>}

            <h2 style={styles.sectionHeader}>Payment Method</h2>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Card Number</label>
              <input
                style={styles.input}
                type="text"
                placeholder="1234 5678 9012 3456"
                value={maskedCardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/[^\d]/g, ''))}
                maxLength={16}
              />
            </div>

            <div style={styles.row}>
              <div style={{ ...styles.fieldGroup, ...styles.rowItem }}>
                <label style={styles.label}>Expiry</label>
                <input
                  style={styles.input}
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  maxLength={5}
                />
              </div>
              <div style={{ ...styles.fieldGroup, ...styles.rowItem }}>
                <label style={styles.label}>CVC</label>
                <input
                  style={styles.input}
                  type="text"
                  placeholder="123"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  maxLength={4}
                />
              </div>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Cardholder Name</label>
              <input
                style={styles.input}
                type="text"
                placeholder="Full name on card"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
              />
            </div>

            <hr style={styles.divider} />

            <h2 style={styles.sectionHeader}>Billing Address</h2>

            <div style={styles.checkboxRow}>
              <input
                type="checkbox"
                id="useRestaurantAddress"
                style={styles.checkbox}
                checked={useRestaurantAddress}
                onChange={(e) => handleUseRestaurantAddress(e.target.checked)}
              />
              <label
                htmlFor="useRestaurantAddress"
                style={styles.checkboxLabel}
              >
                Use restaurant address
              </label>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Street Address</label>
              <input
                style={useRestaurantAddress ? styles.inputDisabled : styles.input}
                type="text"
                placeholder="123 Main St"
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
                disabled={useRestaurantAddress}
              />
            </div>

            <div style={styles.row}>
              <div style={{ ...styles.fieldGroup, ...styles.rowItem }}>
                <label style={styles.label}>City</label>
                <input
                  style={useRestaurantAddress ? styles.inputDisabled : styles.input}
                  type="text"
                  placeholder="City"
                  value={billingCity}
                  onChange={(e) => setBillingCity(e.target.value)}
                  disabled={useRestaurantAddress}
                />
              </div>
              <div style={{ ...styles.fieldGroup, ...styles.rowItem }}>
                <label style={styles.label}>State</label>
                <input
                  style={useRestaurantAddress ? styles.inputDisabled : styles.input}
                  type="text"
                  placeholder="State"
                  value={billingState}
                  onChange={(e) => setBillingState(e.target.value)}
                  disabled={useRestaurantAddress}
                />
              </div>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Zip Code</label>
              <input
                style={useRestaurantAddress ? styles.inputDisabled : styles.input}
                type="text"
                placeholder="12345"
                value={billingZip}
                onChange={(e) => setBillingZip(e.target.value)}
                disabled={useRestaurantAddress}
              />
            </div>

            <button type="submit" style={styles.button}>
              Complete Payment
            </button>
          </form>
        </div>

        <div style={styles.sidebarColumn}>
          <div style={styles.card}>
            <h2 style={styles.summaryHeading}>Order Summary</h2>

            <div style={styles.summaryRow}>
              <p style={styles.summaryLabel}>Plan</p>
              <p style={styles.summaryValue}>{tier?.name ?? 'No plan selected'}</p>
            </div>

            <div style={styles.summaryRow}>
              <p style={styles.summaryLabel}>Billing Cycle</p>
              <p style={styles.summaryValue}>
                {billingCycle === 'annual' ? 'Annual' : 'Monthly'}
              </p>
            </div>

            <div style={styles.summaryRow}>
              <p style={styles.summaryLabel}>Price</p>
              <p style={styles.summaryValue}>${price}/mo</p>
            </div>

            <hr style={styles.summaryDivider} />

            <div style={styles.summaryRow}>
              <p style={styles.dueTodayLabel}>Due Today</p>
              <p style={styles.dueTodayValue}>${price}/mo</p>
            </div>

            <p style={styles.note}>
              You can cancel anytime. No long-term contracts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
