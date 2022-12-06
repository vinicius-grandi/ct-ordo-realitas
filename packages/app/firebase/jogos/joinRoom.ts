import { db } from '../../firebase/serverApp';
import { FullRoom } from './createRoom';
import registerRoom from './registerRoom';

export default async function joinRoom({
  name,
  player,
  uid,
}: {
  name: string;
  player: string;
  uid: string;
}) {
  const snapshot = await db.ref(`/rooms/${name}/players`).get();
  const players: string[] = Object.values(snapshot.val());
  if (players.find((p) => p === player)) {
    return {
      message: 'playerAlreadyExists',
      status: 409,
    };
  }
  db.ref(`/rooms/${name}/players`).update({
    [uid]: player,
  });

  await registerRoom(name, uid);
  return {
    message: `${player} has joined the room!`,
    status: 200,
  };
}
