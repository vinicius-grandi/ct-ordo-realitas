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
  const data: FullRoom = (await db.ref(`rooms/${name}`).once('value')).val();
  db.ref(`/rooms/${name}`).update({
    players: {
      ...data.players,
      [uid]: player,
    },
  });

  registerRoom(name, uid);
  return {
    message: `${player} has joined the room!`,
  };
}
