import { initializeApp } from 'firebase-admin/app';
import { credential } from 'firebase-admin';

const initConfigAdmin = () => initializeApp({
  credential: credential.cert({
      projectId: process.env.PROJECT_ID,
      privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.CLIENT_EMAIL,
  }),
  databaseURL: process.env.DATABASE_URL
});

export default initConfigAdmin;
