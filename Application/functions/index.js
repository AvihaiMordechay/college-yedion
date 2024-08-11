const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();

exports.checkPersonalIdExists = functions.https.onCall(async (data, context) => {
    const adminUid = functions.config().auth.u1_id;
    // Only allow the super admin to execute this function
    if (!context.auth || context.auth.uid !== adminUid) {
        throw new functions.https.HttpsError('permission-denied', 'Unauthorized');
    }

    const { personalId } = data;
    const collections = ["Students", "Admins", "Staff"];

    for (const collectionName of collections) {
        const snapshot = await admin.firestore().collection(collectionName).where("personalId", "==", personalId).get();
        if (!snapshot.empty) {
            return { exists: true };
        }
    }

    return { exists: false };
});

exports.addAdminUserAuth = functions.https.onCall(async (data, context) => {
    const adminUid = functions.config().auth.u1_id;

    // בדיקה שהמשתמש המתחבר הוא האדמין הראשי
    if (!context.auth || context.auth.uid !== adminUid) {
        throw new functions.https.HttpsError('permission-denied', 'לא מורשה');
    }

    try {
        // יצירת משתמש עם UID מותאם אישית
        const userRecord = await admin.auth().createUser({
            uid: data.personalId, // שימוש במספר הזהות כ-UID
            email: data.email,
            password: data.password,
        });
        return { uid: userRecord.uid };
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.code === "auth/email-already-exists") {
            throw new functions.https.HttpsError('already-exists', 'email-already-exists', error);
        } else if (error.code === "auth/uid-already-exists") {
            throw new functions.https.HttpsError('already-exists', 'uid-already-exists', error);
        } else {
            throw new functions.https.HttpsError('unknown', 'שגיאה בהוספה', error);
        }
    }
});
