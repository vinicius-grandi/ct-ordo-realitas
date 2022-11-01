import { useState } from 'react';
import styles from '@styles/main.module.sass';
import useT from '../../lib/hooks/useT';

export default function SelectRituals({
  nextPage,
  handleSelectedElement,
  selectedElements,
}: {
  nextPage: () => void;
  handleSelectedElement: (e: string) => void;
  selectedElements: string[];
}) {
  const [errorMsg, setErrorMsg] = useState('');
  const elements = ['blood', 'fear', 'knowledge', 'energy', 'death'];

  const t = useT();
  return (
    <>
      <h1>{t('rituais.title')}</h1>
      {errorMsg.length > 0 && <p>{errorMsg}</p>}
      <div className={styles.rituais}>
        {elements.map((element) => {
          const isElemSelected = selectedElements.findIndex((s) => s === element) !== -1;
          return (
            <button
              type="button"
              key={element}
              onClick={() => handleSelectedElement(element)}
              id={styles[element]}
              className={isElemSelected ? styles[`glow-${element}`] : undefined}
            >
              {t(`rituais.${element}`)}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => {
            if (elements.length > 0) {
              nextPage();
            } else {
              setErrorMsg(t<string>('rituais.ritualsQuiz.noElementsAlert'));
            }
          }}
          className={styles['start-quiz']}
        >
          {t('rituais.startQuiz')}
        </button>
      </div>
    </>
  );
}
