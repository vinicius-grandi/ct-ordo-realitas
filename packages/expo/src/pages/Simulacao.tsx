import { View, Text, StyleSheet } from 'react-native';
import Battlefield from '../components/simulacao/Battlefield';
import { useTranslation } from 'react-i18next';

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
});

export default function Simulacao() {
  const { t } = useTranslation();
  return (
    <View>
      <Text style={styles.title}>{t('simulacao.configuration.title')}</Text>
      <View>
        {t<string, string[]>('simulacao.tips', { returnObjects: true }).map(
          (val) => (
            <Text style={styles.text}>&#8226;{val}</Text>
          )
        )}
      </View>
      <Battlefield />
    </View>
  );
}
