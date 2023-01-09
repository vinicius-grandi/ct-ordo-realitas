import useEntities from '@ct-ordo-realitas/next/lib/hooks/useEntities';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';

import Battlefield from '../components/simulacao/Battlefield';
import Entity from '../components/simulacao/Entity';
import styles from '../styles/main.sass';

export default function Simulacao() {
  const { t } = useTranslation();
  const { addEntity, removeEntity, enemies, players, setPlayers, setEnemies } = useEntities(Entity);

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <Text style={styles.title}>{t('batalha.title')}</Text>
      <View style={styles.list}>
        {t<string, string[]>('batalha.tips', { returnObjects: true }).map((val, idx) => (
          <Text style={styles.text} key={idx}>
            &#8226;{val}
          </Text>
        ))}
      </View>
      <Battlefield
        addEntity={addEntity}
        enemies={enemies}
        players={players}
        removeEntity={removeEntity}
      />
    </View>
  );
}
