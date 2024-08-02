import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const ProtectedRoute = ({ allowedUid, newAdminCreated, setNewAdminCreated }) => {
    const [user] = useAuthState(auth);
    const [userId, setUserId] = useState(user.uid);
    useEffect(() => {
        const signInAdmin = async () => {
            if (newAdminCreated) {
                try {
                    await signInWithEmailAndPassword(auth, process.env.REACT_APP_FIREABE_U1_EMAIL, process.env.REACT_APP_FIREABE_U1_PASS);
                    setNewAdminCreated(false);
                    setUserId(process.env.REACT_APP_FIREABE_U1_ID);
                } catch (error) {
                    console.error("Error signing in:", error);
                }
            }
        };
        signInAdmin();
    }, [newAdminCreated, setNewAdminCreated]);

    if (!user) {
        return <Navigate to="/ac-login" />;
    }
    console.log(user.uid);
    return userId === allowedUid ? <Outlet /> : <Navigate to="/ac-login" />;
};

export { ProtectedRoute };
