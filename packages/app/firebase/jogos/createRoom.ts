import { db } from '../serverApp';

export type Room = {
  name: string;
  gameType: string;
  playerName: string;
  host: string;
};

export default async function createRoom({
  name,
  gameType,
  playerName,
  host
}: Room) {
  const snapshot = await db.ref(`rooms/${name}`).limitToFirst(1).once('value');
  if (snapshot.exists()) {
    return {
      message: 'room already exist!',
    };
  }
  await db.ref(`rooms/${name}`).set({
    room: name,
    host,
    gameType,
    players: {
      [host]: playerName,
    },
  });

  return {
    message: 'room has been created!',
  };
}
