import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  Auth,
  getAuth,
  // @ts-ignore: getReactNativePersistence is exported by React Native build target of firebase/auth
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyB0kcVRaDmt-rKIam5nmoj1AxPzEpd9NFU",
  authDomain: "michimochiapp.firebaseapp.com",
  projectId: "michimochiapp",
  storageBucket: "michimochiapp.firebasestorage.app",
  messagingSenderId: "1044600548905",
  appId: "1:1044600548905:web:5ed7ed104b1163fd70b638",
  measurementId: "G-NL7KVJRZT6"
};


// Initialize Firebase for React Native / Expo
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let auth: Auth;

if (Platform.OS === 'web') {
  auth = getAuth(app);
} else {
  try {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch {
    auth = getAuth(app);
  }
}

const db = getFirestore(app);

export { app, auth, db, firebaseConfig };
