import { app } from "../firebase";
import {
    collection,
    getDocs,
    getFirestore,
    query,
    limit
} from "firebase/firestore";

const db = getFirestore(app);

export const getAlert = async () => {
    const alertsRef = collection(db, "alert");
    const firstAlertQuery = query(alertsRef, limit(1));
    const snap = await getDocs(firstAlertQuery);
    return snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }))[0];
};
