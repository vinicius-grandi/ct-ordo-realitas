import { ServerValue } from 'firebase-admin/database';
import getRandomInt from '../../../lib/getRandomInt';
import { db } from '../../serverApp';
import createDevilCoffinsGame from '../createDevilCoffinsGame';

function removeExistencePoints(session: any) {
  const selectedCoffins: number[] = session.selectedCoffins ?? [];
  const remainingTargets = session.targets - selectedCoffins.length;
  if (remainingTargets > 0) {
    for (let i = remainingTargets; i > 0; i -= 1) {
      selectedCoffins.push(getRandomInt(0, 11));
    }
  }
  console.log(selectedCoffins);
  selectedCoffins.forEach((idx) => {
    const key = session.coffins[idx];
    if (typeof key === 'string') {
      session.players[key].existencePoints -= 1;
    }
  });
}

export default async function createGame(name: string, uid: string) {
  const roomRef = db.ref(`/rooms/${name}`);
  const snapshot = await roomRef.get();
  const room = await snapshot.val();
  if (room !== null && uid === room.host) {
    const players = Object.values(room.players);
    const message = 'your room has a lack of players';
    switch (room.gameType) {
      case 'devilCoffins':
        if (players.length < 5) {
          return {
            message,
          };
        }
        const { sessionRef, devil } = await createDevilCoffinsGame(room, name, players);

        setTimeout(() => {
          sessionRef.update({
            lastDevil: devil,
            selectNewDevil: true,
          });
          setTimeout(async () => {
            const snapshot = await sessionRef.get();
            const session = snapshot.val();
            removeExistencePoints(session);
            await sessionRef.set(session);
          }, 10000);
        }, 10000);

        await roomRef.set({
          redirect: true,
        });
      case 'deathRooms':
        break;
      case 'masqueradeBall':
        break;
      default:
        return {
          message: 'your room is not supported',
        };
    }
  }
  return {
    message: 'unauthorized',
  };
}
