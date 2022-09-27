import { Pressable, Text } from 'react-native';

import styles from '../styles/main.sass';

export default function CloseButton({ handleClose }: { handleClose: () => void }) {
  return (
    <Pressable onPress={() => handleClose()}>
      <Text style={styles['close-btn']}>X</Text>
    </Pressable>
  );
}
