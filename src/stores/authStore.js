import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Store Zustand pour la gestion de l'authentification
 * Persiste l'état de l'utilisateur et du token
 */

const useAuthStore = create(
  persist(
    (set, get) => ({
      // État
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          // Simulation - remplacer par l'appel API réel
          const response = {
            user: {
              id: 1,
              email: credentials.email,
              role: 'STUDENT',
              universite: 'UNIKIN',
            },
            token: 'jwt-token-here',
          };

          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
          });

          localStorage.setItem('authToken', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));

          return response;
        } catch (error) {
          set({
            error: error.message || 'Erreur de connexion',
            isLoading: false,
          });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      },

      checkAuth: () => {
        const token = localStorage.getItem('authToken');
        const user = localStorage.getItem('user');

        if (token && user) {
          set({
            token,
            user: JSON.parse(user),
            isAuthenticated: true,
          });
        }
      },
    }),
    {
      name: 'auth-store',
    }
  )
);

export default useAuthStore;
