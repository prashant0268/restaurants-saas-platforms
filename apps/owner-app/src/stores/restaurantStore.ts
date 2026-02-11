import { create } from 'zustand';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  imageUrl?: string;
  isAvailable: boolean;
  isVegetarian: boolean;
  preparationTime: number;
  sortOrder: number;
  customizations?: MenuCustomization[];
  createdAt: string;
  updatedAt: string;
}

export interface MenuCustomization {
  id: string;
  name: string;
  required: boolean;
  options: {
    id: string;
    name: string;
    price: number;
  }[];
}

export interface MenuCategory {
  id: string;
  name: string;
  sortOrder: number;
  isActive: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisineTypes: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  phone: string;
  email: string;
  website?: string;
  logoUrl?: string;
  coverImageUrl?: string;
  rating: number;
  reviewCount: number;
  isOpen: boolean;
  operatingHours: DaySchedule[];
  deliverySettings: DeliverySettings;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface DaySchedule {
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export interface DeliverySettings {
  isDeliveryEnabled: boolean;
  isPickupEnabled: boolean;
  deliveryRadius: number;
  deliveryFee: number;
  freeDeliveryMinimum: number;
  minimumOrderAmount: number;
  estimatedDeliveryTime: number;
  estimatedPickupTime: number;
}

interface RestaurantState {
  restaurant: Restaurant | null;
  menuItems: MenuItem[];
  categories: MenuCategory[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setRestaurant: (restaurant: Restaurant | null) => void;
  setMenuItems: (items: MenuItem[]) => void;
  setCategories: (categories: MenuCategory[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  toggleItemAvailability: (itemId: string) => void;
  toggleRestaurantOpen: () => void;
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (itemId: string, updates: Partial<MenuItem>) => void;
  removeMenuItem: (itemId: string) => void;
  addCategory: (category: MenuCategory) => void;
  updateCategory: (categoryId: string, updates: Partial<MenuCategory>) => void;
  removeCategory: (categoryId: string) => void;
  fetchRestaurant: (restaurantId: string) => Promise<void>;
  fetchMenu: (restaurantId: string) => Promise<void>;
}

export const useRestaurantStore = create<RestaurantState>((set) => ({
  restaurant: null,
  menuItems: [],
  categories: [],
  isLoading: false,
  error: null,

  setRestaurant: (restaurant) => set({ restaurant }),

  setMenuItems: (menuItems) => set({ menuItems }),

  setCategories: (categories) => set({ categories }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  toggleItemAvailability: (itemId) =>
    set((state) => ({
      menuItems: state.menuItems.map((item) =>
        item.id === itemId
          ? { ...item, isAvailable: !item.isAvailable }
          : item,
      ),
    })),

  toggleRestaurantOpen: () =>
    set((state) => ({
      restaurant: state.restaurant
        ? { ...state.restaurant, isOpen: !state.restaurant.isOpen }
        : null,
    })),

  addMenuItem: (item) =>
    set((state) => ({
      menuItems: [...state.menuItems, item],
    })),

  updateMenuItem: (itemId, updates) =>
    set((state) => ({
      menuItems: state.menuItems.map((item) =>
        item.id === itemId ? { ...item, ...updates } : item,
      ),
    })),

  removeMenuItem: (itemId) =>
    set((state) => ({
      menuItems: state.menuItems.filter((item) => item.id !== itemId),
    })),

  addCategory: (category) =>
    set((state) => ({
      categories: [...state.categories, category],
    })),

  updateCategory: (categoryId, updates) =>
    set((state) => ({
      categories: state.categories.map((cat) =>
        cat.id === categoryId ? { ...cat, ...updates } : cat,
      ),
    })),

  removeCategory: (categoryId) =>
    set((state) => ({
      categories: state.categories.filter((cat) => cat.id !== categoryId),
    })),

  fetchRestaurant: async (_restaurantId: string) => {
    try {
      set({ isLoading: true, error: null });
      // TODO: Fetch restaurant from Firestore
      // const doc = await getDoc(doc(db, 'restaurants', restaurantId));
      // set({ restaurant: doc.data() as Restaurant });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to fetch restaurant';
      set({ error: message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMenu: async (_restaurantId: string) => {
    try {
      set({ isLoading: true, error: null });
      // TODO: Fetch menu items and categories from Firestore
      // const itemsSnap = await getDocs(collection(db, 'restaurants', restaurantId, 'menuItems'));
      // const categoriesSnap = await getDocs(collection(db, 'restaurants', restaurantId, 'categories'));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to fetch menu';
      set({ error: message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
