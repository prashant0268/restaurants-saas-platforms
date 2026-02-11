import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  FirebaseStorage,
  UploadTask,
} from 'firebase/storage';
import { getFirebaseApp } from './config';

let storage: FirebaseStorage;

export const getFirebaseStorage = (): FirebaseStorage => {
  if (!storage) {
    storage = getStorage(getFirebaseApp());
  }
  return storage;
};

export const uploadFile = async (
  path: string,
  file: Blob | Uint8Array,
  metadata?: { contentType?: string },
): Promise<string> => {
  const storageRef = ref(getFirebaseStorage(), path);
  await uploadBytes(storageRef, file, metadata);
  return getDownloadURL(storageRef);
};

export const uploadFileWithProgress = (
  path: string,
  file: Blob | Uint8Array,
  onProgress?: (progress: number) => void,
): { task: UploadTask; getUrl: () => Promise<string> } => {
  const storageRef = ref(getFirebaseStorage(), path);
  const task = uploadBytesResumable(storageRef, file);

  if (onProgress) {
    task.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      onProgress(progress);
    });
  }

  return {
    task,
    getUrl: async () => { await task; return getDownloadURL(storageRef); },
  };
};

export const getFileUrl = (path: string): Promise<string> => {
  const storageRef = ref(getFirebaseStorage(), path);
  return getDownloadURL(storageRef);
};

export const deleteFile = (path: string): Promise<void> => {
  const storageRef = ref(getFirebaseStorage(), path);
  return deleteObject(storageRef);
};

export const getStoragePath = {
  restaurantLogo: (restaurantId: string) => `restaurants/${restaurantId}/logo`,
  restaurantCover: (restaurantId: string) => `restaurants/${restaurantId}/cover`,
  restaurantImages: (restaurantId: string, fileName: string) =>
    `restaurants/${restaurantId}/images/${fileName}`,
  menuItemImage: (restaurantId: string, itemId: string) =>
    `restaurants/${restaurantId}/menu/${itemId}`,
  reviewImage: (restaurantId: string, reviewId: string, fileName: string) =>
    `restaurants/${restaurantId}/reviews/${reviewId}/${fileName}`,
  userAvatar: (userId: string) => `users/${userId}/avatar`,
  driverDocument: (driverId: string, docType: string) =>
    `drivers/${driverId}/documents/${docType}`,
  deliveryProof: (deliveryId: string) => `deliveries/${deliveryId}/proof`,
  campaignAsset: (campaignId: string, fileName: string) =>
    `campaigns/${campaignId}/${fileName}`,
};
