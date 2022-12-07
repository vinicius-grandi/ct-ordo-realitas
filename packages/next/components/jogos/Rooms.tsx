import styles from '@styles/main.module.sass';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FullRoom } from '../../lib/hooks/useRoomInfo';
import useT from '../../lib/hooks/useT';
import maxPlayers from '../../public/data/jogos/maxPlayers.json';

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
            {t('confirm')}
          </Link>
        </div>
      )}
    </>
  );
};

export default function Rooms({ rooms }: { rooms: FullRoom[] }) {
  return (
    <ul className={styles['jogos-rooms']}>
      {rooms.map(({ room, gameType, players }) => (
        <li key={room}>
          <Image src={`/images/${gameType}.svg`} width={30} height={30} />
          {room}
          <strong>{`${Object.values(players ?? {}).length}/${maxPlayers[gameType]}`}</strong>
          <Overlay room={room} />
        </li>
      ))}
    </ul>
  );
}
