import { initializeApp } from '@firebase/app';
import { getDocs, getFirestore, updateDoc, addDoc } from '@firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { collection, query, where } from '@firebase/firestore';

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

const ritualCollection = collection(firestore, 'rituals');
const ritualsQuery = (type: string) => query(ritualCollection, where('type', '==', type));
export const getRituals = (type: string) => getDocs(ritualsQuery(type));

export const setRitual = (data: {
  name: string;
  imagePath: string;
  type: string;
}) => addDoc(ritualCollection, data);

export const loginWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return {
      user: response.user,
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return {
      user: null,
      status: 500,
    };
  }
};

export default {
  getRituals,
  loginWithEmailAndPassword,
};
