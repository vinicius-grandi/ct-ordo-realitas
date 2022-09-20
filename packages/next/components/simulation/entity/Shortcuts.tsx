import styles from '@styles/main.module.sass';
import { v4 as uuidv4 } from 'uuid';
import useFocusNext from '../../../lib/hooks/useFocusNext';
import Shortcut, { EntityConfig, ShortcutT } from '../Shortcut';
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
    </div>
  );
}
