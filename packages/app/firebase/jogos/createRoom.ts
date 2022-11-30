import { db } from '../serverApp';

export default async function createRoom(room: string, gameType: string, host: string) {
  const snapshot = await db.ref(`rooms/${room}`).limitToFirst(1).once('value');
  if (snapshot.exists()) {
    return {
      message: 'room already exist!',
    };
  }
  await db.ref(`rooms/${room}`).set({
    room,
    host,
    gameType,
    players: [],
  });

  return {
    message: 'room has been created!',
  };
}
