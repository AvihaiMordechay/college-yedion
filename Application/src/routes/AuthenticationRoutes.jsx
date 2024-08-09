import { lazy } from "react";

// project imports
import Loadable from "Components/Loadable";
import MinimalLayout from "layout/MinimalLayout";
import { AccessControlLogin } from "Authentication/AccessControlLogin";
// login option 3 routing
const AuthLogin = Loadable(lazy(() => import("Authentication/Login")));
const AuthRegister = Loadable(lazy(() => import("Authentication/Register")));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "/login",
      element: <AuthLogin />,
    },
    {
      path: "/ac-login",
      element: <AccessControlLogin />,
    },
    {
      path: "/register",
      element: <AuthRegister />,
    },
  ],
};

export default AuthenticationRoutes;
