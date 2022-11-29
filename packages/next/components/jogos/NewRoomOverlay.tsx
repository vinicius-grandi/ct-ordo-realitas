import { ChangeEvent, useState } from 'react';
import useT from '../../lib/hooks/useT';

export default function NewRoomOverlay() {
  const games = ['masqueradeBall', 'devilCoffins', 'deathRooms'];
  const [checkedState, setCheckedState] = useState<boolean[]>(new Array(games.length).fill(false));
  const t = useT();
  const [game, setGame] = useState('');

  const handleCheckboxes = (e: ChangeEvent<HTMLInputElement>, idx: number): void => {
    const updatedCheckedState = checkedState.map((_, index) => index === idx);
    setCheckedState(updatedCheckedState);
    if (e.target.checked) {
      setGame(e.target.value);
    }
  };

  return (
    <div>
      <label htmlFor="roomName">
        {t('jogos.roomName')}
        <input type="text" id="roomName" />
      </label>
      <label htmlFor="playerName">
        {t('jogos.playerName')}
        <input type="text" id="playerName" />
      </label>
      <h2>{t('jogos.title')}</h2>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {games.map((availableGame, idx) => (
          <label htmlFor={availableGame} key={availableGame}>
            <input
              type="checkbox"
              id={availableGame}
              checked={checkedState[idx]}
              value={availableGame}
              onChange={(ev) => handleCheckboxes(ev, idx)}
            />
            {t(`jogos.${availableGame}`)}
          </label>
        ))}
      </div>
      <button type="button" onClick={() => console.log(game)}>
        {t('jogos.createRoom')}
      </button>
    </div>
  );
}
