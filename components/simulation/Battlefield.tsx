import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Entity from './Entity';
import styles from '../../styles/main.module.sass';

export type Entities = 'player' | 'enemy';

const AddButton = (
  { addEntity, type }: { addEntity: (type: Entities) => void | null; type: Entities },
) => {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    setHeight(document.body.scrollHeight - window.innerHeight);
  }, []);
  return (
    <button
      type="button"
      aria-label="add-new-enemy"
      onClick={() => {
        addEntity(type);
        if (type === 'player') {
          setTimeout(() => {
            const currHeight = document.body.scrollHeight - window.innerHeight;
            if (height < currHeight) {
              setHeight(currHeight);
              setTimeout(() => window.scrollBy({
                top: 70,
              }), 0);
            }
          }, 200);
        }
      }}
      className={styles[`add-${type}`]}
    >
      +
    </button>
  );
};

const Battlefield = () => {
  const [enemies, setEnemies] = useState<JSX.Element[]>([]);
  const [players, setPlayers] = useState<JSX.Element[]>([]);

  const removeEntity = (e: Entities, k: string) => {
    switch (e) {
      case ('player'):
        return setPlayers(players.filter(({ key }) => key !== k));
      case ('enemy'):
        return setEnemies(enemies.filter(({ key }) => key !== k));
      default:
        return null;
    }
  };

  const addEntity = (e: Entities) => {
    const id = uuidv4();
    switch (e) {
      case ('player'):
        return setPlayers([
          ...players,
          <Entity type="player" key={id} eid={id} removeEntity={removeEntity} />,
        ]);
      case ('enemy'):
        return setEnemies([
          ...enemies,
          <Entity type="enemy" key={id} eid={id} removeEntity={removeEntity} />,
        ]);
      default:
        return null;
    }
  };

  return (
    <div className={styles.battlefield}>
      <AddButton addEntity={addEntity} type="enemy" />
      <div className={styles['entity-container']}>
        {enemies.map(({ props: { type, eid }, key }) => (
          <Entity
            type={type}
            key={key}
            eid={eid}
            removeEntity={removeEntity}
          />
        ))}
      </div>
      <div className={styles['entity-container']}>
        {players.map(({ props: { type, eid }, key }) => (
          <Entity
            type={type}
            key={key}
            eid={eid}
            removeEntity={removeEntity}
          />
        ))}
      </div>
      <AddButton addEntity={addEntity} type="player" />
    </div>
  );
};

export default Battlefield;
