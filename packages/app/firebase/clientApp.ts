import { getDocs, getFirestore } from '@firebase/firestore';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  inMemoryPersistence,
  signInWithPopup,
  GoogleAuthProvider,
} from '@firebase/auth';
import { collection, query, where } from '@firebase/firestore';

import { initializeApp, getApps, getApp } from '@firebase/app';

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
  const idToken = await userCredential.user.getIdToken();
  return {
    idToken,
    status: 200,
  };
}

export default {
  getRituals,
  loginAndGetToken,
  loginWithPopup,
  signUpWithEmailAndPassword,
};
