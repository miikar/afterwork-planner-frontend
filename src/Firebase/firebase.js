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

var firebaseApp = firebase.initializeApp(config)
var db = firebaseApp.firestore()

// // class Firebase {
// //     constructor() {
// //         app.initializeApp(config);
// //         this.auth = app.auth();
// //         this.db = app.firestore();
// //     }

// //     startFirebaseUI = () => {
// //         const ui = new firebaseui.auth.AuthUI(this.auth)
// //         ui.start('#firebaseui-auth-container', uiConfig)
// //     }


// //     // Firebase auth
// //     doCreateUserWithEmailAndPassword = (email, password) => 
// //         this.auth.createUserWithEmailAndPassword(email.password);

// //     doSignInWithEmailAndPassword = (email, password) =>
// //         this.auth.signInWithEmailAndPassword(email.password);

// //     doSignOut = () => this.auth.signOut();

// //     doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  
// //     doPasswordUpdate = password =>
// //          this.auth.currentUser.updatePassword(password);
// // }

// // export const db = firebase.firestore()
export { firebaseApp, db }