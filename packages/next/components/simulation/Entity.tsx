import {
  KeyboardEvent,
  useEffect,
  useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeEntity, selectCurrOverlay, setCurrOverlay } from '@ct-ordo-realitas/app/redux/battlefieldSlice';
import styles from '../../styles/main.module.sass';
import EntityHeader from './entity/EntityHeader';
import LifePoints from './entity/LifePoints';
import Shortcuts from './entity/Shortcuts';
import Notes from './entity/Notes';
import { entityPropTypes } from '../../types';
import type { EventHandler } from '../../lib/hooks/useEntity';
import EntityToggler from './entity/EntityToggler';
import Token from './entity/Token';

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const Entity = ({
  eid,
}: {
  eid: string;
}) => {
  const dispatch = useDispatch();
  const currOverlay = useSelector(selectCurrOverlay);
  const handleOverlay = useCallback(() => {
    if (currOverlay === eid) {
      dispatch(setCurrOverlay({ eid: null }));
    } else {
      dispatch(setCurrOverlay({ eid }));
    }
  }, [currOverlay, dispatch, eid]);

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
        setCurrOverlay(null);
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [currOverlay, dispatch, handleOverlay]);

  return (
    <>
      {currOverlay !== eid && <Token eid={eid} handleOverlay={handleOverlay} />}
      {currOverlay === eid && (
        <div className={styles['simulation-overlay']}>
          <EntityHeader eid={eid} handleChange={handleChange} handleOverlay={handleOverlay} />
          <LifePoints eid={eid} handleChange={handleChange} />
          <EntityToggler />
          <Shortcuts eid={eid} handleOverlay={handleOverlay} />
          <Notes eid={eid} handleChange={handleChange} />
        </div>
      )}
    </>
  );
};

Entity.propTypes = entityPropTypes;

export default Entity;
