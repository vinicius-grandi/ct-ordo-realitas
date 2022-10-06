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
