import { getAuth } from 'firebase-admin/auth';

const createSessionCookie = (idToken: string) => {
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  return getAuth().createSessionCookie(idToken, { expiresIn });
};

export default {
  createSessionCookie,
};
