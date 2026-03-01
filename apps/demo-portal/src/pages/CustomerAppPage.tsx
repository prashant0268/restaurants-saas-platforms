import { useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Header } from '../components/layout/Header';
import { MockPhoneFrame } from '../components/shared/MockPhoneFrame';
import { FeatureList } from '../components/shared/FeatureList';
import { mockMenuItems, mockReservations, mockLoyaltyStats } from '../data/mockDemoData';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  ShoppingCart,
  MapPin,
  Clock,
  Star,
  Gift,
  Bell,
  User,
  Heart,
} from 'lucide-react';

// ─── Screen data ────────────────────────────────────────────

interface AppScreen {
  id: string;
  label: string;
  phoneTitle: string;
  title: string;
  description: string;
  features: string[];
  PhoneContent: () => ReactNode;
}

// Screen 1: Home
const HomePhoneContent = () => (
  <div>
    <div style={phoneStyles.welcomeBanner}>
      <p style={phoneStyles.welcomeGreeting}>Welcome back!</p>
      <p style={phoneStyles.welcomeName}>Pooja Exotic Indian Cuisine</p>
      <div style={phoneStyles.searchBar}>
        <Search size={14} color="#94a3b8" />
        <span style={phoneStyles.searchPlaceholder}>Search our menu...</span>
      </div>
    </div>
    <div style={phoneStyles.quickActions}>
      {[
        { icon: <ShoppingCart size={18} color="#0d9488" />, label: 'Order' },
        { icon: <Clock size={18} color="#0d9488" />, label: 'Reserve' },
        { icon: <Gift size={18} color="#0d9488" />, label: 'Rewards' },
        { icon: <MapPin size={18} color="#0d9488" />, label: 'Visit Us' },
      ].map((a) => (
        <div key={a.label} style={phoneStyles.quickAction}>
          <div style={phoneStyles.quickActionIcon}>{a.icon}</div>
          <span style={phoneStyles.quickActionLabel}>{a.label}</span>
        </div>
      ))}
    </div>
    <p style={phoneStyles.sectionHeader}>Popular Dishes</p>
    {mockMenuItems
      .filter((i) => ['Chicken Makhni', 'Lamb Biryani', 'Tandoori Chicken'].includes(i.name))
      .map((item) => (
        <div key={item.id} style={phoneStyles.menuItemRow}>
          <span style={phoneStyles.menuEmoji}>{item.emoji}</span>
          <div style={phoneStyles.menuInfo}>
            <p style={phoneStyles.menuName}>{item.name}</p>
            <p style={phoneStyles.menuDesc}>{item.description}</p>
          </div>
          <span style={phoneStyles.menuPrice}>${item.price.toFixed(2)}</span>
        </div>
      ))}
    <p style={phoneStyles.sectionHeader}>Today's Special</p>
    <div style={phoneStyles.specialCard}>
      <span style={{ fontSize: '32px' }}>🍛</span>
      <div style={{ flex: 1 }}>
        <p style={{ ...phoneStyles.menuName, color: '#ffffff' }}>Goat Biryani</p>
        <p style={{ fontSize: '11px', color: '#ccfbf1', margin: 0 }}>
          Chef's special — fragrant rice with tender goat
        </p>
      </div>
      <span style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>$19.95</span>
    </div>
  </div>
);

// Screen 2: Menu Browse
const MenuPhoneContent = () => (
  <div>
    <div style={phoneStyles.menuTabs}>
      {['All', 'Appetizers', 'Tandoori', 'Chicken', 'Veg'].map((cat, i) => (
        <span
          key={cat}
          style={i === 0 ? phoneStyles.menuTabActive : phoneStyles.menuTab}
        >
          {cat}
        </span>
      ))}
    </div>
    {mockMenuItems.slice(0, 7).map((item) => (
      <div key={item.id} style={phoneStyles.menuItemRow}>
        <span style={phoneStyles.menuEmoji}>{item.emoji}</span>
        <div style={phoneStyles.menuInfo}>
          <p style={phoneStyles.menuName}>{item.name}</p>
          <p style={phoneStyles.menuDesc}>{item.description}</p>
          {item.dietary.length > 0 && (
            <div style={phoneStyles.dietaryRow}>
              {item.dietary.map((d) => (
                <span key={d} style={phoneStyles.dietaryTag}>{d}</span>
              ))}
            </div>
          )}
        </div>
        <span style={phoneStyles.menuPrice}>${item.price.toFixed(2)}</span>
      </div>
    ))}
  </div>
);

