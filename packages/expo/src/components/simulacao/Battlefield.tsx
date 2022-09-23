import { View, Pressable, Text } from 'react-native';
import { useSimulacao } from '@ct-ordo-realitas/next/contexts/simulacao';
import styles from '../../styles/main.sass';

const Button = ({ children, styling }: { children: string; styling: {} }) => (
  <Pressable style={styling}>
    <Text style={styles['token-text']}>
      {children}
    </Text>
  </Pressable>
);

export default function Battlefield() {
  const { config, setConfig } = useSimulacao();
  return (
    <View style={styles.battlefield}>
      <Button styling={styles['add-enemy']}>+</Button>
      <Button styling={styles['add-player']}>+</Button>
    </View>
  )
}
