import store from '@ct-ordo-realitas/app/redux/reducers';
import Provider from '@ct-ordo-realitas/next/contexts/battlefield';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import { Text, Platform, StatusBar, StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { NativeRouter, Link, Route, Routes } from 'react-router-native';
import '@ct-ordo-realitas/app/translate/i18mobile';

import background from '../assets/background.png';
import Simulacao from './pages/Simulacao';


const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
  },
});

const Home = () => {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <Link to="/">
        <Text>{t('home')}</Text>
      </Link>
      <Link to="/simulacao">
        <Text>Simulação</Text>
      </Link>
    </SafeAreaView>
  );
};

const Safe = ({ children }: { children: JSX.Element }) => (
  <SafeAreaView style={styles.container}>{children}</SafeAreaView>
);

// @ct-ordo-realitas/next/public/images/background.png
export default function App() {
  const [fontsLoaded] = useFonts({
    Vazirmatn: require('../assets/Vazirmatn.ttf'),
  });

  if (!fontsLoaded) return <Text>Loading</Text>;

  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <NativeRouter>
          <Provider>
            <ImageBackground source={background} style={{ flex: 1 }}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Safe>
                      <Home />
                    </Safe>
                  }
                />
                <Route
                  path="/simulacao"
                  element={
                    <Safe>
                      <Simulacao />
                    </Safe>
                  }
                />
              </Routes>
            </ImageBackground>
          </Provider>
        </NativeRouter>
      </PaperProvider>
    </ReduxProvider>
  );
}