// Screen 3: Item Detail
const ItemDetailPhoneContent = () => {
  const item = mockMenuItems.find((i) => i.name === 'Chicken Makhni')!;
  return (
    <div>
      <div style={phoneStyles.itemHero}>
        <span style={{ fontSize: '64px' }}>{item.emoji}</span>
      </div>
      <div style={phoneStyles.itemBody}>
        <div style={phoneStyles.itemTitleRow}>
          <h3 style={phoneStyles.itemTitle}>{item.name}</h3>
          <Heart size={18} color="#e11d48" />
        </div>
        <p style={phoneStyles.itemDesc}>{item.description}</p>
        <div style={phoneStyles.itemMeta}>
          <span style={phoneStyles.itemPrice}>${item.price.toFixed(2)}</span>
          <span style={phoneStyles.itemRating}>
            <Star size={12} color="#f59e0b" fill="#f59e0b" /> 4.8
          </span>
        </div>
        <p style={phoneStyles.modifierHeader}>Customize</p>
        {['Extra creamy sauce', 'Spice level: Mild / Medium / Hot', 'Add garlic naan +$5.75'].map(
          (mod) => (
            <div key={mod} style={phoneStyles.modifierRow}>
              <div style={phoneStyles.modifierCheckbox} />
              <span style={phoneStyles.modifierLabel}>{mod}</span>
            </div>
          ),
        )}
        <button style={phoneStyles.addToCartBtn}>Add to Cart — ${item.price.toFixed(2)}</button>
      </div>
    </div>
  );
};

// Screen 4: Cart
const CartPhoneContent = () => {
  const cartItems = [
    { ...mockMenuItems.find((i) => i.name === 'Chicken Makhni')!, qty: 2 },
    { ...mockMenuItems.find((i) => i.name === 'Garlic Naan')!, qty: 3 },
    { ...mockMenuItems.find((i) => i.name === 'Gulab Jamun')!, qty: 2 },
  ];
  const subtotal = cartItems.reduce((sum, ci) => sum + ci.price * ci.qty, 0);
  const tax = subtotal * 0.08;
  return (
    <div style={{ padding: '16px' }}>
      <p style={phoneStyles.sectionHeader}>Your Order</p>
      {cartItems.map((ci) => (
        <div key={ci.id} style={phoneStyles.cartRow}>
          <span style={{ fontSize: '24px' }}>{ci.emoji}</span>
          <div style={{ flex: 1 }}>
            <p style={phoneStyles.menuName}>{ci.name}</p>
            <p style={phoneStyles.menuDesc}>Qty: {ci.qty}</p>
          </div>
          <span style={phoneStyles.menuPrice}>${(ci.price * ci.qty).toFixed(2)}</span>
        </div>
      ))}
      <div style={phoneStyles.cartDivider} />
      <div style={phoneStyles.cartTotalRow}>
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div style={phoneStyles.cartTotalRow}>
        <span>Tax</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <div style={{ ...phoneStyles.cartTotalRow, fontWeight: 700, fontSize: '16px' }}>
        <span>Total</span>
        <span>${(subtotal + tax).toFixed(2)}</span>
      </div>
      <button style={phoneStyles.addToCartBtn}>Place Order</button>
    </div>
  );
};

