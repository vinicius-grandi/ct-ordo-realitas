import { useEffect, useState } from 'react';
import handleUser from '@ct-ordo-realitas/app/firebase/jogos/handleUser';
import removeFromRoomOnUnmount from '@ct-ordo-realitas/app/firebase/jogos/salas/removeFromRoomOnUnmount';
import { useRouter } from 'next/router';
import useT from '../../../lib/hooks/useT';
import { getStaticProps } from '../../../components/withTranslationProps';
import useRoomInfo from '../../../lib/hooks/useRoomInfo';
import useJogador from '../../../lib/hooks/useJogador';
import maxPlayers from '../../../public/data/jogos/maxPlayers.json';
import useRoomName from '../../../lib/hooks/useRoomName';

export default function RoomPage() {
  const t = useT();
  const [errMsg, setErrMsg] = useState('');
  const [roomInfo] = useRoomInfo();
  const [, setJogador] = useJogador(setErrMsg);
  const room = useRoomName();
  const router = useRouter();
  useEffect(() => {
    const exitingFunction = () => removeFromRoomOnUnmount(room);

    router.events.on('routeChangeStart', exitingFunction);

    return () => {
      router.events.off('routeChangeStart', exitingFunction);
    };
  }, [room, router.events]);

  useEffect(() => {
    if (
      roomInfo !== null &&
      Object.values(roomInfo.players ?? {}).length >= maxPlayers[roomInfo.gameType]
    ) {
      const unsubscribe = handleUser(async (uid) => {
        if (uid === roomInfo.host) {
          const data = new FormData();
          data.append('name', room);
          const response = await fetch('../../api/sessions/create', {
            method: 'post',
            body: data,
          });
          console.log(response);
        }
      });
      return () => unsubscribe();
    }
    return () => {};
  }, [room, roomInfo]);

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
