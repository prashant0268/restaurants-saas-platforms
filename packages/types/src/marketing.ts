import { Money, Timestamp } from './common';

export type CampaignStatus = 'draft' | 'scheduled' | 'active' | 'paused' | 'completed' | 'cancelled';
export type CampaignChannel = 'push' | 'email' | 'sms' | 'in_app';
export type PromotionType = 'percentage' | 'fixed_amount' | 'bogo' | 'free_delivery' | 'free_item';

export interface Campaign {
  id: string;
  name: string;
  description: string;
  channel: CampaignChannel[];
  status: CampaignStatus;
  targetAudience: TargetAudience;
  content: CampaignContent;
  schedule: CampaignSchedule;
  metrics: CampaignMetrics;
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface TargetAudience {
  allUsers: boolean;
  segments?: string[];
  restaurantIds?: string[];
  regions?: string[];
  filters?: AudienceFilter[];
  estimatedReach?: number;
}

export interface AudienceFilter {
  field: string;
  operator: 'eq' | 'neq' | 'gt' | 'lt' | 'gte' | 'lte' | 'in' | 'not_in';
  value: string | number | string[];
}

export interface CampaignContent {
  title: string;
  body: string;
  imageUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
  emailSubject?: string;
  emailTemplate?: string;
}

export interface CampaignSchedule {
  startDate: Timestamp;
  endDate?: Timestamp;
  sendAt?: Timestamp;
  recurring?: boolean;
  recurringInterval?: 'daily' | 'weekly' | 'monthly';
}

export interface CampaignMetrics {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  converted: number;
  revenue: Money;
  openRate: number;
  clickRate: number;
  conversionRate: number;
}

export interface Promotion {
  id: string;
  restaurantId?: string;
  name: string;
  description: string;
  type: PromotionType;
  value: number;
  minimumOrderAmount?: Money;
  maximumDiscount?: Money;
  code?: string;
  isAutoApplied: boolean;
  usageLimit?: number;
  usageCount: number;
  perUserLimit?: number;
  applicableItems?: string[];
  applicableCategories?: string[];
  validFrom: Timestamp;
  validTo: Timestamp;
  isActive: boolean;
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CustomerSegment {
  id: string;
  name: string;
  description: string;
  rules: AudienceFilter[];
  memberCount: number;
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
