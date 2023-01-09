import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import getStaticProps from '@components/withTranslationProps';
import styles from '@styles/main.module.sass';
import { Trans } from 'next-i18next';
import useT from '../lib/hooks/useT';

const Home: NextPage = () => {
  const t = useT();
  return (
    <>
      <Head>
        <title>Centro de Treinamento Ordo Realitas</title>
      </Head>
      <main className={styles.content}>
        <h1>{t('home.welcome')}</h1>
        <p>{t('home.firstParagraph')}</p>
        <p>
          <Trans>{t('home.secondParagraph')}</Trans>
        </p>
        <p className={styles.link}>
          {t('home.thirdParagraph')}
          <Link href="/classe/ocultista">Sigilos</Link>
        </p>
      </main>
    </>
  );
};

export { getStaticProps };

export default Home;
