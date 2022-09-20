/* eslint-disable @typescript-eslint/quotes */
import { NextPage } from 'next';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Battlefield, { Entities } from '../components/simulation/Battlefield';
import { useSimulacao } from '../contexts/simulacao';
import styles from '../styles/main.module.sass';
import Entity from "../components/simulation/Entity";

const SimulationPage: NextPage = () => {
  const { config, setConfig } = useSimulacao();
  const [enemies, setEnemies] = useState<JSX.Element[]>([]);
  const [players, setPlayers] = useState<JSX.Element[]>([]);

  const removeEntity = (e: Entities, k: string) => {
    switch (e) {
      case ('player'):
        return setPlayers(players.filter(({ key }) => key !== k));
      case ('enemy'):
        return setEnemies(enemies.filter(({ key }) => key !== k));
      default:
        return null;
    }
  };

  const addEntity = (e: Entities) => {
    const id = uuidv4();
    switch (e) {
      case ('player'):
        return setPlayers([
          ...players,
          <Entity type="player" key={id} eid={id} removeEntity={removeEntity} />,
        ]);
      case ('enemy'):
        return setEnemies([
          ...enemies,
          <Entity type="enemy" key={id} eid={id} removeEntity={removeEntity} />,
        ]);
      default:
        return null;
    }
  };

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
              reader.onload = (e) => {
                if (e.target !== null && typeof e.target.result === 'string') {
                  const json = JSON.parse(e.target.result);
                  setConfig(json);
                  setPlayers(
                    Object.keys(json.entidades.player).map((eid) => <Entity eid={eid} type="player" removeEntity={removeEntity} extraInfo={json.entidades.player[eid]} />),
                  );
                  setEnemies(
                    Object.keys(json.entidades.enemy).map((eid) => <Entity eid={eid} type="enemy" removeEntity={removeEntity} extraInfo={json.entidades.enemy[eid]} />),
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
