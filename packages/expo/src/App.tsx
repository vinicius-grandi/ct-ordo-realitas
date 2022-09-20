import {
  Text,
  Platform,
  StatusBar,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Simulacao from './pages/Simulacao';
import { NativeRouter, Link, Route, Routes } from 'react-router-native';
import { useTranslation } from 'react-i18next'

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

const Home = () => <Text>Home</Text>;

export default function App() {
  const { t } = useTranslation();
  return (
    <NativeRouter>
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
    </NativeRouter>
  );
}
