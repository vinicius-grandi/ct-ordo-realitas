/* eslint-disable @typescript-eslint/quotes */
import { NextPage } from 'next';
import Head from 'next/head';
import { withTranslation } from 'next-i18next';
import styles from '../styles/main.module.sass';
import getStaticProps from '../components/withTranslationProps';
import useT from '../lib/hooks/useT';

const RitualsPage: NextPage = () => {
  const t = useT();
  return (
    <main className={styles.simulacao}>
      <Head>
        <title>Simulação de Batalha</title>
      </Head>
      <h1>{t('rituais.title')}</h1>
    </main>
  );
};

export { getStaticProps };

export const Rituals = withTranslation('common')(RitualsPage);

export default RitualsPage;
