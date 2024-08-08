import { createBrowserRouter } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import AccessControlRoutes from './AccessControlRoutes';
// ==============================|| ROUTING RENDER ||============================== //
const router = createBrowserRouter([MainRoutes, AuthenticationRoutes, AccessControlRoutes], {
  basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;
