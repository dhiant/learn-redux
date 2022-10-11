import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDV-74UxK49LUlnPLqkYndigBIAl8zsekI",
  authDomain: "wondermall-db.firebaseapp.com",
  projectId: "wondermall-db",
  storageBucket: "wondermall-db.appspot.com",
  messagingSenderId: "879860750318",
  appId: "1:879860750318:web:8d33ccbccb13435c0aa0ff",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(firebaseApp);
export const signInWithGogglePop = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);
