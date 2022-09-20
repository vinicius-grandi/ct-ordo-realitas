import {
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/main.module.sass';
import Token from './Token';
import { useSimulacao } from '../../contexts/simulacao';
import EntityHeader from './entity/EntityHeader';
import LifePoints from './entity/LifePoints';
import Shortcuts from './entity/Shortcuts';
import type { Entities } from './Battlefield';
import type { EntityConfig, ShortcutT } from './Shortcut';
import Notes from './entity/Notes';

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
  const { setConfig, config } = useSimulacao();
  const [showOverlay, setShowOverlay] = useState(false);
  const [newShortcut, setNewShortcut] = useState(false);
  const shortcutInitialValue = {
    dados: '',
    nome: '',
  };
  const [shortcut, setShortcut] = useState<ShortcutT>(shortcutInitialValue);
  const [entity, setEntity] = useState<EntityConfig>(
    extraInfo ?? {
      tipo: type,
      pv: 0,
      nome: type,
      atalhos: [],
      notas: '',
    },
  );

  const handleNewShortcut = () => {
    setNewShortcut(false);
    if (shortcut.dados.length < 1 || shortcut.nome.length < 1) return;
    setEntity({ ...entity, atalhos: [...entity.atalhos, shortcut] });
    setShortcut(shortcutInitialValue);
  };

  const handleOverlay = useCallback(() => {
    setShowOverlay(!showOverlay);
    setConfig({
      entidades: {
        ...config.entidades,
        [type]: {
          ...config.entidades[type],
          [eid]: entity,
        },
      },
    });
  }, [config.entidades, eid, entity, setConfig, showOverlay, type]);

  const verifyValue = (name: string, value: string) => {
    const r = /^[d+*-/ \d]*$/gi;
    if (name === 'shortcut-dice' && !r.test(value)) {
      return false;
    }
    return true;
  };

  const handleChange = (ev: InputChangeEvent) => {
    const map = {
      'shortcut-dice': 'dados',
      'shortcut-name': 'nome',
    };
    const {
      target: { name, value },
    } = ev;

    if (name === 'nome' && value.length > 15) return;

    if (name === 'shortcut-dice' || name === 'shortcut-name') {
      const isValid = verifyValue(name, value);

      if (!isValid) return;

      setShortcut({ ...shortcut, [map[name]]: value });
    }

    if (name in entity) {
      setEntity({ ...entity, [name]: value });
    }
  };

  useEffect(() => {
    const handleEsc: any = (ev: KeyboardEvent): void => {
      const key = ev.key.toLowerCase();
      if (key === 'escape' && showOverlay) {
        handleOverlay();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [handleOverlay, showOverlay]);

  const handleRemoval = () => {
    removeEntity(type, eid);
  };

  return (
    <>
      <Token
        handleOverlay={handleOverlay}
        nome={entity.nome}
        type={type}
        handleRemoval={handleRemoval}
        pv={String(entity.pv)}
      />
      {showOverlay && (
        <div className={styles['simulation-overlay']}>
          <EntityHeader entity={entity} handleChange={handleChange} handleOverlay={handleOverlay} />
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

Entity.propTypes = {
  type: PropTypes.string.isRequired,
  eid: PropTypes.string.isRequired,
  removeEntity: PropTypes.func.isRequired,
  extraInfo: PropTypes.shape({
    tipo: PropTypes.string,
    pv: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    nome: PropTypes.string,
    atalhos: PropTypes.arrayOf(
      PropTypes.shape({
        dados: PropTypes.string,
        nome: PropTypes.string,
      }),
    ),
    notas: PropTypes.string,
  }),
};

Entity.defaultProps = {
  extraInfo: null,
};

export default Entity;
