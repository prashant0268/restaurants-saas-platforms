import { Address, Money, Timestamp } from './common';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'picked_up'
  | 'out_for_delivery'
  | 'delivered'
  | 'completed'
  | 'cancelled'
  | 'refunded';

export type OrderType = 'delivery' | 'pickup' | 'dine_in';
export type PaymentStatus = 'pending' | 'authorized' | 'captured' | 'failed' | 'refunded';
export type PaymentMethod = 'card' | 'cash' | 'apple_pay' | 'google_pay' | 'wallet';

export interface Order {
  id: string;
  orderNumber: string;
  restaurantId: string;
  restaurantName: string;
  customerId: string;
  customerName: string;
  driverId?: string;
  driverName?: string;
  type: OrderType;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: Money;
  tax: Money;
  deliveryFee: Money;
  serviceFee: Money;
  tip: Money;
  discount: Money;
  total: Money;
  payment: OrderPayment;
  deliveryAddress?: Address;
  deliveryInstructions?: string;
  pickupTime?: Timestamp;
  tableNumber?: string;
  specialInstructions?: string;
  estimatedPrepTime: number;
  estimatedDeliveryTime?: number;
  actualDeliveryTime?: Timestamp;
  promotionId?: string;
  couponCode?: string;
  statusHistory: OrderStatusChange[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  completedAt?: Timestamp;
  cancelledAt?: Timestamp;
  cancellationReason?: string;
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  quantity: number;
  unitPrice: Money;
  totalPrice: Money;
  modifiers: OrderItemModifier[];
  specialInstructions?: string;
  imageUrl?: string;
}

export interface OrderItemModifier {
  groupName: string;
  name: string;
  price: Money;
}

export interface OrderPayment {
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  cardLast4?: string;
  cardBrand?: string;
  paidAt?: Timestamp;
  refundedAt?: Timestamp;
  refundAmount?: Money;
}

export interface OrderStatusChange {
  status: OrderStatus;
  changedAt: Timestamp;
  changedBy: string;
  note?: string;
}

export interface CartItem {
  menuItemId: string;
  name: string;
  quantity: number;
  unitPrice: Money;
  modifiers: OrderItemModifier[];
  specialInstructions?: string;
  imageUrl?: string;
}

export interface Cart {
  restaurantId: string;
  restaurantName: string;
  items: CartItem[];
  subtotal: Money;
  estimatedTax: Money;
  estimatedDeliveryFee: Money;
  estimatedTotal: Money;
}
