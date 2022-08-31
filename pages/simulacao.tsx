import { NextPage } from 'next';
import Battlefield from '../components/simulation/Battlefield';
import styles from '../styles/main.module.sass';

const SimulationPage: NextPage = () => (
  <main className={styles.simulacao}>
    <h1>Simulação</h1>
    <ul className={styles['true-list']}>
      <li>Para editar as informações do alvo, efetue um clique simples sobre ele</li>
      <li>Você pode clicar e segurar em um inimigo ou aliado para removê-lo do campo de batalha</li>
    </ul>
    <Battlefield />
    <h1>Configuração</h1>
    <button type="button">importar</button>
    <button type="button">exportar</button>
  </main>
);

export default SimulationPage;
