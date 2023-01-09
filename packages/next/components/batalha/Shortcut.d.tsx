import type { Entities } from './Battlefield';

export type ShortcutT = {
  diceName: string;
  diceConfig: string;
};

export type EntityConfig = {
  tipo: Entities;
  pv: number;
  nome: string;
  atalhos: ShortcutT[];
  notas: string;
};
