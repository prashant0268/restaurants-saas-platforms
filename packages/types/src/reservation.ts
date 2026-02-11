import { Timestamp } from './common';

export type ReservationStatus =
  | 'pending'
  | 'confirmed'
  | 'seated'
  | 'completed'
  | 'cancelled'
  | 'no_show';

export interface Reservation {
  id: string;
  restaurantId: string;
  restaurantName: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  dateTime: Timestamp;
  partySize: number;
  tableNumber?: string;
  status: ReservationStatus;
  specialRequests?: string;
  occasion?: string;
  reminderSent: boolean;
  confirmationCode: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  cancelledAt?: Timestamp;
  cancellationReason?: string;
}

export interface TableConfig {
  id: string;
  restaurantId: string;
  tableNumber: string;
  capacity: number;
  location: 'indoor' | 'outdoor' | 'patio' | 'bar' | 'private';
  isActive: boolean;
}
