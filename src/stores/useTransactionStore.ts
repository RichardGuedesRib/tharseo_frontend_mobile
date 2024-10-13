import { create } from 'zustand';

interface Transaction {
  id: number;
  orderId: number;
  origQty: string;
  executedQty: string;
  side: string;
  price: number;
  stopPrice: number;
  openDate: number;
  typeTransaction: string;
  openTrade: boolean;
  status: string;
  orderPairTrade: number;
  isActive: number;
  user: string;
  assetsUser: string;
  priceTarget?: number;
  closeDate?: string;
  profit?: number;
}

interface TransactionStore {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  setTransactions: (transactions: Transaction[]) => void;
  removeTransaction: (id: number) => void;
  clearTransactions: () => void;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [...state.transactions, transaction],
    })),
  setTransactions: (transactions) =>
    set(() => ({
      transactions,
    })),
  removeTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((tx) => tx.id !== id),
    })),
  clearTransactions: () => set({ transactions: [] }),
}));
