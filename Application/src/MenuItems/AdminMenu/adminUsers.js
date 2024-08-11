// assets
import { IconUsers } from '@tabler/icons-react';

// constant
const icons = {
    IconUsers
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const adminUsers = (user) => {
    return {
        id: 'users',
        title: 'משתמשים',
        type: 'group',
        children: [
            {
                id: 'staff',
                title: 'אנשי סגל',
                type: 'collapse',
                icon: icons.IconUsers,

                children: [
                    {
                        id: 'management-staff',
                        title: 'ניהול אנשי צוות',
                        type: 'item',
                        url: `/admins/${user.uid}/users/staff/management-staff`,
                        breadcrumbs: false
                    },
                    {
                        id: 'adding-staff',
                        title: 'הוספת איש צוות',
                        type: 'item',
                        url: `/admins/${user.uid}/users/staff/adding-staff`,
                        breadcrumbs: false
                    }
                ]
            }
        ]
    };
}

export default adminUsers;
