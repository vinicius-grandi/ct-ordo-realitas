import { Button } from 'react-native-paper';

import styles from '../styles/main.sass';

export default function CloseButton({ handleClose }: { handleClose: () => void }) {
  return (
    <Button labelStyle={styles['close-btn']} onPress={() => handleClose()}>
      X
    </Button>
  );
}
