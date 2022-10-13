import {
  KeyboardEvent,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { useDispatch } from 'react-redux';
import { changeEntity } from '@ct-ordo-realitas/app/redux/battlefieldSlice';
import styles from '../../styles/main.module.sass';
import Token from './Token';
import EntityHeader from './entity/EntityHeader';
import LifePoints from './entity/LifePoints';
import Shortcuts from './entity/Shortcuts';
import Notes from './entity/Notes';
import { entityPropTypes } from '../../types';
import type { EventHandler } from '../../lib/hooks/useEntity';

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const Entity = ({
  eid,
}: {
  eid: string;
}) => {
  const dispatch = useDispatch();
  const [showOverlay, setShowOverlay] = useState(false);
  const handleOverlay = useCallback(() => setShowOverlay(!showOverlay), [showOverlay]);

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
      if (key === 'escape' && showOverlay) {
        handleOverlay();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [dispatch, handleOverlay, showOverlay]);

  return (
    <>
      <Token eid={eid} handleOverlay={handleOverlay} />
      {showOverlay && (
        <div className={styles['simulation-overlay']}>
          <EntityHeader eid={eid} handleChange={handleChange} handleOverlay={handleOverlay} />
          <LifePoints eid={eid} handleChange={handleChange} />
          <Shortcuts eid={eid} handleOverlay={handleOverlay} />
          <Notes eid={eid} handleChange={handleChange} />
        </div>
      )}
    </>
  );
};

Entity.propTypes = entityPropTypes;

export default Entity;
