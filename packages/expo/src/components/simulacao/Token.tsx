import { Text, Pressable, StyleSheet } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

import styles from '../../styles/main.sass';

const styling = StyleSheet.create({
  token: {
    fontSize: 16,
    backgroundColor: '#fff',
    position: 'absolute',
    paddingLeft: 6,
    paddingRight: 6,
    bottom: '10%',
  },
  nome: {
    top: 0,
    position: 'absolute',
    zIndex: 2,
    color: '#fff',
  },
});

export default function Token({
  nome,
  pv,
  type,
  handleOverlay,
  handleRemoval,
}: {
  nome: string;
  type: string;
  pv: string;
  handleOverlay: () => void;
  handleRemoval: () => void;
}) {
  return (
    <Pressable
      style={styles.token}
      onLongPress={() => handleRemoval()}
      onPress={() => handleOverlay()}>
      <Text style={styling.nome}>{nome}</Text>
      <Svg viewBox="0 0 600 520" width="50" height="50" style={{ position: 'relative' }}>
        <Polygon points="300,0 600,520 0,520" fill={type === 'enemy' ? '#BE393E' : '#007843'} />
      </Svg>
      <Text style={styling.token}>{pv}</Text>
    </Pressable>
  );
}
