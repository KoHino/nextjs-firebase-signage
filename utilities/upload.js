import { createFirebaseApp } from "../firebase/clientApp";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { arrayUnion } from "firebase/firestore";
import { updateContentOrder } from "./setContentData";

export const postContent = async(docId, content, type, callbackfn=undefined) => {
    if(content.name) {
        const app = createFirebaseApp();
        const storage = getStorage(app);
        const storageRef = ref(storage, "0");
        const fullPath = content.name;
        const uploadRef = ref(storageRef, fullPath);

        const uploadTask = uploadBytesResumable(uploadRef, content);

        uploadTask.on('state_changed',
            (snapshot) => {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
              // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    updateContentOrder(docId, {
                        hidden: arrayUnion({
                            fileName: content.name,
                            order: 99,
                            path: downloadURL,
                            type: type,
                            viewTime: 2000
                        })
                    });
                });
            }
        );
    }
}
