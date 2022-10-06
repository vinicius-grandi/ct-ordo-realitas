import styles from '@styles/main.module.sass';
import { v4 as uuidv4 } from 'uuid';
import useFocusNext from '../../../lib/hooks/useFocusNext';
import Shortcut from '../Shortcut';
import type { EntityConfig, ShortcutT } from '../Shortcut.d';
import type { InputChangeEvent } from '../Entity';

export default function Shortcuts({
  entity,
  newShortcut,
  handleChange,
  handleNewShortcut,
  shortcut,
}: {
  entity: EntityConfig;
  newShortcut: boolean;
  handleChange: (ev: InputChangeEvent) => void;
  handleNewShortcut: () => void;
  shortcut: ShortcutT;
}) {
  const focusNext = useFocusNext();
  const hasShortcut = shortcut.nome.length > 0 && shortcut.dados.length > 0;
  return (
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
              placeholder="ex: agredir"
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
              placeholder="ex: 2d6"
              id="shortcut-dice"
              ref={focusNext}
              onChange={handleChange}
            />
          </label>
          {hasShortcut && (
          <button type="button" onClick={handleNewShortcut}>
            salvar
          </button>
          )}
        </div>
      )}
      {!hasShortcut && (
      <button
        type="button"
        aria-label="add-new-shortcut"
        onClick={handleNewShortcut}
      >
        {newShortcut ? '-' : '+'}
      </button>
      )}
    </div>
  );
}
