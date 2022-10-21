import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrOverlay, setCurrOverlay } from '@ct-ordo-realitas/app/redux/battlefieldSlice';
import { entityPropTypes } from '../../types';
import Token from './entity/Token';
import Overlay from './entity/Overlay';

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

function Entity({ idx }: { idx: number }) {
  const currOverlay = useSelector(selectCurrOverlay);
  const dispatch = useDispatch();
  const handleOverlay = useCallback(() => {
    if (currOverlay === idx) {
      dispatch(setCurrOverlay({ idx: null }));
    } else {
      dispatch(setCurrOverlay({ idx }));
    }
  }, [currOverlay, dispatch, idx]);
  return (
    <>
      {currOverlay !== idx && <Token idx={idx} handleOverlay={handleOverlay} />}
      {currOverlay === idx && <Overlay idx={idx} handleOverlay={handleOverlay} />}
    </>
  );
}

Entity.propTypes = entityPropTypes;

export default Entity;
