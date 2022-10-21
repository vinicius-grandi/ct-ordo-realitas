import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrOverlay, setCurrOverlay } from '@ct-ordo-realitas/app/redux/battlefieldSlice';
import { entityPropTypes } from '../../types';
import Token from './Token';
import Overlay from './Overlay';

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

function Entity({ eid }: { eid: string }) {
  const currOverlay = useSelector(selectCurrOverlay);
  const dispatch = useDispatch();
  const handleOverlay = useCallback(() => {
    if (currOverlay === eid) {
      dispatch(setCurrOverlay({ eid: null }));
    } else {
      dispatch(setCurrOverlay({ eid }));
    }
  }, [currOverlay, dispatch, eid]);
  return (
    <>
      {currOverlay !== eid && <Token eid={eid} handleOverlay={handleOverlay} />}
      {currOverlay === eid && <Overlay eid={eid} handleOverlay={handleOverlay} />}
    </>
  );
}

Entity.propTypes = entityPropTypes;

export default Entity;
