// assets
import { IconSchool, IconMicroscope, IconHammer } from '@tabler/icons-react';

// constant
const icons = {
    IconSchool,
    IconMicroscope,
    IconHammer
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const adminClasses = (user) => {
    return {
        id: 'classes',
        title: 'מחלקות',
        type: 'group',
        children: [
            {
                id: 'sections',
                title: 'מדורים',
                type: 'collapse',
                icon: icons.IconHammer,

                children: [
                    {
                        id: 'management-sections',
                        title: 'ניהול מדורים',
                        type: 'item',
                        url: `/admins/${user.personalId}/classes/sections/management-sections`,
                        breadcrumbs: false
                    },
                    {
                        id: 'adding-section',
                        title: 'הוספת מדור',
                        type: 'item',
                        url: `/admins/${user.personalId}/classes/sections/adding-section`,
                        breadcrumbs: false
                    }
                ]
            },
            {
                id: 'faculties',
                title: 'פקולטות',
                type: 'collapse',
                icon: icons.IconSchool,

                children: [
                    {
                        id: 'management-faculties',
                        title: 'ניהול פקולטות',
                        type: 'item',
                        url: `/admins/${user.personalId}/classes/faculties/management-faculties`,
                        breadcrumbs: false
                    },
                    {
                        id: 'adding-faculty',
                        title: 'הוספת פקולטה',
                        type: 'item',
                        url: `/admins/${user.personalId}/classes/faculties/adding-faculty`,
                        breadcrumbs: false
                    }
                ]
            },
            {
                id: 'departments',
                title: 'חוגים',
                type: 'collapse',
                icon: icons.IconMicroscope,

                children: [
                    {
                        id: 'management-departments',
                        title: 'ניהול חוגים',
                        type: 'item',
                        url: `/admins/${user.personalId}/classes/departments/management-departments`,
                        breadcrumbs: false
                    },
                    {
                        id: 'adding-department',
                        title: 'הוספת חוג',
                        type: 'item',
                        url: `/admins/${user.personalId}/classes/departments/adding-department`,
                        breadcrumbs: false
                    }
                ]
            }
        ]
    };
}

export default adminClasses;
