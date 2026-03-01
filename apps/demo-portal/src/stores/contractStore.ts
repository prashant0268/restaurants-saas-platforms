import { create } from 'zustand';

export type ContractStep = 'details' | 'plan-review' | 'terms' | 'signature';

interface ContractDetails {
  restaurantName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  cuisine: string;
  locations: number;
}

interface ContractState {
  currentStep: ContractStep;
  details: ContractDetails;
  agreedToTerms: boolean;
  signatureDataUrl: string | null;
  isSubmitting: boolean;
  isComplete: boolean;
  setStep: (step: ContractStep) => void;
  setDetails: (details: Partial<ContractDetails>) => void;
  setAgreedToTerms: (agreed: boolean) => void;
  setSignature: (dataUrl: string) => void;
  submitContract: () => Promise<void>;
  reset: () => void;
}

const defaultDetails: ContractDetails = {
  restaurantName: '',
  ownerName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  cuisine: '',
  locations: 1,
};

export const useContractStore = create<ContractState>((set) => ({
  currentStep: 'details',
  details: defaultDetails,
  agreedToTerms: false,
  signatureDataUrl: null,
  isSubmitting: false,
  isComplete: false,

  setStep: (step) => set({ currentStep: step }),

  setDetails: (details) =>
    set((state) => ({
      details: { ...state.details, ...details },
    })),

  setAgreedToTerms: (agreed) => set({ agreedToTerms: agreed }),

  setSignature: (dataUrl) => set({ signatureDataUrl: dataUrl }),

  submitContract: async () => {
    set({ isSubmitting: true });
    try {
      // Mock Firebase save — replace with createDocument(COLLECTIONS.SUBSCRIPTIONS, ...)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      set({ isSubmitting: false, isComplete: true });
    } catch {
      set({ isSubmitting: false });
    }
  },

  reset: () =>
    set({
      currentStep: 'details',
      details: defaultDetails,
      agreedToTerms: false,
      signatureDataUrl: null,
      isSubmitting: false,
      isComplete: false,
    }),
}));
