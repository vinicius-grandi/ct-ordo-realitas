import { importEntities, selectEntities } from '@ct-ordo-realitas/app/redux/battlefieldSlice';
import styles from '@styles/main.module.sass';
import { useDispatch, useSelector } from 'react-redux';
import useT from '../../lib/hooks/useT';

export default function BatalhaConfig() {
  const entities = useSelector(selectEntities);
  const dispatch = useDispatch();
  const t = useT();
  return (
    <div className={styles['import-export-btn']}>
      <label htmlFor="import-config">
        {t('batalha.configuration.import')}
        <input
          type="file"
          id="import-config"
          onChange={(ev) => {
            if (ev.target.files !== null) {
              const reader = new FileReader();
              reader.onload = ({ target }) => {
                if (target !== null && typeof target.result === 'string') {
                  const loadedEntities = JSON.parse(target.result);
                  dispatch(importEntities({ loadedEntities }));
                }
              };
              reader.readAsText(ev.target.files[0]);
            }
          }}
        />
      </label>
      <button
        type="button"
        onClick={() => {
          const blob = new Blob([JSON.stringify(entities)], { type: 'text/json' });
          const link = document.createElement('a');
          link.download = 'simulacao-config.json';
          link.href = window.URL.createObjectURL(blob);
          link.dataset.downloadurl = ['text/json', link.download, link.href].join(':');
          link.click();
          link.remove();
        }}
      >
        {t('batalha.configuration.export')}
      </button>
    </div>
  );
}
