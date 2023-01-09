/* eslint-disable @typescript-eslint/quotes */
import { NextPage } from 'next';
import Head from 'next/head';
import { Trans, withTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';
import { selectIsSelectionMode } from '@ct-ordo-realitas/app/redux/battlefieldSlice';
import Battlefield from '@components/batalha/Battlefield';
import getStaticProps from '@components/withTranslationProps';
import BatalhaConfig from '@components/batalha/SimulacaoConfig';
import styles from '../styles/main.module.sass';
import useT from '../lib/hooks/useT';

const SimulationPage: NextPage = () => {
  const t = useT();
  const isSelectionMode = useSelector(selectIsSelectionMode);
  return (
    <main className={styles.simulacao}>
      <Head>
        <title>Simulação de Batalha - CTOR</title>
      </Head>
      {!isSelectionMode && (
      <>
        <h1>{t('batalha.title')}</h1>
        <ul className={styles['true-list']}>
          {'map' in t && t<string[]>('batalha.tips', true).map((val, idx) => (
            <li key={`tip ${idx + 1}`}>
              <Trans components={{ span: <span className={styles.tips} /> }}>{val}</Trans>
            </li>
          ))}
        </ul>
      </>
      )}
      <Battlefield />
      {!isSelectionMode && (
      <>
        <h1>{t('batalha.configuration.title')}</h1>
        <BatalhaConfig />
      </>
      )}
    </main>
  );
};

export { getStaticProps };

export const Simulation = withTranslation('common')(SimulationPage);

export default SimulationPage;
