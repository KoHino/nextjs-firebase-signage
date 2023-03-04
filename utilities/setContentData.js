import { createFirebaseApp } from "../src/firebase/clientApp";
import {
  collection,
  doc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export const setContentOrder = async (docId, content) => {
  const app = createFirebaseApp();
  const db = getFirestore(app);
  const ref = collection(db, "order");
  await setDoc(doc(ref, docId), content);
};

export const updateContentOrder = async (docId, content) => {
  const app = createFirebaseApp();
  const db = getFirestore(app);
  const ref = doc(db, "order", docId);
  await updateDoc(ref, content);
};
