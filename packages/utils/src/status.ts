import {
  DeliveryStatus,
  LeadStatus,
  OrderStatus,
  ReservationStatus,
} from '@restaurants/types';

export const orderStatusLabels: Record<OrderStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  ready: 'Ready for Pickup',
  picked_up: 'Picked Up',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  completed: 'Completed',
  cancelled: 'Cancelled',
  refunded: 'Refunded',
};

export const deliveryStatusLabels: Record<DeliveryStatus, string> = {
  pending: 'Pending',
  assigned: 'Assigned',
  accepted: 'Accepted',
  picking_up: 'Heading to Restaurant',
  at_restaurant: 'At Restaurant',
  picked_up: 'Picked Up',
  delivering: 'On the Way',
  arrived: 'Arrived',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

export const reservationStatusLabels: Record<ReservationStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  seated: 'Seated',
  completed: 'Completed',
  cancelled: 'Cancelled',
  no_show: 'No Show',
};

export const leadStatusLabels: Record<LeadStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  demo_scheduled: 'Demo Scheduled',
  negotiating: 'Negotiating',
  converted: 'Converted',
  lost: 'Lost',
};

export const isOrderActive = (status: OrderStatus): boolean => {
  return !['completed', 'cancelled', 'refunded'].includes(status);
};

export const isDeliveryActive = (status: DeliveryStatus): boolean => {
  return !['delivered', 'cancelled'].includes(status);
};

export const canCancelOrder = (status: OrderStatus): boolean => {
  return ['pending', 'confirmed'].includes(status);
};

export const getNextOrderStatus = (current: OrderStatus): OrderStatus | null => {
  const flow: OrderStatus[] = [
    'pending',
    'confirmed',
    'preparing',
    'ready',
    'picked_up',
    'out_for_delivery',
    'delivered',
    'completed',
  ];
  const idx = flow.indexOf(current);
  if (idx === -1 || idx === flow.length - 1) return null;
  return flow[idx + 1];
};
