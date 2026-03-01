export interface Product {
  id: string;
  name: string;
  icon: string;
  description: string;
  features: string[];
  route: string;
  category: 'core' | 'addon';
}

export const products: Product[] = [
  {
    id: 'customer-app',
    name: 'Customer App',
    icon: '\u{1F4F1}',
    description: 'Mobile ordering, loyalty rewards, and table reservations — all in one app for your guests.',
    features: [
      'Mobile ordering with real-time tracking',
      'Loyalty points & reward redemption',
      'Table reservation system',
      'Push notification campaigns',
      'Guest profiles & order history',
    ],
    route: '/customer-app',
    category: 'core',
  },
  {
    id: 'owner-dashboard',
    name: 'Owner Dashboard',
    icon: '\u{1F4CA}',
    description: 'Real-time analytics, order management, and staff scheduling from a single command center.',
    features: [
      'Revenue & order analytics',
      'Live order management',
      'Staff scheduling & permissions',
      'Customer insights & reviews',
      'Multi-location overview',
    ],
    route: '/owner-dashboard',
    category: 'core',
  },
  {
    id: 'social-media',
    name: 'Social Media Manager',
    icon: '\u{1F4E3}',
    description: 'Create, schedule, and track marketing campaigns across all social channels.',
    features: [
      'Multi-channel campaign creation',
      'Content calendar & scheduling',
      'Engagement analytics & ROI',
      'Instagram, Facebook, Google, Email',
      'AI-powered content suggestions',
    ],
    route: '/social-media',
    category: 'core',
  },
  {
    id: 'menu-builder',
    name: 'Menu Builder',
    icon: '\u{1F374}',
    description: 'Digital menu management with categories, modifiers, dietary tags, and real-time pricing.',
    features: [
      'Drag-and-drop menu organization',
      'Modifier groups & add-ons',
      'Dietary & allergen tagging',
      'Seasonal menus & specials',
      'Photo management per item',
    ],
    route: '/menu-builder',
    category: 'core',
  },
  {
    id: 'fire-tv',
    name: 'Fire TV Display',
    icon: '\u{1F4FA}',
    description: 'Digital menu boards for in-store TVs with customizable layouts and QR code ordering.',
    features: [
      'Multiple display layouts',
      'Custom brand themes & colors',
      'QR code integration',
      'Auto-rotating content',
      'Real-time menu sync',
    ],
    route: '/fire-tv',
    category: 'core',
  },
  {
    id: 'other-products',
    name: 'More Products',
    icon: '\u{1F4E6}',
    description: 'Order Tracker, Kitchen Display, Kiosk, Driver App, and Website Builder.',
    features: [
      'Order Tracker for customers',
      'Kitchen Display System',
      'Self-service Kiosk App',
      'Driver App for deliveries',
      'Website Builder & SEO',
    ],
    route: '/other-products',
    category: 'addon',
  },
];
