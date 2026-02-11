import { GeoPoint, Money, Timestamp } from './common';

export type DeliveryStatus =
  | 'pending'
  | 'assigned'
  | 'accepted'
  | 'picking_up'
  | 'at_restaurant'
  | 'picked_up'
  | 'delivering'
  | 'arrived'
  | 'delivered'
  | 'cancelled';

export interface DeliveryAssignment {
  id: string;
  orderId: string;
  orderNumber: string;
  restaurantId: string;
  restaurantName: string;
  restaurantAddress: string;
  restaurantLocation: GeoPoint;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerLocation: GeoPoint;
  driverId: string;
  driverName: string;
  status: DeliveryStatus;
  deliveryFee: Money;
  tip: Money;
  totalEarnings: Money;
  estimatedPickupTime: Timestamp;
  estimatedDeliveryTime: Timestamp;
  actualPickupTime?: Timestamp;
  actualDeliveryTime?: Timestamp;
  distance: number;
  distanceUnit: 'miles' | 'km';
  route?: RoutePoint[];
  proofOfDelivery?: ProofOfDelivery;
  statusHistory: DeliveryStatusChange[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface RoutePoint {
  location: GeoPoint;
  timestamp: Timestamp;
}

export interface ProofOfDelivery {
  photoUrl?: string;
  signatureUrl?: string;
  note?: string;
  timestamp: Timestamp;
}

export interface DeliveryStatusChange {
  status: DeliveryStatus;
  changedAt: Timestamp;
  location?: GeoPoint;
  note?: string;
}

export interface DriverLocation {
  driverId: string;
  location: GeoPoint;
  heading: number;
  speed: number;
  isOnline: boolean;
  currentDeliveryId?: string;
  updatedAt: Timestamp;
}

export interface DriverEarnings {
  driverId: string;
  period: 'daily' | 'weekly' | 'monthly';
  date: string;
  totalDeliveries: number;
  deliveryFees: Money;
  tips: Money;
  bonuses: Money;
  totalEarnings: Money;
  hoursOnline: number;
}
