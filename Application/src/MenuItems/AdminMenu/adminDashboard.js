// assets
import { IconLayoutDashboard, IconFileDescription, IconSend } from '@tabler/icons-react';

// constant
const icons = { IconLayoutDashboard, IconFileDescription, IconSend };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //
const adminDashboard = (user) => {
  return {
    id: 'general',
    title: 'כללי',
    type: 'group',
    children: [
      {
        id: 'default',
        title: 'דף הבית',
        type: 'item',
        url: `/admins/${user.uid}/default`,
        icon: icons.IconLayoutDashboard,
        breadcrumbs: false
      },
      {
        id: 'messaging-system',
        title: 'מערכת פניות',
        type: 'item',
        url: `/admins/${user.uid}/messaging-system`,
        icon: icons.IconSend,
        breadcrumbs: false
      },
      {
        id: 'details',
        title: 'פרטי המוסד',
        type: 'item',
        url: `/admins/${user.uid}/details`,
        icon: icons.IconFileDescription,
        breadcrumbs: false
      }
    ]
  };
};

export default adminDashboard;
