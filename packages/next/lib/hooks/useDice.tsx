import { useState } from 'react';

type RollDice = {
  sum: number;
  values: string[];
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
  result.values.push(String(val));

  return rollDice(amount - 1, max, result);
}

const useDice = (dados: string) => {
  const [diceValue, setDiceValue] = useState(0);
  const [dice, setDice] = useState<string[]>([]);

  const handleDice = () => {
    // 4d10+2
    // [4d10, 2]
    //
    const modifiers = dados.split('+');
    const values = modifiers.map((val) => {
      const v = val.toLowerCase().split('d');
      if (v.length > 1) {
        const d = Number(v[0]);
        const sides = Number(v[1]);
        const res = rollDice(d, sides);
        setDice(res.values);
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

  return { diceValue, handleDice, dice };
};

export default useDice;
