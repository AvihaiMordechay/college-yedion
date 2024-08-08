import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from 'routes/ProtectedRoute'; // הוספת ProtectedRoute

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { AccessControlDashboard } from 'views/pages/access-control/AccessControlDashboard';
// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Navigate to="/login" replace />
    },
    {
      path: '/admins/:personalId',
      element: (
        <ProtectedRoute>
          <DashboardDefault />
        </ProtectedRoute>
      )
    },
    {
      path: '/admins/:personalId/default',
      element: (
        <ProtectedRoute>
          <DashboardDefault />
        </ProtectedRoute>
      )
    },
    {
      path: '/students/:personalId',
      element: (
        <ProtectedRoute>
          <DashboardDefault />
        </ProtectedRoute>
      )
    },
    {
      path: '/staff/:personalId',
      element: (
        <ProtectedRoute>
          <DashboardDefault />
        </ProtectedRoute>
      )
    }
  ]
};

export default MainRoutes;
