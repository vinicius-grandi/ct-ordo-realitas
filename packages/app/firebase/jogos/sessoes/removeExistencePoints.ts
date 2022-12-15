import type { Session } from './Session.d';
import clone from 'just-clone';

export function updateExistencePoints(session: Session) {
  const result = clone(session);
  const selectedCoffins: number[] = result.selectedCoffins ?? [];
  const coffins: (string | number)[] = result.coffins;

  setRemainingCoffins()
  decreaseExistencePoints();
  return result;

  function decreaseExistencePoints() {
    selectedCoffins.forEach((idx) => {
      const key = coffins[idx];
      if (isPlayerKey(key)) {
        result.players[key].existencePoints -= 1;
        if (result.players[key].existencePoints === 0) {
          result.eliminatedPlayers = [...(result.eliminatedPlayers ?? []), key];
        }
      }
    });
  }
  function areThereCoffinsLeft() {
    return result.targets - selectedCoffins.length > 0;
  }
  function setRemainingCoffins() {
    if (areThereCoffinsLeft()) {
      for (let a = availableCoffins(), i = a.length; i--; ) {
        if (selectedCoffins.length === session.targets) {
          break;
        }
        const [randomCoffin] = a.splice(Math.floor(Math.random() * (i + 1)), 1);
        selectedCoffins.push(randomCoffin);
      }
    }
  }

  function isPlayerKey(k: any): k is string {
    return typeof k === 'string';
  }

  function availableCoffins(): number[] {
    return coffins.reduce((availableNumArr: number[], _, idx) => {
      if (selectedCoffins.findIndex((i) => i === idx)) availableNumArr.push(idx);
      return availableNumArr;
    }, []);
  }
}
