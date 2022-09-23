import { View, Pressable, Text } from 'react-native';
import styles from '../../styles/main.sass';
import type { Entities } from "@ct-ordo-realitas/next/components/simulation/Battlefield";

const Button = ({ children, styling }: { children: string; styling: {} }) => (
  <Pressable style={styling}>
    <Text style={styles['token-text']}>
      {children}
    </Text>
  </Pressable>
);

export default function Battlefield(
  {
    players, enemies, addEntity, removeEntity,
  }:
  {
    players: JSX.Element[];
    enemies: JSX.Element[];
    addEntity: (e: Entities) => void;
    removeEntity: (e: Entities, k: string) => void;
  },
) {
  return (
    <View style={styles.battlefield}>
      <Button styling={styles['add-enemy']}>+</Button>
      <Button styling={styles['add-player']}>+</Button>
    </View>
  )
}
