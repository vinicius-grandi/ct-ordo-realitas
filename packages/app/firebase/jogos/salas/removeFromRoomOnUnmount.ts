import { ref, remove, update } from 'firebase/database';
import { db, auth } from '../../clientApp';

export default function removeFromRoomOnUnmount(room: string) {
  auth.onAuthStateChanged(async (user) => {
    try {
      if (user) {
        await update(ref(db, `/rooms/${room}/players`), {
          [user.uid]: null,
        });
        await remove(ref(db, `/${user.uid}}/rooms/${room}`));
      }
    } catch (err) {
      // console.log(err);
    }
  });
}
