import apiClient from '../api/axios';
import ENDPOINTS from '../api/apiEndpoints';

/**
 * Service pour la gestion de l'autorisation et RBAC
 */

// Vérifier si un utilisateur a une permission
export const checkPermission = async (userId, permissionCode) => {
  try {
    const response = await apiClient.post(ENDPOINTS.CHECK_PERMISSION, {
      userId,
      permissionCode,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Obtenir les permissions d'un utilisateur
export const getUserPermissions = async (userId) => {
  try {
    const response = await apiClient.get(ENDPOINTS.GET_USER_PERMISSIONS(userId));
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Obtenir les rôles d'un utilisateur
export const getUserRoles = async (userId, universiteId) => {
  try {
    const response = await apiClient.get(ENDPOINTS.GET_USER_ROLES(userId, universiteId));
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Assigner un rôle à un utilisateur
export const assignRole = async (userId, roleId, universiteId, assignedBy) => {
  try {
    const response = await apiClient.post(ENDPOINTS.ASSIGN_ROLE, {
      userId,
      roleId,
      universiteId,
      assignedBy,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Révoquer un rôle d'un utilisateur
export const revokeRole = async (userId, roleId, universiteId, revokedBy) => {
  try {
    const response = await apiClient.delete(ENDPOINTS.REVOKE_ROLE, {
      params: { userId, roleId, universiteId, revokedBy },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default {
  checkPermission,
  getUserPermissions,
  getUserRoles,
  assignRole,
  revokeRole,
};
