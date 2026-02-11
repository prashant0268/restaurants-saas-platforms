import { type CSSProperties, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';

const allItems: Record<string, {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
}> = {
  '1': { id: '1', name: 'Classic Burger', price: 9.99, description: 'Our signature beef patty with lettuce, tomato, onion, and our special house sauce on a toasted brioche bun.' },
  '2': { id: '2', name: 'Crispy Chicken Sandwich', price: 10.99, description: 'Hand-breaded chicken breast, crispy fried, with pickles and creamy mayo on a butter-toasted bun.' },
  '3': { id: '3', name: 'Loaded Fries', price: 7.99, description: 'Crispy golden fries topped with melted cheddar cheese, crispy bacon bits, and fresh scallions.' },
  '4': { id: '4', name: 'Milkshake', price: 5.99, description: 'Thick and creamy hand-spun milkshake. Available in chocolate, vanilla, or strawberry.' },
  '5': { id: '5', name: 'Double Smash Burger', price: 13.99, description: 'Two thin smashed beef patties with melted American cheese, caramelized onions, and special sauce.' },
  '6': { id: '6', name: 'Bacon BBQ Burger', price: 12.99, description: 'Beef patty with crispy bacon, cheddar cheese, onion rings, and smoky BBQ sauce.' },
  '7': { id: '7', name: 'Veggie Burger', price: 10.99, description: 'Plant-based patty with lettuce, tomato, avocado, and vegan garlic aioli.' },
  '8': { id: '8', name: 'Grilled Chicken Wrap', price: 9.99, description: 'Grilled chicken breast with mixed greens, tomato, cucumber, and ranch dressing in a flour tortilla.' },
  '9': { id: '9', name: 'Chicken Tenders', price: 8.99, description: '4 pieces of golden crispy chicken tenders served with your choice of dipping sauce.' },
  '10': { id: '10', name: 'Regular Fries', price: 3.99, description: 'Golden crispy french fries seasoned with sea salt.' },
  '11': { id: '11', name: 'Onion Rings', price: 5.99, description: 'Thick-cut onion rings in a crispy beer batter, served with ranch dipping sauce.' },
  '12': { id: '12', name: 'Side Salad', price: 4.99, description: 'Mixed greens with cherry tomatoes, cucumber, croutons, and your choice of dressing.' },
  '13': { id: '13', name: 'Soft Drink', price: 2.99, description: 'Refreshing fountain drink. Choose from Coca-Cola, Sprite, Fanta, or Dr Pepper.' },
  '14': { id: '14', name: 'Iced Tea', price: 2.99, description: 'Freshly brewed iced tea, available sweetened or unsweetened.' },
  '15': { id: '15', name: 'Bottled Water', price: 1.99, description: 'Purified spring water, 16.9 oz bottle.' },
  '16': { id: '16', name: 'Chocolate Brownie', price: 4.99, description: 'Warm, rich fudge brownie topped with whipped cream and a drizzle of chocolate sauce.' },
  '17': { id: '17', name: 'Apple Pie', price: 4.99, description: 'Classic apple pie slice with cinnamon crumble topping. Served warm.' },
  '18': { id: '18', name: 'Ice Cream Sundae', price: 6.99, description: 'Three scoops of vanilla ice cream with hot fudge, whipped cream, sprinkles, and a cherry on top.' },
};

const modifierOptions = [
  { id: 'mod-cheese', name: 'Extra Cheese', price: 1.50 },
  { id: 'mod-bacon', name: 'Add Bacon', price: 2.00 },
  { id: 'mod-avocado', name: 'Add Avocado', price: 1.50 },
  { id: 'mod-sauce', name: 'Extra Sauce', price: 0.50 },
  { id: 'mod-upsize', name: 'Upsize', price: 2.00 },
];

const styles: Record<string, CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#ffffff',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 24px',
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: '#1a1a1a',
    margin: 0,
    marginLeft: 24,
  },
  body: {
    flex: 1,
    display: 'flex',
    overflowY: 'auto',
    padding: 32,
    gap: 48,
  },
  imageSection: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    width: '100%',
    maxWidth: 480,
    aspectRatio: '1',
    backgroundColor: '#f0f0f0',
    borderRadius: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 96,
  },
  detailSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  name: {
    fontSize: 36,
    fontWeight: 800,
    color: '#1a1a1a',
    margin: 0,
  },
  description: {
    fontSize: 20,
    color: '#666',
    lineHeight: 1.6,
    margin: 0,
  },
  price: {
    fontSize: 32,
    fontWeight: 700,
    color: '#e63946',
    margin: 0,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: '#1a1a1a',
    margin: 0,
    marginTop: 16,
  },
  modifierList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  modifierItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    padding: '12px 16px',
    borderRadius: 12,
    border: '2px solid #eee',
    cursor: 'pointer',
    touchAction: 'manipulation',
    minHeight: 56,
    backgroundColor: '#fff',
  },
  modifierItemSelected: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    padding: '12px 16px',
    borderRadius: 12,
    border: '2px solid #e63946',
    cursor: 'pointer',
    touchAction: 'manipulation',
    minHeight: 56,
    backgroundColor: '#fff5f5',
  },
  checkbox: {
    width: 28,
    height: 28,
    accentColor: '#e63946',
  },
  modifierName: {
    fontSize: 18,
    fontWeight: 600,
    color: '#1a1a1a',
    flex: 1,
  },
  modifierPrice: {
    fontSize: 18,
    fontWeight: 600,
    color: '#666',
  },
  quantitySection: {
    display: 'flex',
    alignItems: 'center',
    gap: 24,
    marginTop: 16,
  },
  qtyButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    border: '2px solid #e63946',
    backgroundColor: '#fff',
    color: '#e63946',
    fontSize: 36,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    touchAction: 'manipulation',
    padding: 0,
    lineHeight: 1,
  },
  qtyDisplay: {
    fontSize: 36,
    fontWeight: 700,
    minWidth: 48,
    textAlign: 'center',
    color: '#1a1a1a',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 32px',
    borderTop: '2px solid #eee',
    backgroundColor: '#ffffff',
  },
  totalPrice: {
    fontSize: 28,
    fontWeight: 700,
    color: '#1a1a1a',
  },
  addButton: {
    padding: '20px 48px',
    fontSize: 24,
    fontWeight: 700,
    backgroundColor: '#e63946',
    color: '#ffffff',
    border: 'none',
    borderRadius: 16,
    cursor: 'pointer',
    touchAction: 'manipulation',
    minHeight: 72,
    minWidth: 240,
  },
  notFound: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    fontSize: 24,
    color: '#666',
  },
};

