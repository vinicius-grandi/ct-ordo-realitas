import { onDisconnect, ref } from 'firebase/database';
import { db } from '../clientApp';

export default async function disconnectFromRoom(room: string, uid: string) {
  const disconnectRef = onDisconnect(ref(db, `rooms/${room}/players`));
  const playerRoomsRef = onDisconnect(ref(db, `${uid}/rooms/${room}`));
  await playerRoomsRef.remove();
  await disconnectRef.update({
    [uid]: null,
  });
}
