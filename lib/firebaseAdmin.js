import admin from "firebase-admin";
import serviceAccount from "../krby-databaze.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
export { db };