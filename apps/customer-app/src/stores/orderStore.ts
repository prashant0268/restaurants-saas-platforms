import { create } from 'zustand';
import type { Order, OrderStatus } from '@restaurants/types';

interface OrderState {
  currentOrder: Order | null;
  orderHistory: Order[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setCurrentOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  setOrderHistory: (orders: Order[]) => void;
  addToHistory: (order: Order) => void;
  clearCurrentOrder: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  currentOrder: null,
  orderHistory: [],
  isLoading: false,
  error: null,

  setCurrentOrder: (order: Order) => {
    set({ currentOrder: order });
  },

  updateOrderStatus: (orderId: string, status: OrderStatus) => {
    const state = get();

    // Update current order if it matches
    if (state.currentOrder?.id === orderId) {
      set({
        currentOrder: {
          ...state.currentOrder,
          status,
        },
      });
    }

    // Update in order history
    const updatedHistory = state.orderHistory.map((order) =>
      order.id === orderId ? { ...order, status } : order,
    );
    set({ orderHistory: updatedHistory });
  },

  setOrderHistory: (orders: Order[]) => {
    set({ orderHistory: orders });
  },

  addToHistory: (order: Order) => {
    const state = get();
    // Prepend new order, avoid duplicates
    const filtered = state.orderHistory.filter((o) => o.id !== order.id);
    set({ orderHistory: [order, ...filtered] });
  },

  clearCurrentOrder: () => {
    set({ currentOrder: null });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },
}));
