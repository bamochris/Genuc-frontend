import { create } from 'zustand';

/**
 * Store Zustand pour la gestion des paiements
 */

const usePaymentStore = create((set, get) => ({
  // État
  transactions: [],
  currentTransaction: null,
  exchangeRate: null,
  isLoading: false,
  error: null,
  statistics: null,

  // Actions
  setTransactions: (transactions) => set({ transactions }),
  setCurrentTransaction: (transaction) => set({ currentTransaction: transaction }),
  setExchangeRate: (rate) => set({ exchangeRate: rate }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setStatistics: (statistics) => set({ statistics }),

  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [...state.transactions, transaction],
    })),

  updateTransaction: (id, updates) =>
    set((state) => ({
      transactions: state.transactions.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    })),

  clearError: () => set({ error: null }),

  reset: () =>
    set({
      transactions: [],
      currentTransaction: null,
      exchangeRate: null,
      isLoading: false,
      error: null,
      statistics: null,
    }),
}));

export default usePaymentStore;
