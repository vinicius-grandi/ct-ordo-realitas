import React, {
  createContext,
  useMemo,
  useContext,
  useState,
} from 'react';
import { EntityConfig } from '../components/simulation/Shortcut';

type Config = {
  entidades: {
    player: {
      [key in string]: EntityConfig
    },
    enemy: {
      [key in string]: EntityConfig
    }
  },
};

type ConfigState = {
  config: Config;
  setConfig: React.Dispatch<React.SetStateAction<Config>>;
};

const ContextSimulacao = createContext<ConfigState>({
  setConfig: () => {},
  config: {
    entidades: {
      player: {},
      enemy: {},
    },
  },
});

function SimulacaoProvider({ children }: { children: JSX.Element[] }) {
  const [config, setConfig] = useState<Config>({
    entidades: {
      player: {},
      enemy: {},
    },
  });

  const value = useMemo(() => ({ config, setConfig }), [config]);

  return (
    <ContextSimulacao.Provider value={value}>
      {children}
    </ContextSimulacao.Provider>
  );
}

export const useSimulacao = () => {
  const { config, setConfig } = useContext(ContextSimulacao);
  return { config, setConfig };
};

export default SimulacaoProvider;
