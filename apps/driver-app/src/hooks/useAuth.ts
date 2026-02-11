import { useEffect, useCallback } from 'react';
import { useAuthStore } from '../stores/authStore';
import type { DriverProfile } from '@restaurants/types';

interface UseAuthReturn {
  driver: DriverProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<DriverProfile>) => Promise<void>;
  clearError: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const {
    driver,
    isAuthenticated,
    isLoading,
    error,
    signIn,
    signUp,
    signOut,
    updateProfile,
    setDriver,
    setError,
  } = useAuthStore();

  // Listen to Firebase auth state changes
  useEffect(() => {
    // TODO: Set up onAuthStateChanged listener
    // const unsubscribe = onAuthStateChanged(auth, async (user) => {
    //   if (user) {
    //     const driverDoc = await getDoc(doc(db, 'users', user.uid));
    //     if (driverDoc.exists()) {
    //       setDriver(driverDoc.data() as DriverProfile);
    //     }
    //   } else {
    //     setDriver(null);
    //   }
    // });
    //
    // return () => unsubscribe();
  }, [setDriver]);

  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  return {
    driver,
    isAuthenticated,
    isLoading,
    error,
    signIn,
    signUp,
    signOut,
    updateProfile,
    clearError,
  };
};
