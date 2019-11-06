import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyB9BcDEFJWfjzSfH3Iyh1kXCPPsdt0ioFk",
  authDomain: "afterwork-planner.firebaseapp.com",
  databaseURL: "https://afterwork-planner.firebaseio.com",
  projectId: "afterwork-planner",
  storageBucket: "afterwork-planner.appspot.com",
  messagingSenderId: "233506087384"
};

var firebaseApp = firebase.initializeApp(config);
var db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

const signInWithGoogle = () => auth.signInWithPopup(provider);

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
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = db.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export { firebaseApp, db, signInWithGoogle, auth };
