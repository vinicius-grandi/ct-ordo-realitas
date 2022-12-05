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
  db.ref(`/rooms/${name}/players`).update({
    [uid]: player,
  });

  await registerRoom(name, uid);
  return {
    message: `${player} has joined the room!`,
  };
}
