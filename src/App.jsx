import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useAuthStore from './stores/authStore';

// Pages - Auth
import Login from './pages/auth/Login';

// Pages - Dashboard
import StudentDashboard from './pages/dashboard/StudentDashboard';

// Pages - Finance - Student
import EtudiantPaiements from './pages/etudiant/EtudiantPaiements';
import HistoriquePaiements from './pages/finances/etudiant/HistoriquePaiements';
import MesFrais from './pages/finances/etudiant/MesFrais';

// Pages - Finance - Rapports
import RapportRecouvrement from './pages/finances/rapports/RapportRecouvrement';

// Pages - Finance - Caissier
import Encaissement from './pages/finances/caissier/Encaissement';

// Pages - Admin
import AdminUniversiteDashboard from './pages/admin/AdminUniversiteDashboard';

// Pages - 404
import NotFound from './pages/NotFound';

// Routes config
import ROUTES from './config/routes';

/**
 * Composant de route protégée
 */
const PrivateRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to={ROUTES.NOT_FOUND} replace />;
  }

  return children;
};

/**
 * App principal avec routing
 */
function App() {
  const { checkAuth, isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  // Vérifier l'authentification au chargement
  useEffect(() => {
    checkAuth();
    setIsLoading(false);
  }, [checkAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">GENUC</h1>
          <p className="text-blue-100">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Routes>
          {/* Routes publiques */}
          <Route
            path={ROUTES.LOGIN}
            element={isAuthenticated ? <Navigate to={ROUTES.STUDENT_DASHBOARD} /> : <Login />}
          />

          {/* Routes Student */}
          <Route
            path={ROUTES.STUDENT_DASHBOARD}
            element={
              <PrivateRoute requiredRole="STUDENT">
                <StudentDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.STUDENT_PAYMENTS}
            element={
              <PrivateRoute requiredRole="STUDENT">
                <EtudiantPaiements />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.STUDENT_FEES}
            element={
              <PrivateRoute requiredRole="STUDENT">
                <MesFrais />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.PAYMENT_HISTORY}
            element={
              <PrivateRoute requiredRole="STUDENT">
                <HistoriquePaiements />
              </PrivateRoute>
            }
          />

          {/* Routes Caissier */}
          <Route
            path={ROUTES.CASHIER_COLLECTION}
            element={
              <PrivateRoute requiredRole="CASHIER">
                <Encaissement />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.CASHIER_REPORTS}
            element={
              <PrivateRoute requiredRole="CASHIER">
                <RapportRecouvrement />
              </PrivateRoute>
            }
          />

          {/* Routes Admin */}
          <Route
            path={ROUTES.ADMIN_DASHBOARD}
            element={
              <PrivateRoute requiredRole="ADMIN">
                <AdminUniversiteDashboard />
              </PrivateRoute>
            }
          />

          {/* Route 404 */}
          <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
          <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} />} />
        </Routes>
      </div>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: '#4ade80',
              secondary: 'black',
            },
          },
        }}
      />
    </Router>
  );
}

export default App;