// Screen 5: Order Tracking
const OrderTrackingPhoneContent = () => {
  const steps = [
    { label: 'Order Placed', time: '6:32 PM', done: true },
    { label: 'Preparing', time: '6:35 PM', done: true },
    { label: 'Ready for Pickup', time: '', done: false },
    { label: 'Picked Up', time: '', done: false },
  ];
  return (
    <div style={{ padding: '16px' }}>
      <div style={phoneStyles.trackingHeader}>
        <p style={{ fontSize: '14px', fontWeight: 600, color: '#111827', margin: 0 }}>
          Order #POO-2847
        </p>
        <span style={phoneStyles.trackingBadge}>In Progress</span>
      </div>
      <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 20px' }}>
        Estimated ready: 6:50 PM
      </p>
      <div style={phoneStyles.timeline}>
        {steps.map((step, i) => (
          <div key={step.label} style={phoneStyles.timelineStep}>
            <div style={phoneStyles.timelineDotCol}>
              <div
                style={{
                  ...phoneStyles.timelineDot,
                  backgroundColor: step.done ? '#0d9488' : '#d1d5db',
                }}
              />
              {i < steps.length - 1 && (
                <div
                  style={{
                    ...phoneStyles.timelineLine,
                    backgroundColor: step.done ? '#0d9488' : '#e5e7eb',
                  }}
                />
              )}
            </div>
            <div>
              <p style={{ fontSize: '14px', fontWeight: 500, color: '#111827', margin: 0 }}>
                {step.label}
              </p>
              {step.time && (
                <p style={{ fontSize: '11px', color: '#6b7280', margin: '2px 0 0' }}>
                  {step.time}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div style={phoneStyles.trackingItems}>
        <p style={{ fontSize: '13px', fontWeight: 600, color: '#374151', margin: '0 0 8px' }}>
          Items
        </p>
        <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, lineHeight: 1.8 }}>
          2× Chicken Makhni<br />
          3× Garlic Naan<br />
          2× Gulab Jamun
        </p>
      </div>
    </div>
  );
};

// Screen 6: Loyalty
const LoyaltyPhoneContent = () => (
  <div>
    <div style={phoneStyles.loyaltyCard}>
      <p style={phoneStyles.loyaltyTitle}>Pooja Rewards</p>
      <p style={phoneStyles.loyaltyPoints}>
        {mockLoyaltyStats.pointsIssued.toLocaleString()}
      </p>
      <p style={phoneStyles.loyaltyTier}>Gold Member</p>
      <div style={phoneStyles.loyaltyDivider} />
      <div style={phoneStyles.loyaltyStatsRow}>
        <span>Active: {mockLoyaltyStats.activeMembers.toLocaleString()}</span>
        <span>Redeemed: {mockLoyaltyStats.rewardsRedeemed}</span>
      </div>
    </div>
    <p style={phoneStyles.rewardsHeader}>Available Rewards</p>
    {[
      { name: 'Free Gulab Jamun', pts: 150, emoji: '🍮' },
      { name: '$10 Off Your Order', pts: 300, emoji: '💰' },
      { name: 'Free Appetizer', pts: 200, emoji: '🥟' },
      { name: 'Birthday Biryani', pts: 0, emoji: '🎂' },
    ].map((reward) => (
      <div key={reward.name} style={phoneStyles.rewardItem}>
        <span style={{ fontSize: '20px' }}>{reward.emoji}</span>
        <div style={{ flex: 1 }}>
          <span style={phoneStyles.rewardName}>{reward.name}</span>
          <p style={{ fontSize: '11px', color: '#6b7280', margin: '2px 0 0' }}>
            {reward.pts > 0 ? `${reward.pts} points` : 'Free on your birthday!'}
          </p>
        </div>
        <button style={phoneStyles.redeemBtn}>
          {reward.pts > 0 ? 'Redeem' : 'Claim'}
        </button>
      </div>
    ))}
  </div>
);

// Screen 7: Reservations
const ReservationsPhoneContent = () => (
  <div>
    <div style={phoneStyles.reserveHeader}>
      <p style={{ fontSize: '14px', fontWeight: 600, color: '#111827', margin: '0 0 4px' }}>
        Book a Table at Pooja
      </p>
      <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
        Available tonight from 5 PM – 10 PM
      </p>
    </div>
    <div style={phoneStyles.dateRow}>
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d, i) => (
        <div key={d} style={i === 2 ? phoneStyles.dateActive : phoneStyles.dateItem}>
          <span style={{ fontSize: '11px', color: i === 2 ? '#ffffff' : '#6b7280' }}>{d}</span>
          <span
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: i === 2 ? '#ffffff' : '#111827',
            }}
          >
            {26 + i}
          </span>
        </div>
      ))}
    </div>
    <p style={{ ...phoneStyles.sectionHeader, padding: '0 16px' }}>Upcoming</p>
    {mockReservations.slice(0, 4).map((res) => {
      const colors: Record<string, { bg: string; color: string }> = {
        confirmed: { bg: '#dcfce7', color: '#16a34a' },
        pending: { bg: '#fef9c3', color: '#ca8a04' },
        seated: { bg: '#dbeafe', color: '#2563eb' },
      };
      const sc = colors[res.status] ?? { bg: '#f3f4f6', color: '#374151' };
      return (
        <div key={res.id} style={phoneStyles.reservationRow}>
          <div>
            <p style={phoneStyles.menuName}>{res.name}</p>
            <p style={phoneStyles.menuDesc}>
              {res.guests} guests · Table {res.table}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#111827', margin: 0 }}>
              {res.time}
            </p>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: '9999px',
                backgroundColor: sc.bg,
                color: sc.color,
                textTransform: 'capitalize' as const,
              }}
            >
              {res.status}
            </span>
          </div>
        </div>
      );
    })}
  </div>
);

