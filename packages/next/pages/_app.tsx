import '../styles/globals.sass';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper } from '@ct-ordo-realitas/app/redux/reducers';
import { appWithTranslation } from 'next-i18next';
import BattlefieldProvider from '../contexts/battlefield';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <BattlefieldProvider>
        <Header />
        <Component {...props.pageProps} />
        <Footer />
      </BattlefieldProvider>
    </Provider>
  );
}

export default appWithTranslation(MyApp);
