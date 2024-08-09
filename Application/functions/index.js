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
