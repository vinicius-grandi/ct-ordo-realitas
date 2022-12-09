export type Session = {
  coffins: (string | number)[];
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
