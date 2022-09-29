import type { EntityConfig } from '@ct-ordo-realitas/next/components/simulation/Shortcut';
import { EventHandler } from '@ct-ordo-realitas/next/lib/hooks/useEntity';
import { View, TextInput, Text, StyleSheet } from 'react-native';

import UserIcon from '../../../../assets/user-icon.svg';
import styles from '../../../styles/main.sass';
import CloseButton from '../../CloseButton';

const localStyle = StyleSheet.create({
  position: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  input: {
    color: '#fff',
    fontSize: 18,
    borderColor: '#fff',
    borderWidth: 1,
    minWidth: '33%',
    textAlign: 'center',
    padding: 10,
  },
});

export default function EntityHeader({
  handleChange,
  handleOverlay,
  entity,
}: {
  handleChange: (ev: EventHandler) => void;
  handleOverlay: () => void;
  entity: EntityConfig;
}) {
  return (
    <View style={localStyle.position}>
      <View>
        <UserIcon width={50} height={50} />
        <Text style={{ color: '#fff' }}>jogador</Text>
      </View>
      <TextInput
        style={localStyle.input}
        defaultValue={entity.nome}
        onChangeText={(text) => {
          handleChange({ target: { value: text, name: 'nome' } });
        }}
      />
      <CloseButton handleClose={handleOverlay} />
    </View>
  );
}
