import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApp, getApps } from 'firebase-admin/app';
import { credential } from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import slugify from 'slugify';

if (process.env.NODE_ENV === 'development') {
  process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099';
  process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';
  process.env.FIREBASE_DATABASE_EMULATOR_HOST = '127.0.0.1:9000';
}

const configAdmin = {
  credential: credential.cert({
    projectId: process.env.PROJECT_ID ?? '.',
    privateKey: (process.env.PRIVATE_KEY ?? '.').replace(/\\n/g, '\n'),
    clientEmail: process.env.CLIENT_EMAIL ?? '.',
  }),
  databaseURL: process.env.DATABASE_URL ?? '.',
};

const app = getApps().length === 0 ? initializeApp(configAdmin, 'server') : getApp('server');

const createSessionCookie = (idToken: string) => {
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  return getAuth(app).createSessionCookie(idToken, { expiresIn });
};

const isUserAdmin = async (sessionCookie: string) => {
  const decodedClaims = getAuth(app).verifySessionCookie(sessionCookie, true);
  const user = await decodedClaims;
  const authorizedUsers = await getFirestore(app).collection('admin').get();
  const res: Promise<void>[] = [];
  authorizedUsers.forEach((querySnapshot) => {
    const data = querySnapshot.data();
    if (user.email === data.email) {
      res.push(getAuth(app).setCustomUserClaims(user.uid, { admin: true }));
    }
  });
  await Promise.all(res);
  const isUserAdmin = user.admin ?? false;
  return isUserAdmin;
};

export const setRitual = (data: { name: string; imagePath: string; type: string }) =>
  getFirestore(app).collection('rituals').doc(slugify(data.name).toLowerCase()).create(data);

export default {
  createSessionCookie,
  isUserAdmin,
  setRitual,
};