// Screen 8: Profile
const ProfilePhoneContent = () => (
  <div style={{ padding: '20px 16px' }}>
    <div style={phoneStyles.profileHeader}>
      <div style={phoneStyles.profileAvatar}>PS</div>
      <div>
        <p style={{ fontSize: '18px', fontWeight: 700, color: '#111827', margin: 0 }}>
          Priya S.
        </p>
        <p style={{ fontSize: '12px', color: '#6b7280', margin: '2px 0 0' }}>
          Gold Member · 48,750 pts
        </p>
      </div>
    </div>
    {[
      { icon: <ShoppingCart size={16} color="#374151" />, label: 'Order History', detail: '23 orders' },
      { icon: <Heart size={16} color="#374151" />, label: 'Favorites', detail: '5 items' },
      { icon: <MapPin size={16} color="#374151" />, label: 'Saved Addresses', detail: '2 addresses' },
      { icon: <Bell size={16} color="#374151" />, label: 'Notifications', detail: 'On' },
      { icon: <Gift size={16} color="#374151" />, label: 'Refer a Friend', detail: 'Earn 500 pts' },
      { icon: <User size={16} color="#374151" />, label: 'Account Settings', detail: '' },
    ].map((row) => (
      <div key={row.label} style={phoneStyles.profileRow}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {row.icon}
          <span style={{ fontSize: '14px', color: '#111827' }}>{row.label}</span>
        </div>
        <span style={{ fontSize: '12px', color: '#6b7280' }}>{row.detail}</span>
      </div>
    ))}
  </div>
);

// ─── All screens ────────────────────────────────────────────

