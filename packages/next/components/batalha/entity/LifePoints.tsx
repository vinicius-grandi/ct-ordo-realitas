import React from 'react';
import { selectEntity } from '@ct-ordo-realitas/app/redux/battlefieldSlice';
import styles from '@styles/main.module.sass';
import { useSelector } from 'react-redux';
import { HandleChange } from '../../../lib/hooks/useEntity';
import useT from '../../../lib/hooks/useT';

function LifePoints({ eid, handleChange }: { eid: string; handleChange: HandleChange }) {
  const entity = useSelector(selectEntity(eid));
  const t = useT();
  return (
    <div className={styles['life-points-tab']}>
      <h2>{t('batalha.overlay.hpTab')}</h2>
      <input
        type="number"
        name="hp"
        value={entity.hp}
        onChange={(ev) => {
          const value = Number(ev.target.value).toString();
          handleChange({ target: { value, name: ev.target.name } });
        }}
      />
    </div>
  );
}

export default React.memo(LifePoints);
