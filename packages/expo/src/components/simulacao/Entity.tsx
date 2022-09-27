import { Entities } from '@ct-ordo-realitas/next/components/simulation/Battlefield';
import type { EntityConfig } from '@ct-ordo-realitas/next/components/simulation/Shortcut';
import useEntity from '@ct-ordo-realitas/next/lib/hooks/useEntity';
import { entityDefaultProps, entityPropTypes } from '@ct-ordo-realitas/next/types';
import { View, StatusBar } from 'react-native';
import { Portal } from 'react-native-paper';

import styles from '../../styles/main.sass';
import EntityHeader from '../simulacao/entity/EntityHeader';
import Token from './Token';

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
    <>
      <StatusBar hidden={showOverlay} />
      {!showOverlay && (
        <Token
          handleOverlay={handleOverlay}
          nome={entity.nome}
          type={type}
          handleRemoval={handleRemoval}
          pv={String(entity.pv)}
        />
      )}
      {showOverlay && (
        <Portal>
          <View style={styles['simulation-overlay']}>
            <EntityHeader
              entity={entity}
              handleChange={handleChange}
              handleOverlay={handleOverlay}
            />
            {/* <LifePoints entity={entity} handleChange={handleChange} />
            <Shortcuts
              entity={entity}
              handleChange={handleChange}
              handleNewShortcut={handleNewShortcut}
              newShortcut={newShortcut}
              shortcut={shortcut}
            />
            <Notes entity={entity} handleChange={handleChange} /> */}
          </View>
        </Portal>
      )}
    </>
  );
}

Entity.propTypes = entityPropTypes;

Entity.defaultProps = entityDefaultProps;

export default Entity;