export const ItemDetailPage = () => {
  const navigate = useNavigate();
  const { itemId } = useParams<{ itemId: string }>();
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);
  const [selectedModifiers, setSelectedModifiers] = useState<Set<string>>(
    new Set(),
  );

  const item = itemId ? allItems[itemId] : undefined;

  if (!item) {
    return (
      <div style={styles.container}>
        <header style={styles.header}>
          <button style={styles.backButton} onClick={() => navigate('/menu')}>
            Back to Menu
          </button>
        </header>
        <div style={styles.notFound}>Item not found</div>
      </div>
    );
  }

  const toggleModifier = (modId: string) => {
    setSelectedModifiers((prev) => {
      const next = new Set(prev);
      if (next.has(modId)) {
        next.delete(modId);
      } else {
        next.add(modId);
      }
      return next;
    });
  };

  const modifierTotal = modifierOptions
    .filter((m) => selectedModifiers.has(m.id))
    .reduce((sum, m) => sum + m.price, 0);

  const lineTotal = (item.price + modifierTotal) * quantity;

  const handleAddToCart = () => {
    addItem({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      quantity,
      image: item.image,
      modifiers: modifierOptions
        .filter((m) => selectedModifiers.has(m.id))
        .map(({ id, name, price }) => ({ id, name, price })),
    });
    navigate('/menu');
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button style={styles.backButton} onClick={() => navigate('/menu')}>
          Back to Menu
        </button>
        <h2 style={styles.headerTitle}>Customize Your Order</h2>
      </header>
      <div style={styles.body}>
        <div style={styles.imageSection}>
          <div style={styles.imagePlaceholder}>
            &#127860;
          </div>
        </div>
        <div style={styles.detailSection}>
          <h1 style={styles.name}>{item.name}</h1>
          <p style={styles.description}>{item.description}</p>
          <p style={styles.price}>${item.price.toFixed(2)}</p>

          <h3 style={styles.sectionTitle}>Add-ons</h3>
          <div style={styles.modifierList}>
            {modifierOptions.map((mod) => {
              const isSelected = selectedModifiers.has(mod.id);
              return (
                <div
                  key={mod.id}
                  style={
                    isSelected
                      ? styles.modifierItemSelected
                      : styles.modifierItem
                  }
                  onClick={() => toggleModifier(mod.id)}
                  role="checkbox"
                  aria-checked={isSelected}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleModifier(mod.id);
                    }
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleModifier(mod.id)}
                    style={styles.checkbox}
                    tabIndex={-1}
                    aria-hidden
                  />
                  <span style={styles.modifierName}>{mod.name}</span>
                  <span style={styles.modifierPrice}>
                    +${mod.price.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>

          <h3 style={styles.sectionTitle}>Quantity</h3>
          <div style={styles.quantitySection}>
            <button
              style={styles.qtyButton}
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span style={styles.qtyDisplay}>{quantity}</span>
            <button
              style={styles.qtyButton}
              onClick={() => setQuantity((q) => Math.min(20, q + 1))}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <footer style={styles.footer}>
        <span style={styles.totalPrice}>Total: ${lineTotal.toFixed(2)}</span>
        <button
          style={styles.addButton}
          onClick={handleAddToCart}
          aria-label={`Add ${quantity} ${item.name} to cart for $${lineTotal.toFixed(2)}`}
        >
          Add to Cart
        </button>
      </footer>
    </div>
  );
};
