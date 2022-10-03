import type { ShortcutT } from '@ct-ordo-realitas/next/components/simulation/Shortcut';
import useDice from '@ct-ordo-realitas/next/lib/hooks/useDice';
import { View, Text, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import { Svg, Rect, Text as SvgText } from 'react-native-svg';

import styles from '../../../styles/main.sass';

export default function Shortcut({ nome, dados }: ShortcutT) {
  const { diceValue, handleDice, dice } = useDice(dados);

  return (
    <View>
      <View style={styles.dice}>
        <Text style={{ ...styles['shortcut-label'], flexBasis: '33%' }}>{nome}</Text>
        <View style={{ flexBasis: '33%' }}>
          <Svg width="50" height="50">
            <Rect width="50" height="50" fill="#b3b3b3" />
            <SvgText x="50%" y="60%" textAnchor="middle" fontSize="18" fill="#fff">
              {diceValue}
            </SvgText>
          </Svg>
        </View>
        <Button onPress={handleDice} style={{ flexBasis: '33%' }}>
          rolar
        </Button>
      </View>
      <FlatList
        data={dice}
        renderItem={({ item }: { item: string }) => (
          <Text style={styles['shortcut-label']}>{item}</Text>
        )}
        style={{ height: 50 }}
      />
    </View>
  );
}
