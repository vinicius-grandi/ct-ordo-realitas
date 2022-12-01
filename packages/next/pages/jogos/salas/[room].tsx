import { useRouter } from 'next/router';
import lobby from '@ct-ordo-realitas/app/firebase/jogos/lobby';
import { useEffect, useState } from 'react';
import { Room } from '@ct-ordo-realitas/app/firebase/jogos/createRoom';
import useT from '../../../lib/hooks/useT';
import { getStaticProps } from '../../../components/withTranslationProps';

export type FullRoom = Partial<Room> & {
  room: string;
  players: {
    [key in string]: string;
  };
};

export default function RoomPage(props) {
  const router = useRouter();
  const [roomInfo, setRoomInfo] = useState<FullRoom>({
    room: '',
    gameType: '',
    host: '',
    name: '',
    players: {},
  });
  const room = Array.isArray(router.query.room) ? '' : router.query.room;

  const t = useT();

  useEffect(() => {
    async function setPlayer() {
      const data = new FormData();
      data.append('player', router.query.jogador ?? '');
      data.append('room', room ?? '');
      await fetch('../../api/rooms/join', {
        method: 'post',
        body: data,
      });
    }
    void setPlayer();
  }, []);

  useEffect(() => {
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
