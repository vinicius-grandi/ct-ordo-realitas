import { db } from '../../serverApp';
import createDevilCoffinsGame from '../createDevilCoffinsGame';
import { updateExistencePoints } from './removeExistencePoints';
import { Session } from './Session';

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

        const interval = setInterval(() => {
          sessionRef.update({
            lastDevil: devil,
            selectNewDevil: true,
          });
          setTimeout(async () => {
            const snapshot = await sessionRef.get();
            const session: Session = snapshot.val();
            const result = updateExistencePoints(session);
            result.targets += 1;
            await sessionRef.set(result);
            if (result.eliminatedPlayers && result.eliminatedPlayers.length >= 3) {
              clearInterval(interval);
            }
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
