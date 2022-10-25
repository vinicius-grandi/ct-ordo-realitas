import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type Entity from '../../components/simulation/Entity';
import type { Entities } from '../../components/simulation/Battlefield';

const useEntities = (E: typeof Entity) => {
  const [enemies, setEnemies] = useState<JSX.Element[]>([]);
  const [players, setPlayers] = useState<JSX.Element[]>([]);

  const removeEntity = (e: Entities, k: string) => {
    switch (e) {
      case 'player':
        return setPlayers(players.filter(({ key }) => key !== k));
      case 'enemy':
        return setEnemies(enemies.filter(({ key }) => key !== k));
      default:
        return null;
    }
  };

  const addEntity = (e: Entities) => {
    const id = uuidv4();
    switch (e) {
      case 'player':
        setPlayers([
          ...players,
          <E type="player" key={id} eid={id} removeEntity={removeEntity} />,
        ]);
        return true;
      case 'enemy':
        setEnemies([
          ...enemies,
          <E type="enemy" key={id} eid={id} removeEntity={removeEntity} />,
        ]);
        return true;
      default:
        return null;
    }
  };

  return {
    addEntity, removeEntity, enemies, players, setPlayers, setEnemies,
  };
};

export default useEntities;
