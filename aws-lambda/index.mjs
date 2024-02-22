import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection, serverTimestamp } from 'firebase/firestore';

export const handler = async (event) => {

const firebaseConfig = {
   apiKey: "AIzaSyDS3PSpgDYJyEdpj7hawnmWuZSUVdf59Rs",
   authDomain: "edukoshka.firebaseapp.com",
   databaseURL: "https://edukoshka-default-rtdb.europe-west1.firebasedatabase.app",
   projectId: "edukoshka",
   storageBucket: "edukoshka.appspot.com",
   messagingSenderId: "414666822895",
   appId: "1:414666822895:web:58499a7e3c6ff9f489f71a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

await addDoc(collection(db, "Chat"), {
    createdAt: serverTimestamp(),
    user: "GDG ChatBot",
    message: "Slide is changed. Look at the screen",
});

const response = {
statusCode: 200,
body: 'Sent to firebase',
};
return response;
};
