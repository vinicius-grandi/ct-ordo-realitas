import { handleSelectionMode, setDamage } from '@ct-ordo-realitas/app/redux/battlefieldSlice';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useBattlefield } from '../../contexts/battlefield';
import useDice from '../../lib/hooks/useDice';
import styles from '../../styles/main.module.sass';
import type { ShortcutT } from './Shortcut.d';

const Shortcut = (
  { diceName, diceConfig, handleOverlay }: ShortcutT & { handleOverlay: () => void },
) => {
  const { diceValue, handleDice, dice } = useDice(diceConfig);
  const { battlefieldRef } = useBattlefield();
  const dispatch = useDispatch();
  return (
    <div>
      <p>{diceName}</p>
      <div className={styles.dices}>
        <svg width="50" height="50">
          <rect width="50" height="50" fill="#b3b3b3" />
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="black">{diceValue}</text>
        </svg>
        <span>{diceConfig}</span>
      </div>
      <button type="button" onClick={handleDice}>rolar</button>
      <ul>
        {dice.map((val) => (
          <li key={uuidv4()}>{val}</li>
        ))}
      </ul>
      { dice.length > 0 && (
      <button
        type="button"
        onClick={() => {
          handleOverlay();
          dispatch(handleSelectionMode({}));
          dispatch(setDamage({ damage: diceValue }));
          if (typeof battlefieldRef?.current?.scrollIntoView === 'function') {
            battlefieldRef.current?.scrollIntoView({
              block: 'center',
            });
          }
          setTimeout(() => { document.body.style.overflowY = 'hidden'; }, 100);
        }}
      >
        ATACAR UM ALVO
      </button>
      ) }
    </div>
  );
};

export default Shortcut;
