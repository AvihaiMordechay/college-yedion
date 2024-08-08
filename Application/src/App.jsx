import { useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import router from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

// context imports
import { UserProvider } from 'context/UserContext';
// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
    <ThemeProvider theme={themes(customization)}>
      <CssBaseline />
      <UserProvider>
        <NavigationScroll>
          <RouterProvider router={router} />
        </NavigationScroll>
      </UserProvider>
    </ThemeProvider>
  </StyledEngineProvider>
  );
};

export default App;
