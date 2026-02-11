import type {
  Restaurant,
  MenuCategory,
  MenuItem,
  Review,
  PaginatedResponse,
  GeoPoint,
} from '@restaurants/types';

/**
 * Fetch a list of featured restaurants.
 */
export const getFeaturedRestaurants = async (): Promise<Restaurant[]> => {
  // TODO: Query Firestore for restaurants where isFeatured === true
  // const snapshot = await getDocs(
  //   query(collection(db, 'restaurants'), where('isFeatured', '==', true), limit(10))
  // );
  // return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Restaurant));
  return [];
};

/**
 * Fetch nearby restaurants based on user location.
 */
export const getNearbyRestaurants = async (
  _location: GeoPoint,
  _radiusKm: number,
): Promise<Restaurant[]> => {
  // TODO: Use geohash-based query or GeoFirestore for proximity search
  return [];
};

/**
 * Fetch restaurants by cuisine type or category.
 */
export const getRestaurantsByFilter = async (
  _filter: {
    cuisineType?: string;
    category?: string;
    sortBy?: 'rating' | 'distance' | 'delivery_time';
  },
  _page?: number,
): Promise<PaginatedResponse<Restaurant>> => {
  // TODO: Query Firestore with filters and pagination
  return {
    data: [],
    total: 0,
    hasMore: false,
  };
};

/**
 * Fetch a single restaurant by ID.
 */
export const getRestaurantById = async (
  _restaurantId: string,
): Promise<Restaurant | null> => {
  // TODO: Fetch from Firestore
  // const docSnap = await getDoc(doc(db, 'restaurants', restaurantId));
  // return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as Restaurant) : null;
  return null;
};

/**
 * Fetch menu categories for a restaurant.
 */
export const getMenuCategories = async (
  _restaurantId: string,
): Promise<MenuCategory[]> => {
  // TODO: Query Firestore subcollection restaurants/{id}/menuCategories
  return [];
};

/**
 * Fetch menu items for a restaurant, optionally filtered by category.
 */
export const getMenuItems = async (
  _restaurantId: string,
  _categoryId?: string,
): Promise<MenuItem[]> => {
  // TODO: Query Firestore subcollection restaurants/{id}/menuItems
  return [];
};

/**
 * Fetch a single menu item by ID.
 */
export const getMenuItemById = async (
  _restaurantId: string,
  _menuItemId: string,
): Promise<MenuItem | null> => {
  // TODO: Fetch from Firestore
  return null;
};

/**
 * Search restaurants by query string.
 */
export const searchRestaurants = async (
  _query: string,
): Promise<Restaurant[]> => {
  // TODO: Implement search using Algolia, Typesense, or Firestore text search
  return [];
};

/**
 * Fetch reviews for a restaurant.
 */
export const getRestaurantReviews = async (
  _restaurantId: string,
  _page?: number,
): Promise<PaginatedResponse<Review>> => {
  // TODO: Query Firestore subcollection restaurants/{id}/reviews
  return {
    data: [],
    total: 0,
    hasMore: false,
  };
};

/**
 * Submit a new review for a restaurant.
 */
export const submitReview = async (
  _restaurantId: string,
  _review: Omit<Review, 'id' | 'createdAt' | 'updatedAt' | 'isVisible'>,
): Promise<string> => {
  // TODO: Add review document to Firestore
  // const docRef = await addDoc(
  //   collection(db, 'restaurants', restaurantId, 'reviews'),
  //   { ...review, isVisible: true, createdAt: serverTimestamp(), updatedAt: serverTimestamp() }
  // );
  // return docRef.id;
  return '';
};

/**
 * Toggle a restaurant as favorite for the current user.
 */
export const toggleFavoriteRestaurant = async (
  _userId: string,
  _restaurantId: string,
  _isFavorite: boolean,
): Promise<void> => {
  // TODO: Update user document's favoriteRestaurants array in Firestore
  // await updateDoc(doc(db, 'users', userId), {
  //   favoriteRestaurants: isFavorite
  //     ? arrayUnion(restaurantId)
  //     : arrayRemove(restaurantId),
  // });
};
