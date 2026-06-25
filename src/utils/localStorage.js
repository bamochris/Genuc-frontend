/**
 * Wrapper pour localStorage avec gestion d'erreurs
 */

class StorageManager {
  setItem(key, value) {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
      return true;
    } catch (error) {
      console.error('Erreur localStorage:', error);
      return false;
    }
  }

  getItem(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Erreur localStorage:', error);
      return defaultValue;
    }
  }

  removeItem(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Erreur localStorage:', error);
      return false;
    }
  }

  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Erreur localStorage:', error);
      return false;
    }
  }

  keys() {
    try {
      return Object.keys(localStorage);
    } catch (error) {
      console.error('Erreur localStorage:', error);
      return [];
    }
  }
}

export default new StorageManager();
