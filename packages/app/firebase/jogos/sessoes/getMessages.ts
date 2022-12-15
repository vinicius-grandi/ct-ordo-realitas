import { onValue, orderByChild, ref, query } from 'firebase/database';
import { db } from '../../clientApp';

export default function getMessages(session: string, fn: (msgs: any) => void) {
  const messagesByTimeStamp = query(ref(db, `/messages/${session}`), orderByChild('timestamp'));
  return onValue(messagesByTimeStamp, (snap) => {
    fn(Object.values(snap.val() ?? {}));
  });
}
