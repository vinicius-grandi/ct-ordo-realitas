import { useRouter } from 'next/router';
import lobby from '@ct-ordo-realitas/app/firebase/jogos/lobby';
import { useEffect, useState } from 'react';
import { Room } from '@ct-ordo-realitas/app/firebase/jogos/createRoom';
import removeFromRoomOnUnmount from '@ct-ordo-realitas/app/firebase/jogos/removeFromRoomOnUnmount';
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
  const [errMsg, setErrMsg] = useState('');
  const [jogador, setJogador] = useState(router.query.jogador);
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
      data.append('player', (jogador as string) ?? '');
      data.append('room', room ?? '');
      const response = await fetch('../../api/rooms/join', {
        method: 'post',
        body: data,
      });

      if (response.status !== 200) {
        const { message } = await response.json();
        return setErrMsg(message);
      }
      return setErrMsg('');
    }
    if (jogador) {
      void setPlayer();
    }
  }, [room, jogador]);
  useEffect(() => {
    const unsubscribe = lobby.getRoom(room, (data) => {
      setRoomInfo(data);
    });

    return () => {
      removeFromRoomOnUnmount(room);
      unsubscribe();
    };
  }, [room]);

  return roomInfo !== null ? (
    <main>
      {errMsg.length > 0 && (
        <>
          <p>{t(`jogos.${errMsg}`)}</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (e.target instanceof HTMLFormElement && e.target[0] instanceof HTMLInputElement) {
                setJogador(e.target[0].value);
              }
            }}
          >
            <label htmlFor="player">
              {t('jogos.chooseNewName')}
              <input type="text" id="player" />
              <button type="submit">{t('confirm')}</button>
            </label>
          </form>
        </>
      )}
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
