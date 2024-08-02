import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase'; // הנח שביצעת את הקישור ל-firebase

const AccessContolSignOutButton = () => {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/ac-login');
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    return (
        <ListItemButton onClick={handleSignOut}>
            <ListItemIcon>
                <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="התנתק" />
        </ListItemButton>
    );
}

export { AccessContolSignOutButton };
