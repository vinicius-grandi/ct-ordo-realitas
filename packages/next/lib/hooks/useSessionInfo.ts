import { useEffect, useState } from 'react';
import getSession from '@ct-ordo-realitas/app/firebase/jogos/sessoes/getSession';
import type { Session } from '@ct-ordo-realitas/app/firebase/jogos/sessoes/Session.d';
import useQueryParameter from './useQueryParameter';

export default function useSessionInfo() {
  const [sessionInfo, setSessionInfo] = useState<Session>();
  const session = useQueryParameter('session');

  useEffect(() => {
    const unsubscribe = getSession((data) => setSessionInfo(data), session);
    return () => unsubscribe();
  }, [session]);

  return sessionInfo;
}
