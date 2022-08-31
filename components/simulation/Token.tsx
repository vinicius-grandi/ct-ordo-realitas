import {
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import styles from '../../styles/main.module.sass';

const Token = ({
  nome,
  pv,
  type,
  handleOverlay,
  handleRemoval,
}: {
  nome: string;
  type: string;
  pv: string;
  handleOverlay: () => void;
  handleRemoval: () => void;
}) => {
  const ref = useRef(null);
  const isItOverlay = useRef<boolean>(true);
  const [toId, setToId] = useState<NodeJS.Timeout>();
  const removeEnemy = useCallback(() => setTimeout(() => {
    handleRemoval();
    isItOverlay.current = false;
  }, 500), [handleRemoval]);

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
          handleOverlay();
        }
      };
      n.ontouchcancel = absorbEvent;
    }
    if (ref.current) {
      preventLongPressMenu(ref.current);
    }
  }, [handleOverlay, removeEnemy, toId]);

  return (
    <button
      type="button"
      ref={ref}
      onClick={handleOverlay}
      className={styles[type]}
      onMouseUp={() => {
        clearTimeout(toId);
      }}
      onMouseDown={() => {
        setToId(removeEnemy());
      }}
    >
      <span>{nome}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 600 520"
        width="50"
        height="50"
      >
        <polygon points="300,0 600,520 0,520" fill="#007843" />
      </svg>
      <output>{pv}</output>
    </button>
  );
};

export default Token;
