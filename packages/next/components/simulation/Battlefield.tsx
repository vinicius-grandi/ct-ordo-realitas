import { useSelector, useDispatch } from 'react-redux';
import {
  selectEntities,
  selectIsSelectionMode,
  completeAttack,
  selectDamage,
} from '@ct-ordo-realitas/app/redux/battlefieldSlice';
import styles from '@styles/main.module.sass';
import Entity from './Entity';
import AddButton from './AddButton';
import { useBattlefield } from '../../contexts/battlefield';

export type Entities = 'player' | 'enemy';

const TokenContainer = ({ entType }: { entType: Entities }) => {
  const entities = useSelector(selectEntities);
  return (
    <div className={styles['entity-container']}>
      {entities[entType].map(({ id, type }, idx) => (
        <Entity
          key={id}
          elem={[idx, type]}
        />
      ))}
    </div>
  );
};

const Battlefield = () => {
  const isSelectionMode = useSelector(selectIsSelectionMode);
  const damage = useSelector(selectDamage);
  const dispatch = useDispatch();
  const { battlefieldRef } = useBattlefield();
  const handleOverflow = () => {
    document.body.style.overflowY = 'initial';
  };

  return (
    <div className={styles.battlefield} ref={battlefieldRef}>
      <AddButton type="enemy" />
      <TokenContainer entType="enemy" />
      {damage !== 0 && (
        <span className={styles['inflicted-damage']}>
          DANO:
          {' '}
          {damage}
        </span>
      )}
      <TokenContainer entType="player" />
      <AddButton type="player" />
      {isSelectionMode && (
      <div className={styles['attack-confirmation']}>
        <button
          type="button"
          onClick={() => {
            dispatch(completeAttack({
              decision: 'attack',
            }));
            handleOverflow();
          }}
        >
          ATACAR
        </button>
        <button
          type="button"
          onClick={() => {
            dispatch(completeAttack({}));
            handleOverflow();
          }}
        >
          CANCELAR
        </button>
      </div>
      )}
    </div>
  );
};

export default Battlefield;
