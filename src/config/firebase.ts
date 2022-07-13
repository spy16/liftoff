import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut as signOutFirebase,
  setPersistence,
  signInWithPopup,
  GoogleAuthProvider,
  browserSessionPersistence,
} from "firebase/auth";

const google = new GoogleAuthProvider();

export const app = initializeApp({
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
});

export const auth = getAuth(app);

export const signIn = async () => {
  await setPersistence(auth, browserSessionPersistence)
    .then(() => {
      return signInWithPopup(auth, google);
    })
    .catch((error) => {
      console.warn(error);
    });
};

export const signOut = async () => {
  await signOutFirebase(auth);
};
