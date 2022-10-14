import { useSelector, useDispatch } from 'react-redux';
import {
  selectEntities,
  BattlefieldSliceValues,
  selectIsSelectionMode,
  completeAttack,
  selectDamage,
} from '@ct-ordo-realitas/app/redux/battlefieldSlice';
import styles from '@styles/main.module.sass';
import Entity from './Entity';
import AddButton from './AddButton';

export type Entities = 'player' | 'enemy';

const TokenContainer = ({ entType }: { entType: Entities }) => {
  const entities = useSelector(selectEntities);
  const getEntities = (
    obj: BattlefieldSliceValues['entities'],
    t: Entities,
  ) => Object.values(obj).filter(({ type }) => type === t);
  return (
    <div className={styles['entity-container']}>
      {getEntities(entities, entType).map(({ id }) => (
        <Entity
          key={id}
          eid={id}
        />
      ))}
    </div>
  );
};

const Battlefield = () => {
  const isSelectionMode = useSelector(selectIsSelectionMode);
  const damage = useSelector(selectDamage);
  const dispatch = useDispatch();

  return (
    <div className={styles.battlefield}>
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
          onClick={() => dispatch(completeAttack({
            decision: 'attack',
          }))}
        >
          ATACAR
        </button>
        <button
          type="button"
          onClick={() => dispatch(completeAttack({}))}
        >
          CANCELAR
        </button>
      </div>
      )}
    </div>
  );
};

export default Battlefield;
