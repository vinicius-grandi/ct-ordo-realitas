import { selectCurrOverlay, setCurrOverlay, changeEntity } from '@ct-ordo-realitas/app/redux/battlefieldSlice';
import styles from '@styles/main.module.sass';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EventHandler } from '../../../lib/hooks/useEntity';
import EntityHeader from './EntityHeader';
import EntityToggler from './EntityToggler';
import LifePoints from './LifePoints';
import Notes from './Notes';
import Shortcuts from './Shortcuts';

function Overlay({ eid, handleOverlay }: { eid: string; handleOverlay: () => void }) {
  const dispatch = useDispatch();
  const currOverlay = useSelector(selectCurrOverlay);
  const handleChange = ({ target: { name, value } }: EventHandler) => {
    if (name !== 'notes' && value.length > 15) return;
    dispatch(
      changeEntity({
        eid,
        name,
        value,
      }),
    );
  };
  useEffect(() => {
    const handleEsc: any = (ev: KeyboardEvent): void => {
      const key = ev.key.toLowerCase();
      if (key === 'escape' && currOverlay !== null) {
        dispatch(setCurrOverlay({ eid: null }));
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [currOverlay, dispatch, handleOverlay]);
  return (
    <div className={styles['simulation-overlay']}>
      <EntityHeader eid={eid} handleChange={handleChange} handleOverlay={handleOverlay} />
      <LifePoints eid={eid} handleChange={handleChange} />
      <EntityToggler />
      <Shortcuts eid={eid} handleOverlay={handleOverlay} />
      <Notes eid={eid} handleChange={handleChange} />
    </div>
  );
}

export default Overlay;
