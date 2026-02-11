import { create } from 'zustand';

export interface OwnerUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phone?: string;
  restaurantId: string;
  role: 'owner' | 'manager';
  createdAt: string;
}

interface AuthState {
  user: OwnerUser | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setUser: (user: OwnerUser | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    name: string,
    restaurantName: string,
  ) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  signIn: async (_email: string, _password: string) => {
    try {
      set({ isLoading: true, error: null });
      // TODO: Implement Firebase Auth signInWithEmailAndPassword
      // const credential = await signInWithEmailAndPassword(auth, email, password);
      // const userDoc = await getDoc(doc(db, 'owners', credential.user.uid));
      // set({ user: userDoc.data() as OwnerUser });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Sign in failed';
      set({ error: message });
    } finally {
      set({ isLoading: false });
    }
  },

  signUp: async (
    _email: string,
    _password: string,
    _name: string,
    _restaurantName: string,
  ) => {
    try {
      set({ isLoading: true, error: null });
      // TODO: Implement Firebase Auth createUserWithEmailAndPassword
      // 1. Create auth user
      // 2. Create restaurant document in Firestore
      // 3. Create owner document linked to restaurant
      // 4. Set user in state
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Sign up failed';
      set({ error: message });
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    try {
      set({ isLoading: true });
      // TODO: Implement Firebase Auth signOut
      // await auth.signOut();
      set({ user: null });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Sign out failed';
      set({ error: message });
    } finally {
      set({ isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
