import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => (
  <main>
    <h1>BOAS VINDAS!</h1>
    <p>Bem vindo, caro Agente,</p>
    <p>
      Esse é o centro de treinamento da Ordo Realitas, aqui você poderá realizar
      diversos tipos de atividades, como simulações e estudos do
      {' '}
      <strong>Outro Lado.</strong>
    </p>
    <p>
      Como recomendação, caso o ocultismo seja de seu interesse, visite a página
      de
      {' '}
      <Link href="/classe/ocultista">Sigilos</Link>
    </p>
  </main>
);

export default Home;
