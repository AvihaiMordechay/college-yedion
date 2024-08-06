// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUserData = async (uid, roles) => {
        let collectionName = null;
        for (const role of roles) {
            if (role === 'admin' || role === 'ac-admin') {
                collectionName = 'Admins';
                break;
            } else if (role === 'student') {
                collectionName = 'Students';
                break;
            } else if (role === 'staff') {
                collectionName = 'Staff';
                break;
            }
        }

        if (collectionName) {
            try {
                const docRef = doc(db, collectionName, uid);
                const docSnap = await getDoc(docRef);
                return docSnap.exists() ? docSnap.data() : null;
            } catch (error) {
                console.error(`Error fetching user data:`, error);
                return null;
            }
        }
        return null;
    };


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    setCurrentUser(user);
                    // Fetch user roles from Users collection
                    const userDocRef = doc(db, 'Users', user.uid);
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        const roles = userDoc.data().role || [];
                        const data = await fetchUserData(user.uid, roles);
                        setUserData(data);
                    }
                } catch (error) {
                    console.error(`Error fetching user data:`, error);
                    return null;
                }
            } else {
                setCurrentUser(null);
                setUserData(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh'
                }}
            >
                <CircularProgress />
                <Typography variant="h6" sx={{ mt: 2 }}>
                    טוען...
                </Typography>
            </Box>
        );
    }

    return (
        <AuthContext.Provider value={{ currentUser, userData }}>
            {children}
        </AuthContext.Provider>
    );
};
