import firebase from 'firebase';
require("@firebase/firestore");


const firebaseConfig = {
    apiKey: "AIzaSyCYMhjCvCFH9aItT_n1rQ116msEfPBGkus",
    authDomain: "wireleib-3a265.firebaseapp.com",
    projectId: "wireleib-3a265",
    storageBucket: "wireleib-3a265.appspot.com",
    messagingSenderId: "269615649325",
    appId: "1:269615649325:web:8ae29af9996fccf7bb5ea4"
};

if (!firebase.apps.length)
    firebase.initializeApp(firebaseConfig);
export default firebase.firestore();