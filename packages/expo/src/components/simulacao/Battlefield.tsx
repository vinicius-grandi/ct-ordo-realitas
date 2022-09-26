import type { Entities } from '@ct-ordo-realitas/next/components/simulation/Battlefield';
import { View, Pressable, Text } from 'react-native';

import styles from '../../styles/main.sass';
import Entity from './Entity';

const Button = ({
  children,
  styling,
  type,
  addEntity,
}: {
  children: string;
  styling: object;
  type: Entities;
  addEntity: (t: Entities) => void;
}) => (
  <Pressable style={styling} onPress={() => addEntity(type)}>
    <Text style={styles['token-text']}>{children}</Text>
  </Pressable>
);

export default function Battlefield({
  players,
  enemies,
  addEntity,
  removeEntity,
}: {
  players: JSX.Element[];
  enemies: JSX.Element[];
  addEntity: (e: Entities) => void;
  removeEntity: (e: Entities, k: string) => void;
}) {
  return (
    <View style={styles.battlefield}>
      <Button styling={styles['add-enemy']} addEntity={addEntity} type="enemy">
        +
      </Button>
      {enemies.map(({ props: { type, eid, extraInfo } }) => (
        <Entity type={type} key={eid} eid={eid} removeEntity={removeEntity} extraInfo={extraInfo} />
      ))}
      {players.map(({ props: { type, eid, extraInfo } }) => (
        <Entity type={type} key={eid} eid={eid} removeEntity={removeEntity} extraInfo={extraInfo} />
      ))}
      <Button styling={styles['add-player']} addEntity={addEntity} type="player">
        +
      </Button>
    </View>
  );
}
