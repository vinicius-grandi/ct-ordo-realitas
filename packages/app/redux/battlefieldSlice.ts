import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import validateInputs from '../lib/validateInputs';
import { RootState } from './reducers';

export type Entities = 'player' | 'enemy';

export type Shortcut = {
  name: string;
  dice: string;
};

export type EntityConfig = {
  id: string;
  type: Entities;
  hp: number;
  name: string;
  shortcuts: Shortcut[];
  notes: string;
};

type Action<T> = {
  type: string;
  payload: T;
};

type AddEntityAction = Action<{
  type: Entities;
}>;

type EntityActionId = Action<{ eid: string }>;

type ChangeEntityAction = Action<{ eid: string; name: keyof EntityConfig; value: string }>;

type AddNewShortcutAction = Action<{ eid: string; shortcut: Shortcut }>;

export type BattlefieldSliceValues = {
  entities: {
    [key in string]: EntityConfig;
  };
  isSelectionMode: boolean;
  attack: {
    damage: number;
    targets: string[];
  }
  entityShortcut: {
    [key in string]: Shortcut[];
  },
};

const battlefieldSlice = createSlice<
  BattlefieldSliceValues,
  SliceCaseReducers<BattlefieldSliceValues>,
  'battlefieldUpdater'
>({
  name: 'battlefieldUpdater',
  initialState: {
    entities: {},
    isSelectionMode: false,
    attack: {
      targets: [],
      damage: 0,
    },
    entityShortcut: {},
  },
  reducers: {
    addEntity: (state, action: AddEntityAction) => {
      const id = uuidv4();
      state.entities = {
        ...state.entities,
        [id]: {
          id,
          type: action.payload.type,
          hp: 0,
          name: action.payload.type,
          shortcuts: [],
          notes: '',
        },
      };
      state.entityShortcut[id] = [];
    },
    removeEntity: (state, { payload: { eid } }: EntityActionId) => {
      delete state.entities[eid];
    },
    changeEntity: (state, { payload: { eid, name, value } }: ChangeEntityAction) => {
      const isInputValid = validateInputs({ name, value });
      if (isInputValid) {
        let entity = state.entities[eid];
        state.entities[eid] = {
          ...entity,
          [name]: value,
        };
      }
    },
    addNewShortcut: (
      state,
      { payload: { shortcut: newShortcut, eid } }: AddNewShortcutAction
    ) => {
      state.entityShortcut[eid].push(newShortcut);
    },
    handleSelectionMode: (state) => {
      state.isSelectionMode = !state.isSelectionMode;
    },
    handleTargets: (state, { payload: { eid: newTarget } }: EntityActionId) => {
      let targets = state.attack.targets;
      if (targets.findIndex((id) => newTarget === id) < 0) {
        state.attack.targets.push(newTarget);
      } else {
        state.attack.targets = targets.filter((id) => id !== newTarget);
      }
    },
    completeAttack: (state, action) => {
      if (action.payload.decision === 'attack') {
        state.attack.targets.forEach((eid) => {
          state.entities[eid].hp -= state.attack.damage;
        });
      }
      state.attack.targets = [];
      state.attack.damage = 0;
      state.isSelectionMode = false;
    },
    setDamage: (state, action) => {
      state.attack.damage = Number(action.payload.damage);
    },
  },
});

export const {
  addEntity,
  removeEntity,
  changeEntity,
  addNewShortcut,
  completeAttack,
  handleTargets,
  handleSelectionMode,
  setDamage,
} = battlefieldSlice.actions;

export const selectEntities = (state: RootState) => state.battlefieldReducer.entities;

export const selectEntity = (
  eid: string
) => (state: RootState) => state.battlefieldReducer.entities[eid];

export const selectShortcuts = (eid: string) => (state: RootState) => state.battlefieldReducer.entityShortcut[eid];

export const selectIsSelectionMode = (state: RootState) => state.battlefieldReducer.isSelectionMode;

export const selectAttack = (state: RootState) => state.battlefieldReducer.attack;

export const selectTargets = (state: RootState) => state.battlefieldReducer.attack.targets;

export default battlefieldSlice.reducer;
