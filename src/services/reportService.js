import apiClient from '../api/axios';
import ENDPOINTS from '../api/apiEndpoints';

/**
 * Service pour la génération de rapports financiers
 */

// Générer un rapport journalier
export const generateDailyReport = async (universiteId, reportDate, generatedBy) => {
  try {
    const response = await apiClient.post(ENDPOINTS.GENERATE_DAILY_REPORT, {
      universiteId,
      reportDate,
      generatedBy,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Générer un rapport mensuel
export const generateMonthlyReport = async (universiteId, month, year, generatedBy) => {
  try {
    const response = await apiClient.post(
      ENDPOINTS.GENERATE_MONTHLY_REPORT,
      null,
      {
        params: { universiteId, month, year, generatedBy },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Obtenir un résumé des paiements par méthode
export const getPaymentSummary = async (universiteId, startDate, endDate) => {
  try {
    const response = await apiClient.get(ENDPOINTS.GET_PAYMENT_SUMMARY, {
      params: { universiteId, startDate, endDate },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default {
  generateDailyReport,
  generateMonthlyReport,
  getPaymentSummary,
};
