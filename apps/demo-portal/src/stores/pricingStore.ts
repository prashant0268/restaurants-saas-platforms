import { create } from 'zustand';

export type PlanTier = 'professional' | 'enterprise';
export type BillingCycle = 'monthly' | 'annual' | 'three-year';

interface PricingState {
  selectedPlan: PlanTier | null;
  billingCycle: BillingCycle;
  selectPlan: (plan: PlanTier) => void;
  setBillingCycle: (cycle: BillingCycle) => void;
  reset: () => void;
}

export const usePricingStore = create<PricingState>((set) => ({
  selectedPlan: null,
  billingCycle: 'monthly',

  selectPlan: (plan) => set({ selectedPlan: plan }),

  setBillingCycle: (cycle) => set({ billingCycle: cycle }),

  reset: () => set({ selectedPlan: null, billingCycle: 'monthly' }),
}));
