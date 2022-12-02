import styles from '@styles/main.module.sass';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import useT from '../../lib/hooks/useT';
import { FullRoom } from '../../pages/jogos/salas/[room]';

const Overlay = ({ room }: { room: string }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [player, setPlayer] = useState('');
  const t = useT();

  return (
    <>
      <button type="button" onClick={() => setShowOverlay(true)}>
        {t('jogos.joinRoom')}
      </button>
      {showOverlay && (
        <div className={styles['jogos-join-game-overlay']}>
          <label htmlFor="nickname" style={{ display: 'flex', flexDirection: 'column' }}>
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
    </>
  );
};

export default function Rooms({ rooms }: { rooms: FullRoom[] }) {
  return (
    <ul className={styles['jogos-rooms']}>
      {rooms.map(({ room, gameType }) => (
        <li key={room}>
          <Image src={`/images/${gameType}.svg`} width={30} height={30} />
          {room}
          <Overlay room={room} />
        </li>
      ))}
    </ul>
  );
}
