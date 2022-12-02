import { deleteApp } from 'firebase-admin/app';
import { goOffline, onDisconnect, ref } from 'firebase/database';
import { db, auth } from '../clientApp';

export default function removeFromRoomOnDisconnect(room: string) {
  auth.onAuthStateChanged(async (user) => {
    try {
      if (user) {
        const disconnectRef = onDisconnect(ref(db, `rooms/${room}/players`));
        await disconnectRef.update({
          [user.uid]: null,
        });
      }
    } catch(err) {
      console.log(err)
    }
  });
}
