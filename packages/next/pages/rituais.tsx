/* eslint-disable @typescript-eslint/quotes */
import { NextPage } from 'next';
import Head from 'next/head';
import { withTranslation } from 'next-i18next';
import styles from '../styles/main.module.sass';
import getStaticProps from '../components/withTranslationProps';
import SelectPage from '../components/rituals/SelectPage';

const RitualsPage: NextPage = () => (
  <main className={styles.simulacao}>
    <Head>
      <title>Simulação de Batalha</title>
    </Head>
    <SelectPage />
  </main>
);

export { getStaticProps };

export const Rituals = withTranslation('common')(RitualsPage);

export default RitualsPage;
