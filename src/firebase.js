import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBKcWOwUhz1P9r3Zod4dK-GkdODRQ1BCjI",
    authDomain: "crud-task-b30d5.firebaseapp.com",
    databaseURL: "https://crud-task-b30d5.firebaseio.com",
    projectId: "crud-task-b30d5",
    storageBucket: "crud-task-b30d5.appspot.com",
    messagingSenderId: "1001925542519",
    appId: "1:1001925542519:web:845cbce452a1352cbebc72",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export { firebase };
