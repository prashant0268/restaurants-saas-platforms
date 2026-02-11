import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'sales_rep' | 'sales_manager' | 'admin';
  territory?: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
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
      // TODO: Integrate with Firebase Auth
      const mockUser: User = {
        id: '1',
        email,
        name: 'Sales Rep',
        role: 'sales_rep',
        territory: 'Northeast',
      };
      set({ user: mockUser, isAuthenticated: true, isLoading: false });
    } catch {
      set({ error: 'Invalid credentials', isLoading: false });
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false, error: null });
  },

  setUser: (user) => {
    set({ user, isAuthenticated: !!user });
  },

  clearError: () => {
    set({ error: null });
  },
}));
