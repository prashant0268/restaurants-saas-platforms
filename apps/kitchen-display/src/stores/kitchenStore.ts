import { create } from 'zustand';

type OrderStatus = 'new' | 'in_progress' | 'ready' | 'completed';
type Station = 'grill' | 'fry' | 'salad' | 'drinks' | 'dessert' | 'all';

interface OrderModifier {
  name: string;
}

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  station: Exclude<Station, 'all'>;
  modifiers: OrderModifier[];
  specialInstructions?: string;
}

interface KitchenOrder {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  placedAt: number;
  items: OrderItem[];
  specialInstructions?: string;
  customerName: string;
  orderType: 'dine_in' | 'takeout' | 'delivery';
}

interface KitchenState {
  orders: KitchenOrder[];
  completedOrders: KitchenOrder[];
  stationFilter: Station;
  setStationFilter: (station: Station) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  addOrder: (order: KitchenOrder) => void;
}

const now = Date.now();

const INITIAL_ORDERS: KitchenOrder[] = [
  {
    id: '1',
    orderNumber: '#1042',
    status: 'new',
    placedAt: now - 3 * 60 * 1000,
    customerName: 'Table 5',
    orderType: 'dine_in',
    items: [
      { id: 'i1', name: 'Classic Burger', quantity: 2, station: 'grill', modifiers: [{ name: 'No onions' }, { name: 'Extra cheese' }] },
      { id: 'i2', name: 'French Fries', quantity: 2, station: 'fry', modifiers: [{ name: 'Large' }] },
      { id: 'i3', name: 'Coke', quantity: 2, station: 'drinks', modifiers: [] },
    ],
  },
  {
    id: '2',
    orderNumber: '#1043',
    status: 'in_progress',
    placedAt: now - 12 * 60 * 1000,
    customerName: 'Sarah M.',
    orderType: 'takeout',
    items: [
      { id: 'i4', name: 'Grilled Chicken Salad', quantity: 1, station: 'salad', modifiers: [{ name: 'Dressing on side' }] },
      { id: 'i5', name: 'Lemonade', quantity: 1, station: 'drinks', modifiers: [{ name: 'No ice' }] },
    ],
    specialInstructions: 'Nut allergy - no walnuts',
  },
  {
    id: '3',
    orderNumber: '#1044',
    status: 'new',
    placedAt: now - 22 * 60 * 1000,
    customerName: 'DoorDash - Alex',
    orderType: 'delivery',
    items: [
      { id: 'i6', name: 'BBQ Ribs', quantity: 1, station: 'grill', modifiers: [{ name: 'Half rack' }] },
      { id: 'i7', name: 'Onion Rings', quantity: 1, station: 'fry', modifiers: [] },
      { id: 'i8', name: 'Coleslaw', quantity: 1, station: 'salad', modifiers: [] },
      { id: 'i9', name: 'Brownie Sundae', quantity: 1, station: 'dessert', modifiers: [{ name: 'Extra whipped cream' }] },
    ],
  },
  {
    id: '4',
    orderNumber: '#1045',
    status: 'in_progress',
    placedAt: now - 8 * 60 * 1000,
    customerName: 'Table 12',
    orderType: 'dine_in',
    items: [
      { id: 'i10', name: 'Fish & Chips', quantity: 3, station: 'fry', modifiers: [] },
      { id: 'i11', name: 'Caesar Salad', quantity: 1, station: 'salad', modifiers: [{ name: 'Add chicken' }] },
    ],
  },
  {
    id: '5',
    orderNumber: '#1046',
    status: 'new',
    placedAt: now - 1 * 60 * 1000,
    customerName: 'UberEats - Mike',
    orderType: 'delivery',
    items: [
      { id: 'i12', name: 'Double Cheeseburger', quantity: 1, station: 'grill', modifiers: [{ name: 'Medium rare' }, { name: 'Bacon' }] },
      { id: 'i13', name: 'Sweet Potato Fries', quantity: 1, station: 'fry', modifiers: [] },
      { id: 'i14', name: 'Milkshake', quantity: 1, station: 'drinks', modifiers: [{ name: 'Chocolate' }] },
    ],
  },
  {
    id: '6',
    orderNumber: '#1047',
    status: 'ready',
    placedAt: now - 15 * 60 * 1000,
    customerName: 'Table 3',
    orderType: 'dine_in',
    items: [
      { id: 'i15', name: 'Steak', quantity: 1, station: 'grill', modifiers: [{ name: 'Medium' }, { name: 'Mushroom sauce' }] },
      { id: 'i16', name: 'Cheesecake', quantity: 1, station: 'dessert', modifiers: [] },
    ],
  },
];

export const useKitchenStore = create<KitchenState>((set) => ({
  orders: INITIAL_ORDERS,
  completedOrders: [],
  stationFilter: 'all',
  setStationFilter: (stationFilter) => set({ stationFilter }),
  updateOrderStatus: (orderId, status) =>
    set((state) => {
      if (status === 'completed') {
        const order = state.orders.find((o) => o.id === orderId);
        if (!order) return state;
        return {
          orders: state.orders.filter((o) => o.id !== orderId),
          completedOrders: [
            { ...order, status: 'completed' },
            ...state.completedOrders,
          ],
        };
      }
      return {
        orders: state.orders.map((o) =>
          o.id === orderId ? { ...o, status } : o,
        ),
      };
    }),
  addOrder: (order) =>
    set((state) => ({
      orders: [...state.orders, order],
    })),
}));

export type {
  KitchenOrder,
  OrderItem,
  OrderModifier,
  OrderStatus,
  Station,
};
