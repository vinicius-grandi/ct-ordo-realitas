import React from 'react';
import { selectEntity } from '@ct-ordo-realitas/app/redux/battlefieldSlice';
import styles from '@styles/main.module.sass';
import { useSelector } from 'react-redux';
import { HandleChange } from '../../../lib/hooks/useEntity';

function LifePoints({
  eid,
  handleChange,
}: {
  eid: string;
  handleChange: HandleChange;
}) {
  const entity = useSelector(selectEntity(eid));
  return (
    <div className={styles['life-points-tab']}>
      <h2>Pontos de Vida</h2>
      <input type="number" name="hp" value={entity.hp} onChange={handleChange} />
    </div>
  );
}

export default React.memo(LifePoints);
