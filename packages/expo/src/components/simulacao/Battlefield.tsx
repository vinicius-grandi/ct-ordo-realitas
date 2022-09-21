import { View, Pressable, Text } from 'react-native';
import styles from '../../styles/main.sass';

const Button = ({ children }: { children: string }) => (
  <Pressable>
    <Text>{children}</Text>
  </Pressable>
);

export default function Battlefield() {
  return (
    <View style={styles.battlefield}>
      <Button>+</Button>
      <Button>+</Button>
    </View>
  )
}
