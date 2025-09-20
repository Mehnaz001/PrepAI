import { initializeApp , getApp, getApps} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDv-WgKvOTMNdVrvs2oHr2mZqkorZ0bjGY",
  authDomain: "prepai-5bd1b.firebaseapp.com",
  projectId: "prepai-5bd1b",
  storageBucket: "prepai-5bd1b.firebasestorage.app",
  messagingSenderId: "263189199976",
  appId: "1:263189199976:web:712bf24d53ca90783c4fdd",
  measurementId: "G-RJS5E3ZCMD"
};

// Initialize Firebase
const app = !getApps.length? initializeApp(firebaseConfig): getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);