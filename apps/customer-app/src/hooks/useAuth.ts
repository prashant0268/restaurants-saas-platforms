import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import type { User } from '@restaurants/types';

interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  clearError: () => void;
}

/**
 * Custom hook for authentication state and actions.
 * Wraps the auth store and sets up the Firebase auth state listener.
 */
export const useAuth = (): UseAuthReturn => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    setUser,
    login,
    signUp,
    logout,
    resetPassword,
    clearError,
  } = useAuthStore();

  useEffect(() => {
    // TODO: Set up Firebase onAuthStateChanged listener
    // const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
    //   if (firebaseUser) {
    //     const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
    //     if (userDoc.exists()) {
    //       setUser(userDoc.data() as User);
    //     }
    //   } else {
    //     logout();
    //   }
    // });
    //
    // return () => unsubscribe();

    // Suppress unused variable warning - will be used with Firebase implementation
    void setUser;
  }, [setUser]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    signUp,
    logout,
    resetPassword,
    clearError,
  };
};
