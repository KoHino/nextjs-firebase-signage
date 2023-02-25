import admin from "../firebase/nodeApp";

export const getContentDataAdmin = async (orderId) => {
    const target = `order/${orderId}`;
    const db = admin.firestore();
    const contents = await db.doc(target).get();

    if (!contents){
        return null
    }
    return contents.data();
}