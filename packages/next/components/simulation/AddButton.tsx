import { useDispatch, useSelector } from 'react-redux';
import { addEntity as addEnt, Entities, selectIsSelectionMode } from '@ct-ordo-realitas/app/redux/battlefieldSlice';
import styles from '@styles/main.module.sass';
import { useRef } from 'react';

export default function AddButton({ type }: { type: Entities }) {
  const isSelectionMode = useSelector(selectIsSelectionMode);
  const dispatch = useDispatch();
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <button
      type="button"
      aria-label={`add-new-${type}`}
      ref={ref}
      onClick={(ev) => {
        if (isSelectionMode) return;
        dispatch(addEnt({ type }));
        const { target } = ev;
        if (type === 'player') {
          const followMouse = (e: MouseEvent) => {
            if (target instanceof HTMLElement) {
              target.style.position = 'fixed';
              target.style.top = `${e.clientY - 50}px`;
              target.style.left = `${e.clientX - 50}px`;
              target.style.zIndex = '10';
              target.style.filter = 'drop-shadow(0 15px 30px rgba(0, 127, 200, 0.5))';
            }
          };
          ref.current?.addEventListener('mouseout', followMouse);
          setTimeout(() => {
            ref.current?.removeEventListener('mouseout', followMouse);
            if (target instanceof HTMLElement) {
              target.style.position = 'relative';
              target.style.top = '0';
              target.style.left = '0';
              target.style.filter = 'none';
            }
          }, 1000);
        }
      }}
      className={styles[`add-${type}`]}
    >
      +
    </button>
  );
}
