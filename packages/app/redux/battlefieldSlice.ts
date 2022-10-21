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
  };
  entitiesCount: {
    enemy: number;
    player: number;
  };
  currOverlay: null | string;
  currType: null | Entities;
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
    entitiesCount: {
      enemy: 0,
      player: 0,
    },
    currOverlay: null,
    currType: null,
  },
  reducers: {
    addEntity: (state, { payload: { type } }: AddEntityAction) => {
      const id = uuidv4();
      state.entitiesCount[type] += 1;
      state.entities = {
        ...state.entities,
        [id]: {
          id,
          type: type,
          hp: 0,
          name: `${type}${state.entitiesCount[type]}`,
          shortcuts: [],
          notes: '',
        },
      };
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
    addNewShortcut: (state, { payload: { shortcut: newShortcut, eid } }: AddNewShortcutAction) => {
      const isInputValid = validateInputs({
        name: 'newShortcut',
        value: newShortcut.dice,
      });

      if (isInputValid) {
        state.entities[eid].shortcuts.push(newShortcut);
      }
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
    importEntities: (state, { payload: { loadedEntities } }) => {
      state.entities = loadedEntities;
    },
    setCurrOverlay: (state, { payload: { eid } }) => {
      state.currOverlay = eid;
    },
    setCurrType: (state, { payload: { type } }) => {
      state.currType = type;
    },
    changeCurrType: (state) => {
      state.currType = state.currType === 'enemy' ? 'player' : 'enemy';
      const entitiesValues = Object.values(state.entities).filter(({ type }) => type === state.currType);
      if (entitiesValues.length > 0) {
        state.currOverlay = entitiesValues[0].id;
      }
    },
    handleEntities: (state, { payload: { nextOrPrev }}) => {
      const entitiesValues = Object.values(state.entities).filter(({ type }) => type === state.currType);
      const currTargetIdx = entitiesValues.findIndex((entity) => entity.id === state.currOverlay);
      if (currTargetIdx !== -1 && currTargetIdx < entitiesValues.length - 1 && nextOrPrev === 'next') {
        state.currOverlay = entitiesValues[currTargetIdx + 1].id;
      }
      if (currTargetIdx !== -1 && currTargetIdx > 0 && nextOrPrev === 'prev') {
        state.currOverlay = entitiesValues[currTargetIdx - 1].id;
      }
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
  importEntities,
  setCurrOverlay,
  setCurrType,
  handleEntities,
  changeCurrType,
} = battlefieldSlice.actions;

export const selectEntities = (state: RootState) => state.battlefieldReducer.entities;

export const selectEntity = (eid: string) => (state: RootState) =>
  state.battlefieldReducer.entities[eid];

export const selectShortcuts = (eid: string) => (state: RootState) =>
  state.battlefieldReducer.entities[eid].shortcuts;

export const selectIsSelectionMode = (state: RootState) => state.battlefieldReducer.isSelectionMode;

export const selectAttack = (state: RootState) => state.battlefieldReducer.attack;

export const selectDamage = (state: RootState) => state.battlefieldReducer.attack.damage;

export const selectTargets = (state: RootState) => state.battlefieldReducer.attack.targets;

export const selectCurrOverlay = (state: RootState) => state.battlefieldReducer.currOverlay;

export const selectCurrType = (state: RootState) => state.battlefieldReducer.currType;

export default battlefieldSlice.reducer;
