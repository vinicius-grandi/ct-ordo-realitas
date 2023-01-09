import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrOverlay,
  setCurrOverlay,
} from '@ct-ordo-realitas/app/redux/battlefieldSlice';
import Token from './Token';
import Overlay from './entity/Overlay';

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

function Entity({ eid }: { eid: string }) {
  const dispatch = useDispatch();
  const currOverlay = useSelector(selectCurrOverlay);
  const handleOverlay = useCallback(() => {
    if (currOverlay === eid) {
      dispatch(setCurrOverlay({ eid: null }));
    } else {
      dispatch(setCurrOverlay({ eid }));
    }
  }, [currOverlay, dispatch, eid]);
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
      {currOverlay === eid && <Overlay eid={eid} handleOverlay={handleOverlay} />}
    </>
  );
}

export default Entity;
