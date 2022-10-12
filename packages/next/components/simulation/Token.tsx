import { handleOverlay, removeEntity, selectEntity } from '@ct-ordo-realitas/app/redux/battlefieldSlice';
import {
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../styles/main.module.sass';
import ClickToggler from './entity/token/ClickToggler';

const Token = ({ eid }: { eid: string }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const isItOverlay = useRef<boolean>(true);
  const [toId, setToId] = useState<NodeJS.Timeout>();
  const removeEnemy = useCallback(() => setTimeout(() => {
    dispatch(removeEntity({ eid }));
    isItOverlay.current = false;
  }, 500), [dispatch, eid]);
  const entity = useSelector(selectEntity(eid));

  useEffect(() => {
    function absorbEvent(event: TouchEvent) {
      const e = event || window.event;
      e.preventDefault();
      e.stopPropagation();
      e.cancelBubble = true;
      return false;
    }

    function preventLongPressMenu(node: HTMLButtonElement) {
      const n = node;
      n.ontouchstart = (ev) => {
        absorbEvent(ev);
        setToId(removeEnemy());
      };
      n.ontouchmove = absorbEvent;
      n.ontouchend = (ev) => {
        absorbEvent(ev);
        clearTimeout(toId);
        if (isItOverlay.current) {
          handleOverlay({});
        }
      };
      n.ontouchcancel = absorbEvent;
    }
    if (ref.current) {
      preventLongPressMenu(ref.current);
    }
  }, [removeEnemy, toId]);

  return (
    <div>
      <ClickToggler eid={eid}>
        <button
          type="button"
          ref={ref}
          className={styles[entity.type]}
          onClick={() => { dispatch(handleOverlay({})); }}
          onMouseUp={() => {
            clearTimeout(toId);
          }}
          onMouseDown={() => {
            setToId(removeEnemy());
          }}
        >
          <span>{entity.name}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 600 520"
            width="50"
            height="50"
          >
            <polygon points="300,0 600,520 0,520" fill="#007843" />
          </svg>
          <output>{entity.hp}</output>
        </button>
      </ClickToggler>
    </div>
  );
};

export default Token;
