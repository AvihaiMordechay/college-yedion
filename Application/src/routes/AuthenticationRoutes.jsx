import { lazy } from "react";

// project imports
import Loadable from "components/Loadable";
import MinimalLayout from "layout/MinimalLayout";
import { AccessControlLogin } from "views/pages/authentication3/AccessControlLogin";
// login option 3 routing
const AuthLogin3 = Loadable(
  lazy(() => import("views/pages/authentication3/Login3"))
);
const AuthRegister3 = Loadable(
  lazy(() => import("views/pages/authentication3/Register3"))
);

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "/login",
      element: <AuthLogin3 />,
    },
    {
      path: "/ac-login",
      element: <AccessControlLogin />,
    },
    {
      path: "/register",
      element: <AuthRegister3 />,
    },
  ],
};

export default AuthenticationRoutes;
