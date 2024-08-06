const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

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

exports.syncAdminUpdates = functions.firestore
    .document('Admins/{adminId}')
    .onUpdate(async (change, context) => {
        const adminId = context.params.adminId;
        const beforeData = change.before.data();
        const newData = change.after.data();
        const userRef = db.collection('Users').doc(adminId);

        // Check if the email has changed
        if (beforeData.email !== newData.email) {
            try {
                await userRef.update({
                    email: newData.email,
                });
                console.log(`User ${adminId} email updated successfully`);
            } catch (error) {
                console.error(`Error updating user ${adminId} email: `, error);
            }
        } else {
            console.log(`User ${adminId} email has not changed. No update required.`);
        }
    });

exports.syncAdminDeletions = functions.firestore
    .document('Admins/{adminId}')
    .onDelete(async (snap, context) => {
        const adminId = context.params.adminId;
        const userRef = db.collection('Users').doc(adminId);

        try {
            await userRef.delete();
            console.log(`User ${adminId} deleted successfully`);
        } catch (error) {
            console.error(`Error deleting user ${adminId}: `, error);
        }
    });

