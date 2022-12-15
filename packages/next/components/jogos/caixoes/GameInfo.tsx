import type { Session } from '@ct-ordo-realitas/app/firebase/jogos/sessoes/Session';
import { Trans } from 'next-i18next';
import useT from '../../../lib/hooks/useT';

export default function GameInfo({
  sessionInfo,
  uid,
  remainingSeconds,
}: {
  sessionInfo: Session;
  uid: string;
  remainingSeconds: string;
}) {
  const t = useT();
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>
        <Trans>
          {sessionInfo.devil === uid ? t('you') : sessionInfo.players[sessionInfo.devil].name}
          {' '}
          {t('caixoes.xIsTheDevil')}
        </Trans>
      </h1>
      <h2>
        {t('caixoes.remainingTime')}
        {' '}
        {remainingSeconds}
        s
      </h2>
      <h2>
        {t('jogos.existencePoints')}
        {': '}
        {sessionInfo.players[uid].existencePoints}
        /6
      </h2>
    </div>
  );
}
