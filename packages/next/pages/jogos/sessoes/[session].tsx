import { useEffect, useState } from 'react';
import countdown from '@ct-ordo-realitas/app/firebase/jogos/sessoes/countdown';
import getUid from '@ct-ordo-realitas/app/firebase/jogos/sessoes/getUid';
import styles from '@styles/main.module.sass';
import { Trans } from 'next-i18next';
import useQueryParameter from '../../../lib/hooks/useQueryParameter';
import { getStaticProps, getStaticPaths } from '../../../components/withTranslationProps';
import useSessionInfo from '../../../lib/hooks/useSessionInfo';
import Chat from '../../../components/jogos/caixoes/Chat';
import useT from '../../../lib/hooks/useT';

export default function SessionPage() {
  const t = useT();
  const [remainingSeconds, setRemainingSeconds] = useState('timeout');
  const sessionInfo = useSessionInfo();
  const session = useQueryParameter('session');
  const [uid, setUid] = useState('');

  useEffect(() => {
    const unsubscribe = getUid((id) => setUid(id));

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const subscribes = countdown((rs) => setRemainingSeconds(rs), session);
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
      <div style={{ textAlign: 'center' }}>
        <h1>
          <Trans>
            {sessionInfo.devil === uid ? t('you') : sessionInfo.players[sessionInfo.devil]}
            {' '}
            {t('caixoes.xIsTheDevil')}
          </Trans>
        </h1>
        <h2>
          {t('caixoes.remainingTime')}
          {' '}
          {remainingSeconds}
        </h2>
        <h2>
          {t('jogos.existencePoints')}
          {': '}
          {sessionInfo.players[uid].existencePoints}
          /6
        </h2>
      </div>
      <Chat player={sessionInfo.players[uid].name} />
    </main>
  ) : (
    <h1>loading</h1>
  );
}

export { getStaticPaths };
export { getStaticProps };
