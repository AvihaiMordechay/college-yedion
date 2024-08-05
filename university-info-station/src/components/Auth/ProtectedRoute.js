import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import { doc, getDoc } from "firebase/firestore";

const ProtectedRoute = ({ allowedRoles, userSpecificPage = false }) => {
    const [user] = useAuthState(auth);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserRole = async () => {
            if (user) {
                const userDocRef = doc(db, 'Users', user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setUserRole(userDoc.data().role);
                }
                setLoading(false);
            } else {
                setLoading(false);
            }
        };

        fetchUserRole();
    }, [user]);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/login" />;
    }

    // // הפניה לדף משתמש ספציפי אם נדרש
    // if (userSpecificPage) {
    //     return <Navigate to={`/${userRole}`} />;
    // }

    return <Outlet />;
};

export { ProtectedRoute };
