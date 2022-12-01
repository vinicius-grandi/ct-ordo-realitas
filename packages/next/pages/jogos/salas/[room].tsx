import { useRouter } from 'next/router';
import lobby from '@ct-ordo-realitas/app/firebase/jogos/lobby';
import { useEffect, useState } from 'react';
import { Room } from '@ct-ordo-realitas/app/firebase/jogos/createRoom';
import useT from '../../../lib/hooks/useT';

export default function RoomPage() {
  const router = useRouter();
  const [roomInfo, setRoomInfo] = useState<
  Partial<Room> & {
    players: {
      [key in string]: string;
    };
  }
  >({
    gameType: '',
    host: '',
    name: '',
    players: {},
  });
  const room = Array.isArray(router.query.room) ? '' : router.query.room;

  const t = useT();

  useEffect(() => {
    const unsubscribe = lobby.getRoom(room, (data) => {
      setRoomInfo(data);
    });

    return () => unsubscribe();
  }, [room]);

  return (
    <main>
      <h1>{t(`jogos.${roomInfo.gameType}`)}</h1>
      <h2>Jogadores</h2>
      <ul>
        {Object.values(roomInfo.players).map((player) => (
          <li key={player}>{player}</li>
        ))}
      </ul>
    </main>
  );
}
