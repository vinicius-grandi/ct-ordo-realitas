import { useEffect, useState } from 'react';
import getSession from '@ct-ordo-realitas/app/firebase/jogos/sessoes/getSession';
import useQueryParameter from './useQueryParameter';

type Session = {
  coffins: (string | number)[];
  players: {
    [key in string]: {
      name: string;
      existencePoints: number;
    };
  };
  targets: number;
  countdown: {
    startAt: number;
    seconds: number;
  }
};

export default function useSessionInfo() {
  const [sessionInfo, setSessionInfo] = useState<Session>();
  const session = useQueryParameter('session');

  useEffect(() => {
    const unsubscribe = getSession((data) => setSessionInfo(data), session);
    return () => unsubscribe();
  }, [session]);

  return sessionInfo;
}
