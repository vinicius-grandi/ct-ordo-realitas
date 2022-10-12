import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
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

type ChangeEntityAction = Action<{ eid: string; name: string; value: string }>;

type AddNewShortcutAction = Action<{ eid: string; shortcut: Shortcut }>;

export type BattlefieldSliceValues = {
  entities: {
    [key in string]: EntityConfig;
  };
  isSelectionMode: boolean;
  targets: string[];
  entityShortcut: {
    [key in string]: Shortcut[];
  },
  showOverlay: boolean;
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
    targets: [],
    entityShortcut: {},
    showOverlay: false,
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
      let entity = state.entities[eid];
      state.entities[eid] = {
        ...entity,
        [name]: value,
      };
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
      let targets = state.targets;
      if (targets.findIndex((id) => newTarget === id) < 0) {
        targets.push(newTarget);
      } else {
        targets = targets.filter((id) => id !== newTarget);
      }
    },
    resetTargets: (state) => {
      state.targets = [];
    },
    handleOverlay: (state) => {
      state.showOverlay = !state.showOverlay;
    }
  },
});

export const {
  addEntity,
  removeEntity,
  changeEntity,
  addNewShortcut,
  handleOverlay,
  resetTargets,
  handleTargets,
  handleSelectionMode,
} = battlefieldSlice.actions;

export const selectEntities = (state: RootState) => state.battlefieldReducer.entities;

export const selectEntity = (
  eid: string
) => (state: RootState) => state.battlefieldReducer.entities[eid];

export const selectShortcuts = (eid: string) => (state: RootState) => state.battlefieldReducer.entityShortcut[eid];

export const selectShowOverlay = (state: RootState) => state.battlefieldReducer.showOverlay;

export const selectIsSelectionMode = (state: RootState) => state.battlefieldReducer.isSelectionMode;

export default battlefieldSlice.reducer;
