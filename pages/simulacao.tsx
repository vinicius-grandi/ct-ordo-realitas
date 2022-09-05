/* eslint-disable @typescript-eslint/quotes */
import { NextPage } from 'next';
import { setConfig } from "next/config";
import Battlefield from '../components/simulation/Battlefield';
import { useSimulacao } from '../contexts/simulacao';
import styles from '../styles/main.module.sass';

const SimulationPage: NextPage = () => {
  const { config } = useSimulacao();
  return (
    <main className={styles.simulacao}>
      <h1>Simulação</h1>
      <ul className={styles['true-list']}>
        <li>Para editar as informações do alvo, efetue um clique simples sobre ele</li>
        <li>
          Você pode clicar e segurar em um inimigo ou aliado para removê-lo do campo de batalha
        </li>
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
              reader.onload = (e) => {
                if (e.target !== null && typeof e.target.result === 'string') {
                  const json = JSON.parse(e.target.result);
                  setConfig(json);
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
          const blob = new Blob([JSON.stringify(config)], { type: "text/json" });
          const link = document.createElement("a");

          link.download = 'simulacao-config.json';
          link.href = window.URL.createObjectURL(blob);
          link.dataset.downloadurl = ["text/json", link.download, link.href].join(":");

          link.click();
          link.remove();
        }}
      >
        exportar

      </button>
    </main>
  );
};

export default SimulationPage;
