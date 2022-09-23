import { View, Text, ScrollView } from 'react-native';
import Battlefield from '../components/simulacao/Battlefield';
import { useTranslation } from 'react-i18next';
import styles from '../styles/main.sass';

export default function Simulacao() {
  const { t } = useTranslation();
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
        <Battlefield />
      </ScrollView>
    </View>
  );
}
