// AdminPage.js
import React from 'react';
import { Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminPage = () => {
    const { personalId } = useParams();
    const { userData } = useAuth();

    if (!userData) {
        return <Typography variant="h6">Loading user data...</Typography>;
    }

    // Check if the user data's personalId matches the URL parameter
    if (userData.personalId !== personalId) {
        return <Typography variant="h6">You are not authorized to view this page.</Typography>;
    }

    return (
        <Box>
            <Typography variant="h1">Hello, {userData.name}</Typography>
            {/* הצגת פרטים נוספים של המשתמש */}
            <Typography variant="body1">Email: {userData.email}</Typography>
            {/* הוסף כאן פרטים נוספים שברצונך להציג */}
        </Box>
    );
};

export { AdminPage };
