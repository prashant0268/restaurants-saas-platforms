import { create } from 'zustand';

export interface CartModifier {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  modifiers: CartModifier[];
  specialInstructions?: string;
}

export type OrderType = 'dine-in' | 'takeout';

interface CartState {
  items: CartItem[];
  orderType: OrderType | null;
  tableNumber: string;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  setOrderType: (type: OrderType) => void;
  setTableNumber: (table: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  subtotal: () => number;
  tax: () => number;
  total: () => number;
}

let nextId = 1;

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  orderType: null,
  tableNumber: '',

  addItem: (item) => {
    const id = `cart-${nextId++}`;
    set((state) => ({
      items: [...state.items, { ...item, id }],
    }));
  },

  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      ),
    }));
  },

  setOrderType: (type) => set({ orderType: type }),

  setTableNumber: (table) => set({ tableNumber: table }),

  clearCart: () => set({
    items: [],
    orderType: null,
    tableNumber: '',
  }),

  totalItems: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },

  subtotal: () => {
    return get().items.reduce((sum, item) => {
      const modifierTotal = item.modifiers.reduce(
        (mSum, mod) => mSum + mod.price,
        0,
      );
      return sum + (item.price + modifierTotal) * item.quantity;
    }, 0);
  },

  tax: () => {
    return get().subtotal() * 0.08;
  },

  total: () => {
    return get().subtotal() + get().tax();
  },
}));
