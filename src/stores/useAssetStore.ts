import { create } from 'zustand';

interface Asset {
  id: string;
  name: string;
  acronym: string;
}

interface AssetState {
  assets: Asset[];
  setAssets: (assets: Asset[]) => void;
}

export const useAssetStore = create<AssetState>((set) => ({
  assets: [],
  setAssets: (assets) => set(() => ({ assets })),
}));
