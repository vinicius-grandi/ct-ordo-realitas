import { KeyboardEvent, useEffect } from 'react';
import styles from '../../styles/main.module.sass';
import Token from './Token';
import EntityHeader from './entity/EntityHeader';
import LifePoints from './entity/LifePoints';
import Shortcuts from './entity/Shortcuts';
import type { Entities } from './Battlefield';
import type { EntityConfig } from './Shortcut.d';
import Notes from './entity/Notes';
import { entityDefaultProps, entityPropTypes } from '../../types';
import useEntity from '../../lib/hooks/useEntity';
import { useSimulacao } from '../../contexts/simulacao';

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const Entity = ({
  type,
  eid,
  removeEntity,
  extraInfo,
}: {
  type: Entities;
  eid: string;
  removeEntity: (t: Entities, k: string) => void | null;
  extraInfo: EntityConfig;
}) => {
  const {
    entity,
    shortcut,
    handleChange,
    handleSave,
    handleRemoval,
    handleNewShortcut,
    newShortcut,
  } = useEntity(type, extraInfo, eid, removeEntity);
  const { showOverlay, handleOverlay } = useSimulacao();
  useEffect(() => {
    const handleEsc: any = (ev: KeyboardEvent): void => {
      const key = ev.key.toLowerCase();
      if (key === 'escape' && showOverlay) {
        handleSave();
        handleOverlay();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [handleOverlay, handleSave, showOverlay]);

  return (
    <>
      <Token
        handleSave={handleSave}
        nome={entity.nome}
        type={type}
        handleRemoval={handleRemoval}
        pv={String(entity.pv)}
      />
      {showOverlay && (
        <div className={styles['simulation-overlay']}>
          <EntityHeader entity={entity} handleChange={handleChange} handleSave={handleSave} />
          <LifePoints entity={entity} handleChange={handleChange} />
          <Shortcuts
            entity={entity}
            handleChange={handleChange}
            handleNewShortcut={handleNewShortcut}
            newShortcut={newShortcut}
            shortcut={shortcut}
          />
          <Notes entity={entity} handleChange={handleChange} />
        </div>
      )}
    </>
  );
};

Entity.propTypes = entityPropTypes;

Entity.defaultProps = entityDefaultProps;

export default Entity;
