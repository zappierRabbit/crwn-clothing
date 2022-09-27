import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJ_d2qzih-fZRBsFc4-8KY8DxDEg19HDE",
  authDomain: "crwn-clothing-db-9c90b.firebaseapp.com",
  projectId: "crwn-clothing-db-9c90b",
  storageBucket: "crwn-clothing-db-9c90b.appspot.com",
  messagingSenderId: "84423412696",
  appId: "1:84423412696:web:2e6cd4f4f8883899bb80ad",
};

// Initialize Firebase

initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  
  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef; 
}