const screens: AppScreen[] = [
  {
    id: 'home',
    label: 'Home',
    phoneTitle: 'Pooja Exotic',
    title: 'Welcome Home Screen',
    description:
      'Your guests open the app to a warm, branded home screen showing Pooja\'s popular dishes, daily specials, and quick-action buttons for ordering, reservations, and rewards.',
    features: [
      'Branded welcome banner with Pooja\'s identity',
      'Quick actions: Order, Reserve, Rewards, Visit Us',
      'Popular dishes carousel from your live menu',
      'Today\'s special highlight with chef\'s pick',
      'Push notification opt-in on first visit',
    ],
    PhoneContent: HomePhoneContent,
  },
  {
    id: 'menu',
    label: 'Menu',
    phoneTitle: 'Menu',
    title: 'Browse the Full Menu',
    description:
      'Customers can browse all 38 items across 8 categories — from Appetizers to Desserts — with photos, dietary tags, and prices. Category tabs make it easy to jump straight to Tandoori or Biryani.',
    features: [
      'All 8 categories with item counts',
      'Dietary & allergen tags (vegetarian, vegan, GF)',
      'Search across the entire menu',
      'Sort by popularity, price, or category',
      'High-quality food photos per item',
    ],
    PhoneContent: MenuPhoneContent,
  },
  {
    id: 'item-detail',
    label: 'Item Detail',
    phoneTitle: 'Chicken Makhni',
    title: 'Item Detail & Customization',
    description:
      'Tapping a dish reveals the full detail view — a large photo, description, ratings, and customization options. Guests can adjust spice level, add sides like garlic naan, and save favorites.',
    features: [
      'Large hero image with dish description',
      'Star ratings & review count',
      'Modifier groups: spice level, add-ons, sides',
      'Save to favorites for quick reorder',
      'One-tap add to cart with total preview',
    ],
    PhoneContent: ItemDetailPhoneContent,
  },
  {
    id: 'cart',
    label: 'Cart',
    phoneTitle: 'Your Cart',
    title: 'Cart & Checkout',
    description:
      'A clean cart screen shows the full order summary — Chicken Makhni, Garlic Naan, Gulab Jamun — with quantities, subtotal, tax, and a one-tap place-order button.',
    features: [
      'Itemized order with quantity controls',
      'Real-time price calculation with tax',
      'Promo code & loyalty points redemption',
      'Delivery, pickup, or dine-in options',
      'Secure payment via card, Apple Pay, Google Pay',
    ],
    PhoneContent: CartPhoneContent,
  },
  {
    id: 'tracking',
    label: 'Tracking',
    phoneTitle: 'Order Status',
    title: 'Real-Time Order Tracking',
    description:
      'After placing an order, guests see a live timeline — from "Order Placed" to "Ready for Pickup" — with estimated ready times and item summary. No more "where\'s my food?" calls.',
    features: [
      'Step-by-step order timeline',
      'Estimated ready time with live updates',
      'Push notification at each status change',
      'Order ID for easy reference at pickup',
      'Reorder with one tap from history',
    ],
    PhoneContent: OrderTrackingPhoneContent,
  },
  {
    id: 'loyalty',
    label: 'Rewards',
    phoneTitle: 'Pooja Rewards',
    title: 'Loyalty & Rewards Program',
    description:
      'Turn guests into regulars with Pooja Rewards. Customers earn points on every order and redeem them for free Gulab Jamun, discounts, or a Birthday Biryani — automatically on their special day.',
    features: [
      'Points earned on every order at Pooja',
      'Tiered membership: Silver → Gold → Platinum',
      'Redeemable rewards: free desserts, discounts',
      'Birthday surprise: complimentary Biryani',
      'Referral bonus: invite friends, earn 500 pts',
    ],
    PhoneContent: LoyaltyPhoneContent,
  },
  {
    id: 'reservations',
    label: 'Reserve',
    phoneTitle: 'Reservations',
    title: 'Table Reservations',
    description:
      'Guests can book a table at Pooja in seconds — pick a date, choose a time slot, and confirm. SMS reminders reduce no-shows, and the waitlist keeps walk-ins informed.',
    features: [
      'Calendar view with real-time availability',
      'Party size selector with table assignment',
      'Special request notes (birthday, highchair)',
      'SMS confirmation & reminder before arrival',
      'Waitlist management for walk-in guests',
    ],
    PhoneContent: ReservationsPhoneContent,
  },
  {
    id: 'profile',
    label: 'Profile',
    phoneTitle: 'Profile',
    title: 'Customer Profile & Settings',
    description:
      'Each guest has a profile with their order history, saved favorites (Chicken Makhni!), addresses, notification preferences, and referral link to share Pooja with friends.',
    features: [
      'Complete order history with reorder',
      'Saved favorite dishes for quick access',
      'Multiple delivery addresses',
      'Notification preferences control',
      'Referral link to earn bonus points',
    ],
    PhoneContent: ProfilePhoneContent,
  },
];

// ─── Phone-internal styles ──────────────────────────────────

