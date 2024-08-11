// assets
import { IconFileInfo, IconFileDots } from '@tabler/icons-react';

// constant
const icons = {
    IconFileInfo,
    IconFileDots
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const adminWebsiteActions = (user) => {
    return {
        id: 'website-actions',
        title: 'פעולות באתר',
        type: 'group',
        children: [
            {
                id: 'management-more-information',
                title: 'ניהול מידע נוסף',
                type: 'item',
                url: `/admins/${user.uid}/website-actions/management-more-information`,
                icon: icons.IconFileInfo,
                breadcrumbs: false
            },
            {
                id: 'management-guides',
                title: 'ניהול מדריכים',
                type: 'item',
                url: `/admins/${user.uid}/website-actions/management-guides`,
                icon: icons.IconFileDots,
                breadcrumbs: false
            }
        ]
    };
}

export default adminWebsiteActions;
