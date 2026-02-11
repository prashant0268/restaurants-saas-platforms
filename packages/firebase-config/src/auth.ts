import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  OAuthProvider,
  User as FirebaseUser,
  Auth,
} from 'firebase/auth';
import { getFirebaseApp } from './config';

let auth: Auth;

export const getFirebaseAuth = (): Auth => {
  if (!auth) {
    auth = getAuth(getFirebaseApp());
  }
  return auth;
};

export const signInEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(getFirebaseAuth(), email, password);
};

export const signUpEmail = (email: string, password: string) => {
  return createUserWithEmailAndPassword(getFirebaseAuth(), email, password);
};

export const signInGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(getFirebaseAuth(), provider);
};

export const signInApple = () => {
  const provider = new OAuthProvider('apple.com');
  return signInWithPopup(getFirebaseAuth(), provider);
};

export const logOut = () => {
  return signOut(getFirebaseAuth());
};

export const onAuthChanged = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(getFirebaseAuth(), callback);
};

export const getCurrentUser = (): FirebaseUser | null => {
  return getFirebaseAuth().currentUser;
};

export const getCurrentUserId = (): string | null => {
  return getFirebaseAuth().currentUser?.uid ?? null;
};
