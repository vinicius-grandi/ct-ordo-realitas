import type {
  EntityConfig,
  ShortcutT,
} from '@ct-ordo-realitas/next/components/simulation/Shortcut';
import type { EventHandler } from '@ct-ordo-realitas/next/lib/hooks/useEntity';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import styles from '../../../styles/main.sass';

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
  handleChange: (ev: EventHandler) => void;
}) => (
  <View>
    <Text>{label}</Text>
    <TextInput
      placeholder={placeholder}
      defaultValue={value}
      onChangeText={(text) => {
        handleChange({ target: { name, value: text } });
      }}
    />
  </View>
);

export default function ShortcutsShortcuts({
  entity,
  newShortcut,
  handleChange,
  handleNewShortcut,
  shortcut,
}: {
  entity: EntityConfig;
  newShortcut: boolean;
  handleChange: (ev: EventHandler) => void;
  handleNewShortcut: () => void;
  shortcut: ShortcutT;
}) {
  const { t } = useTranslation();
  return (
    <View style={styles.shortcuts}>
      <Text style={{ ...styles['overlay-title'], width: '100%' }}>
        {t('simulacao.overlay.shortcuts.title')}
      </Text>
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
        </View>
      )}
      {/* {(shortcut.nome.length < 1 || shortcut.dados.length < 1) && ( */}
        <Button
          labelStyle={styles['shortcut-button-text']}
          style={styles['shortcut-button']}
          onPress={handleNewShortcut}>
          {newShortcut ? '-' : '+'}
        </Button>
      {/* )} */}
    </View>
  );
}