const phoneStyles: Record<string, CSSProperties> = {
  welcomeBanner: {
    padding: '20px 16px 16px',
    background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
    color: '#ffffff',
  },
  welcomeGreeting: {
    fontSize: '12px',
    opacity: 0.8,
    margin: '0 0 2px',
  },
  welcomeName: {
    fontSize: '17px',
    fontWeight: 700,
    margin: '0 0 12px',
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: '8px',
    padding: '8px 12px',
  },
  searchPlaceholder: {
    fontSize: '13px',
    color: '#ccfbf1',
  },
  quickActions: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '14px 8px',
    borderBottom: '1px solid #f1f5f9',
    backgroundColor: '#ffffff',
  },
  quickAction: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },
  quickActionIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    backgroundColor: '#f0fdfa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionLabel: {
    fontSize: '11px',
    color: '#374151',
    fontWeight: 500,
  },
  sectionHeader: {
    fontSize: '13px',
    fontWeight: 700,
    color: '#374151',
    margin: '14px 0 6px',
    padding: '0 16px',
  },
  menuItemRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 16px',
    borderBottom: '1px solid #f1f5f9',
    backgroundColor: '#ffffff',
  },
  menuEmoji: {
    fontSize: '26px',
    flexShrink: 0,
  },
  menuInfo: {
    flex: 1,
    minWidth: 0,
  },
  menuName: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#111827',
    margin: 0,
  },
  menuDesc: {
    fontSize: '11px',
    color: '#6b7280',
    margin: '2px 0 0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  menuPrice: {
    fontSize: '13px',
    fontWeight: 700,
    color: '#0d9488',
    flexShrink: 0,
  },
  specialCard: {
    margin: '8px 16px',
    padding: '14px 16px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #0d9488, #0f766e)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  menuTabs: {
    display: 'flex',
    gap: '6px',
    padding: '10px 16px',
    overflowX: 'auto',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #f1f5f9',
  },
  menuTab: {
    fontSize: '12px',
    padding: '5px 12px',
    borderRadius: '9999px',
    backgroundColor: '#f3f4f6',
    color: '#374151',
    whiteSpace: 'nowrap',
    fontWeight: 500,
  },
  menuTabActive: {
    fontSize: '12px',
    padding: '5px 12px',
    borderRadius: '9999px',
    backgroundColor: '#0d9488',
    color: '#ffffff',
    whiteSpace: 'nowrap',
    fontWeight: 600,
  },
  dietaryRow: {
    display: 'flex',
    gap: '4px',
    marginTop: '3px',
  },
  dietaryTag: {
    fontSize: '9px',
    padding: '1px 6px',
    borderRadius: '4px',
    backgroundColor: '#dcfce7',
    color: '#16a34a',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
  },
  itemHero: {
    height: '140px',
    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemBody: {
    padding: '16px',
  },
  itemTitleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '6px',
  },
  itemTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#111827',
    margin: 0,
  },
  itemDesc: {
    fontSize: '13px',
    color: '#6b7280',
    margin: '0 0 10px',
    lineHeight: 1.5,
  },
  itemMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  itemPrice: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#0d9488',
  },
  itemRating: {
    fontSize: '13px',
    color: '#374151',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  modifierHeader: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 8px',
  },
  modifierRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 0',
    borderBottom: '1px solid #f1f5f9',
  },
  modifierCheckbox: {
    width: '18px',
    height: '18px',
    borderRadius: '4px',
    border: '2px solid #d1d5db',
    flexShrink: 0,
  },
  modifierLabel: {
    fontSize: '13px',
    color: '#374151',
  },
  addToCartBtn: {
    width: '100%',
    padding: '12px',
    borderRadius: '10px',
    backgroundColor: '#0d9488',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    marginTop: '16px',
  },
  cartRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 0',
    borderBottom: '1px solid #f1f5f9',
  },
  cartDivider: {
    height: '1px',
    backgroundColor: '#e5e7eb',
    margin: '12px 0',
  },
  cartTotalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    color: '#374151',
    padding: '4px 0',
  },
  trackingHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trackingBadge: {
    fontSize: '11px',
    fontWeight: 600,
    backgroundColor: '#dbeafe',
    color: '#2563eb',
    padding: '3px 10px',
    borderRadius: '9999px',
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0px',
  },
  timelineStep: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
  },
  timelineDotCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '20px',
    flexShrink: 0,
  },
  timelineDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  timelineLine: {
    width: '2px',
    height: '28px',
  },
  trackingItems: {
    marginTop: '20px',
    padding: '14px',
    backgroundColor: '#f8fafc',
    borderRadius: '10px',
    border: '1px solid #e5e7eb',
  },
  loyaltyCard: {
    margin: '16px',
    padding: '20px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #0d9488, #0f766e)',
    color: '#ffffff',
  },
  loyaltyTitle: {
    fontSize: '12px',
    fontWeight: 500,
    opacity: 0.8,
    margin: '0 0 4px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  loyaltyPoints: {
    fontSize: '36px',
    fontWeight: 800,
    margin: '0 0 4px',
  },
  loyaltyTier: {
    fontSize: '14px',
    fontWeight: 600,
    margin: '0 0 16px',
    opacity: 0.9,
  },
  loyaltyDivider: {
    height: '1px',
    backgroundColor: 'rgba(255,255,255,0.2)',
    margin: '12px 0',
  },
  loyaltyStatsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    opacity: 0.9,
  },
  rewardsHeader: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#111827',
    margin: '16px 16px 8px',
  },
  rewardItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 16px',
    borderBottom: '1px solid #f1f5f9',
    backgroundColor: '#ffffff',
  },
  rewardName: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#374151',
  },
  redeemBtn: {
    fontSize: '11px',
    fontWeight: 600,
    color: '#0d9488',
    backgroundColor: '#f0fdfa',
    border: '1px solid #99f6e4',
    borderRadius: '6px',
    padding: '4px 10px',
    cursor: 'pointer',
  },
  reserveHeader: {
    padding: '16px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #f1f5f9',
  },
  dateRow: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '12px 8px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #f1f5f9',
  },
  dateItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
    padding: '6px 10px',
    borderRadius: '10px',
  },
  dateActive: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
    padding: '6px 10px',
    borderRadius: '10px',
    backgroundColor: '#0d9488',
  },
  reservationRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    borderBottom: '1px solid #f1f5f9',
    backgroundColor: '#ffffff',
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    marginBottom: '24px',
  },
  profileAvatar: {
    width: '52px',
    height: '52px',
    borderRadius: '50%',
    backgroundColor: '#0d9488',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: 700,
  },
  profileRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 0',
    borderBottom: '1px solid #f1f5f9',
  },
};

