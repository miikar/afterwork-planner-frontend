import * as firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyB9BcDEFJWfjzSfH3Iyh1kXCPPsdt0ioFk",
    authDomain: "afterwork-planner.firebaseapp.com",
    databaseURL: "https://afterwork-planner.firebaseio.com",
    projectId: "afterwork-planner",
    storageBucket: "afterwork-planner.appspot.com",
    messagingSenderId: "233506087384",
};

export const firebaseApp = firebase.initializeApp(config)
export const db = firebaseApp.firestore()
export const auth = firebaseApp.auth()