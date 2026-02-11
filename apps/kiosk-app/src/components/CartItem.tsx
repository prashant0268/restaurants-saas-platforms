import { type CSSProperties } from 'react';
import { useCartStore, type CartItem as CartItemType } from '../stores/cartStore';

interface CartItemProps {
  item: CartItemType;
}

const styles: Record<string, CSSProperties> = {
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    borderBottom: '1px solid #eee',
    backgroundColor: '#fff',
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontSize: 20,
    fontWeight: 700,
    color: '#1a1a1a',
    margin: 0,
    marginBottom: 4,
  },
  modifiers: {
    fontSize: 16,
    color: '#666',
    margin: 0,
  },
  price: {
    fontSize: 20,
    fontWeight: 700,
    color: '#1a1a1a',
    minWidth: 80,
    textAlign: 'right' as const,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  qtyButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    border: '2px solid #e63946',
    backgroundColor: '#fff',
    color: '#e63946',
    fontSize: 28,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    touchAction: 'manipulation',
    lineHeight: 1,
    padding: 0,
  },
  quantity: {
    fontSize: 24,
    fontWeight: 700,
    minWidth: 32,
    textAlign: 'center' as const,
    color: '#1a1a1a',
  },
  removeButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    border: '2px solid #dc3545',
    backgroundColor: '#fff',
    color: '#dc3545',
    fontSize: 20,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    touchAction: 'manipulation',
    padding: 0,
    marginLeft: 8,
  },
};

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCartStore();

  const modifierTotal = item.modifiers.reduce(
    (sum, mod) => sum + mod.price,
    0,
  );
  const lineTotal = (item.price + modifierTotal) * item.quantity;

  return (
    <div style={styles.row}>
      <div style={styles.info}>
        <h3 style={styles.name}>{item.name}</h3>
        {item.modifiers.length > 0 && (
          <p style={styles.modifiers}>
            {item.modifiers.map((m) => m.name).join(', ')}
          </p>
        )}
        {item.specialInstructions && (
          <p style={styles.modifiers}>Note: {item.specialInstructions}</p>
        )}
      </div>
      <div style={styles.controls}>
        <button
          style={styles.qtyButton}
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          aria-label={`Decrease quantity of ${item.name}`}
        >
          -
        </button>
        <span style={styles.quantity}>{item.quantity}</span>
        <button
          style={styles.qtyButton}
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          aria-label={`Increase quantity of ${item.name}`}
        >
          +
        </button>
      </div>
      <span style={styles.price}>${lineTotal.toFixed(2)}</span>
      <button
        style={styles.removeButton}
        onClick={() => removeItem(item.id)}
        aria-label={`Remove ${item.name} from cart`}
      >
        X
      </button>
    </div>
  );
};
