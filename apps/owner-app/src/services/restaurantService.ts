/**
 * Restaurant service for Firestore CRUD operations.
 * Handles restaurant profile, menu items, and categories.
 */

import type { Restaurant, MenuItem, MenuCategory, DeliverySettings, DaySchedule } from '../stores/restaurantStore';

// ---- Restaurant Profile ----

export const getRestaurant = async (
  _restaurantId: string,
): Promise<Restaurant | null> => {
  // TODO: Implement Firestore query
  // const docRef = doc(db, 'restaurants', restaurantId);
  // const docSnap = await getDoc(docRef);
  // return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Restaurant : null;
  return null;
};

export const updateRestaurantProfile = async (
  _restaurantId: string,
  _updates: Partial<Restaurant>,
): Promise<void> => {
  // TODO: Implement Firestore update
  // await updateDoc(doc(db, 'restaurants', restaurantId), {
  //   ...updates,
  //   updatedAt: serverTimestamp(),
  // });
};

export const updateOperatingHours = async (
  _restaurantId: string,
  _hours: DaySchedule[],
): Promise<void> => {
  // TODO: Implement Firestore update
  // await updateDoc(doc(db, 'restaurants', restaurantId), {
  //   operatingHours: hours,
  //   updatedAt: serverTimestamp(),
  // });
};

export const updateDeliverySettings = async (
  _restaurantId: string,
  _settings: DeliverySettings,
): Promise<void> => {
  // TODO: Implement Firestore update
  // await updateDoc(doc(db, 'restaurants', restaurantId), {
  //   deliverySettings: settings,
  //   updatedAt: serverTimestamp(),
  // });
};

export const toggleRestaurantStatus = async (
  _restaurantId: string,
  _isOpen: boolean,
): Promise<void> => {
  // TODO: Implement Firestore update
  // await updateDoc(doc(db, 'restaurants', restaurantId), {
  //   isOpen,
  //   updatedAt: serverTimestamp(),
  // });
};

// ---- Menu Items ----

export const getMenuItems = async (
  _restaurantId: string,
): Promise<MenuItem[]> => {
  // TODO: Implement Firestore query
  // const querySnap = await getDocs(
  //   query(
  //     collection(db, 'restaurants', restaurantId, 'menuItems'),
  //     orderBy('sortOrder', 'asc'),
  //   ),
  // );
  // return querySnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem));
  return [];
};

export const addMenuItem = async (
  _restaurantId: string,
  _item: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<string> => {
  // TODO: Implement Firestore add
  // const docRef = await addDoc(
  //   collection(db, 'restaurants', restaurantId, 'menuItems'),
  //   { ...item, createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
  // );
  // return docRef.id;
  return '';
};

export const updateMenuItem = async (
  _restaurantId: string,
  _itemId: string,
  _updates: Partial<MenuItem>,
): Promise<void> => {
  // TODO: Implement Firestore update
  // await updateDoc(
  //   doc(db, 'restaurants', restaurantId, 'menuItems', itemId),
  //   { ...updates, updatedAt: serverTimestamp() },
  // );
};

export const deleteMenuItem = async (
  _restaurantId: string,
  _itemId: string,
): Promise<void> => {
  // TODO: Implement Firestore delete
  // await deleteDoc(doc(db, 'restaurants', restaurantId, 'menuItems', itemId));
};

export const toggleMenuItemAvailability = async (
  _restaurantId: string,
  _itemId: string,
  _isAvailable: boolean,
): Promise<void> => {
  // TODO: Implement Firestore update
  // await updateDoc(
  //   doc(db, 'restaurants', restaurantId, 'menuItems', itemId),
  //   { isAvailable, updatedAt: serverTimestamp() },
  // );
};

// ---- Categories ----

export const getCategories = async (
  _restaurantId: string,
): Promise<MenuCategory[]> => {
  // TODO: Implement Firestore query
  // const querySnap = await getDocs(
  //   query(
  //     collection(db, 'restaurants', restaurantId, 'categories'),
  //     orderBy('sortOrder', 'asc'),
  //   ),
  // );
  // return querySnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuCategory));
  return [];
};

export const addCategory = async (
  _restaurantId: string,
  _category: Omit<MenuCategory, 'id'>,
): Promise<string> => {
  // TODO: Implement Firestore add
  // const docRef = await addDoc(
  //   collection(db, 'restaurants', restaurantId, 'categories'),
  //   category,
  // );
  // return docRef.id;
  return '';
};

export const updateCategory = async (
  _restaurantId: string,
  _categoryId: string,
  _updates: Partial<MenuCategory>,
): Promise<void> => {
  // TODO: Implement Firestore update
};

export const deleteCategory = async (
  _restaurantId: string,
  _categoryId: string,
): Promise<void> => {
  // TODO: Implement Firestore delete
};

export const reorderCategories = async (
  _restaurantId: string,
  _categoryOrders: { id: string; sortOrder: number }[],
): Promise<void> => {
  // TODO: Implement batch Firestore update
  // const batch = writeBatch(db);
  // categoryOrders.forEach(({ id, sortOrder }) => {
  //   batch.update(
  //     doc(db, 'restaurants', restaurantId, 'categories', id),
  //     { sortOrder },
  //   );
  // });
  // await batch.commit();
};
