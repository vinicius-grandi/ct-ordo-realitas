import { onValue, ref } from 'firebase/database';
import { db } from '../../clientApp';

export default function getSession(fn: (data: any) => void, session: string) {
  const sessionRef = ref(db, `sessions/${session}`);
  return onValue(sessionRef, (snap) => {
    const data = snap.val();
    fn(data);
  }, (err) => {
    console.log(err);
  });
}
