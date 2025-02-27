// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import adminMenuItems from 'menu-items/admin-menu';
import { useUser } from 'context/UserContext';


// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const { user } = useUser();
  const menu = adminMenuItems(user);

  const navItems = menu.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
