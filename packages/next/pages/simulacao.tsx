/* eslint-disable @typescript-eslint/quotes */
import { NextPage } from 'next';
import Head from 'next/head';
import { Trans, withTranslation } from 'next-i18next';
import Battlefield from '../components/simulation/Battlefield';
import styles from '../styles/main.module.sass';
import getStaticProps from '../components/withTranslationProps';
import useT from '../lib/hooks/useT';
import SimulacaoConfig from '../components/simulation/SimulacaoConfig';

const SimulationPage: NextPage = () => {
  const t = useT();
  return (
    <main className={styles.simulacao}>
      <Head>
        <title>Simulação de Batalha</title>
      </Head>
      <h1>{t('simulacao.title')}</h1>
      <ul className={styles['true-list']}>
        {t<string[]>('simulacao.tips', true).map((val, idx) => {
          console.log(val);
          return (
          <li key={`tip ${idx + 1}`}>
            <Trans components={{ span: <span className={styles.tips} /> }}>{val}</Trans>
          </li>
        )})}
      </ul>
      <Battlefield />
      <h1>{t('simulacao.configuration.title')}</h1>
      <SimulacaoConfig />
    </main>
  );
};

export { getStaticProps };

export const Simulation = withTranslation('common')(SimulationPage);

export default SimulationPage;
