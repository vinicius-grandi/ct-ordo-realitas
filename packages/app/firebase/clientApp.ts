import { getDocs, getFirestore } from '@firebase/firestore';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  inMemoryPersistence,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
  connectAuthEmulator,
} from '@firebase/auth';
import { collection, query, where, connectFirestoreEmulator } from '@firebase/firestore';
import { getDatabase } from "firebase/database";
import { initializeApp, getApps, getApp } from '@firebase/app';
import { connectDatabaseEmulator } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDE6K_eS2vGcPP6MkJgK2_ZblKb_9EBua4',
  authDomain: 'ct-ordo-realitas.firebaseapp.com',
  databaseURL: 'https://ct-ordo-realitas-default-rtdb.firebaseio.com',
  projectId: 'ct-ordo-realitas',
  storageBucket: 'ct-ordo-realitas.appspot.com',
  messagingSenderId: '62300642308',
  appId: '1:62300642308:web:9ba6399d68e0cc491ba951',
  measurementId: 'G-3L9PCJBCX4',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig, 'client') : getApp('client');

const auth = getAuth(app);
const firestore = getFirestore(app);
export const db = getDatabase(app);

if  (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(firestore, 'localhost', 8080);
  connectDatabaseEmulator(db, 'localhost', 9000)
}

(async () => await auth.setPersistence(inMemoryPersistence))();
const ritualCollection = collection(firestore, 'rituals');
const ritualsQuery = (type: string) => query(ritualCollection, where('type', '==', type));
export const getRituals = (type: string) => getDocs(ritualsQuery(type));

export const loginAndGetToken = async (email: string, password: string) => {
  const response = await signInWithEmailAndPassword(auth, email, password);
  const idToken = await response.user.getIdToken();
  return {
    idToken,
    status: 200,
  };
};

const provider = new GoogleAuthProvider();

const loginWithPopup = async () => {
  const { user } = await signInWithPopup(auth, provider);
  const idToken = await user.getIdToken();
  return {
    idToken,
    status: 200,
  };
};

const signUpWithEmailAndPassword = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  const idToken = await user.getIdToken();

  await sendEmailVerification(user);

  return {
    idToken,
    status: 200,
  };
}

export const resetPassword = (email: string) => {
  return sendPasswordResetEmail(auth, email);
}

export default {
  getRituals,
  loginAndGetToken,
  loginWithPopup,
  signUpWithEmailAndPassword,
  resetPassword,
};
