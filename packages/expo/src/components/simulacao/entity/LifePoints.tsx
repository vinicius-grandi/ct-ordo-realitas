import type { EntityConfig } from '@ct-ordo-realitas/next/components/simulation/Shortcut';
import type { EventHandler } from '@ct-ordo-realitas/next/lib/hooks/useEntity';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

import styles from '../../../styles/main.sass';

export default function LifePoints({
  entity,
  handleChange,
}: {
  entity: EntityConfig;
  handleChange: (ev: EventHandler) => void;
}) {
  const { t } = useTranslation();
  return (
    <View style={styles.line}>
      <Text style={styles['overlay-title']}>{t('batalha.overlay.hpTab')}</Text>
      <TextInput
        defaultValue={String(entity.pv)}
        activeOutlineColor="#ffffff"
        style={styles['life-points']}
        mode="outlined"
        keyboardType="numeric"
        onChangeText={(text) => {
          handleChange({ target: { value: text, name: 'pv' } });
        }}
        theme={{ colors: { text: '#fff' } }}
      />
    </View>
  );
}
