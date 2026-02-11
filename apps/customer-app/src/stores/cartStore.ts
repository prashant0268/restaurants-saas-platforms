import { create } from 'zustand';
import type { CartItem, Money, OrderItemModifier } from '@restaurants/types';

interface CartState {
  restaurantId: string | null;
  restaurantName: string | null;
  items: CartItem[];

  // Computed
  subtotal: Money;
  itemCount: number;

  // Actions
  addItem: (
    restaurantId: string,
    restaurantName: string,
    item: CartItem,
  ) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  updateModifiers: (
    menuItemId: string,
    modifiers: OrderItemModifier[],
  ) => void;
  clearCart: () => void;
}

const calculateSubtotal = (items: CartItem[]): Money => {
  const amount = items.reduce(
    (sum, item) => sum + item.unitPrice.amount * item.quantity,
    0,
  );
  return { amount, currency: 'USD' };
};

export const useCartStore = create<CartState>((set, get) => ({
  restaurantId: null,
  restaurantName: null,
  items: [],
  subtotal: { amount: 0, currency: 'USD' },
  itemCount: 0,

  addItem: (
    restaurantId: string,
    restaurantName: string,
    item: CartItem,
  ) => {
    const state = get();

    // If cart has items from a different restaurant, clear it first
    if (state.restaurantId && state.restaurantId !== restaurantId) {
      // TODO: Show confirmation dialog before clearing cart
      set({
        restaurantId,
        restaurantName,
        items: [item],
        subtotal: {
          amount: item.unitPrice.amount * item.quantity,
          currency: 'USD',
        },
        itemCount: item.quantity,
      });
      return;
    }

    // Check if item already exists in cart
    const existingIndex = state.items.findIndex(
      (i) => i.menuItemId === item.menuItemId,
    );

    let newItems: CartItem[];
    if (existingIndex >= 0) {
      // Update existing item quantity
      newItems = state.items.map((i, index) =>
        index === existingIndex
          ? { ...i, quantity: i.quantity + item.quantity }
          : i,
      );
    } else {
      newItems = [...state.items, item];
    }

    set({
      restaurantId,
      restaurantName,
      items: newItems,
      subtotal: calculateSubtotal(newItems),
      itemCount: newItems.reduce((sum, i) => sum + i.quantity, 0),
    });
  },

  removeItem: (menuItemId: string) => {
    const state = get();
    const newItems = state.items.filter(
      (item) => item.menuItemId !== menuItemId,
    );

    if (newItems.length === 0) {
      set({
        restaurantId: null,
        restaurantName: null,
        items: [],
        subtotal: { amount: 0, currency: 'USD' },
        itemCount: 0,
      });
      return;
    }

    set({
      items: newItems,
      subtotal: calculateSubtotal(newItems),
      itemCount: newItems.reduce((sum, i) => sum + i.quantity, 0),
    });
  },

  updateQuantity: (menuItemId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(menuItemId);
      return;
    }

    const state = get();
    const newItems = state.items.map((item) =>
      item.menuItemId === menuItemId ? { ...item, quantity } : item,
    );

    set({
      items: newItems,
      subtotal: calculateSubtotal(newItems),
      itemCount: newItems.reduce((sum, i) => sum + i.quantity, 0),
    });
  },

  updateModifiers: (
    menuItemId: string,
    modifiers: OrderItemModifier[],
  ) => {
    const state = get();
    const newItems = state.items.map((item) =>
      item.menuItemId === menuItemId ? { ...item, modifiers } : item,
    );

    set({ items: newItems });
  },

  clearCart: () => {
    set({
      restaurantId: null,
      restaurantName: null,
      items: [],
      subtotal: { amount: 0, currency: 'USD' },
      itemCount: 0,
    });
  },
}));
