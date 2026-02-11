import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  DocumentData,
  QueryConstraint,
  Firestore,
  DocumentReference,
  CollectionReference,
  serverTimestamp,
  writeBatch,
  Timestamp,
} from 'firebase/firestore';
import { getFirebaseApp } from './config';

let db: Firestore;

export const getDb = (): Firestore => {
  if (!db) {
    db = getFirestore(getFirebaseApp());
  }
  return db;
};

export const getCollectionRef = (path: string): CollectionReference => {
  return collection(getDb(), path);
};

export const getDocRef = (collectionPath: string, docId: string): DocumentReference => {
  return doc(getDb(), collectionPath, docId);
};

export const getDocument = async <T extends DocumentData>(
  collectionPath: string,
  docId: string,
): Promise<(T & { id: string }) | null> => {
  const docRef = doc(getDb(), collectionPath, docId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() } as T & { id: string };
};

export const queryDocuments = async <T extends DocumentData>(
  collectionPath: string,
  ...constraints: QueryConstraint[]
): Promise<(T & { id: string })[]> => {
  const q = query(collection(getDb(), collectionPath), ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as T & { id: string });
};

export const createDocument = async (
  collectionPath: string,
  docId: string,
  data: DocumentData,
): Promise<void> => {
  const docRef = doc(getDb(), collectionPath, docId);
  await setDoc(docRef, { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
};

export const updateDocument = async (
  collectionPath: string,
  docId: string,
  data: Partial<DocumentData>,
): Promise<void> => {
  const docRef = doc(getDb(), collectionPath, docId);
  await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() });
};

export const deleteDocument = async (
  collectionPath: string,
  docId: string,
): Promise<void> => {
  const docRef = doc(getDb(), collectionPath, docId);
  await deleteDoc(docRef);
};

export const subscribeToDocument = <T extends DocumentData>(
  collectionPath: string,
  docId: string,
  callback: (data: (T & { id: string }) | null) => void,
) => {
  const docRef = doc(getDb(), collectionPath, docId);
  return onSnapshot(docRef, (snap) => {
    if (!snap.exists()) {
      callback(null);
      return;
    }
    callback({ id: snap.id, ...snap.data() } as T & { id: string });
  });
};

export const subscribeToCollection = <T extends DocumentData>(
  collectionPath: string,
  constraints: QueryConstraint[],
  callback: (data: (T & { id: string })[]) => void,
) => {
  const q = query(collection(getDb(), collectionPath), ...constraints);
  return onSnapshot(q, (snapshot) => {
    const results = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as T & { id: string });
    callback(results);
  });
};

export const batchWrite = async (
  operations: Array<{
    type: 'set' | 'update' | 'delete';
    collectionPath: string;
    docId: string;
    data?: DocumentData;
  }>,
): Promise<void> => {
  const batch = writeBatch(getDb());
  for (const op of operations) {
    const docRef = doc(getDb(), op.collectionPath, op.docId);
    switch (op.type) {
      case 'set':
        batch.set(docRef, { ...op.data, updatedAt: serverTimestamp() });
        break;
      case 'update':
        batch.update(docRef, { ...op.data, updatedAt: serverTimestamp() });
        break;
      case 'delete':
        batch.delete(docRef);
        break;
    }
  }
  await batch.commit();
};

export { where, orderBy, limit, startAfter, serverTimestamp, Timestamp };
