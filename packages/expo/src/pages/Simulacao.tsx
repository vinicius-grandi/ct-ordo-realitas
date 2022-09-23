import { View, Text, ScrollView } from 'react-native';
import Battlefield from '../components/simulacao/Battlefield';
import useEntities from '@ct-ordo-realitas/next/lib/hooks/useEntities';
import { useTranslation } from 'react-i18next';
import styles from '../styles/main.sass';
import Entity from "../components/simulacao/Entity";

export default function Simulacao() {
  const { t } = useTranslation();
  const {
    addEntity,
    removeEntity,
    enemies,
    players,
    setPlayers,
    setEnemies,
  } = useEntities(Entity);

  return (
    <View style={{ flex: 20 }}>
      <ScrollView contentContainerStyle={{ flex: 1}}>
        <Text style={styles.title}>{t('simulacao.title')}</Text>
        <View style={styles.list}>
          {t<string, string[]>('simulacao.tips', { returnObjects: true }).map(
            (val, idx) => (
              <Text style={styles.text} key={idx}>&#8226;{val}</Text>
            )
          )}
        </View>
        <Battlefield
          addEntity={addEntity}
          enemies={enemies}
          players={players}
          removeEntity={removeEntity}
        />

      </ScrollView>
    </View>
  );
}
