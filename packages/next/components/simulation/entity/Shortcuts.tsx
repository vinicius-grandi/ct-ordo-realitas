import React from 'react';
import styles from '@styles/main.module.sass';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { selectShortcuts, Shortcut as SC } from '@ct-ordo-realitas/app/redux/battlefieldSlice';
import Shortcut from '../Shortcut';
import NewShortcutContainer from './shortcuts/NewShortcutContainer';

function Shortcuts({ eid }: { eid: string }) {
  const shortcuts = useSelector(selectShortcuts(eid));

  return (
    <div className={styles['shortcuts-tab']}>
      <h2>Atalhos</h2>
      <div className={styles.shortcuts}>
        {shortcuts.length > 0 &&
          shortcuts.map((val: SC) => (
            <Shortcut nome={val.name} dados={val.dice} key={uuidv4()} />
          ))}
      </div>
      <NewShortcutContainer eid={eid} />
    </div>
  );
}

export default React.memo(Shortcuts);
