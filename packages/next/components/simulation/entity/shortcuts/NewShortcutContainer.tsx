import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from '@styles/main.module.sass';
import { addNewShortcut } from '@ct-ordo-realitas/app/redux/battlefieldSlice';
import useFocusNext from '../../../../lib/hooks/useFocusNext';

export default function NewShortcutContainer({ eid }: { eid: string }) {
  const verifyValue = (name: string, value: string) => {
    const r = /^[d+*-/ \d]*$/gi;
    if (name === 'shortcutDice' && !r.test(value)) {
      return false;
    }
    return true;
  };
  const focusNext = useFocusNext();
  const initialState = {
    shortcutName: '',
    shortcutDice: '',
  };
  const [shortcut, setShortcut] = useState(initialState);
  const [newShortcut, setNewShortcut] = useState(false);
  const handleNewShortcut = () => setNewShortcut(!newShortcut);
  const hasShortcut = shortcut.shortcutName.length > 0 && shortcut.shortcutDice.length > 0;
  const dispatch = useDispatch();
  const handleShortcutChange = ({ target: { value, name } }: ChangeEvent<HTMLInputElement>) => {
    if (!verifyValue(name, value)) {
      return false;
    }
    setShortcut({ ...shortcut, [name]: value });
    return true;
  };
  return (
    <>
      {newShortcut && (
        <div className={styles['new-shortcut']}>
          <label htmlFor="shortcutName">
            nome:
            <input
              type="text"
              name="shortcutName"
              id="shortcutName"
              placeholder="ex: agredir"
              value={shortcut.shortcutName}
              onChange={handleShortcutChange}
              ref={focusNext}
            />
          </label>
          <label htmlFor="shortcutDice">
            dados:
            <input
              type="text"
              name="shortcutDice"
              value={shortcut.shortcutDice}
              placeholder="ex: 2d6"
              id="shortcutDice"
              ref={focusNext}
              onChange={handleShortcutChange}
            />
          </label>
          {hasShortcut && (
            <button
              type="button"
              onClick={() => {
                dispatch(
                  addNewShortcut({
                    eid,
                    shortcut: {
                      name: shortcut.shortcutName,
                      dice: shortcut.shortcutDice,
                    },
                  }),
                );
                setShortcut(initialState);
              }}
            >
              salvar
            </button>
          )}
        </div>
      )}
      {!hasShortcut && (
        <button
          type="button"
          aria-label="add-new-shortcut"
          onClick={() => {
            handleNewShortcut();
            setShortcut(initialState);
          }}
        >
          {newShortcut ? '-' : '+'}
        </button>
      )}
    </>
  );
}
