import { useRouter } from 'next/router';
import lobby from '@ct-ordo-realitas/app/firebase/jogos/lobby';
import { useEffect, useState } from 'react';
import { Room } from '@ct-ordo-realitas/app/firebase/jogos/createRoom';
import removeFromRoomOnDisconnect from '@ct-ordo-realitas/app/firebase/jogos/removeFromRoom';
import useT from '../../../lib/hooks/useT';
import { getStaticProps } from '../../../components/withTranslationProps';

export type FullRoom = Partial<Room> & {
  room: string;
  players: {
    [key in string]: string;
  };
};

export default function RoomPage() {
  const router = useRouter();
  const [roomInfo, setRoomInfo] = useState<FullRoom>({
    room: '',
    gameType: '',
    host: '',
    name: '',
    players: {},
  });
  const room = router.query.room as string;

  const t = useT();

  useEffect(() => {
    async function setPlayer() {
      const data = new FormData();
      data.append('player', (router.query.jogador as string) ?? '');
      data.append('room', room ?? '');
      await fetch('../../api/rooms/join', {
        method: 'post',
        body: data,
      });
    }
    if (router.query.jogador) {
      void setPlayer();
    }
  }, [room, router.query.jogador]);
  useEffect(() => {
    removeFromRoomOnDisconnect(room);
    const unsubscribe = lobby.getRoom(room, (data) => {
      setRoomInfo(data);
    });

    return () => unsubscribe();
  }, [room]);

  return roomInfo !== null ? (
    <main>
      {(roomInfo.gameType ?? '').length > 0 && <h1>{t(`jogos.${roomInfo.gameType}`)}</h1>}
      <h2>Jogadores</h2>
      <ul>
        {Object.values(roomInfo.players ?? {}).map((player) => (
          <li key={player}>{player}</li>
        ))}
      </ul>
    </main>
  ) : (
    <h1>loading</h1>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: { room: '*' },
      },
    ],
    fallback: true,
  };
}

export { getStaticProps };
