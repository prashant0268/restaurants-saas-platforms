import { Money, Timestamp } from './common';

export interface PlatformSettings {
  id: string;
  platformName: string;
  platformCommissionRate: number;
  defaultDeliveryFee: Money;
  defaultServiceFee: Money;
  defaultTaxRate: number;
  supportEmail: string;
  supportPhone: string;
  termsUrl: string;
  privacyUrl: string;
  minDriverPayout: Money;
  payoutSchedule: 'daily' | 'weekly' | 'biweekly';
  maintenanceMode: boolean;
  maintenanceMessage?: string;
  enabledRegions: string[];
  updatedAt: Timestamp;
  updatedBy: string;
}

export interface LoyaltyProgram {
  id: string;
  restaurantId?: string;
  name: string;
  description: string;
  pointsPerDollar: number;
  rewards: LoyaltyReward[];
  isActive: boolean;
  createdAt: Timestamp;
}

export interface LoyaltyReward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  type: 'discount' | 'free_item' | 'free_delivery';
  value: number;
  isActive: boolean;
}

export interface CustomerLoyalty {
  id: string;
  customerId: string;
  restaurantId?: string;
  programId: string;
  points: number;
  lifetimePoints: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  redeemedRewards: RedeemedReward[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface RedeemedReward {
  rewardId: string;
  rewardName: string;
  pointsUsed: number;
  redeemedAt: Timestamp;
  orderId?: string;
}

export interface FireTVDisplay {
  id: string;
  restaurantId: string;
  deviceId: string;
  deviceName: string;
  layout: 'grid' | 'list' | 'featured' | 'slideshow';
  theme: DisplayTheme;
  showCategories: string[];
  rotationInterval: number;
  showPrices: boolean;
  showImages: boolean;
  showQrCode: boolean;
  qrCodeUrl?: string;
  isActive: boolean;
  lastHeartbeat?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface DisplayTheme {
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  fontFamily: string;
  logoUrl?: string;
  backgroundImageUrl?: string;
}
