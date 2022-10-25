import Image from 'next/image';
import styles from '@styles/main.module.sass';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeCurrType,
  selectCurrType,
  selectEntity,
} from '@ct-ordo-realitas/app/redux/battlefieldSlice';
import CloseButton from '../../CloseButton';
import { HandleChange } from '../../../lib/hooks/useEntity';
import useT from '../../../lib/hooks/useT';

function EntityHeader({
  eid,
  handleChange,
  handleOverlay,
}: {
  eid: string;
  handleChange: HandleChange;
  handleOverlay: () => void;
}) {
  const entity = useSelector(selectEntity(eid));
  const t = useT();
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'initial';
    };
  }, []);
  const dispatch = useDispatch();
  const currType = useSelector(selectCurrType);
  return (
    <div className={styles['name-tab']}>
      <button
        type="button"
        onClick={() => dispatch(changeCurrType({}))}
        style={{ fontSize: '0.9rem', display: 'flex', flexDirection: 'column' }}
      >
        <Image src="/images/user-icon.svg" width={50} height={50} alt="user-icon" />
        {currType === 'enemy' ? t('simulacao.overlay.enemies') : t('simulacao.overlay.players')}
      </button>
      <input type="text" value={entity.name} name="name" onChange={handleChange} />
      <CloseButton handleClose={() => handleOverlay()} />
    </div>
  );
}

export default React.memo(EntityHeader);