// ─── Page styles ────────────────────────────────────────────

const styles: Record<string, CSSProperties> = {
  page: {
    padding: '24px',
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
  },
  splitLayout: {
    display: 'flex',
    gap: '48px',
    alignItems: 'flex-start',
  },
  leftPanel: {
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  rightPanel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    paddingTop: '8px',
  },
  carouselNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  arrowBtn: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    border: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#374151',
    transition: 'border-color 0.15s, background-color 0.15s',
  },
  dots: {
    display: 'flex',
    gap: '6px',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#d1d5db',
    cursor: 'pointer',
    transition: 'background-color 0.15s, transform 0.15s',
    border: 'none',
    padding: 0,
  },
  dotActive: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#0d9488',
    cursor: 'pointer',
    transform: 'scale(1.25)',
    border: 'none',
    padding: 0,
  },
  screenLabel: {
    fontSize: '13px',
    color: '#6b7280',
    fontWeight: 500,
  },
  screenTabs: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginBottom: '4px',
  },
  screenTab: {
    padding: '6px 14px',
    borderRadius: '9999px',
    border: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
    color: '#374151',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  screenTabActive: {
    padding: '6px 14px',
    borderRadius: '9999px',
    border: '1px solid #0d9488',
    backgroundColor: '#0d9488',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  sectionTitle: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 6px',
  },
  sectionDescription: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 20px',
    lineHeight: 1.6,
  },
  screenCounter: {
    fontSize: '12px',
    color: '#94a3b8',
    fontWeight: 500,
    marginTop: '4px',
  },
};

// ─── Component ──────────────────────────────────────────────

export const CustomerAppPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const screen = screens[activeIndex];

  const goPrev = () => setActiveIndex((i) => (i === 0 ? screens.length - 1 : i - 1));
  const goNext = () => setActiveIndex((i) => (i === screens.length - 1 ? 0 : i + 1));

  return (
    <div style={styles.page}>
      <Header
        title="Customer Mobile App"
        subtitle="Pooja Exotic Indian Cuisine — every screen, customized for your restaurant"
      />

      <div style={styles.splitLayout}>
        {/* Left: Phone + carousel controls */}
        <div style={styles.leftPanel}>
          <MockPhoneFrame title={screen.phoneTitle}>
            <screen.PhoneContent />
          </MockPhoneFrame>

          {/* Carousel navigation */}
          <div style={styles.carouselNav}>
            <button
              style={styles.arrowBtn}
              onClick={goPrev}
              title="Previous screen"
            >
              <ChevronLeft size={18} />
            </button>
            <div style={styles.dots}>
              {screens.map((s, i) => (
                <button
                  key={s.id}
                  style={i === activeIndex ? styles.dotActive : styles.dot}
                  onClick={() => setActiveIndex(i)}
                  title={s.label}
                />
              ))}
            </div>
            <button
              style={styles.arrowBtn}
              onClick={goNext}
              title="Next screen"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <span style={styles.screenCounter}>
            {activeIndex + 1} / {screens.length}
          </span>
        </div>

        {/* Right: Screen details */}
        <div style={styles.rightPanel}>
          <div style={styles.screenTabs}>
            {screens.map((s, i) => (
              <button
                key={s.id}
                style={i === activeIndex ? styles.screenTabActive : styles.screenTab}
                onClick={() => setActiveIndex(i)}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div>
            <h2 style={styles.sectionTitle}>{screen.title}</h2>
            <p style={styles.sectionDescription}>{screen.description}</p>
          </div>

          <FeatureList features={screen.features} />
        </div>
      </div>
    </div>
  );
};
