import React from 'react';
import styles from '@styles/main.module.sass';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { selectShortcuts, Shortcut as SC } from '@ct-ordo-realitas/app/redux/battlefieldSlice';
import Shortcut from '../Shortcut';
import NewShortcutContainer from './shortcuts/NewShortcutContainer';
import useT from '../../../lib/hooks/useT';

function Shortcuts({ eid, handleOverlay }: { eid: string; handleOverlay: () => void }) {
  const shortcuts = useSelector(selectShortcuts(eid));
  const t = useT();

  return (
    <div className={styles['shortcuts-tab']}>
      <h2>{t('batalha.overlay.shortcuts.title')}</h2>
      <div className={styles.shortcuts}>
        {shortcuts.length > 0 &&
          shortcuts.map((val: SC) => (
            <Shortcut
              diceName={val.name}
              diceConfig={val.dice}
              key={uuidv4()}
              handleOverlay={handleOverlay}
            />
          ))}
      </div>
      <NewShortcutContainer eid={eid} />
    </div>
  );
}

export default React.memo(Shortcuts);
