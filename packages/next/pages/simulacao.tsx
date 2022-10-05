/* eslint-disable @typescript-eslint/quotes */
import { NextPage } from 'next';
import Battlefield from '../components/simulation/Battlefield';
import { useSimulacao } from '../contexts/simulacao';
import styles from '../styles/main.module.sass';
import Entity from '../components/simulation/Entity';
import useEntities from "../lib/hooks/useEntities";

const SimulationPage: NextPage = () => {
  const {
    addEntity,
    removeEntity,
    enemies,
    players,
    setPlayers,
    setEnemies,
  } = useEntities(Entity);
  const { config, setConfig } = useSimulacao();

  return (
    <main className={styles.simulacao}>
      <h1>Simulação</h1>
      <ul className={styles['true-list']}>
        <li>Para editar as informações do alvo, efetue um clique simples sobre ele</li>
        <li>
          Você pode clicar e segurar em um inimigo ou aliado para removê-lo do campo de batalha
        </li>
      </ul>
      <Battlefield
        addEntity={addEntity}
        enemies={enemies}
        players={players}
        removeEntity={removeEntity}
      />
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
                  setConfig(json);
                  setPlayers(
                    Object.keys(json.entidades.player).map((eid) => (
                      <Entity
                        eid={eid}
                        type="player"
                        removeEntity={removeEntity}
                        extraInfo={json.entidades.player[eid]}
                      />
                    )),
                  );
                  setEnemies(
                    Object.keys(json.entidades.enemy).map((eid) => (
                      <Entity
                        eid={eid}
                        type="enemy"
                        removeEntity={removeEntity}
                        extraInfo={json.entidades.enemy[eid]}
                      />
                    )),
                  );
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
          const blob = new Blob([JSON.stringify(config)], { type: 'text/json' });
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

export default SimulationPage;
