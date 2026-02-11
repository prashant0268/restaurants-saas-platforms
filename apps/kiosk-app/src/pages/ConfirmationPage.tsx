import { type CSSProperties, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';

const AUTO_RETURN_SECONDS = 10;

const styles: Record<string, CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#e63946',
    padding: 48,
    textAlign: 'center',
    gap: 32,
  },
  checkmark: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 64,
    color: '#e63946',
    fontWeight: 700,
  },
  title: {
    fontSize: 48,
    fontWeight: 800,
    color: '#ffffff',
    margin: 0,
  },
  orderNumber: {
    fontSize: 72,
    fontWeight: 800,
    color: '#ffffff',
    margin: 0,
    letterSpacing: 4,
  },
  subtitle: {
    fontSize: 28,
    fontWeight: 400,
    color: 'rgba(255, 255, 255, 0.9)',
    margin: 0,
  },
  waitTime: {
    fontSize: 24,
    fontWeight: 600,
    color: '#ffffff',
    margin: 0,
    padding: '16px 32px',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 16,
  },
  autoReturn: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.7)',
    margin: 0,
    marginTop: 24,
  },
  newOrderButton: {
    padding: '20px 48px',
    fontSize: 24,
    fontWeight: 700,
    backgroundColor: '#ffffff',
    color: '#e63946',
    border: 'none',
    borderRadius: 16,
    cursor: 'pointer',
    touchAction: 'manipulation',
    minHeight: 72,
    marginTop: 16,
  },
};

export const ConfirmationPage = () => {
  const navigate = useNavigate();
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const clearCart = useCartStore((s) => s.clearCart);
  const hasCleared = useRef(false);

  useEffect(() => {
    if (!hasCleared.current) {
      clearCart();
      hasCleared.current = true;
    }
  }, [clearCart]);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, AUTO_RETURN_SECONDS * 1000);
    return () => clearTimeout(timer);
  }, [navigate]);

  const estimatedMinutes = Math.floor(5 + Math.random() * 15);

  return (
    <div style={styles.container}>
      <div style={styles.checkmark} aria-hidden="true">
        &#10003;
      </div>
      <h1 style={styles.title}>Order Placed!</h1>
      <p style={styles.subtitle}>Your order number is</p>
      <p style={styles.orderNumber}>#{orderNumber}</p>
      <p style={styles.waitTime}>
        Estimated wait time: ~{estimatedMinutes} minutes
      </p>
      <p style={styles.autoReturn}>
        Returning to home screen in {AUTO_RETURN_SECONDS} seconds...
      </p>
      <button
        style={styles.newOrderButton}
        onClick={() => navigate('/')}
        aria-label="Start a new order"
      >
        Start New Order
      </button>
    </div>
  );
};
