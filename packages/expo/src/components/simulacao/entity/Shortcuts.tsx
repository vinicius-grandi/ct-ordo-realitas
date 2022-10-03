import type {
  EntityConfig,
  ShortcutT,
} from '@ct-ordo-realitas/next/components/simulation/Shortcut';
import type { HandleChange } from '@ct-ordo-realitas/next/lib/hooks/useEntity';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, FlatList } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import styles from '../../../styles/main.sass';
import Shortcut from './Shortcut';

const NewShortcutInput = ({
  label,
  placeholder,
  value,
  handleChange,
  name,
}: {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  handleChange: HandleChange;
}) => {
  const [val, setVal] = useState('');
  return (
    <View style={styles['shortcut-container']}>
      <Text style={styles['shortcut-label']}>{label}:</Text>
      <TextInput
        placeholder={placeholder}
        style={styles['shortcut-input']}
        value={val}
        onChangeText={(text) => {
          const v = handleChange({ target: { name, value: text } });
          setVal(v === null ? val : v);
        }}
      />
    </View>
  );
};

export default function ShortcutsShortcuts({
  entity,
  newShortcut,
  handleChange,
  handleNewShortcut,
  shortcut,
}: {
  entity: EntityConfig;
  newShortcut: boolean;
  handleChange: HandleChange;
  handleNewShortcut: () => void;
  shortcut: ShortcutT;
}) {
  const { t } = useTranslation();

  const hasShortcut = shortcut.nome.length > 0 && shortcut.dados.length > 0;
  return (
    <View style={styles.shortcuts}>
      <Text style={{ ...styles['overlay-title'], width: '100%' }}>
        {t('simulacao.overlay.shortcuts.title')}
      </Text>
      <View style={styles.shortcuts}>
        <FlatList
          data={entity.atalhos}
          indicatorStyle="white"
          contentContainerStyle={{ overflow: 'scroll' }}
          renderItem={({ item }) => <Shortcut nome={item.nome} dados={item.dados} />}
        />
      </View>
      {newShortcut && (
        <View>
          <NewShortcutInput
            label={t('simulacao.overlay.shortcuts.nameLabel')}
            placeholder={t('simulacao.overlay.shortcuts.name')}
            value={shortcut.nome}
            handleChange={handleChange}
            name="shortcut-name"
          />
          <NewShortcutInput
            label={t('simulacao.overlay.shortcuts.diceLabel')}
            placeholder={t('simulacao.overlay.shortcuts.dice')}
            value={shortcut.dados}
            handleChange={handleChange}
            name="shortcut-dice"
          />
          {hasShortcut && (
            <Button
              labelStyle={styles['shortcut-button-text']}
              style={styles['save-shortcut']}
              onPress={handleNewShortcut}>
              salvar
            </Button>
          )}
        </View>
      )}
      {!hasShortcut && (
        <Button
          labelStyle={styles['shortcut-button-text']}
          style={styles['shortcut-button']}
          onPress={handleNewShortcut}>
          {newShortcut ? '-' : '+'}
        </Button>
      )}
    </View>
  );
}
