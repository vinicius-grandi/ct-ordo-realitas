import { handleEntities } from '@ct-ordo-realitas/app/redux/battlefieldSlice';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styles from '@styles/main.module.sass';

export default function EntityToggler() {
  const dispatch = useDispatch();
  const divRef = useRef<HTMLDivElement>(null);
  const clickRef = useRef<{ initialClick: number | null; lastClick: number | null }>({
    initialClick: null,
    lastClick: null,
  });
  useEffect(() => {
    const nextOrPrev = (str: string) => {
      dispatch(handleEntities({ nextOrPrev: str }));
    };

    const isItAInvalidSwipe = (initialClick: number, clientX: number) => (
      initialClick < 50 && initialClick - clientX > initialClick - 5) ||
      (clientX > document.body.clientWidth - 50 && initialClick - clientX < 0);

    const handleMouseMove = ({ clientX }: MouseEvent) => {
      const initialClick = clickRef.current.initialClick ?? 0;
      if (isItAInvalidSwipe(initialClick, clientX)) {
        return;
      }
      if (divRef.current) {
        const offset = initialClick - clientX;
        const percentage = 100 - Math.abs(offset);
        const leftOrRightPercentage = percentage <= 0 ? 0 : percentage * Math.sign(offset);
        divRef.current.style.transform = `translateX(${leftOrRightPercentage}%)`;
      }
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
      if (clientX < 50 || clientX > document.body.clientWidth - 50) {
        clickRef.current.initialClick = clientX;
        window.addEventListener('mousemove', handleMouseMove, false);
      }
    };
    const handleMouseUp = ({ clientX }: MouseEvent) => {
      window.removeEventListener('mousemove', handleMouseMove, false);
      divRef.current!.style.transform = 'translate(-100%)';
      clickRef.current.lastClick = clientX;
      if (isItAInvalidSwipe(clickRef.current.initialClick ?? 0, clientX)) {
        return;
      }
      if (!clickRef.current.initialClick || clickRef.current.initialClick === null) {
        return;
      }
      const offset = clickRef.current.initialClick - clickRef.current.lastClick;
      if (Math.abs(offset) < 3) {
        return;
      }
      nextOrPrev(offset > 0 ? 'next' : 'prev');
      clickRef.current.initialClick = null;
    };

    window.addEventListener('keydown', handleKey, false);
    window.addEventListener('mousedown', handleMouseDown, false);
    window.addEventListener('mouseup', handleMouseUp, false);
    return () => {
      window.removeEventListener('keydown', handleKey, false);
      window.removeEventListener('mousedown', handleMouseDown, false);
      window.removeEventListener('mouseup', handleMouseUp, false);
      window.removeEventListener('mousemove', handleMouseMove, false);
    };
  }, [dispatch]);
  return <div ref={divRef} className={styles['entity-toggler']} />;
}
