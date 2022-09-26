import Provider from '@ct-ordo-realitas/next/contexts/simulacao';
import { useTranslation } from 'react-i18next';
import { Text, Platform, StatusBar, StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import { NativeRouter, Link, Route, Routes } from 'react-router-native';

import background from '../assets/background.png';
import Simulacao from './pages/Simulacao';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
  },
});

const Home = () => <Text>Home</Text>;
// @ct-ordo-realitas/next/public/images/background.png
export default function App() {
  const { t } = useTranslation();
  return (
    <NativeRouter>
      <Provider>
        <ImageBackground source={background} style={{ flex: 1 }}>
          <SafeAreaView style={styles.container}>
            <Link to="/">
              <Text>{t('home')}</Text>
            </Link>
            <Link to="/simulacao">
              <Text>Simulação</Text>
            </Link>
          </SafeAreaView>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/simulacao" element={<Simulacao />} />
          </Routes>
        </ImageBackground>
      </Provider>
    </NativeRouter>
  );
}
