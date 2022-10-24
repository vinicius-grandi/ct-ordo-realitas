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

type EntityActionId = Action<{ eid: string; type: Entities }>;

type ChangeEntityAction = Action<{ eid: string; name: keyof EntityConfig; value: string; type: Entities }>;

type AddNewShortcutAction = Action<{ eid: string; shortcut: Shortcut; type: Entities }>;

export type BattlefieldSliceValues = {
  entities: {
    player: EntityConfig[],
    enemy: EntityConfig[],
  };
  isSelectionMode: boolean;
  attack: {
    damage: number;
    targets: Record<string, null>;
  };
  entitiesCount: {
    enemy: number;
    player: number;
  };
  currOverlay: null | string;
  currType: null | Entities;
  idToType: {
    [key in number]: string
  }
};

const battlefieldSlice = createSlice<
  BattlefieldSliceValues,
  SliceCaseReducers<BattlefieldSliceValues>,
  'battlefieldUpdater'
>({
  name: 'battlefieldUpdater',
  initialState: {
    entities: {
      enemy: [],
      player: [],
    },
    isSelectionMode: false,
    attack: {
      targets: {},
      damage: 0,
    },
    entitiesCount: {
      enemy: 0,
      player: 0,
    },
    currOverlay: null,
    currType: null,
    idToType: {}
  },
  reducers: {
    addEntity: (state, { payload: { type } }: AddEntityAction) => {
      const id = uuidv4();
      state.entitiesCount[type] += 1;
      state.entities[type].push({
        id,
        type: type,
        hp: 0,
        name: `${type}${state.entitiesCount[type]}`,
        shortcuts: [],
        notes: '',
      });
    },
    removeEntity: (state, { payload: { eid, type } }: EntityActionId) => {
      const entities = state.entities[type];
      state.entities[type] = entities.filter((entity) => entity.id !== eid);
    },
    changeEntity: (state, { payload: { eid, name, value, type } }: ChangeEntityAction) => {
      const isInputValid = validateInputs({ name, value });
      if (isInputValid) {
        const idx = state.entities[type].findIndex(({ id }) => id === eid);
        state.entities[type][idx] = {
          ...state.entities[type][idx],
          [name]: value,
        };
      }
    },
    addNewShortcut: (state, { payload: { shortcut: newShortcut, eid, type } }: AddNewShortcutAction) => {
      const isInputValid = validateInputs({
        name: 'newShortcut',
        value: newShortcut.dice,
      });

      if (isInputValid) {
        const idx = state.entities[type].findIndex(({ id }) => id === eid);
        state.entities[type][idx].shortcuts.push(newShortcut);
      }
    },
    handleSelectionMode: (state) => {
      state.isSelectionMode = !state.isSelectionMode;
    },
    handleTargets: (state, { payload: { eid: newTarget } }: EntityActionId) => {
      let targets = state.attack.targets;
      if (newTarget in targets) {
        delete state.attack.targets[newTarget];
      } else {
        state.attack.targets[newTarget] = null;
      }
    },
    completeAttack: (state, action) => {
      if (action.payload.decision === 'attack') {
        const damagedEnemies = state.entities.enemy.map((enemy) => {
          if (enemy.id in state.attack.targets) {
            return {
              ...enemy,
              hp: state.attack.damage
            }
          }
          return enemy;
        });
        const damagedPlayers = state.entities.player.map((player) => {
          if (player.id in state.attack.targets) {
            return {
              ...player,
              hp: state.attack.damage
            }
          }
          return player;
        });
        state.entities.player = damagedPlayers;
        state.entities.enemy = damagedEnemies;
      }
      state.attack.targets = {};
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
      const entitiesValues = state.entities[state.currType ?? 'player'];
      const currTargetIdx = entitiesValues.findIndex((_, idx) => idx === state.currOverlay);
      if (currTargetIdx !== -1 && currTargetIdx < entitiesValues.length - 1 && nextOrPrev === 'next') {
        state.currOverlay = currTargetIdx + 1;
      }
      if (currTargetIdx !== -1 && currTargetIdx > 0 && nextOrPrev === 'prev') {
        state.currOverlay = currTargetIdx - 1;
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

export const selectEntity = (type: Entities, idx: number) => (state: RootState) =>
  state.battlefieldReducer.entities[type][idx];

export const selectShortcuts = (type: Entities, idx: number) => (state: RootState) =>
  state.battlefieldReducer.entities[type][idx].shortcuts;

export const selectType = (idx: number) => (state: RootState) => state.battlefieldReducer.idToType[idx];

export const selectIsSelectionMode = (state: RootState) => state.battlefieldReducer.isSelectionMode;

export const selectAttack = (state: RootState) => state.battlefieldReducer.attack;

export const selectDamage = (state: RootState) => state.battlefieldReducer.attack.damage;

export const selectTargets = (state: RootState) => state.battlefieldReducer.attack.targets;

export const selectCurrOverlay = (state: RootState) => state.battlefieldReducer.currOverlay;

export const selectCurrType = (state: RootState) => state.battlefieldReducer.currType;

export default battlefieldSlice.reducer;
