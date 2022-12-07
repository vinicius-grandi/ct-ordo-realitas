import { db } from '../../serverApp';
import registerRoom from './registerRoom';

export type Room = {
  name: string;
  gameType: string;
  playerName: string;
  host: string;
};

export type FullRoom = Room & {
  players: {
    [key in string]: string;
  };
};

export default async function createRoom({ name, gameType, playerName, host }: Room) {
  const snapshot = await db.ref(`rooms/${name}`).limitToFirst(1).once('value');
  if (snapshot.exists()) {
    return {
      message: 'roomAlreadyExists',
    };
  }
  await db.ref(`rooms/${name}`).set({
    room: name,
    host,
    gameType,
  });

  await db.ref(`rooms/${name}/players`).set({
    [host]: playerName,
  });

  console.log(await (await db.ref(`rooms/${name}/players`).get()).val())

  await registerRoom(name, host);
  return {
    message: 'room has been created!',
  };
}
