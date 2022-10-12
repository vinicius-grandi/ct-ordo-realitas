import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addEntity as addEnt,
  selectEntities,
  BattlefieldSliceValues,
  selectIsSelectionMode,
} from '@ct-ordo-realitas/app/redux/battlefieldSlice';
import Entity from './Entity';
import styles from '../../styles/main.module.sass';

export type Entities = 'player' | 'enemy';

const AddButton = ({
  type,
}: {
  type: Entities;
}) => {
  const [height, setHeight] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    setHeight(document.body.scrollHeight - window.innerHeight);
  }, []);

  return (
    <button
      type="button"
      aria-label={`add-new-${type}`}
      onClick={() => {
        dispatch(addEnt({ type }));
        if (type === 'player') {
          setTimeout(() => {
            const currHeight = document.body.scrollHeight - window.innerHeight;
            if (height < currHeight) {
              setHeight(currHeight);
              setTimeout(
                () => window.scrollBy({
                  top: 70,
                }),
                0,
              );
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
  const entities = useSelector(selectEntities);
  const getEntities = (
    obj: BattlefieldSliceValues['entities'],
    t: Entities,
  ) => Object.values(obj).filter(({ type }) => type === t);
  const isSelectionMode = useSelector(selectIsSelectionMode);

  return (
    <div className={styles.battlefield}>
      <AddButton type="enemy" />
      <div className={styles['entity-container']}>
        {getEntities(entities, 'enemy').map(({ id }) => (
          <Entity
            key={id}
            eid={id}
          />
        ))}
      </div>
      <div className={styles['entity-container']}>
        {getEntities(entities, 'player').map(({ id }) => (
          <Entity
            key={id}
            eid={id}
          />
        ))}
      </div>
      <AddButton type="player" />
      {isSelectionMode && <button type="button">ATACAR</button>}
    </div>
  );
};

export default Battlefield;
