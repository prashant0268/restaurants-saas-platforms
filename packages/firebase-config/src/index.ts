export { getFirebaseApp, firebaseConfig } from './config';
export {
  getFirebaseAuth,
  signInEmail,
  signUpEmail,
  signInGoogle,
  signInApple,
  logOut,
  onAuthChanged,
  getCurrentUser,
  getCurrentUserId,
} from './auth';
export { COLLECTIONS, getSubcollectionPath, getMenuItemsPath, getMenuCategoriesPath, getReviewsPath, getStaffPath } from './collections';
export type { CollectionName } from './collections';
export {
  getDb,
  getCollectionRef,
  getDocRef,
  getDocument,
  queryDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  subscribeToDocument,
  subscribeToCollection,
  batchWrite,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
  Timestamp,
} from './firestore';
export {
  getFirebaseStorage,
  uploadFile,
  uploadFileWithProgress,
  getFileUrl,
  deleteFile,
  getStoragePath,
} from './storage';
