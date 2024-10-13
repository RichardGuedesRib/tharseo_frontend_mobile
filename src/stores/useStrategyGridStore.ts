import { create } from 'zustand';

interface StrategyGridUser {
  id: number;
  acronym: string;
  configStrategy: string;
  profit: number;
  performance: number;
  isActive: number;
}

interface StrategyGridStore {
  grids: StrategyGridUser[];
  addGrid: (grid: StrategyGridUser) => void;
  setGrids: (grids: StrategyGridUser[]) => void;
  removeGrid: (id: number) => void;
  clearGrids: () => void;
}

export const useStrategyGridStore = create<StrategyGridStore>((set) => ({
  grids: [],
  addGrid: (grid) =>
    set((state) => ({
      grids: [...state.grids, grid],
    })),
  setGrids: (grids) =>
    set(() => ({
      grids,
    })),
  removeGrid: (id) =>
    set((state) => ({
      grids: state.grids.filter((grid) => grid.id !== id),
    })),
  clearGrids: () => set({ grids: [] }),
}));
