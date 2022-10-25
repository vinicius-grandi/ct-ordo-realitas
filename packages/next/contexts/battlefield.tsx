import {
  createContext,
  useContext,
  useRef,
  useMemo,
} from 'react';

type BattlefieldContext = {
  battlefieldRef: React.RefObject<HTMLDivElement> | null;
  scrollIntoBattlefield: () => void;
};

const battlefieldContext = createContext<BattlefieldContext>({
  battlefieldRef: null,
  scrollIntoBattlefield: () => {},
});

function BattlefieldProvider({ children }: { children: JSX.Element[] | JSX.Element }) {
  const battlefieldRef = useRef<HTMLDivElement>(null);
  const scrollIntoBattlefield = () => {
    if (typeof battlefieldRef?.current?.scrollIntoView === 'function') {
      setTimeout(() => battlefieldRef.current?.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      }), 0);
    }
  };
  const values = useMemo(() => ({ battlefieldRef, scrollIntoBattlefield }), []);

  return <battlefieldContext.Provider value={values}>{children}</battlefieldContext.Provider>;
}

export function useBattlefield() {
  return useContext(battlefieldContext);
}

export default BattlefieldProvider;
