import Image from 'next/image';
import styles from '@styles/main.module.sass';
import React, { useEffect, useRef } from 'react';
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
  const ref = useRef<HTMLButtonElement>(null);
  const t = useT();
  useEffect(() => {
    const handleKey = (ev: KeyboardEvent) => {
      const key = ev.key.toLowerCase();
      if (key === 'c' && ev.shiftKey) {
        ref.current?.click();
      }
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = 'initial';
      document.removeEventListener('keydown', handleKey);
    };
  }, []);
  const dispatch = useDispatch();
  const currType = useSelector(selectCurrType);
  return (
    <div className={styles['name-tab']}>
      <button
        type="button"
        onClick={() => dispatch(changeCurrType({}))}
        ref={ref}
        style={{
          fontSize: '0.75rem',
          display: 'flex',
          fontWeight: '600',
          flexDirection: 'column',
          textTransform: 'uppercase',
        }}
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
