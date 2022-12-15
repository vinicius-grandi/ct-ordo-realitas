import { ServerValue } from 'firebase-admin/database';
import getRandomInt from '../../lib/getRandomInt';
import { db } from '../serverApp';

export default async function createDevilCoffinsGame(room: any, name: string, players: unknown[]) {
  const newPlayers: {
    [key in string]: {
      name: string;
      existencePoints: number;
    };
  } = {};
  const playersUid = Object.keys(room.players);

  playersUid.forEach((uid) => {
    newPlayers[uid] = {
      name: room.players[uid],
      existencePoints: 6,
    };
  });
  const initialCoffins: string[] = [];

  playersUid.forEach((uid) => {
    initialCoffins.push(uid);
  });

  const sessionRef = db.ref(`sessions/${name}`);
  const devil = playersUid[getRandomInt(0, 4)];
  await sessionRef.set({
    players: newPlayers,
    devil,
    targets: 6,
    coffins: [...initialCoffins, ...Array(7).fill(0)],
    selectedCoffins: [0, 1, 2, 3, 4],
  });

  await db.ref(`countdowns/${name}`).set({
    startAt: ServerValue.TIMESTAMP,
    seconds: 180,
    phase: 'discussionTime',
  });
  return { sessionRef, devil };
}
