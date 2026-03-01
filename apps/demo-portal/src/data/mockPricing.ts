export interface PricingTier {
  id: 'professional' | 'enterprise';
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  threeYearPrice: number;
  monthlySetupFee: number;
  description: string;
  popular?: boolean;
  features: PricingFeature[];
}

export interface PricingFeature {
  name: string;
  professional: boolean | string;
  enterprise: boolean | string;
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'professional',
    name: 'Professional',
    monthlyPrice: 99,
    annualPrice: 1000,
    threeYearPrice: 1400,
    monthlySetupFee: 500,
    description: 'Everything you need to manage and grow your restaurant with core digital tools.',
    popular: true,
    features: [],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPrice: 199,
    annualPrice: 2000,
    threeYearPrice: 4700,
    monthlySetupFee: 500,
    description: 'Advanced features for scaling your restaurant operations with dedicated support.',
    features: [],
  },
];

export const comparisonFeatures: PricingFeature[] = [
  { name: 'Mobile Ordering App', professional: true, enterprise: true },
  { name: 'Menu Builder', professional: true, enterprise: true },
  { name: 'Order Management', professional: true, enterprise: true },
  { name: 'Analytics', professional: true, enterprise: true },
  { name: 'Menu Items', professional: 'Unlimited', enterprise: 'Unlimited' },
  { name: 'Staff Accounts', professional: 'Unlimited', enterprise: 'Unlimited' },
  { name: 'Loyalty Program', professional: true, enterprise: true },
  { name: 'Table Reservations', professional: true, enterprise: true },
  { name: 'Fire TV Display', professional: true, enterprise: true },
  { name: 'Kitchen Display System', professional: true, enterprise: true },
  { name: 'Delivery Management', professional: false, enterprise: true },
  { name: 'Driver App', professional: false, enterprise: true },
  { name: 'Website Builder', professional: false, enterprise: true },
  { name: 'Self-service Kiosk', professional: false, enterprise: true },
  { name: 'API Access', professional: false, enterprise: true },
  { name: 'Dedicated Support', professional: false, enterprise: true },
  { name: 'Custom Branding', professional: false, enterprise: 'Full white-label' },
  { name: 'Support', professional: 'Email & Chat', enterprise: '24/7 Priority' },
  { name: 'Social Media Manager (Add-on)', professional: '+$30/month', enterprise: 'Included' },
];
