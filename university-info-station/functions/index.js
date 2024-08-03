const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addUserAuth = functions.https.onCall(async (data, context) => {
    const adminUid = functions.config().auth.u1_id;

    if (!context.auth || context.auth.uid !== adminUid) {
        throw new functions.https.HttpsError('permission-denied', 'לא מורשה');
    }

    try {
        const userRecord = await admin.auth().createUser({
            email: data.email,
            password: data.password,
        });
        return { uid: userRecord.uid };
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.code === "auth/email-already-exists") {
            throw new functions.https.HttpsError('already-exists', 'המשתמש כבר קיים', error);
        } else {
            throw new functions.https.HttpsError('unknown', 'שגיאה בהוספה', error);
        }
    }
});
