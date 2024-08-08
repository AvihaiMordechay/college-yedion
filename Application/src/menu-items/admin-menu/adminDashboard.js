// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //
const adminDashboard = (user) => {
  return {
    id: 'dashboard',
    title: 'כללי',
    type: 'group',
    children: [
      {
        id: 'default',
        title: 'דף הבית',
        type: 'item',
        url: `/admins/${user.personalId}/default`,
        icon: icons.IconDashboard,
        breadcrumbs: false
      },
      {
        id: 'details',
        title: 'פרטי המוסד',
        type: 'item',
        url: `/admins/${user.personalId}/default`,
        icon: icons.IconDashboard,
        breadcrumbs: false
      }
    ]
  };
};

export default adminDashboard;
