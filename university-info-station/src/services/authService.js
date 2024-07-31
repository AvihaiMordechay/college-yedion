import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export const getUserRole = async (userId, userType) => {
    const collectionMap = {
        student: 'students',
        staff: 'staff',
        siteManager: 'siteManagers',
    };

    const collection = collectionMap[userType];
    if (!collection) {
        throw new Error('Invalid user type');
    }

    const userDoc = await getDoc(doc(db, collection, userId));
    return userDoc.exists() ? userDoc.data().role : null;
};

export const getRolePermissions = async (role) => {
    const roleDoc = await getDoc(doc(db, 'roles', role));
    return roleDoc.exists() ? roleDoc.data().permissions : [];
};
