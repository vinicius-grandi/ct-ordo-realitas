import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Entity from './Entity';
import styles from '../../styles/main.module.sass';

export type Entities = 'player' | 'enemy';

const Battlefield = () => {
  const [enemies, setEnemies] = useState<JSX.Element[]>([]);
  const [players, setPlayers] = useState<JSX.Element[]>([]);

  const addEntity = (e: Entities) => {
    switch (e) {
      case ('player'):
        return setPlayers([
          ...players,
          <Entity type="player" key={uuidv4()} />,
        ]);
      case ('enemy'):
        return setEnemies([
          ...enemies,
          <Entity type="enemy" key={uuidv4()} />,
        ]);
      default:
        return null;
    }
  };

  return (
    <div className={styles.battlefield}>
      <div>
        {enemies.length < 6 && (
          <button type="button" aria-label="add-new-enemy" onClick={() => addEntity('enemy')} className={styles['add-enemy']}>
            +
          </button>
        )}
        {enemies}
      </div>
      <div>
        {players}
        { players.length < 6 && (
          <button type="button" aria-label="add-new-player" onClick={() => addEntity('player')} className={styles['add-player']}>
            +
          </button>
        )}
      </div>
    </div>
  );
};

export default Battlefield;
