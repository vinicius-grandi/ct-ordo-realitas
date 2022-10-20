import Image from 'next/image';
import styles from '@styles/main.module.sass';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectEntity } from '@ct-ordo-realitas/app/redux/battlefieldSlice';
import CloseButton from '../../CloseButton';
import { HandleChange } from '../../../lib/hooks/useEntity';

function EntityHeader(
  { eid, handleChange, handleOverlay }:
  { eid: string; handleChange: HandleChange; handleOverlay: () => void },
) {
  const entity = useSelector(selectEntity(eid));
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'initial';
    };
  }, []);
  return (
    <div className={styles['name-tab']}>
      <span>
        <Image src="/images/user-icon.svg" width={50} height={50} alt="user-icon" />
        {entity.type === 'enemy' ? 'jogador' : 'inimigo'}
      </span>
      <input type="text" value={entity.name} name="name" onChange={handleChange} />
      <CloseButton handleClose={() => handleOverlay()} />
    </div>
  );
}

export default React.memo(EntityHeader);
