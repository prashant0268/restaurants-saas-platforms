import { create } from 'zustand';
import type { DriverProfile } from '@restaurants/types';

interface AuthState {
  driver: DriverProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  setDriver: (driver: DriverProfile | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<DriverProfile>) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  driver: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  setDriver: (driver) =>
    set({
      driver,
      isAuthenticated: driver !== null,
    }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  signIn: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implement Firebase Auth signInWithEmailAndPassword
      // const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // const driverDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      // set({ driver: driverDoc.data() as DriverProfile, isAuthenticated: true });
      console.log('signIn:', email);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to sign in';
      set({ error: message });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  signUp: async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implement Firebase Auth createUserWithEmailAndPassword
      // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // const driverProfile: DriverProfile = { ... };
      // await setDoc(doc(db, 'users', userCredential.user.uid), driverProfile);
      // set({ driver: driverProfile, isAuthenticated: true });
      console.log('signUp:', { email, firstName, lastName });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create account';
      set({ error: message });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implement Firebase Auth signOut
      // await firebaseSignOut(auth);
      set({ driver: null, isAuthenticated: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to sign out';
      set({ error: message });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfile: async (updates: Partial<DriverProfile>) => {
    const { driver } = get();
    if (!driver) return;

    set({ isLoading: true, error: null });
    try {
      // TODO: Update driver profile in Firestore
      // await updateDoc(doc(db, 'users', driver.id), updates);
      set({ driver: { ...driver, ...updates } as DriverProfile });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update profile';
      set({ error: message });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },
}));
