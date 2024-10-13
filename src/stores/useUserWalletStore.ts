import { create } from 'zustand';

interface AssetsUser {
  id: number;
  name: string;
  acronym: string;
  quantity: number;
  isActive: number;
  price: number;
}

interface UserWalletStore {
  assets: AssetsUser[];
  addAsset: (asset: AssetsUser) => void;
  setAssets: (assets: AssetsUser[]) => void;
  removeAsset: (id: number) => void;
  clearAssets: () => void;
}

export const useUserWalletStore = create<UserWalletStore>((set) => ({
  assets: [],
  addAsset: (asset) =>
    set((state) => ({
      assets: [...state.assets, asset],
    })),
  setAssets: (assets) =>
    set(() => ({
      assets,
    })),
  removeAsset: (id) =>
    set((state) => ({
      assets: state.assets.filter((asset) => asset.id !== id),
    })),
  clearAssets: () =>
    set({
      assets: [],
    }),
}));
