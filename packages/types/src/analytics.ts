import { Money, Timestamp } from './common';

export interface DashboardMetrics {
  period: 'today' | 'week' | 'month' | 'year';
  revenue: Money;
  revenueChange: number;
  totalOrders: number;
  ordersChange: number;
  averageOrderValue: Money;
  aovChange: number;
  newCustomers: number;
  newCustomersChange: number;
  activeRestaurants: number;
  activeDrivers: number;
  cancelRate: number;
  averageDeliveryTime: number;
}

export interface RestaurantAnalytics {
  restaurantId: string;
  period: string;
  revenue: Money;
  totalOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  averageOrderValue: Money;
  averagePrepTime: number;
  averageRating: number;
  newReviews: number;
  topSellingItems: TopSellingItem[];
  peakHours: PeakHour[];
  customerRetentionRate: number;
  newVsReturning: {
    newCustomers: number;
    returningCustomers: number;
  };
}

export interface TopSellingItem {
  menuItemId: string;
  name: string;
  quantity: number;
  revenue: Money;
}

export interface PeakHour {
  hour: number;
  orderCount: number;
  revenue: Money;
}

export interface PlatformAnalytics {
  period: string;
  totalRevenue: Money;
  platformCommission: Money;
  totalOrders: number;
  totalRestaurants: number;
  activeRestaurants: number;
  totalCustomers: number;
  activeCustomers: number;
  totalDrivers: number;
  activeDrivers: number;
  averageDeliveryTime: number;
  customerSatisfaction: number;
  topRestaurants: {
    restaurantId: string;
    name: string;
    revenue: Money;
    orders: number;
  }[];
  ordersByType: {
    delivery: number;
    pickup: number;
    dineIn: number;
  };
  revenueByDay: {
    date: string;
    revenue: Money;
    orders: number;
  }[];
}

export interface SalesAnalytics {
  period: string;
  totalLeads: number;
  newLeads: number;
  convertedLeads: number;
  conversionRate: number;
  totalRevenue: Money;
  newSubscriptions: number;
  churnedSubscriptions: number;
  mrr: Money;
  arr: Money;
  averageDealSize: Money;
  pipelineValue: Money;
  salesByPerson: {
    salesPersonId: string;
    name: string;
    leads: number;
    conversions: number;
    revenue: Money;
  }[];
}

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  restaurantId?: string;
  orderId?: string;
  subject: string;
  description: string;
  category: 'order_issue' | 'payment' | 'delivery' | 'account' | 'technical' | 'feedback' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'waiting_response' | 'resolved' | 'closed';
  assignedTo?: string;
  messages: TicketMessage[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  resolvedAt?: Timestamp;
}

export interface TicketMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'user' | 'support' | 'system';
  message: string;
  attachments?: string[];
  createdAt: Timestamp;
}
