import { useState, useCallback } from 'react';
import { useSimulacao } from '../../contexts/simulacao';
import type { Entities } from '../../components/simulation/Battlefield';
// import type { InputChangeEvent } from '../../components/simulation/Entity';
import type { EntityConfig, ShortcutT } from '../../components/simulation/Shortcut';

export type EventHandler = {
  target: { name: string, value: string }
};

export type HandleChange = (ev: EventHandler) => string | null;

export default function useEntity(
  type: Entities,
  extraInfo: EntityConfig,
  eid: string,
  removeEntity: (t: Entities, k: string) => void | null,
) {
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
    setNewShortcut(!newShortcut);
    setShortcut(shortcutInitialValue);
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

  const handleChange: HandleChange = (ev) => {
    const map = {
      'shortcut-dice': 'dados',
      'shortcut-name': 'nome',
    };
    const {
      target: { name, value },
    } = ev;

    if (name === 'nome' && value.length > 15) return null;

    if (name === 'shortcut-dice' || name === 'shortcut-name') {
      const isValid = verifyValue(name, value);

      if (!isValid) return null;

      setShortcut({ ...shortcut, [map[name]]: value });
      return value;
    }

    if (name in entity) {
      setEntity({ ...entity, [name]: value });
      return value;
    }
    return null;
  };

  const handleRemoval = () => {
    removeEntity(type, eid);
  };

  return {
    entity,
    shortcut,
    setNewShortcut,
    handleChange,
    handleOverlay,
    handleRemoval,
    handleNewShortcut,
    newShortcut,
    showOverlay,
  };
}
