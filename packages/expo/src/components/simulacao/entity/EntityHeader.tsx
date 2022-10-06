import type { EntityConfig } from '@ct-ordo-realitas/next/components/simulation/Shortcut.d';
import { EventHandler } from '@ct-ordo-realitas/next/lib/hooks/useEntity';
import { useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, BackHandler } from 'react-native';

import UserIcon from '../../../../assets/user-icon.svg';
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
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      handleOverlay();
      return true;
    });
    return () => backHandler.remove();
  }, []);
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
