/* eslint-disable @typescript-eslint/quotes */
import { NextPage } from 'next';
import { selectEntities } from '@ct-ordo-realitas/app/redux/battlefieldSlice';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { Trans } from 'next-i18next';
import Battlefield from '../components/simulation/Battlefield';
import styles from '../styles/main.module.sass';
import getStaticProps from "../components/withTranslationProps";
import useT from "../lib/hooks/useT";

const SimulationPage: NextPage = () => {
  const entities = useSelector(selectEntities);
  const t = useT();
  return (
    <main className={styles.simulacao}>
      <Head>
        <title>Simulação de Batalha</title>
      </Head>
      <h1>{t('simulacao.title')}</h1>
      <ul className={styles['true-list']}>
        {t<string[]>('simulacao.tips', true).map((val, idx) => (
          <li key={`tip ${idx + 1}`}>
            <Trans components={{ span: <span className={styles.tips} /> }}>{val}</Trans>
          </li>
        ))}
      </ul>
      <Battlefield />
      <h1>Configuração</h1>
      <label htmlFor="import-config">
        importar
        <input
          type="file"
          id="import-config"
          onChange={(ev) => {
            if (ev.target.files !== null) {
              const reader = new FileReader();
              reader.onload = ({ target }) => {
                if (target !== null && typeof target.result === 'string') {
                  const json = JSON.parse(target.result);
                  console.log(json);
                }
              };
              reader.readAsText(ev.target.files[0]);
            }
          }}
          style={{ display: 'none' }}
        />
      </label>
      <button
        type="button"
        onClick={() => {
          const blob = new Blob([JSON.stringify(entities)], { type: 'text/json' });
          const link = document.createElement('a');

          link.download = 'simulacao-config.json';
          link.href = window.URL.createObjectURL(blob);
          link.dataset.downloadurl = ['text/json', link.download, link.href].join(':');

          link.click();
          link.remove();
        }}
      >
        exportar
      </button>
    </main>
  );
};

export { getStaticProps };

export default SimulationPage;
