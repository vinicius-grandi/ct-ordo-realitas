import { useState } from 'react';
import useT from '../../lib/hooks/useT';

export default function SelectRituals({
  nextPage,
  handleSelectedElement,
}: { nextPage: () => void, handleSelectedElement: (e: string) => void }) {
  const [errorMsg, setErrorMsg] = useState('');
  const elements = ['blood', 'fear', 'knowledge', 'energy', 'death'];

  const t = useT();
  return (
    <div>
      <h1>{t('rituais.title')}</h1>
      {errorMsg.length > 0 && <p>{errorMsg}</p>}
      {elements.map((element) => (
        <button type="button" key={element} onClick={() => handleSelectedElement(element)}>
          {t(`rituais.${element}`)}
        </button>
      ))}
      <button
        type="button"
        onClick={() => {
          if (elements.length > 0) {
            nextPage();
          } else {
            setErrorMsg(t<string>('rituais.ritualsQuiz.noElementsAlert'));
          }
        }}
      >
        {t('rituais.startQuiz')}
      </button>
    </div>
  );
}
