import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { Entities } from '@ct-ordo-realitas/next/components/simulation/Battlefield';
import { EntityConfig } from '@ct-ordo-realitas/next/components/simulation/Shortcut';
import { defaultProps, propTypes } from "@ct-ordo-realitas/next/components/simulation/Entity";

function Entity({
  type,
  eid,
  removeEntity,
  extraInfo,
}: {
  type: Entities;
  eid: string;
  removeEntity: (t: Entities, k: string) => void | null;
  extraInfo: EntityConfig;
}) {
  return <Text>Entity</Text>;
}


Entity.propTypes = propTypes;

Entity.defaultProps = defaultProps;

export default Entity;
