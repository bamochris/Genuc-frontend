/**
 * Gestion centralisée des erreurs
 */

export class AppError extends Error {
  constructor(message, status = 500, code = 'INTERNAL_ERROR') {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export const handleError = (error) => {
  if (error.response) {
    // Erreur du serveur
    const { status, data } = error.response;
    const message = data?.message || 'Une erreur est survenue';

    if (status === 401) {
      return new AppError('Non autorisé', 401, 'UNAUTHORIZED');
    } else if (status === 403) {
      return new AppError('Accès interdit', 403, 'FORBIDDEN');
    } else if (status === 404) {
      return new AppError('Non trouvé', 404, 'NOT_FOUND');
    } else if (status === 400) {
      return new AppError(message, 400, 'BAD_REQUEST');
    } else if (status >= 500) {
      return new AppError('Erreur serveur', status, 'SERVER_ERROR');
    }
  } else if (error.request) {
    // Pas de réponse du serveur
    return new AppError('Pas de connexion internet', 0, 'NETWORK_ERROR');
  }

  return new AppError(error.message, 500, 'UNKNOWN_ERROR');
};

export const getErrorMessage = (error) => {
  if (error instanceof AppError) {
    return error.message;
  }
  return error?.message || 'Une erreur inconnue est survenue';
};

export default { AppError, handleError, getErrorMessage };
