import { type CSSProperties, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuItemCard } from '../components/MenuItemCard';
import { useCartStore } from '../stores/cartStore';

const categories = [
  { id: 'popular', name: 'Popular' },
  { id: 'burgers', name: 'Burgers' },
  { id: 'chicken', name: 'Chicken' },
  { id: 'sides', name: 'Sides' },
  { id: 'drinks', name: 'Drinks' },
  { id: 'desserts', name: 'Desserts' },
];

const menuItems: Record<string, Array<{
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
}>> = {
  popular: [
    { id: '1', name: 'Classic Burger', price: 9.99, description: 'Beef patty with lettuce, tomato, and our special sauce' },
    { id: '2', name: 'Crispy Chicken Sandwich', price: 10.99, description: 'Breaded chicken breast with pickles and mayo' },
    { id: '3', name: 'Loaded Fries', price: 7.99, description: 'Crispy fries with cheese, bacon, and scallions' },
    { id: '4', name: 'Milkshake', price: 5.99, description: 'Creamy milkshake in chocolate, vanilla, or strawberry' },
  ],
  burgers: [
    { id: '1', name: 'Classic Burger', price: 9.99, description: 'Beef patty with lettuce, tomato, and our special sauce' },
    { id: '5', name: 'Double Smash Burger', price: 13.99, description: 'Two smashed patties with American cheese' },
    { id: '6', name: 'Bacon BBQ Burger', price: 12.99, description: 'Beef patty with crispy bacon and BBQ sauce' },
    { id: '7', name: 'Veggie Burger', price: 10.99, description: 'Plant-based patty with all the fixings' },
  ],
  chicken: [
    { id: '2', name: 'Crispy Chicken Sandwich', price: 10.99, description: 'Breaded chicken breast with pickles and mayo' },
    { id: '8', name: 'Grilled Chicken Wrap', price: 9.99, description: 'Grilled chicken with fresh veggies in a tortilla' },
    { id: '9', name: 'Chicken Tenders', price: 8.99, description: '4 pieces of crispy chicken tenders with dipping sauce' },
  ],
  sides: [
    { id: '3', name: 'Loaded Fries', price: 7.99, description: 'Crispy fries with cheese, bacon, and scallions' },
    { id: '10', name: 'Regular Fries', price: 3.99, description: 'Golden crispy french fries' },
    { id: '11', name: 'Onion Rings', price: 5.99, description: 'Beer-battered crispy onion rings' },
    { id: '12', name: 'Side Salad', price: 4.99, description: 'Mixed greens with cherry tomatoes and ranch' },
  ],
  drinks: [
    { id: '4', name: 'Milkshake', price: 5.99, description: 'Creamy milkshake in chocolate, vanilla, or strawberry' },
    { id: '13', name: 'Soft Drink', price: 2.99, description: 'Coca-Cola, Sprite, or Fanta' },
    { id: '14', name: 'Iced Tea', price: 2.99, description: 'Freshly brewed sweet or unsweetened' },
    { id: '15', name: 'Bottled Water', price: 1.99, description: 'Purified spring water' },
  ],
  desserts: [
    { id: '16', name: 'Chocolate Brownie', price: 4.99, description: 'Warm fudge brownie with whipped cream' },
    { id: '17', name: 'Apple Pie', price: 4.99, description: 'Classic apple pie slice with cinnamon' },
    { id: '18', name: 'Ice Cream Sundae', price: 6.99, description: 'Three scoops with hot fudge and cherry' },
  ],
};

const styles: Record<string, CSSProperties> = {
  container: {
    display: 'flex',
    height: '100%',
    flex: 1,
  },
  sidebar: {
    width: 220,
    backgroundColor: '#1a1a1a',
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 0',
    overflowY: 'auto',
    flexShrink: 0,
  },
  categoryButton: {
    padding: '20px 24px',
    fontSize: 20,
    fontWeight: 600,
    border: 'none',
    backgroundColor: 'transparent',
    color: '#aaa',
    textAlign: 'left',
    cursor: 'pointer',
    touchAction: 'manipulation',
    minHeight: 64,
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color 0.2s, color 0.2s',
  },
  categoryButtonActive: {
    padding: '20px 24px',
    fontSize: 20,
    fontWeight: 700,
    border: 'none',
    backgroundColor: '#e63946',
    color: '#ffffff',
    textAlign: 'left',
    cursor: 'pointer',
    touchAction: 'manipulation',
    minHeight: 64,
    display: 'flex',
    alignItems: 'center',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #eee',
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    color: '#1a1a1a',
    margin: 0,
  },
  cartButton: {
    padding: '16px 32px',
    fontSize: 20,
    fontWeight: 700,
    backgroundColor: '#e63946',
    color: '#ffffff',
    border: 'none',
    borderRadius: 12,
    cursor: 'pointer',
    touchAction: 'manipulation',
    minHeight: 56,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: 20,
    padding: 24,
    overflowY: 'auto',
    flex: 1,
  },
  backButton: {
    padding: '12px 24px',
    fontSize: 18,
    fontWeight: 600,
    backgroundColor: '#666',
    color: '#ffffff',
    border: 'none',
    borderRadius: 12,
    cursor: 'pointer',
    touchAction: 'manipulation',
    minHeight: 48,
  },
};

export const MenuPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('popular');
  const totalItems = useCartStore((s) => s.totalItems());

  const items = menuItems[activeCategory] ?? [];
  const activeCategoryName = categories.find(
    (c) => c.id === activeCategory,
  )?.name ?? 'Menu';

  return (
    <div style={styles.container}>
      <nav style={styles.sidebar} aria-label="Menu categories">
        {categories.map((cat) => (
          <button
            key={cat.id}
            style={
              cat.id === activeCategory
                ? styles.categoryButtonActive
                : styles.categoryButton
            }
            onClick={() => setActiveCategory(cat.id)}
            aria-pressed={cat.id === activeCategory}
          >
            {cat.name}
          </button>
        ))}
      </nav>
      <div style={styles.main}>
        <header style={styles.header}>
          <button
            style={styles.backButton}
            onClick={() => navigate('/')}
            aria-label="Cancel order"
          >
            Cancel
          </button>
          <h1 style={styles.title}>{activeCategoryName}</h1>
          <button
            style={styles.cartButton}
            onClick={() => navigate('/cart')}
            aria-label={`View cart with ${totalItems} items`}
          >
            Cart ({totalItems})
          </button>
        </header>
        <div style={styles.grid}>
          {items.map((item) => (
            <MenuItemCard
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              image={item.image}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
