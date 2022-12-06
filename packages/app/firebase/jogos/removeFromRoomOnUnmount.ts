import { onDisconnect, ref, update } from 'firebase/database';
import { db, auth } from '../clientApp';
import disconnectFromRoom from './disconnectFromRoom';

export default function removeFromRoomOnUnmount(room: string) {
  auth.onAuthStateChanged(async (user) => {
    try {
      if (user) {
        await disconnectFromRoom(room, user.uid);
      }
    } catch (err) {
      // console.log(err);
    }
  });
}
