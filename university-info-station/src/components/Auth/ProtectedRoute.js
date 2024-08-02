import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

const ProtectedRoute = ({ allowedUid }) => {
    const [user] = useAuthState(auth);
    console.log(user);
    if (!user) {
        return <Navigate to="/ac-login" />;
    }

    return user.uid === allowedUid ? <Outlet /> : <Navigate to="/ac-login" />;
};

export { ProtectedRoute };
