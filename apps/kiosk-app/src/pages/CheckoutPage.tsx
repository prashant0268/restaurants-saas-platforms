import { type CSSProperties, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';

const styles: Record<string, CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#f5f5f5',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 24px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #eee',
    gap: 24,
  },
  backButton: {
    padding: '16px 32px',
    fontSize: 20,
    fontWeight: 600,
    backgroundColor: '#666',
    color: '#ffffff',
    border: 'none',
    borderRadius: 12,
    cursor: 'pointer',
    touchAction: 'manipulation',
    minHeight: 56,
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    color: '#1a1a1a',
    margin: 0,
  },
  body: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 48,
    gap: 48,
    overflowY: 'auto',
  },
  section: {
    width: '100%',
    maxWidth: 720,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: '#1a1a1a',
    margin: 0,
    marginBottom: 20,
  },
  orderTypeRow: {
    display: 'flex',
    gap: 24,
  },
  orderTypeButton: {
    flex: 1,
    padding: '32px 24px',
    fontSize: 24,
    fontWeight: 700,
    border: '3px solid #ddd',
    borderRadius: 16,
    backgroundColor: '#ffffff',
    color: '#666',
    cursor: 'pointer',
    touchAction: 'manipulation',
    minHeight: 100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    transition: 'border-color 0.2s, color 0.2s',
  },
  orderTypeButtonActive: {
    flex: 1,
    padding: '32px 24px',
    fontSize: 24,
    fontWeight: 700,
    border: '3px solid #e63946',
    borderRadius: 16,
    backgroundColor: '#fff5f5',
    color: '#e63946',
    cursor: 'pointer',
    touchAction: 'manipulation',
    minHeight: 100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
  },
  orderTypeIcon: {
    fontSize: 40,
  },
  tableInput: {
    width: '100%',
    padding: '20px 24px',
    fontSize: 24,
    fontWeight: 600,
    border: '3px solid #ddd',
    borderRadius: 16,
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    marginTop: 16,
    boxSizing: 'border-box',
    textAlign: 'center',
  },
  paymentRow: {
    display: 'flex',
    gap: 24,
    flexWrap: 'wrap',
  },
  paymentButton: {
    flex: '1 1 200px',
    padding: '32px 24px',
    fontSize: 22,
    fontWeight: 700,
    border: '3px solid #ddd',
    borderRadius: 16,
    backgroundColor: '#ffffff',
    color: '#666',
    cursor: 'pointer',
    touchAction: 'manipulation',
    minHeight: 100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    transition: 'border-color 0.2s, color 0.2s',
  },
  paymentButtonActive: {
    flex: '1 1 200px',
    padding: '32px 24px',
    fontSize: 22,
    fontWeight: 700,
    border: '3px solid #e63946',
    borderRadius: 16,
    backgroundColor: '#fff5f5',
    color: '#e63946',
    cursor: 'pointer',
    touchAction: 'manipulation',
    minHeight: 100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
  },
  paymentIcon: {
    fontSize: 36,
  },
  footer: {
    padding: '24px 32px',
    backgroundColor: '#ffffff',
    borderTop: '2px solid #eee',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
  },
  totalRow: {
    fontSize: 28,
    fontWeight: 700,
    color: '#1a1a1a',
  },
  placeOrderButton: {
    width: '100%',
    maxWidth: 720,
    padding: '24px 0',
    fontSize: 28,
    fontWeight: 700,
    backgroundColor: '#e63946',
    color: '#ffffff',
    border: 'none',
    borderRadius: 16,
    cursor: 'pointer',
    touchAction: 'manipulation',
    minHeight: 80,
  },
  placeOrderButtonDisabled: {
    width: '100%',
    maxWidth: 720,
    padding: '24px 0',
    fontSize: 28,
    fontWeight: 700,
    backgroundColor: '#ccc',
    color: '#999',
    border: 'none',
    borderRadius: 16,
    cursor: 'not-allowed',
    minHeight: 80,
  },
};

type PaymentMethod = 'card' | 'cash' | 'mobile';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { orderType, tableNumber, setOrderType, setTableNumber, total } =
    useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null,
  );

  const canPlaceOrder =
    orderType !== null &&
    paymentMethod !== null &&
    (orderType !== 'dine-in' || tableNumber.trim() !== '');

  const handlePlaceOrder = () => {
    if (!canPlaceOrder) return;
    const orderNumber = Math.floor(100 + Math.random() * 900);
    navigate(`/confirmation/${orderNumber}`);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button
          style={styles.backButton}
          onClick={() => navigate('/cart')}
          aria-label="Back to cart"
        >
          Back to Cart
        </button>
        <h1 style={styles.title}>Checkout</h1>
      </header>

      <div style={styles.body}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Order Type</h2>
          <div style={styles.orderTypeRow}>
            <button
              style={
                orderType === 'dine-in'
                  ? styles.orderTypeButtonActive
                  : styles.orderTypeButton
              }
              onClick={() => setOrderType('dine-in')}
              aria-pressed={orderType === 'dine-in'}
            >
              <span style={styles.orderTypeIcon}>&#127869;</span>
              Dine In
            </button>
            <button
              style={
                orderType === 'takeout'
                  ? styles.orderTypeButtonActive
                  : styles.orderTypeButton
              }
              onClick={() => setOrderType('takeout')}
              aria-pressed={orderType === 'takeout'}
            >
              <span style={styles.orderTypeIcon}>&#128230;</span>
              Takeout
            </button>
          </div>
          {orderType === 'dine-in' && (
            <input
              type="text"
              inputMode="numeric"
              placeholder="Enter Table Number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              style={styles.tableInput}
              aria-label="Table number"
            />
          )}
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Payment Method</h2>
          <div style={styles.paymentRow}>
            <button
              style={
                paymentMethod === 'card'
                  ? styles.paymentButtonActive
                  : styles.paymentButton
              }
              onClick={() => setPaymentMethod('card')}
              aria-pressed={paymentMethod === 'card'}
            >
              <span style={styles.paymentIcon}>&#128179;</span>
              Credit / Debit
            </button>
            <button
              style={
                paymentMethod === 'cash'
                  ? styles.paymentButtonActive
                  : styles.paymentButton
              }
              onClick={() => setPaymentMethod('cash')}
              aria-pressed={paymentMethod === 'cash'}
            >
              <span style={styles.paymentIcon}>&#128176;</span>
              Cash
            </button>
            <button
              style={
                paymentMethod === 'mobile'
                  ? styles.paymentButtonActive
                  : styles.paymentButton
              }
              onClick={() => setPaymentMethod('mobile')}
              aria-pressed={paymentMethod === 'mobile'}
            >
              <span style={styles.paymentIcon}>&#128241;</span>
              Mobile Pay
            </button>
          </div>
        </div>
      </div>

      <footer style={styles.footer}>
        <span style={styles.totalRow}>Total: ${total().toFixed(2)}</span>
        <button
          style={
            canPlaceOrder
              ? styles.placeOrderButton
              : styles.placeOrderButtonDisabled
          }
          onClick={handlePlaceOrder}
          disabled={!canPlaceOrder}
          aria-label={`Place order for $${total().toFixed(2)}`}
        >
          Place Order
        </button>
      </footer>
    </div>
  );
};
