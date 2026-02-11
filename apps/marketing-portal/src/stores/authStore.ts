import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'marketer' | 'viewer';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, _password: string) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Replace with Firebase Auth integration
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockUser: User = {
        id: '1',
        email,
        name: 'Marketing Admin',
        role: 'admin',
      };
      set({ user: mockUser, isAuthenticated: true, isLoading: false });
    } catch {
      set({ error: 'Login failed. Please try again.', isLoading: false });
    }
  },

  logout: () => {
    // TODO: Replace with Firebase Auth sign out
    set({ user: null, isAuthenticated: false });
  },

  clearError: () => {
    set({ error: null });
  },
}));
