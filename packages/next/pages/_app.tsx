import '../styles/globals.sass';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SimulacaoProvider from '../contexts/simulacao';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SimulacaoProvider>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </SimulacaoProvider>
  );
}

export default MyApp;
