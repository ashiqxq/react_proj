import firebase from "firebase/app"

import "firebase/auth"

export const auth = firebase.initializeApp({
        apiKey: "AIzaSyD-BRqQFM7bVjzXntuiprhLdpEkL_db7QA",
        authDomain: "react-chat-rahman.firebaseapp.com",
        projectId: "react-chat-rahman",
        storageBucket: "react-chat-rahman.appspot.com",
        messagingSenderId: "756855941347",
        appId: "1:756855941347:web:217116e0f5268bc562bdd6"
}).auth();