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

const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.firestore();

const auth = firebaseApp.auth()
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
const signInWithGoogle = () => auth.signInWithPopup(provider);


export const createUserProfileDocument = async (userAuth, additionalData) => {
  console.log("useAUTH")
  console.log(userAuth)
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

export { firebaseApp, auth, db, signInWithGoogle };
