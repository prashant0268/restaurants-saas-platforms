import type {
  Order,
  OrderType,
  PaymentMethod,
  CartItem,
  Address,
  PaginatedResponse,
} from '@restaurants/types';

interface CreateOrderParams {
  restaurantId: string;
  restaurantName: string;
  customerId: string;
  customerName: string;
  items: CartItem[];
  type: OrderType;
  paymentMethod: PaymentMethod;
  deliveryAddress?: Address;
  deliveryInstructions?: string;
  tip: number;
  couponCode?: string;
  specialInstructions?: string;
}

/**
 * Create a new order from the current cart.
 */
export const createOrder = async (
  _params: CreateOrderParams,
): Promise<Order> => {
  // TODO: Implement order creation via Firestore
  // 1. Calculate totals (subtotal, tax, delivery fee, service fee, total)
  // 2. Create order document in Firestore 'orders' collection
  // 3. Clear the cart
  // 4. Set up real-time listener for order status updates
  // 5. Send notification to restaurant
  throw new Error('Not implemented');
};

/**
 * Fetch a single order by ID.
 */
export const getOrderById = async (
  _orderId: string,
): Promise<Order | null> => {
  // TODO: Fetch from Firestore
  // const docSnap = await getDoc(doc(db, 'orders', orderId));
  // return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as Order) : null;
  return null;
};

/**
 * Fetch order history for a customer.
 */
export const getOrderHistory = async (
  _customerId: string,
  _page?: number,
): Promise<PaginatedResponse<Order>> => {
  // TODO: Query Firestore for orders by customerId, ordered by createdAt desc
  // const snapshot = await getDocs(
  //   query(
  //     collection(db, 'orders'),
  //     where('customerId', '==', customerId),
  //     orderBy('createdAt', 'desc'),
  //     limit(20)
  //   )
  // );
  return {
    data: [],
    total: 0,
    hasMore: false,
  };
};

/**
 * Fetch active orders for a customer (pending, confirmed, preparing, out_for_delivery).
 */
export const getActiveOrders = async (
  _customerId: string,
): Promise<Order[]> => {
  // TODO: Query Firestore for active orders
  // const snapshot = await getDocs(
  //   query(
  //     collection(db, 'orders'),
  //     where('customerId', '==', customerId),
  //     where('status', 'in', ['pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery']),
  //     orderBy('createdAt', 'desc')
  //   )
  // );
  return [];
};

/**
 * Subscribe to real-time order status updates.
 * Returns an unsubscribe function.
 */
export const subscribeToOrderUpdates = (
  _orderId: string,
  _onUpdate: (order: Order) => void,
): (() => void) => {
  // TODO: Set up Firestore onSnapshot listener
  // const unsubscribe = onSnapshot(doc(db, 'orders', orderId), (docSnap) => {
  //   if (docSnap.exists()) {
  //     onUpdate({ id: docSnap.id, ...docSnap.data() } as Order);
  //   }
  // });
  // return unsubscribe;
  return () => {};
};

/**
 * Cancel an order (only allowed while status is 'pending' or 'confirmed').
 */
export const cancelOrder = async (
  _orderId: string,
  _reason: string,
): Promise<void> => {
  // TODO: Update order status to 'cancelled' in Firestore
  // await updateDoc(doc(db, 'orders', orderId), {
  //   status: 'cancelled',
  //   cancelledAt: serverTimestamp(),
  //   cancellationReason: reason,
  // });
};

/**
 * Reorder - create a new order from a previous order's items.
 */
export const reorder = async (
  _previousOrderId: string,
): Promise<CartItem[]> => {
  // TODO: Fetch previous order and return items as cart items
  // 1. Get previous order
  // 2. Verify items are still available at the restaurant
  // 3. Return cart items with updated prices
  return [];
};

/**
 * Apply a promo code to an order.
 */
export const validatePromoCode = async (
  _code: string,
  _restaurantId: string,
  _subtotal: number,
): Promise<{ isValid: boolean; discountAmount: number; message: string }> => {
  // TODO: Validate promo code against Firestore promotions collection
  return {
    isValid: false,
    discountAmount: 0,
    message: 'Invalid promo code',
  };
};
