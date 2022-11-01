import { useCallback, useMemo, useState } from 'react';
import styles from '@styles/main.module.sass';
import useT from '../../lib/hooks/useT';
import RitualQuiz from './RitualQuiz';
import SelectRituals from './SelectRituals';

export default function SelectPage() {
  const t = useT();
  const [page, setPage] = useState(1);
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const initialScores = { max: 0, actual: 0 };
  const [scores, setScores] = useState(initialScores);

  const handleActualScore = useCallback(
    () => setScores({ ...scores, actual: scores.actual + 1 }),
    [scores],
  );

  const handleMaxScore = useCallback(
    (max: number) => {
      setScores({ ...scores, max });
    },
    [scores],
  );

  const value = useMemo(
    () => ({ handleActualScore, handleMaxScore }),
    [handleActualScore, handleMaxScore],
  );

  const handleSelectedElement = (e: string) => {
    const isElemAlreadySelected = selectedElements.findIndex((elem) => elem === e) !== -1;

    if (isElemAlreadySelected) {
      const arrWithoutElement = selectedElements.filter((elem) => elem !== e);
      setSelectedElements(arrWithoutElement);
    } else {
      setSelectedElements([...selectedElements, e]);
    }
  };
  const nextPage = () => {
    if (page >= 3) {
      setPage(1);
    } else {
      setPage(page + 1);
    }
  };

  const resetQuiz = () => {
    setSelectedElements([]);
    nextPage();
    setScores(initialScores);
  };

  switch (page) {
    case 1:
      return (
        <SelectRituals
          nextPage={nextPage}
          handleSelectedElement={handleSelectedElement}
          selectedElements={selectedElements}
        />
      );
    case 2:
      return (
        <RitualQuiz
          nextPage={nextPage}
          selectedElements={selectedElements}
          handleActualScore={value.handleActualScore}
          handleMaxScore={value.handleMaxScore}
        />
      );
    case 3:
      return (
        <>
          <h1>
            SCORE:
            {' '}
            {scores.actual}
            /
            {scores.max}
          </h1>
          <button className={styles['finish-quiz']} type="button" onClick={() => resetQuiz()}>
            {t('rituais.resetQuiz')}
          </button>
        </>
      );
    default:
      return (
        <SelectRituals
          nextPage={nextPage}
          handleSelectedElement={handleSelectedElement}
          selectedElements={selectedElements}
        />
      );
  }
}
