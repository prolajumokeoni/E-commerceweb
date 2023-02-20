import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut, 
  onAuthStateChanged
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4cgnFRvTiwV09HQFlLvwvAwIXREJhypk",
  authDomain: "crown-clothing-db-21649.firebaseapp.com",
  projectId: "crown-clothing-db-21649",
  storageBucket: "crown-clothing-db-21649.appspot.com",
  messagingSenderId: "789337641671",
  appId: "1:789337641671:web:ce42e2eef4956e4c06a4e2",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleprovider = new GoogleAuthProvider();

googleprovider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleprovider);

export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleprovider);

export const db = getFirestore();


export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
  ) => {
  if(!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);

  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if(!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email, 
        createdAt,
        ...additionalInformation,
      });
    }
    catch (error) {
        console.log('error creating user', error.message);
    }
  }
  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

 return await createUserWithEmailAndPassword(auth, email, password);

}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

 return await signInWithEmailAndPassword(auth, email, password);

}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);