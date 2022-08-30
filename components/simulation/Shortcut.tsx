import { useState } from 'react';
import styles from '../../styles/main.module.sass';
import type { Entities } from './Battlefield';

export type ShortcutT = {
  nome: string;
  dados: string;
};

export type EntityConfig = {
  tipo: Entities;
  pv: number;
  nome: string;
  atalhos: ShortcutT[];
  notas: string;
};

type RollDice = {
  sum: number;
  values: number[];
};

function rollDice(amount: number, max: number, result: RollDice = {
  sum: 0,
  values: [],
}): RollDice {
  const res = result;
  if (amount === 0) {
    return result;
  }
  const val = 1 + Math.floor(Math.random() * Number(max));

  res.sum += val;
  result.values.push(val);

  return rollDice(amount - 1, max, result);
}

const Shortcut = ({ nome, dados }: ShortcutT) => {
  const [diceValue, setDiceValue] = useState(0);
  const handleDice = () => {
    // 4d10+2
    // [4d10, 2]
    //
    const modifiers = dados.split('+');
    const values = modifiers.map((val) => {
      const v = val.toLowerCase().split('d');
      if (v.length > 1) {
        const dice = Number(v[0]);
        const sides = Number(v[1]);
        const res = rollDice(dice, sides);
        return res.sum;
      }
      return parseInt(val, 10);
    });
    const res = values.reduce((prevVal, currVal) => {
      if (typeof prevVal === 'number' && typeof currVal === 'number') {
        return prevVal + currVal;
      }
      return 0;
    }, 0) as number;
    setDiceValue(res);
  };

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
    </div>
  );
};

export default Shortcut;
