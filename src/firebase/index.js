import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBUfvTcPW5Mam8RVcyJ5zwGS_TWZ80UfxQ",
    authDomain: "simpleappchat-4e07e.firebaseapp.com",
    databaseURL: "https://simpleappchat-4e07e-default-rtdb.firebaseio.com",
    projectId: "simpleappchat-4e07e",
    storageBucket: "simpleappchat-4e07e.appspot.com",
    messagingSenderId: "1053898659424",
    appId: "1:1053898659424:web:34ffce73a3c41a91601505",
    measurementId: "G-HFDGMGPKXL"
  };

  if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
  }

  export {firebase};