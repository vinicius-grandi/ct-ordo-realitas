import { withTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import lobby from '@ct-ordo-realitas/app/firebase/jogos/lobby';
import Link from 'next/link';
import NewRoomModal from '../../components/jogos/NewRoomOverlay';
import { getStaticProps } from '../../components/withTranslationProps';
import useT from '../../lib/hooks/useT';
import { FullRoom } from './salas/[room]';

export default function JogosPage() {
  const t = useT();
  const [showModal, setShowModal] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [player, setPlayer] = useState('');
  const [rooms, setRooms] = useState<FullRoom[]>([]);
  const handleModal = () => setShowModal(!showModal);
  useEffect(() => {
    const unsubscribe = lobby.getRooms((data) => {
      setRooms(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <main>
      <ul>
        {rooms.map(({ room }) => (
          <li key={room}>
            {room}
            <button type="button" onClick={() => setShowOverlay(true)}>
              {t('jogos.joinRoom')}
            </button>
            {showOverlay && (
              <div>
                <label htmlFor="nickname">
                  jogador
                  <input
                    type="text"
                    id="nickname"
                    value={player}
                    onChange={(e) => setPlayer(e.target.value)}
                  />
                </label>
                <Link
                  href={{
                    pathname: `/jogos/salas/${room}`,
                    query: {
                      jogador: player,
                    },
                  }}
                >
                  {t('jogos.confirm')}
                </Link>
              </div>
            )}
          </li>
        ))}
      </ul>
      <button type="button" onClick={handleModal}>
        {t('jogos.newRoom')}
      </button>
      {showModal && <NewRoomModal />}
    </main>
  );
}

export const Jogos = withTranslation('common')(JogosPage);

export { getStaticProps };
