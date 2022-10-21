import { addEntity } from '@ct-ordo-realitas/app/redux/battlefieldSlice';
import type { Entities } from '@ct-ordo-realitas/next/components/simulation/Battlefield';
import { View, Pressable, Text } from 'react-native';
import { useDispatch } from 'react-redux';

import styles from '../../styles/main.sass';
import Entity from './Entity';

const Button = ({
  children,
  styling,
  type,
}: {
  children: string;
  styling: object;
  type: Entities;
}) => {
  const dispatch = useDispatch();
  return (
    <Pressable style={styling} onPress={() => dispatch(addEntity({ type }))}>
      <Text style={styles['token-text']}>{children}</Text>
    </Pressable>
  );
};

export default function Battlefield() {
  return (
    <View style={styles.battlefield}>
      <Button styling={styles['add-enemy']} type="enemy">
        +
      </Button>
      <View style={styles.entity}>
        {enemies.map(({ props: { type, eid, extraInfo } }) => (
          <Entity
            type={type}
            key={eid}
            eid={eid}
            removeEntity={removeEntity}
            extraInfo={extraInfo}
          />
        ))}
      </View>
      <View style={styles.entity}>
        {players.map(({ props: { type, eid, extraInfo } }) => (
          <Entity
            type={type}
            key={eid}
            eid={eid}
            removeEntity={removeEntity}
            extraInfo={extraInfo}
          />
        ))}
      </View>
      <Button styling={styles['add-player']} addEntity={addEntity} type="player">
        +
      </Button>
    </View>
  );
}
