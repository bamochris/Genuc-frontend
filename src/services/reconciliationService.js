import apiClient from '../api/axios';
import ENDPOINTS from '../api/apiEndpoints';

/**
 * Service pour la réconciliation bancaire
 */

// Créer une réconciliation
export const createReconciliation = async (reconciliationData) => {
  try {
    const response = await apiClient.post(ENDPOINTS.CREATE_RECONCILIATION, reconciliationData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Appareiller les transactions aux relevés bancaires
export const matchTransactions = async (reconciliationId, bankTransactions) => {
  try {
    const response = await apiClient.post(
      ENDPOINTS.MATCH_TRANSACTIONS(reconciliationId),
      bankTransactions
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Obtenir le rapport de réconciliation
export const getReconciliationReport = async (reconciliationId) => {
  try {
    const response = await apiClient.get(
      ENDPOINTS.GET_RECONCILIATION_REPORT(reconciliationId)
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default {
  createReconciliation,
  matchTransactions,
  getReconciliationReport,
};
