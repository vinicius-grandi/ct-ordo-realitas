import { auth } from '../clientApp';

export default function handleUser(fn: (f: string) => void) {
  return auth.onAuthStateChanged((user) => {
    if (user) {
      fn(user.uid);
    }
  });
}
