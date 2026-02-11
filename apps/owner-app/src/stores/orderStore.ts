import { create } from 'zustand';

export type OrderStatus =
  | 'pending'
  | 'accepted'
  | 'preparing'
  | 'ready'
  | 'picked_up'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type OrderType = 'delivery' | 'pickup' | 'dine_in';

export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
  customizations?: {
    name: string;
    option: string;
    price: number;
  }[];
}

export interface Order {
  id: string;
  orderNumber: string;
  restaurantId: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  orderType: OrderType;
  specialInstructions?: string;
  estimatedTime?: number;
  createdAt: string;
  updatedAt: string;
  acceptedAt?: string;
  readyAt?: string;
  completedAt?: string;
}

interface OrderState {
  liveOrders: Order[];
  orderHistory: Order[];
  selectedOrder: Order | null;
  isLoading: boolean;
  error: string | null;

  // Computed
  newOrdersCount: () => number;
  preparingOrdersCount: () => number;
  readyOrdersCount: () => number;

  // Actions
  setLiveOrders: (orders: Order[]) => void;
  setOrderHistory: (orders: Order[]) => void;
  setSelectedOrder: (order: Order | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  acceptOrder: (orderId: string) => Promise<void>;
  rejectOrder: (orderId: string, reason: string) => Promise<void>;
  markPreparing: (orderId: string) => Promise<void>;
  markReady: (orderId: string) => Promise<void>;
  markCompleted: (orderId: string) => Promise<void>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  fetchLiveOrders: (restaurantId: string) => Promise<void>;
  fetchOrderHistory: (
    restaurantId: string,
    period?: string,
  ) => Promise<void>;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  liveOrders: [],
  orderHistory: [],
  selectedOrder: null,
  isLoading: false,
  error: null,

  newOrdersCount: () =>
    get().liveOrders.filter((o) => o.status === 'pending').length,

  preparingOrdersCount: () =>
    get().liveOrders.filter((o) => o.status === 'preparing').length,

  readyOrdersCount: () =>
    get().liveOrders.filter((o) => o.status === 'ready').length,

  setLiveOrders: (liveOrders) => set({ liveOrders }),

  setOrderHistory: (orderHistory) => set({ orderHistory }),

  setSelectedOrder: (selectedOrder) => set({ selectedOrder }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  updateOrderStatus: (orderId, status) =>
    set((state) => ({
      liveOrders: state.liveOrders.map((order) =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date().toISOString() }
          : order,
      ),
    })),

  acceptOrder: async (orderId: string) => {
    try {
      // TODO: Update order status in Firestore
      // await updateDoc(doc(db, 'orders', orderId), {
      //   status: 'accepted',
      //   acceptedAt: serverTimestamp(),
      // });
      get().updateOrderStatus(orderId, 'accepted');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to accept order';
      set({ error: message });
    }
  },

  rejectOrder: async (orderId: string, _reason: string) => {
    try {
      // TODO: Update order in Firestore with rejection reason
      get().updateOrderStatus(orderId, 'cancelled');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to reject order';
      set({ error: message });
    }
  },

  markPreparing: async (orderId: string) => {
    try {
      // TODO: Update in Firestore
      get().updateOrderStatus(orderId, 'preparing');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to update order status';
      set({ error: message });
    }
  },

  markReady: async (orderId: string) => {
    try {
      // TODO: Update in Firestore
      get().updateOrderStatus(orderId, 'ready');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to update order status';
      set({ error: message });
    }
  },

  markCompleted: async (orderId: string) => {
    try {
      // TODO: Update in Firestore and move to history
      get().updateOrderStatus(orderId, 'delivered');
      set((state) => {
        const completedOrder = state.liveOrders.find(
          (o) => o.id === orderId,
        );
        return {
          liveOrders: state.liveOrders.filter((o) => o.id !== orderId),
          orderHistory: completedOrder
            ? [completedOrder, ...state.orderHistory]
            : state.orderHistory,
        };
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to complete order';
      set({ error: message });
    }
  },

  fetchLiveOrders: async (_restaurantId: string) => {
    try {
      set({ isLoading: true, error: null });
      // TODO: Subscribe to live orders from Firestore
      // Use onSnapshot for real-time updates
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to fetch live orders';
      set({ error: message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchOrderHistory: async (_restaurantId: string, _period?: string) => {
    try {
      set({ isLoading: true, error: null });
      // TODO: Query order history from Firestore with date filters
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to fetch order history';
      set({ error: message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
