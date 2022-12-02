import { useRouter } from 'next/router';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import styles from '@styles/main.module.sass';
import useT from '../../lib/hooks/useT';
import CloseButton from '../CloseButton';

export default function NewRoomOverlay({ handleClose }: { handleClose: () => void }) {
  const games = ['masqueradeBall', 'devilCoffins', 'deathRooms'];
  const [checkedState, setCheckedState] = useState<boolean[]>(new Array(games.length).fill(false));
  const t = useT();
  const router = useRouter();
  const [game, setGame] = useState('');
  const [roomName, setRoomName] = useState('');
  const [playerName, setPlayerName] = useState('');

  const handleCheckboxes = (e: ChangeEvent<HTMLInputElement>, idx: number): void => {
    const updatedCheckedState = checkedState.map((_, index) => index === idx);
    setCheckedState(updatedCheckedState);
    if (e.target.checked) {
      setGame(e.target.value);
    }
  };

  const handleNewRoom = async () => {
    const data = new FormData();
    data.append('name', roomName);
    data.append('gameType', game);
    data.append('playerName', playerName);
    await fetch('../api/rooms/create', {
      method: 'post',
      body: data,
    });
    await router.push(`/jogos/salas/${roomName}`);
  };

  return (
    <div className={styles['jogos-overlay']}>
      <div className={styles['jogos-overlay-close-btn']}>
        <CloseButton handleClose={() => handleClose()} />
      </div>
      <label htmlFor="roomName" className={styles['jogos-overlay-label']}>
        {t('jogos.roomName')}
        <input
          type="text"
          id="roomName"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
      </label>
      <label htmlFor="playerName" className={styles['jogos-overlay-label']}>
        {t('jogos.playerName')}
        <input type="text" id="playerName" onChange={(e) => setPlayerName(e.target.value)} />
      </label>
      <div>
        <h2>{t('jogos.title')}</h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {games.map((availableGame, idx) => (
            <label
              htmlFor={availableGame}
              key={availableGame}
              className={styles['jogos-available-games']}
            >
              <input
                type="checkbox"
                id={availableGame}
                checked={checkedState[idx]}
                value={availableGame}
                onChange={(ev) => handleCheckboxes(ev, idx)}
              />
              {t(`jogos.${availableGame}`)}
              <Image src={`/images/${availableGame}.svg`} width={30} height={30} />
            </label>
          ))}
        </div>
      </div>
      <button type="button" onClick={handleNewRoom}>
        {t('jogos.createRoom')}
      </button>
    </div>
  );
}
