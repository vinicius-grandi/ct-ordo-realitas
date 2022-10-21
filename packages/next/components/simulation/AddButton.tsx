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
      aria-label={`add new ${type}`}
      ref={ref}
      onClick={(ev) => {
        if (isSelectionMode) return;
        dispatch(addEnt({ type }));
        const { target } = ev;
        if (type === 'player') {
          const followMouse = () => {
            if (target instanceof HTMLElement) {
              target.style.position = 'sticky';
              target.style.bottom = '0';
              target.style.zIndex = '9';
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
          }, 2000);
        }
      }}
      className={styles[`add-${type}`]}
    >
      +
    </button>
  );
}
