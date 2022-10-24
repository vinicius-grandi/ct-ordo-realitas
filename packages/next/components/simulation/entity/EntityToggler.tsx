import { handleEntities } from '@ct-ordo-realitas/app/redux/battlefieldSlice';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from '@styles/main.module.sass';

export default function EntityToggler() {
  const dispatch = useDispatch();
  const [x, setX] = useState<number>(0);
  const testRef = useRef<NodeJS.Timer>(0);
  const initialValue = {
    initialClick: null,
    lastClick: null,
  };
  const ref = useRef<{ initialClick: number | null; lastClick: number | null }>(
    initialValue,
  );
  useEffect(() => {
    const nextOrPrev = (str: string) => {
      dispatch(handleEntities({ nextOrPrev: str }));
    };
    const handleMouseMove = (ev: MouseEvent) => {
      const offset = (ref.current.initialClick ?? 0) - ev.clientX;
      testRef.current = setInterval(() => setX(x - 1), 100);
      setX(x - 1);
    };
    const handleKey = (ev: KeyboardEvent) => {
      const key = ev.key.toLowerCase();
      if (key === 'arrowleft') {
        nextOrPrev('prev');
      }
      if (key === 'arrowright') {
        nextOrPrev('next');
      }
    };
    const handleMouseDown = ({ clientX }: MouseEvent) => {
      if (clientX < 50 || clientX > (document.body.clientWidth - 50)) {
        ref.current.initialClick = clientX;
        document.addEventListener('mousemove', handleMouseMove);
      }
    };
    const handleMouseUp = (ev: MouseEvent) => {
      ref.current.lastClick = ev.clientX;
      if (!ref.current.initialClick || ref.current.initialClick === null) {
        return;
      }
      const offset = ref.current.initialClick - ref.current.lastClick;
      if (Math.abs(offset) < 3) {
        return;
      }
      nextOrPrev(offset > 0 ? 'next' : 'prev');
      ref.current.initialClick = null;
      ref.current.lastClick = null;
      document.removeEventListener('mousemove', handleMouseMove);
      setX(0);
    };

    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
      clearInterval(testRef.current);
    };
  }, [dispatch, x]);
  return <div className={styles['entity-toggler']} style={{ transform: `translate(${x}%)` }} />;
}
