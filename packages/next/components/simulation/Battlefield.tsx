import { useEffect, useState } from 'react';
import Entity from './Entity';
import styles from '../../styles/main.module.sass';
import { useSimulacao } from '../../contexts/simulacao';

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
      aria-label={`add-new-${type}`}
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

const Battlefield = (
  {
    players, enemies, addEntity, removeEntity,
  }:
  {
    players: JSX.Element[];
    enemies: JSX.Element[];
    addEntity: (e: Entities) => void;
    removeEntity: (e: Entities, k: string) => void;
  },
) => {
  const { isSelectionMode } = useSimulacao();
  return (
    <div className={styles.battlefield}>
      <AddButton addEntity={addEntity} type="enemy" />
      <div className={styles['entity-container']}>
        {enemies.map(({ props: { type, eid, extraInfo } }) => (
          <Entity
            type={type}
            key={eid}
            eid={eid}
            removeEntity={removeEntity}
            extraInfo={extraInfo}
          />
        ))}
      </div>
      <div className={styles['entity-container']}>
        {players.map(({ props: { type, eid, extraInfo } }) => (
          <Entity
            type={type}
            key={eid}
            eid={eid}
            removeEntity={removeEntity}
            extraInfo={extraInfo}
          />
        ))}
      </div>
      <AddButton addEntity={addEntity} type="player" />
      {isSelectionMode && <button type="button">ATACAR</button>}
    </div>
  );
};

export default Battlefield;
