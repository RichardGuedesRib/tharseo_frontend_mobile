import { create } from 'zustand';

interface RegisterState {
  name: string | null;
  lastname: string | null;
  phoneNumber: string | null;
  email: string | null;
  password: string | null;
  apikey: string | null;
  secretkey: string | null;  
  setRegister: (authData: Partial<RegisterState>) => void;
  clearRegister: () => void;
}

export const useRegisterStore = create<RegisterState>((set) => ({
  name: null,
  lastname: null,
  phoneNumber: null,
  email: null,
  password: null,
  apikey: null,
  secretkey: null,
  setRegister: (registerData) => set((state) => ({ ...state, ...registerData })),
  clearRegister: () =>
    set({
      name: null,
      lastname: null,
      phoneNumber: null,
      email: null,
      password: null,
      apikey: null,
      secretkey: null
    }),
}));
