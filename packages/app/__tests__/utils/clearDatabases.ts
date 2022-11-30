import { db } from '../../firebase/serverApp';

export default async function clearDatabases() {
  return db.ref().set(null);
}

export const clearDb = clearDatabases;
