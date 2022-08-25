import { NextPage } from 'next';
import Battlefield from '../components/simulation/Battlefield';
import styles from '../styles/main.module.sass';

const SimulationPage: NextPage = () => (
  <main className={styles.simulacao}>
    <h1>Simulação</h1>
    <Battlefield />
    <h1>Configuração</h1>
    <button type="button">importar</button>
    <button type="button">exportar</button>
  </main>
);

export default SimulationPage;
