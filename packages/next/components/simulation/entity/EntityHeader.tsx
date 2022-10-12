import Image from 'next/image';
import styles from '@styles/main.module.sass';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleOverlay, selectEntity } from '@ct-ordo-realitas/app/redux/battlefieldSlice';
import CloseButton from '../../CloseButton';
import { HandleChange } from '../../../lib/hooks/useEntity';

function EntityHeader(
  { eid, handleChange }: { eid: string; handleChange: HandleChange },
) {
  const entity = useSelector(selectEntity(eid));
  const dispatch = useDispatch();
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
        {entity.type === 'player' ? 'monstro' : 'jogador'}
      </span>
      <input type="text" value={entity.name} name="name" onChange={handleChange} />
      <CloseButton handleClose={() => dispatch(handleOverlay({}))} />
    </div>
  );
}

export default React.memo(EntityHeader);
