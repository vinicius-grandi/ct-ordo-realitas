/* eslint-disable react/jsx-props-no-spreading */
import '@styles/globals.sass';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { AppStore, wrapper } from '@ct-ordo-realitas/app/redux/reducers';
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Header from '@components/Header';
import Footer from '@components/Footer';
// import removeFromRoomOnDisconnect from '@ct-ordo-realitas/
// app/firebase/jogos/salas/removeFromRoomsOnDisconnect';
// import { useEffect } from 'react';
import BattlefieldProvider from '../contexts/battlefield';
import AuthProvider from '../contexts/auth';

const Providers = ({
  children,
  store,
}: {
  children: JSX.Element | JSX.Element[];
  store: AppStore;
}) => (
  <Provider store={store}>
    <BattlefieldProvider>
      <AuthProvider>{children}</AuthProvider>
    </BattlefieldProvider>
  </Provider>
);

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const router = useRouter();

  // useEffect(() => () => {
  //   if (router.pathname.match(/\/jogos\/.*/)) {
  //     removeFromRoomOnDisconnect();
  //   }
  // });

  if (router.pathname === '/rituais/adicionar' || router.pathname === '/admin/login') {
    return (
      <Providers store={store}>
        <Component {...props.pageProps} />
      </Providers>
    );
  }
  return (
    <Providers store={store}>
      <Header />
      <Component {...props.pageProps} />
      <Footer />
    </Providers>
  );
}

export default appWithTranslation(MyApp);
