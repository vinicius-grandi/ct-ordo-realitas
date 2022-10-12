import '../styles/globals.sass';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper } from '@ct-ordo-realitas/app/redux/reducers';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Header />
      <Component {...props.pageProps} />
      <Footer />
    </Provider>
  );
}

export default MyApp;
