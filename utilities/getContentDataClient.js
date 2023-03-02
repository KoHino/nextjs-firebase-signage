import { createFirebaseApp } from "../src/firebase/clientApp";
import { getFirestore, collection, getDocs, getDoc, doc, query, where } from "firebase/firestore"

export const getContentsDataClient = async (target) => {
    const app = createFirebaseApp();
    const db = getFirestore(app);
    const contentDocs = await getDocs(collection(db, target));
    if (!contentDocs) {
        return null
    }
    return contentDocs.docs.map(doc => doc.data());
}

export const getContentDataClient = async (orderId) => {
    const target = `order/${orderId}`;
    const app = createFirebaseApp();
    const db = getFirestore(app);
    const contentDoc = await getDoc(doc(db, target));
    if (!contentDoc) {
        return null
    }
    return contentDoc.data();
}

export const getOrderIdClient = async (areaId) => {
    const app = createFirebaseApp();
    const db = getFirestore(app);
    const q = query(collection(db, "contents"), where("areaId", "==", areaId));
    let orderId = "";
    const snapshot = await getDocs(q);
    snapshot.forEach(doc => {
        orderId = doc.data().orderId;
    })
    return orderId;
}