import { Address, GeoPoint, Money, PhoneNumber, Timestamp } from './common';

export type RestaurantStatus = 'pending' | 'active' | 'suspended' | 'closed';

export interface Restaurant {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  slug: string;
  logoUrl?: string;
  coverImageUrl?: string;
  images: string[];
  phone: PhoneNumber;
  email: string;
  website?: string;
  address: Address;
  location: GeoPoint;
  cuisineTypes: string[];
  tags: string[];
  status: RestaurantStatus;
  rating: number;
  totalReviews: number;
  totalOrders: number;
  priceRange: 1 | 2 | 3 | 4;
  operatingHours: OperatingHours;
  deliverySettings: DeliverySettings;
  orderSettings: OrderSettings;
  subscriptionId?: string;
  isAcceptingOrders: boolean;
  isFeatured: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface OperatingHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
  holidays?: HolidayHours[];
}

export interface DayHours {
  isOpen: boolean;
  openTime?: string;
  closeTime?: string;
  breakStart?: string;
  breakEnd?: string;
}

export interface HolidayHours {
  date: string;
  name: string;
  isOpen: boolean;
  openTime?: string;
  closeTime?: string;
}

export interface DeliverySettings {
  isDeliveryEnabled: boolean;
  deliveryRadius: number;
  deliveryRadiusUnit: 'miles' | 'km';
  minimumOrderAmount: Money;
  deliveryFee: Money;
  freeDeliveryMinimum?: Money;
  estimatedDeliveryTime: number;
  deliveryZones?: DeliveryZone[];
}

export interface DeliveryZone {
  name: string;
  polygon: GeoPoint[];
  deliveryFee: Money;
  estimatedTime: number;
}

export interface OrderSettings {
  isPickupEnabled: boolean;
  isDineInEnabled: boolean;
  isScheduledOrdersEnabled: boolean;
  minimumPickupTime: number;
  autoAcceptOrders: boolean;
  maxActiveOrders?: number;
  taxRate: number;
  serviceFee?: Money;
}

export interface MenuCategory {
  id: string;
  restaurantId: string;
  name: string;
  description?: string;
  imageUrl?: string;
  sortOrder: number;
  isActive: boolean;
  availableFrom?: string;
  availableTo?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  description: string;
  price: Money;
  imageUrl?: string;
  images: string[];
  isAvailable: boolean;
  isPopular: boolean;
  isNew: boolean;
  tags: string[];
  allergens: string[];
  dietaryInfo: DietaryInfo;
  preparationTime: number;
  calories?: number;
  modifierGroups: MenuModifierGroup[];
  sortOrder: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface DietaryInfo {
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isHalal: boolean;
  isKosher: boolean;
  spiceLevel?: 0 | 1 | 2 | 3 | 4 | 5;
}

export interface MenuModifierGroup {
  id: string;
  name: string;
  required: boolean;
  minSelections: number;
  maxSelections: number;
  modifiers: MenuModifier[];
}

export interface MenuModifier {
  id: string;
  name: string;
  price: Money;
  isDefault: boolean;
  isAvailable: boolean;
}

export interface Review {
  id: string;
  restaurantId: string;
  customerId: string;
  customerName: string;
  customerPhotoUrl?: string;
  orderId: string;
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
  reply?: ReviewReply;
  isVisible: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ReviewReply {
  message: string;
  repliedBy: string;
  repliedAt: Timestamp;
}
