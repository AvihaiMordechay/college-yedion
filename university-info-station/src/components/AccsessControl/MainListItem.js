import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import { AccessContolSignOutButton } from '../Auth/AccessControlLogout';

const MainListItems = () => {
    return (
        <React.Fragment>
            <ListItemButton>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="דף הבית" />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="צור מנהל אתר" />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="נהל הרשאות" />
            </ListItemButton>
            <AccessContolSignOutButton />
        </React.Fragment>
    );
}

export { MainListItems }