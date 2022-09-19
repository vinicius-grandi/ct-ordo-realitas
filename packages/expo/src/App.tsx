import {
  Text,
  Platform,
  StatusBar,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import view from '@ct-ordo-realitas/app/components/data';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>{view}</Text>
    </SafeAreaView>
  );
}
