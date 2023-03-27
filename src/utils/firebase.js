import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
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

const facebookProvider = new FacebookAuthProvider();

export const signInWithFacebookPop = async () => {
  try {
    await signInWithPopup(auth, facebookProvider);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    console.log(errorCode, errorMessage, email);
  }
};
export const signInWithFacebookRedirect = () => {
  signInWithRedirect(auth, facebookProvider);
};
