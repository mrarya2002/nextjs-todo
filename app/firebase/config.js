import { initializeApp, getApps, getApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBW02jc97y69vJsyANoHiV6YQguz70ks-Q",
  authDomain: "next-auth-c6c05.firebaseapp.com",
  projectId: "next-auth-c6c05",
  storageBucket: "next-auth-c6c05.appspot.com",
  messagingSenderId: "618471191085",
  appId: "1:618471191085:web:10e4f5704f8c401d31bea4",
  measurementId: "G-658VWP3YH1"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const auth = getAuth(app)
const db = getFirestore(app)

export {app, auth,db}