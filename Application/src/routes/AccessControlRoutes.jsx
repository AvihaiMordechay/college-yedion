// routes/AccessControlRoutes.jsx
import React from "react";
import ProtectedRoute from "routes/ProtectedRoute"; // הוספת ProtectedRoute
import { AccessControlDashboard } from "Views/AccessControl/AccessControlDashboard";

const AccessControlRoutes = {
  path: "/ac-dashboard/:personalId",
  element: (
    <ProtectedRoute>
      <AccessControlDashboard />
    </ProtectedRoute>
  ),
};

export default AccessControlRoutes;
