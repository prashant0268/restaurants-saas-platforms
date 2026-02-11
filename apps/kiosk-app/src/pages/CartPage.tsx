import { type CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../components/CartItem';
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
    justifyContent: 'space-between',
    padding: '16px 24px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #eee',
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
  clearButton: {
    padding: '16px 32px',
    fontSize: 18,
    fontWeight: 600,
    backgroundColor: '#dc3545',
    color: '#ffffff',
    border: 'none',
    borderRadius: 12,
    cursor: 'pointer',
    touchAction: 'manipulation',
    minHeight: 56,
  },
  itemList: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px 0',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 24,
    color: '#999',
  },
  emptyIcon: {
    fontSize: 80,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: 600,
    margin: 0,
  },
  emptySubtext: {
    fontSize: 18,
    margin: 0,
  },
  browseButton: {
    padding: '20px 48px',
    fontSize: 22,
    fontWeight: 700,
    backgroundColor: '#e63946',
    color: '#ffffff',
    border: 'none',
    borderRadius: 16,
    cursor: 'pointer',
    touchAction: 'manipulation',
    minHeight: 64,
    marginTop: 16,
  },
  footer: {
    padding: '24px 32px',
    backgroundColor: '#ffffff',
    borderTop: '2px solid #eee',
  },
  summary: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginBottom: 24,
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 20,
    color: '#666',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 28,
    fontWeight: 700,
    color: '#1a1a1a',
    borderTop: '2px solid #eee',
    paddingTop: 12,
  },
  checkoutButton: {
    width: '100%',
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
  checkoutButtonDisabled: {
    width: '100%',
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

export const CartPage = () => {
  const navigate = useNavigate();
  const { items, clearCart, subtotal, tax, total } = useCartStore();

  const isEmpty = items.length === 0;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button
          style={styles.backButton}
          onClick={() => navigate('/menu')}
          aria-label="Back to menu"
        >
          Back to Menu
        </button>
        <h1 style={styles.title}>Your Cart</h1>
        {!isEmpty && (
          <button
            style={styles.clearButton}
            onClick={clearCart}
            aria-label="Clear all items from cart"
          >
            Clear Cart
          </button>
        )}
      </header>

      {isEmpty ? (
        <div style={styles.emptyState}>
          <span style={styles.emptyIcon}>&#128722;</span>
          <p style={styles.emptyText}>Your cart is empty</p>
          <p style={styles.emptySubtext}>
            Add items from the menu to get started
          </p>
          <button
            style={styles.browseButton}
            onClick={() => navigate('/menu')}
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <>
          <div style={styles.itemList}>
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <footer style={styles.footer}>
            <div style={styles.summary}>
              <div style={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${subtotal().toFixed(2)}</span>
              </div>
              <div style={styles.summaryRow}>
                <span>Tax (8%)</span>
                <span>${tax().toFixed(2)}</span>
              </div>
              <div style={styles.totalRow}>
                <span>Total</span>
                <span>${total().toFixed(2)}</span>
              </div>
            </div>
            <button
              style={styles.checkoutButton}
              onClick={() => navigate('/checkout')}
              aria-label={`Proceed to checkout. Total: $${total().toFixed(2)}`}
            >
              Checkout - ${total().toFixed(2)}
            </button>
          </footer>
        </>
      )}
    </div>
  );
};
