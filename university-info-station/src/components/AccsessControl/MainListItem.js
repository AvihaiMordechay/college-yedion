import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import { AccessContolSignOutButton } from '../Auth/AccessControlLogout';

const MainListItems = ({ onMenuItemClick }) => {
    return (
        <React.Fragment>
            <ListItemButton onClick={() => onMenuItemClick('dashboard')}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="דף הבית" />
            </ListItemButton>
            <ListItemButton onClick={() => onMenuItemClick('createAdmin')}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="צור מנהל אתר" />
            </ListItemButton>
            <ListItemButton onClick={() => onMenuItemClick('managePermissions')}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="נהל הרשאות" />
            </ListItemButton>
            <AccessContolSignOutButton />
        </React.Fragment>
    );
}

export { MainListItems };
