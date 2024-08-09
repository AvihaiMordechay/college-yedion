import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from 'firebase';
import { useUser } from 'context/UserContext';

const AccessControlLogout = () => {
    const navigate = useNavigate();
    const { setUser } = useUser();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setUser({});
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

export { AccessControlLogout };
