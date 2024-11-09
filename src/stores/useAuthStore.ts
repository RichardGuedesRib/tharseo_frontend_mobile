import { create } from 'zustand';

interface AuthState {
  id: string | null;
  name: string | null;
  lastname: string | null;
  phoneNumber: string | null;
  email: string | null;
  avatar: string | null;
  token: string | null;
  expiration: number | null;
  setAvatar: (newAvatar: string) => void;
  setAuth: (authData: Partial<AuthState>) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  id: null,
  name: null,
  lastname: null,
  phoneNumber: null,
  email: null,
  avatar: null,
  token: null,
  expiration: null,
  setAvatar: (newAvatar) => set({ avatar: newAvatar }),
  setAuth: (authData) => set((state) => ({ ...state, ...authData })),
  clearAuth: () =>
    set({
      id: null,
      name: null,
      lastname: null,
      phoneNumber: null,
      email: null,
      avatar: null,
      token: null,
      expiration: null,
    }),
}));
