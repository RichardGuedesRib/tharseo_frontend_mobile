import { create } from 'zustand';

interface AuthState {
  id: string | null;
  name: string | null;
  lastname: string | null;
  token: string | null;
  expiration: number | null;
  setAuth: (authData: Partial<AuthState>) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  id: null,
  name: null,
  lastname: null,
  token: null,
  expiration: null,
  setAuth: (authData) => set((state) => ({ ...state, ...authData })),
  clearAuth: () =>
    set({
      id: null,
      name: null,
      lastname: null,
      token: null,
      expiration: null,
    }),
}));
