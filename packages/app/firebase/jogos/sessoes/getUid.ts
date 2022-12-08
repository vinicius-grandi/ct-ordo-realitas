import { auth } from '../../clientApp';

export default function getUid(fn: (uid: string) => void) {
  return auth.onAuthStateChanged((user) => {
    if (user) {
      fn(user.uid);
    }
  });
}
