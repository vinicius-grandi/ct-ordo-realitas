import { useEffect, useRef } from 'react';
import { handleEntities } from '@ct-ordo-realitas/app/redux/battlefieldSlice';
import { useDispatch } from 'react-redux';
import styles from '@styles/main.module.sass';

export default function EntityToggler() {
  const dispatch = useDispatch();
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const handleArrows: any = (ev: KeyboardEvent): void => {
      const key = ev.key.toLowerCase();
      if (key === 'arrowright') {
        nextBtnRef?.current?.click();
      }
      if (key === 'arrowleft') {
        prevBtnRef?.current?.click();
      }
    };

    document.addEventListener('keydown', handleArrows);
    return () => document.removeEventListener('keydown', handleArrows);
  }, []);
  return (
    <div className={styles['entity-toggler']}>
      <button
        type="button"
        aria-label="previous target"
        onClick={() => dispatch(handleEntities({ nextOrPrev: 'prev' }))}
        ref={prevBtnRef}
      >
        {'<'}
      </button>
      <button
        type="button"
        aria-label="next target"
        onClick={() => dispatch(handleEntities({ nextOrPrev: 'next' }))}
        ref={nextBtnRef}
      >
        {'>'}
      </button>
    </div>
  );
}
