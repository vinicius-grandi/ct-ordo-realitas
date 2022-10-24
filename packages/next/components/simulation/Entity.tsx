import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrOverlay, setCurrOverlay } from '@ct-ordo-realitas/app/redux/battlefieldSlice';
import { entityPropTypes } from '../../types';
import Token from './entity/Token';
import Overlay from './entity/Overlay';

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

function Entity({ elem }: { elem: [number, string] }) {
  const currOverlay = useSelector(selectCurrOverlay);
  const dispatch = useDispatch();
  const handleOverlay = useCallback(() => {
    if (currOverlay === elem) {
      dispatch(setCurrOverlay({ elem: null }));
    } else {
      dispatch(setCurrOverlay({ elem }));
    }
  }, [currOverlay, dispatch, elem]);
  return (
    <>
      {currOverlay !== elem && <Token elem={elem} handleOverlay={handleOverlay} />}
      {currOverlay === elem && <Overlay elem={elem} handleOverlay={handleOverlay} />}
    </>
  );
}

Entity.propTypes = entityPropTypes;

export default Entity;
