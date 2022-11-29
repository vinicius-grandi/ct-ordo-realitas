/* eslint-disable react/jsx-props-no-spreading */
import '@styles/globals.sass';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper } from '@ct-ordo-realitas/app/redux/reducers';
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Header from '@components/Header';
import Footer from '@components/Footer';
import BattlefieldProvider from '../contexts/battlefield';
import AuthProvider from '../contexts/auth';

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const router = useRouter();
  if (router.pathname === '/rituais/adicionar' || router.pathname === '/admin/login') {
    return (
      <Provider store={store}>
        <BattlefieldProvider>
          <AuthProvider>
            <Component {...props.pageProps} />
          </AuthProvider>
        </BattlefieldProvider>
      </Provider>
    );
  }
  return (
    <Provider store={store}>
      <AuthProvider>
        <BattlefieldProvider>
          <Header />
          <Component {...props.pageProps} />
          <Footer />
        </BattlefieldProvider>
      </AuthProvider>
    </Provider>
  );
}

export default appWithTranslation(MyApp);
