import type { Coffin } from '../createDevilCoffinsGame';

export type Session = {
  coffins: Coffin[];
  players: {
    [key in string]: {
      name: string;
      existencePoints: number;
    };
  };
  devil: string;
  lastDevil?: string;
  targets: number;
  selectedCoffins?: number[];
  eliminatedPlayers?: string[];
};
