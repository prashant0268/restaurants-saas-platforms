import { create } from 'zustand';

interface AuthState {
  user: { id: string; email: string; name: string; restaurantId: string } | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  login: async (_email: string, _password: string) => {
    set({ isLoading: true });
    // TODO: Implement Firebase auth
    set({
      user: { id: '1', email: _email, name: 'Owner', restaurantId: 'rest-1' },
      isLoading: false,
    });
  },
  logout: () => {
    set({ user: null });
  },
}));
