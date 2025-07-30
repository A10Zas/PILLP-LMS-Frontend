// src/routes/PublicRoute.tsx
import { Navigate } from 'react-router';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const user = localStorage.getItem('user');
  const partner = localStorage.getItem('partner');
  const manager = localStorage.getItem('manager');
  const hr = localStorage.getItem('hr');
  const hrManager = localStorage.getItem('hr-manager');

  // Redirect to appropriate dashboard if already logged in
  if (user) return <Navigate to="/employee-leave" replace />;
  if (manager) return <Navigate to="/manager-panel" replace />;
  if (hr) return <Navigate to="/hr-panel" replace />;
  if (hrManager) return <Navigate to="/hr-manager-leave" replace />;
  if (partner) return <Navigate to="/partner-panel" replace />;

  return <>{children}</>;
};

export default PublicRoute;
