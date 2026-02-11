import { Address, Money, PhoneNumber, Timestamp } from './common';

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'demo_scheduled' | 'negotiating' | 'converted' | 'lost';
export type LeadSource = 'website' | 'referral' | 'cold_call' | 'social_media' | 'event' | 'partner' | 'other';
export type SubscriptionPlan = 'basic' | 'professional' | 'enterprise';
export type SubscriptionStatus = 'trial' | 'active' | 'past_due' | 'cancelled' | 'expired';

export interface Lead {
  id: string;
  restaurantName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: PhoneNumber;
  address?: Address;
  source: LeadSource;
  status: LeadStatus;
  assignedTo?: string;
  assignedToName?: string;
  notes: string;
  estimatedValue: Money;
  cuisineType?: string;
  numberOfLocations?: number;
  currentSolution?: string;
  activities: SalesActivity[];
  nextFollowUpDate?: Timestamp;
  convertedAt?: Timestamp;
  lostReason?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface SalesActivity {
  id: string;
  leadId: string;
  type: 'call' | 'email' | 'meeting' | 'demo' | 'note' | 'follow_up';
  title: string;
  description: string;
  performedBy: string;
  performedByName: string;
  outcome?: string;
  scheduledAt?: Timestamp;
  completedAt?: Timestamp;
  createdAt: Timestamp;
}

export interface Subscription {
  id: string;
  restaurantId: string;
  restaurantName: string;
  ownerId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  monthlyPrice: Money;
  billingCycle: 'monthly' | 'annual';
  startDate: Timestamp;
  endDate?: Timestamp;
  trialEndDate?: Timestamp;
  nextBillingDate: Timestamp;
  features: SubscriptionFeatures;
  paymentMethodLast4?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface SubscriptionFeatures {
  maxMenuItems: number;
  maxStaffAccounts: number;
  deliveryEnabled: boolean;
  reservationsEnabled: boolean;
  marketingToolsEnabled: boolean;
  advancedAnalytics: boolean;
  customBranding: boolean;
  apiAccess: boolean;
  prioritySupport: boolean;
}

export interface SalesTarget {
  id: string;
  salesPersonId: string;
  salesPersonName: string;
  period: 'monthly' | 'quarterly' | 'annual';
  startDate: Timestamp;
  endDate: Timestamp;
  targetRevenue: Money;
  actualRevenue: Money;
  targetLeads: number;
  actualLeads: number;
  targetConversions: number;
  actualConversions: number;
}

export interface Commission {
  id: string;
  salesPersonId: string;
  salesPersonName: string;
  subscriptionId: string;
  restaurantName: string;
  amount: Money;
  rate: number;
  status: 'pending' | 'approved' | 'paid';
  period: string;
  createdAt: Timestamp;
  paidAt?: Timestamp;
}
