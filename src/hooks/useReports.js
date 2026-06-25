import { useCallback } from 'react';
import * as reportService from '../services/reportService';
import useReportStore from '../stores/reportStore';
import toast from 'react-hot-toast';

/**
 * Hook personnalisé pour la gestion des rapports
 */

export const useReports = () => {
  const store = useReportStore();

  const generateDailyReport = useCallback(
    async (universiteId, reportDate, generatedBy) => {
      store.setIsLoading(true);
      store.setError(null);
      try {
        const response = await reportService.generateDailyReport(
          universiteId,
          reportDate,
          generatedBy
        );
        store.addReport(response);
        store.setCurrentReport(response);
        toast.success('Rapport journalier généré avec succès');
        return response;
      } catch (error) {
        const errorMessage = error.message || 'Erreur lors de la génération du rapport';
        store.setError(errorMessage);
        toast.error(errorMessage);
        throw error;
      } finally {
        store.setIsLoading(false);
      }
    },
    [store]
  );

  const generateMonthlyReport = useCallback(
    async (universiteId, month, year, generatedBy) => {
      store.setIsLoading(true);
      store.setError(null);
      try {
        const response = await reportService.generateMonthlyReport(
          universiteId,
          month,
          year,
          generatedBy
        );
        store.addReport(response);
        store.setCurrentReport(response);
        toast.success('Rapport mensuel généré avec succès');
        return response;
      } catch (error) {
        const errorMessage = error.message || 'Erreur lors de la génération du rapport';
        store.setError(errorMessage);
        toast.error(errorMessage);
        throw error;
      } finally {
        store.setIsLoading(false);
      }
    },
    [store]
  );

  const getPaymentSummary = useCallback(
    async (universiteId, startDate, endDate) => {
      store.setIsLoading(true);
      store.setError(null);
      try {
        const response = await reportService.getPaymentSummary(
          universiteId,
          startDate,
          endDate
        );
        return response;
      } catch (error) {
        const errorMessage = error.message || 'Erreur lors de la récupération du résumé';
        store.setError(errorMessage);
        toast.error(errorMessage);
        throw error;
      } finally {
        store.setIsLoading(false);
      }
    },
    [store]
  );

  return {
    reports: store.reports,
    currentReport: store.currentReport,
    filters: store.filters,
    isLoading: store.isLoading,
    error: store.error,
    generateDailyReport,
    generateMonthlyReport,
    getPaymentSummary,
    setFilters: store.setFilters,
    clearError: store.clearError,
  };
};

export default useReports;
