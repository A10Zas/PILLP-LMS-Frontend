import { Route, Routes } from 'react-router';
import { Suspense, lazy } from 'react';

// Layout
import AppLayout from '../components/layout/AppLayout';

// Lazy-loaded pages
const Home = lazy(() => import('../pages/Home'));
const EmployeeLoginPage = lazy(() => import('../pages/EmployeeLoginPage'));
const HrLoginPage = lazy(() => import('../pages/HrLoginPage'));
const HrManagerLoginPage = lazy(() => import('../pages/HrManagerLoginPage'));
const ManagerLoginPage = lazy(() => import('../pages/ManagerLoginPage'));
const PartnerLoginPage = lazy(() => import('../pages/PartnerLoginPage'));
const EmployeeLeavePage = lazy(() => import('../pages/EmployeeLeavePage'));
const HrManagerLeavePage = lazy(() => import('../pages/HrManagerLeavePage'));
const ManagerPanelPage = lazy(() => import('../pages/ManagerPanelPage'));
const HrPanelPage = lazy(() => import('../pages/HrPanelPage'));
const PartnerPanelPage = lazy(() => import('../pages/PartnerPanelPage'));

// Protected wrapper
import ProtectedRoutes from './ProtectedRoutes';
import PublicRoute from './PublicRoute';

const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen text-xl">
          Loading, please wait...
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route
            index
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />
          <Route
            path="employee-login"
            element={
              <PublicRoute>
                <EmployeeLoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="hr-login"
            element={
              <PublicRoute>
                <HrLoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="hr-manager-login"
            element={
              <PublicRoute>
                <HrManagerLoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="manager-login"
            element={
              <PublicRoute>
                <ManagerLoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="partner-login"
            element={
              <PublicRoute>
                <PartnerLoginPage />
              </PublicRoute>
            }
          />

          <Route
            path="employee-leave"
            element={
              <ProtectedRoutes requiredRole="user">
                <EmployeeLeavePage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="hr-manager-leave"
            element={
              <ProtectedRoutes requiredRole="hr-manager">
                <HrManagerLeavePage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="manager-panel"
            element={
              <ProtectedRoutes requiredRole="manager">
                <ManagerPanelPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="hr-panel"
            element={
              <ProtectedRoutes requiredRole="hr">
                <HrPanelPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="partner-panel"
            element={
              <ProtectedRoutes requiredRole="partner">
                <PartnerPanelPage />
              </ProtectedRoutes>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
