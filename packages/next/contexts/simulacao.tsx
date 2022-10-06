import {
  createContext,
  useMemo,
  useContext,
  useState,
} from 'react';
import type { EntityConfig } from '../components/simulation/Shortcut.d';

type Config = {
  entidades: {
    player: {
      [key in string]: EntityConfig;
    };
    enemy: {
      [key in string]: EntityConfig;
    };
  };
};

type ConfigState = {
  config: Config;
  setConfig: React.Dispatch<React.SetStateAction<Config>>;
  showOverlay: boolean;
  handleOverlay: () => void;
  handleSelectedTargets: (target: string) => void;
  selectedTargets: string[];
  isSelectionMode: boolean;
  handleIsSelectionMode: () => void;
};

const ContextSimulacao = createContext<ConfigState>({
  setConfig: () => {},
  config: {
    entidades: {
      player: {},
      enemy: {},
    },
  },
  selectedTargets: [],
  handleSelectedTargets: () => {},
  isSelectionMode: false,
  handleIsSelectionMode: () => {},
  showOverlay: false,
  handleOverlay: () => {},
});

function SimulacaoProvider({ children }: { children: JSX.Element[] | JSX.Element }) {
  const [config, setConfig] = useState<Config>({
    entidades: {
      player: {},
      enemy: {},
    },
  });
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedTargets, setSelectedTargets] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const value = useMemo(() => ({
    config,
    setConfig,
    showOverlay,
    handleOverlay: () => setShowOverlay(!showOverlay),
    selectedTargets,
    handleSelectedTargets: (target: string) => setSelectedTargets([...selectedTargets, target]),
    handleIsSelectionMode: () => setIsSelectionMode(!isSelectionMode),
    isSelectionMode,
  }), [config, isSelectionMode, selectedTargets, showOverlay]);

  return <ContextSimulacao.Provider value={value}>{children}</ContextSimulacao.Provider>;
}

export const useSimulacao = () => useContext(ContextSimulacao);

export default SimulacaoProvider;
