import { Timestamp } from './common';

export type NotificationType =
  | 'order_placed'
  | 'order_confirmed'
  | 'order_preparing'
  | 'order_ready'
  | 'order_picked_up'
  | 'order_delivered'
  | 'order_cancelled'
  | 'new_order'
  | 'delivery_assigned'
  | 'delivery_nearby'
  | 'reservation_confirmed'
  | 'reservation_reminder'
  | 'reservation_cancelled'
  | 'new_review'
  | 'promotion'
  | 'campaign'
  | 'loyalty_reward'
  | 'system'
  | 'support_reply';

export type NotificationChannel = 'push' | 'email' | 'sms' | 'in_app';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  channel: NotificationChannel;
  title: string;
  body: string;
  imageUrl?: string;
  data?: Record<string, string>;
  isRead: boolean;
  readAt?: Timestamp;
  actionUrl?: string;
  createdAt: Timestamp;
}

export interface NotificationPreferences {
  userId: string;
  channels: {
    push: boolean;
    email: boolean;
    sms: boolean;
    inApp: boolean;
  };
  types: Partial<Record<NotificationType, boolean>>;
  quietHours?: {
    enabled: boolean;
    start: string;
    end: string;
  };
}
