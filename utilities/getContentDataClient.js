import { createFirebaseApp } from "../firebase/clientApp";
import { getFirestore, collection, getDocs, getDoc, doc } from "firebase/firestore"

export const getContentsDataClient = async (target) => {
    const app = createFirebaseApp();
    const db = getFirestore(app);
    const contentDocs = await getDocs(collection(db, target));
    if (!contentDocs) {
        return null
    }
    return contentDocs.docs.map(doc => doc.data());
}

export const getContentDataClient = async (target) => {
    const app = createFirebaseApp();
    const db = getFirestore(app);
    const contentDoc = await getDoc(doc(db, target));
    if (!contentDoc) {
        return null
    }
    return contentDoc.data();
}