import { withTranslation } from 'next-i18next';
import Chat from '../../components/jogos/caixoes/Chat';
import getStaticProps from '../../components/withTranslationProps';
import useT from '../../lib/hooks/useT';

export default function CaixoesPage() {
  const t = useT();
  return (
    <main>
      <h1>{t('caixoes.uDevil')}</h1>
      <h2>{t('caixoes.timeRemaining')}</h2>
      <h2>
        {t('caixoes.existencePoints')}
        :
      </h2>
      <Chat />
    </main>
  );
}

export const Caixoes = withTranslation('common')(CaixoesPage);

export { getStaticProps };
