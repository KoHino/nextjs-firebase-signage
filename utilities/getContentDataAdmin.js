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

export const getOrderIdAdmin = async (areaId) => {
    const db = admin.firestore();
    let orderId = "";
    const snapshot = await db.collection("contents").where("areaId", "==", areaId).get();
    snapshot.forEach( doc => {
        orderId = doc.data().orderId;
    })
    return orderId;
}