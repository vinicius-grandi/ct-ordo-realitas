import '../styles/globals.sass';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '@ct-ordo-realitas/app/redux/reducers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SimulacaoProvider from '../contexts/simulacao';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <SimulacaoProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </SimulacaoProvider>
    </Provider>
  );
}

export default MyApp;
