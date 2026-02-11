export const COLLECTIONS = {
  USERS: 'users',
  RESTAURANTS: 'restaurants',
  MENU_ITEMS: 'menuItems',
  MENU_CATEGORIES: 'menuCategories',
  REVIEWS: 'reviews',
  STAFF: 'staff',
  ORDERS: 'orders',
  RESERVATIONS: 'reservations',
  DELIVERY_ASSIGNMENTS: 'deliveryAssignments',
  DRIVERS: 'drivers',
  DRIVER_LOCATIONS: 'driverLocations',
  CAMPAIGNS: 'campaigns',
  PROMOTIONS: 'promotions',
  LEADS: 'leads',
  SUBSCRIPTIONS: 'subscriptions',
  NOTIFICATIONS: 'notifications',
  ANALYTICS: 'analytics',
  SUPPORT_TICKETS: 'supportTickets',
  PLATFORM_SETTINGS: 'platformSettings',
  LOYALTY_PROGRAMS: 'loyaltyPrograms',
  CUSTOMER_LOYALTY: 'customerLoyalty',
  FIRETV_DISPLAYS: 'fireTvDisplays',
} as const;

export type CollectionName = typeof COLLECTIONS[keyof typeof COLLECTIONS];

export const getSubcollectionPath = (
  parentCollection: string,
  parentId: string,
  subcollection: string,
): string => {
  return `${parentCollection}/${parentId}/${subcollection}`;
};

export const getMenuItemsPath = (restaurantId: string): string =>
  getSubcollectionPath(COLLECTIONS.RESTAURANTS, restaurantId, COLLECTIONS.MENU_ITEMS);

export const getMenuCategoriesPath = (restaurantId: string): string =>
  getSubcollectionPath(COLLECTIONS.RESTAURANTS, restaurantId, COLLECTIONS.MENU_CATEGORIES);

export const getReviewsPath = (restaurantId: string): string =>
  getSubcollectionPath(COLLECTIONS.RESTAURANTS, restaurantId, COLLECTIONS.REVIEWS);

export const getStaffPath = (restaurantId: string): string =>
  getSubcollectionPath(COLLECTIONS.RESTAURANTS, restaurantId, COLLECTIONS.STAFF);
