import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEntity as addEnt, Entities } from '@ct-ordo-realitas/app/redux/battlefieldSlice';
import styles from '@styles/main.module.sass';

export default function AddButton({ type }: { type: Entities }) {
  const [height, setHeight] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    setHeight(document.body.scrollHeight - window.innerHeight);
  }, []);

  return (
    <button
      type="button"
      aria-label={`add-new-${type}`}
      onClick={() => {
        dispatch(addEnt({ type }));
        if (type === 'player') {
          setTimeout(() => {
            const currHeight = document.body.scrollHeight - window.innerHeight;
            if (height < currHeight) {
              setHeight(currHeight);
              setTimeout(
                () => window.scrollBy({
                  top: 70,
                }),
                0,
              );
            }
          }, 200);
        }
      }}
      className={styles[`add-${type}`]}
    >
      +
    </button>
  );
}
