import { db } from '../../serverApp';

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
        const newPlayers: {
          [key in string]: {
            name: string;
            existencePoints: number;
          };
        } = {};
        Object.keys(room.players).forEach((k) => {
          newPlayers[k] = {
            name: room.players[k],
            existencePoints: 6,
          };
        });
        await db.ref(`sessions/${name}`).set({
          players: newPlayers,
          devil: players[getRandomInt(0, 4)],
          targets: 6,
          coffins: Array(12).fill(0),
        });
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
