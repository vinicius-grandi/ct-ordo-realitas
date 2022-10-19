import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import getStaticProps from '../components/withTranslationProps';
import styles from '../styles/main.module.sass';

const Home: NextPage = () => (
  <>
    <Head>
      <title>Ordo Realitas - Centro de Treinamento</title>
    </Head>
    <main className={styles.content}>
      <h1>BOAS VINDAS!</h1>
      <p>Bem vindo, caro agente,</p>
      <p>
        Esse é o centro de treinamento da Ordo Realitas, aqui você poderá realizar
        diversos tipos de atividades, como simulações e estudos do
        {' '}
        <strong>Outro Lado.</strong>
      </p>
      <p className={styles.link}>
        Como recomendação, caso o ocultismo seja de seu interesse, visite a página
        de
        {' '}
        <Link href="/classe/ocultista">Sigilos</Link>
      </p>
    </main>
  </>
);

export { getStaticProps };

export default Home;
