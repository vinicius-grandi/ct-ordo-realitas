import type { EntityConfig } from '@ct-ordo-realitas/next/components/simulation/Shortcut';
import type { HandleChange } from '@ct-ordo-realitas/next/lib/hooks/useEntity';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';

import styles from '../../../styles/main.sass';

export default function Notes({
  entity,
  handleChange,
}: {
  entity: EntityConfig;
  handleChange: HandleChange;
}) {
  return (
    <View style={styles.notes}>
      <Text style={{ color: '#fff' }}>Notas</Text>
      <TextInput
        defaultValue={entity.notas}
        multiline
        numberOfLines={10}
        onChangeText={(txt) => {
          handleChange({ target: { name: 'notas', value: txt } });
        }}
      />
    </View>
  );
}
