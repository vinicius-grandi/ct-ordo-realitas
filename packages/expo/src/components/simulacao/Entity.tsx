import { Entities } from '@ct-ordo-realitas/next/components/simulation/Battlefield';
import type { EntityConfig } from '@ct-ordo-realitas/next/components/simulation/Shortcut';
import useEntity from '@ct-ordo-realitas/next/lib/hooks/useEntity';
import { entityDefaultProps, entityPropTypes } from '@ct-ordo-realitas/next/types';
import { Text } from 'react-native';

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
  const {
    entity,
    shortcut,
    handleChange,
    handleOverlay,
    handleRemoval,
    handleNewShortcut,
    newShortcut,
    showOverlay,
  } = useEntity(type, extraInfo, eid, removeEntity);
  return (
    <Token
      handleOverlay={handleOverlay}
      nome={entity.nome}
      type={type}
      handleRemoval={handleRemoval}
      pv={String(entity.pv)}
    />
  );
}

Entity.propTypes = entityPropTypes;

Entity.defaultProps = entityDefaultProps;

export default Entity;
