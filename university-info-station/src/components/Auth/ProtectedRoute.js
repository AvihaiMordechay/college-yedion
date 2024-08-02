import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

const ProtectedRoute = ({ allowedUid, newAdminCreated, setNewAdminCreated }) => {
    const [user] = useAuthState(auth);
    const [userId, setUserId] = useState(user ? user.uid : null);

    useEffect(() => {
        const signInAdmin = async () => {
            if (newAdminCreated) {
                try {
                    setNewAdminCreated(false);
                    setUserId(process.env.REACT_APP_FIREABE_U1_ID);
                } catch (error) {
                    console.error("Error signing in:", error);
                }
            }
        };
        signInAdmin();
    }, [newAdminCreated, setNewAdminCreated]);

    // Conditional rendering based on user state and userId
    if (!user) {
        return <Navigate to="/ac-login" />;
    }

    return userId === allowedUid ? <Outlet /> : <Navigate to="/ac-login" />;
};

export { ProtectedRoute };
