import { create } from 'zustand';

interface RestaurantInfo {
  name: string;
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

interface DemoState {
  restaurantInfo: RestaurantInfo;
  activeProducts: string[];
  currentDemo: string | null;
  setRestaurantInfo: (info: Partial<RestaurantInfo>) => void;
  toggleProduct: (productId: string) => void;
  setCurrentDemo: (demo: string | null) => void;
  resetDemo: () => void;
}

const defaultRestaurantInfo: RestaurantInfo = {
  name: '',
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

export const useDemoStore = create<DemoState>((set) => ({
  restaurantInfo: defaultRestaurantInfo,
  activeProducts: [],
  currentDemo: null,

  setRestaurantInfo: (info) =>
    set((state) => ({
      restaurantInfo: { ...state.restaurantInfo, ...info },
    })),

  toggleProduct: (productId) =>
    set((state) => ({
      activeProducts: state.activeProducts.includes(productId)
        ? state.activeProducts.filter((p) => p !== productId)
        : [...state.activeProducts, productId],
    })),

  setCurrentDemo: (demo) => set({ currentDemo: demo }),

  resetDemo: () =>
    set({
      restaurantInfo: defaultRestaurantInfo,
      activeProducts: [],
      currentDemo: null,
    }),
}));
