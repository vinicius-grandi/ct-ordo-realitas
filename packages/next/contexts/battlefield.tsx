import {
  createContext,
  useContext,
  useRef,
  useMemo,
} from 'react';

type BattlefieldContext = {
  battlefieldRef: React.RefObject<HTMLDivElement> | null;
};

const battlefieldContext = createContext<BattlefieldContext>({
  battlefieldRef: null,
});

function BattlefieldProvider({ children }: { children: JSX.Element[] | JSX.Element }) {
  const battlefieldRef = useRef<HTMLDivElement>(null);
  const values = useMemo(() => ({ battlefieldRef }), []);

  return <battlefieldContext.Provider value={values}>{children}</battlefieldContext.Provider>;
}

export function useBattlefield() {
  return useContext(battlefieldContext);
}

export default BattlefieldProvider;
