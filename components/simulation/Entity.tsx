import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import type { Entities } from './Battlefield';
import styles from '../../styles/main.module.sass';
import useFocusNext from '../../lib/hooks/useFocusNext';
import Shortcut, { EntityConfig, ShortcutT } from './Shortcut';

const Entity = ({ type }: { type: Entities }) => {
  const focusNext = useFocusNext();
  const [showOverlay, setShowOverlay] = useState(false);
  const [newShortcut, setNewShortcut] = useState(false);
  const shortcutInitialValue = {
    dados: '',
    nome: '',
  };
  const [shortcut, setShortcut] = useState<ShortcutT>(shortcutInitialValue);
  const [entity, setEntity] = useState<EntityConfig>({
    tipo: type,
    pv: 0,
    nome: type,
    atalhos: [],
    notas: '',
  });

  const handleNewShortcut = () => {
    setNewShortcut(false);
    setEntity({ ...entity, atalhos: [...entity.atalhos, shortcut] });
    setShortcut(shortcutInitialValue);
  };

  const handleOverlay = () => {
    setShowOverlay(!showOverlay);
    document.body.style.overflow = showOverlay ? 'initial' : 'hidden';
  };

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const map = {
      'shortcut-dice': 'dados',
      'shortcut-name': 'nome',
    };
    const {
      target: { name, value },
    } = ev;

    if (name === 'nome' && value.length > 15) return;

    if (name === 'shortcut-dice' || name === 'shortcut-name') {
      setShortcut({ ...shortcut, [map[name]]: value });
    }
    if (name in entity) {
      setEntity({ ...entity, [name]: value });
      console.log(entity);
    }
  };

  return (
    <>
      <div className={styles[type]}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 600 520"
          width="50"
          height="50"
        >
          <polygon points="300,0 600,520 0,520" fill="#007843" />
        </svg>
        <button type="button" onClick={handleOverlay}>
          {entity.nome}
        </button>
        <output>0</output>
      </div>
      {showOverlay && (
        <div className={styles['simulation-overlay']}>
          <div className={styles['name-tab']}>
            <span>
              <Image src="/images/user-icon.svg" width={50} height={50} alt="user-icon" />
              {type === 'player' ? 'monstro' : 'jogador'}
            </span>
            <input type="text" value={entity.nome} name="nome" onChange={handleChange} />
            <button type="button" aria-label="close" onClick={handleOverlay}>
              X
            </button>
          </div>
          <div className={styles['life-points-tab']}>
            <h2>Pontos de Vida</h2>
            <input type="number" name="pv" value={entity.pv} onChange={handleChange} />
          </div>
          <div className={styles['shortcuts-tab']}>
            <h2>Atalhos</h2>
            <div className={styles.shortcuts}>
              {entity.atalhos.length > 0 &&
                entity.atalhos.map((val) => (
                  <Shortcut nome={val.nome} dados={val.dados} key={uuidv4()} />
                ))}
            </div>
            {newShortcut && (
              <div className={styles['new-shortcut']}>
                <label htmlFor="shortcut-name">
                  nome:
                  <input
                    type="text"
                    name="shortcut-name"
                    id="shortcut-name"
                    value={shortcut.nome}
                    onChange={handleChange}
                    ref={focusNext}
                  />
                </label>
                <label htmlFor="shortcut-dice">
                  dados:
                  <input
                    type="text"
                    name="shortcut-dice"
                    value={shortcut.dados}
                    id="shortcut-dice"
                    ref={focusNext}
                    onChange={handleChange}
                  />
                </label>
                <button type="button" onClick={handleNewShortcut}>
                  salvar
                </button>
              </div>
            )}
            <button
              type="button"
              aria-label="add-new-shortcut"
              onClick={() => {
                setNewShortcut(true);
              }}
            >
              +
            </button>
          </div>
          <div>
            <h2>Notas</h2>
            <textarea
              name="notas"
              value={entity.notas}
              cols={20}
              rows={10}
              onChange={handleChange}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Entity;
