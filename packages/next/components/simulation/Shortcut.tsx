import { v4 as uuidv4 } from 'uuid';
import { useSimulacao } from '../../contexts/simulacao';
import useDice from '../../lib/hooks/useDice';
import styles from '../../styles/main.module.sass';
import type { ShortcutT } from './Shortcut.d';

const Shortcut = ({ nome, dados }: ShortcutT) => {
  const { diceValue, handleDice, dice } = useDice(dados);
  const { handleOverlay, handleIsSelectionMode } = useSimulacao();

  return (
    <div>
      <p>{nome}</p>
      <div className={styles.dices}>
        <svg width="50" height="50">
          <rect width="50" height="50" fill="#b3b3b3" />
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="black">{diceValue}</text>
        </svg>
        <span>{dados}</span>
      </div>
      <button type="button" onClick={handleDice}>rolar</button>
      <ul>
        {dice.map((val) => (
          <li key={uuidv4()}>{val}</li>
        ))}
      </ul>
      { dice.length > 0 && <button type="button" onClick={() => { handleOverlay(); handleIsSelectionMode(); }}>ATACAR UM ALVO</button> }
    </div>
  );
};

export default Shortcut;
