import type { Session } from './Session.d';
import clone from 'just-clone';

export function removeExistencePoints(session: Session) {
  const result = clone(session);
  const selectedCoffins: number[] = result.selectedCoffins ?? [];
  const coffins: (string | number)[] = result.coffins;
  const remainingTargets = result.targets - selectedCoffins.length;
  console.log(selectedCoffins)

  if (remainingTargets > 0) {
    setRemainingTargets();
  }

  selectedCoffins.forEach((idx) => {
    const key = coffins[idx];
    if (isPlayerKey(key)) {
      result.players[key].existencePoints -= 1;
      if (result.players[key].existencePoints === 0) {
        result.eliminatedPlayers = [...(result.eliminatedPlayers ?? []), key];
      }
    }
  });

  return result;

  function setRemainingTargets() {
    for (let a = getAvailableCoffins(), i = a.length; i--; ) {
      if (selectedCoffins.length === session.targets) {
        break;
      }
      const [randomCoffin] = a.splice(Math.floor(Math.random() * (i + 1)), 1);
      selectedCoffins.push(randomCoffin);
    }
  }

  function isPlayerKey(k: any): k is string {
    return typeof k === 'string';
  }

  function getAvailableCoffins(): number[] {
    return coffins.reduce((availableNumArr: number[], currCoffin, idx) => {
      if (selectedCoffins.findIndex((i) => i === idx)) availableNumArr.push(idx);
      return availableNumArr;
    }, []);
  }
}
