import slugify from 'slugify';
import { getDocs, getFirestore, doc, setDoc } from '@firebase/firestore';
import { getAuth, signInWithEmailAndPassword, inMemoryPersistence } from '@firebase/auth';
import { collection, query, where } from '@firebase/firestore';

function getCookie(name: string) {
  const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}

const auth = getAuth();
const firestore = getFirestore();
(async () => await auth.setPersistence(inMemoryPersistence))();
const ritualCollection = collection(firestore, 'rituals');
const ritualsQuery = (type: string) => query(ritualCollection, where('type', '==', type));
export const getRituals = (type: string) => getDocs(ritualsQuery(type));

export const setRitual = (data: {
  name: string;
  imagePath: string;
  type: string;
}) => setDoc(doc(firestore, 'rituals', slugify(data.name)), data);

export const loginAndGetToken = async (email: string, password: string) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await response.user.getIdToken();
    const sdrfToken = getCookie('csrfToken');
    return {
      cookie: idToken,
      token: sdrfToken,
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return {
      cookie: null,
      token: null,
      status: 500,
    };
  }
};

export const logout = () => auth.signOut();

export default {
  getRituals,
  setRitual,
  loginAndGetToken,
};
