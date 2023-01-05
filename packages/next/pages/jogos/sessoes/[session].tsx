import { useEffect, useState } from 'react';
import countdown from '@ct-ordo-realitas/app/firebase/jogos/sessoes/countdown';
import getUid from '@ct-ordo-realitas/app/firebase/jogos/sessoes/getUid';
import styles from '@styles/main.module.sass';
import useQueryParameter from '../../../lib/hooks/useQueryParameter';
import { getStaticProps, getStaticPaths } from '../../../components/withTranslationProps';
import useSessionInfo from '../../../lib/hooks/useSessionInfo';
import Chat from '../../../components/jogos/caixoes/Chat';
import GameInfo from '../../../components/jogos/caixoes/GameInfo';
import Coffins from '../../../components/jogos/caixoes/Coffins';

export default function SessionPage() {
  const [remainingSeconds, setRemainingSeconds] = useState('timeout');
  const [countdownPhase, setCountdownPhase] = useState('');
  const sessionInfo = useSessionInfo();
  const session = useQueryParameter('session');
  const [uid, setUid] = useState('');

  useEffect(() => {
    const unsubscribe = getUid((id) => setUid(id));

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const subscribes = countdown(
      (rs) => setRemainingSeconds(rs),
      session,
      (phase) => setCountdownPhase(phase),
    );
    return () => {
      subscribes
        .then((s) => {
          s.forEach((unsubscribe) => unsubscribe());
        })
        .catch(() => {});
    };
  }, [session]);
  return sessionInfo ? (
    <main className={styles['sessao-container']} style={{ maxHeight: '100vh' }}>
      {countdownPhase !== 'discussionTime' ? (
        <GameInfo remainingSeconds={remainingSeconds} sessionInfo={sessionInfo} uid={uid} />
      ) : (
        <>
          {remainingSeconds}
          <Coffins
            coffins={sessionInfo.coffins.map((k) => {
              if (k.player && k.player in sessionInfo.players) {
                return sessionInfo.players[k.player].name;
              }
              return k.player ?? '';
            })}
            selectedCoffins={sessionInfo.selectedCoffins ?? []}
          />
        </>
      )}
      <Chat player={sessionInfo.players[uid].name} />
    </main>
  ) : (
    <h1>loading</h1>
  );
}

export { getStaticPaths };
export { getStaticProps };