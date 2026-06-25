import { create } from 'zustand';

/**
 * Store Zustand pour la gestion des rapports
 */

const useReportStore = create((set, get) => ({
  // État
  reports: [],
  currentReport: null,
  filters: {
    universiteId: null,
    startDate: null,
    endDate: null,
    reportType: 'DAILY',
  },
  isLoading: false,
  error: null,

  // Actions
  setReports: (reports) => set({ reports }),
  setCurrentReport: (report) => set({ currentReport: report }),
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  addReport: (report) =>
    set((state) => ({
      reports: [...state.reports, report],
    })),

  clearError: () => set({ error: null }),

  reset: () =>
    set({
      reports: [],
      currentReport: null,
      filters: {
        universiteId: null,
        startDate: null,
        endDate: null,
        reportType: 'DAILY',
      },
      isLoading: false,
      error: null,
    }),
}));

export default useReportStore;
