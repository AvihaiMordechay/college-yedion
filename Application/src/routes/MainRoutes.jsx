import { lazy } from "react";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "routes/ProtectedRoute"; // הוספת ProtectedRoute

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";
// dashboard routing
const DashboardDefault = Loadable(lazy(() => import("views/dashboard")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <Navigate to="/login" replace />,
    },
    // Admins:
    {
      path: "/admins/:personalId",
      element: (
        <ProtectedRoute>
          <DashboardDefault />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admins/:personalId/default",
      element: (
        <ProtectedRoute>
          <DashboardDefault />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admins/:personalId/support-system",
      element: (
        <ProtectedRoute>
          <DashboardDefault />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admins/:personalId/details",
      element: (
        <ProtectedRoute>
          <DashboardDefault />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admins/:personalId/classes/sections/management-sections",
      element: (
        <ProtectedRoute>
          <DashboardDefault />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admins/:personalId/classes/sections/adding-section",
      element: (
        <ProtectedRoute>
          <DashboardDefault />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admins/:personalId/classes/faculties/management-faculties",
      element: (
        <ProtectedRoute>
          <DashboardDefault />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admins/:personalId/classes/faculties/adding-faculty",
      element: (
        <ProtectedRoute>
          <DashboardDefault />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admins/:personalId/classes/departments/management-departments",
      element: (
        <ProtectedRoute>
          <DashboardDefault />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admins/:personalId/classes/departments/adding-department",
      element: (
        <ProtectedRoute>
          <DashboardDefault />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admins/:personalId/users/staff/management-staff",
      element: (
        <ProtectedRoute>
          <DashboardDefault />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admins/:personalId/users/staff/adding-staff",
      element: (
        <ProtectedRoute>
          <DashboardDefault />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admins/:personalId/website-actions/management-more-information",
      element: (
        <ProtectedRoute>
          <DashboardDefault />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admins/:personalId/website-actions/management-guides",
      element: (
        <ProtectedRoute>
          <DashboardDefault />
        </ProtectedRoute>
      ),
    },
    // Students:
    {
      path: "/students/:personalId",
      element: (
        <ProtectedRoute>
          <DashboardDefault />
        </ProtectedRoute>
      ),
    },
    {
      path: "/staff/:personalId",
      element: (
        <ProtectedRoute>
          <DashboardDefault />
        </ProtectedRoute>
      ),
    },
  ],
};

export default MainRoutes;
