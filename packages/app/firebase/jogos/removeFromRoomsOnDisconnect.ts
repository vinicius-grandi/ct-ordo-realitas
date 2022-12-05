import { get, onDisconnect, ref } from 'firebase/database';
import { db, auth } from '../clientApp';
import disconnectFromRoom from './disconnectFromRoom';

export default function removeFromRoomOnDisconnect() {
  auth.onAuthStateChanged(async (user) => {
    try {
      if (user) {
        const snapshot = await get(ref(db, `${user.uid}/rooms`));
        const rooms = Object.keys(snapshot.val());
        const promiseRooms = rooms.map(async (r) => {
          await disconnectFromRoom(r, user.uid);
        });
        await Promise.all(promiseRooms);
      }
    } catch (err) {
      console.log(err);
    }
  });
}
