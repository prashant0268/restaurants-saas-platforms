import { create } from 'zustand';
import type { User } from '@restaurants/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  setUser: (user: User) => void;
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

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  setUser: (user: User) => {
    set({ user, isAuthenticated: true, isLoading: false });
  },

  login: async (_email: string, _password: string) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implement Firebase Auth signInWithEmailAndPassword
      // const credential = await signInWithEmailAndPassword(auth, email, password);
      // const userData = await getDoc(doc(db, 'users', credential.user.uid));
      // set({ user: userData.data() as User, isAuthenticated: true });
      set({ isLoading: false });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Login failed';
      set({ error: errorMessage, isLoading: false });
    }
  },

  signUp: async (
    _email: string,
    _password: string,
    _firstName: string,
    _lastName: string,
  ) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implement Firebase Auth createUserWithEmailAndPassword
      // 1. Create auth user
      // 2. Create user document in Firestore
      // 3. Set up customer profile
      set({ isLoading: false });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Sign up failed';
      set({ error: errorMessage, isLoading: false });
    }
  },

  logout: () => {
    // TODO: Call Firebase Auth signOut
    set({ user: null, isAuthenticated: false, error: null });
  },

  resetPassword: async (_email: string) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implement Firebase Auth sendPasswordResetEmail
      set({ isLoading: false });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Password reset failed';
      set({ error: errorMessage, isLoading: false });
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));
