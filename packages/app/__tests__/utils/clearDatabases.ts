import { connectDatabaseEmulator, ref, set } from 'firebase/database';
import { db } from '../../firebase/clientApp';

if (process.env.NODE_ENV === 'development') {
  connectDatabaseEmulator(db, '127.0.0.1', 9000);
}

export default async function clearDatabases() {
  return set(ref(db), null);
}
