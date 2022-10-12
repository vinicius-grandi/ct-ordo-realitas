import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';

export type Entities = 'player' | 'enemy';

export type ShortcutArr = {
  name: string;
  dados: string;
};

export type EntityConfig = {
  type: Entities;
  hp: number;
  name: string;
  shortcuts: ShortcutArr[];
  notes: string;
};

type Action<T> = {
  type: string;
  payload: T;
};

type AddEntityAction = Action<{
  eid: string;
  type: Entities;
}>;

type RemoveEntityAction = Action<{ eid: string }>;

export type EntitiesHash = {
  entities: {
    [key in string]: EntityConfig;
  };
};

const battlefieldSlice = createSlice<
  EntitiesHash,
  SliceCaseReducers<EntitiesHash>,
  'battlefieldUpdater'
>({
  name: 'battlefieldUpdater',
  initialState: {
    entities: {},
  },
  reducers: {
    addEntity: (state, action: AddEntityAction) => {
      state.entities = {
        ...state.entities,
        [action.payload.eid]: {
          type: action.payload.type,
          hp: 0,
          name: action.payload.type,
          shortcuts: [],
          notes: '',
        },
      };
    },
    removeEntity: (state, action: RemoveEntityAction) => {
      const entitiesClone = { ...state.entities };
      delete entitiesClone[action.payload.eid];
      state.entities = entitiesClone;
    },
  },
});

export const { addEntity, removeEntity } = battlefieldSlice.actions;

export default battlefieldSlice.reducer;
