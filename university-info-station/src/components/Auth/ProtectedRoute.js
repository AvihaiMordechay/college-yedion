import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import { doc, getDoc } from "firebase/firestore";

const ProtectedRoute = ({ allowedRoles }) => {
    const [user] = useAuthState(auth);
    const [userRoles, setUserRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserRoles = async () => {
            if (user) {
                try {
                    const userDocRef = doc(db, 'Users', user.uid);
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        // Get roles from the array in the database
                        setUserRoles(userDoc.data().role || []); // Default to empty array if roles are not set
                    }
                } catch (error) {
                    console.error("Error fetching user roles:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchUserRoles();
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    // Check if any of the allowed roles are included in the user's roles
    if (!allowedRoles.some(role => userRoles.includes(role))) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export { ProtectedRoute };
