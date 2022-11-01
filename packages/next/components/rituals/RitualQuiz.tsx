import { useEffect, useState } from 'react';
import api from '@ct-ordo-realitas/app/firebase/clientApp';
import styles from '@styles/main.module.sass';
import useT from '../../lib/hooks/useT';
import RitualCard from './RitualCard';

export type Ritual = {
  name: string;
  imagePath: string;
  type: string;
};

export default function RitualQuiz({
  selectedElements,
  nextPage,
  handleActualScore,
  handleMaxScore,
}: {
  selectedElements: string[];
  nextPage: () => void;
  handleActualScore: () => void;
  handleMaxScore: (max: number) => void }) {
  const t = useT();
  const [rituals, setRituals] = useState<Ritual[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      const promiseData = selectedElements.map((elem) => api.getRituals(elem));
      const querySnapshotArr = await Promise.all(promiseData);
      const res: Ritual[] = [];
      querySnapshotArr.forEach(
        (querySnapshot) => querySnapshot.forEach((doc) => res.push(doc.data() as Ritual)),
      );
      setRituals(res);
      setLoading(false);
    }
    void getData();
  }, [selectedElements]);
  const tips = t('rituals.ritualQuiz.tips', true);
  return (
    <div className={styles['ritual-quiz']}>
      <h1>{t('rituais.title')}</h1>
      {loading && (
        <div style={{ width: 'fit-content' }}>
          <p className={styles['rituals-loading']}>loading...</p>
        </div>
      )}
      <ul>
        {Array.isArray(tips) && tips.map((tip, idx) => <li key={`tip-${idx + 1}`}>{tip}</li>)}
      </ul>
      <ul className={styles['card-container']}>
        {rituals.map((ritual, idx) => (
          <RitualCard key={`ritual-${idx + 1}`} ritual={ritual} handleActualScore={handleActualScore} />
        ))}
      </ul>
      <button
        type="button"
        className={styles['finish-quiz']}
        onClick={() => {
          handleMaxScore(rituals.length);
          nextPage();
        }}
      >
        {t('rituais.ritualQuiz.finishQuiz')}
      </button>
    </div>
  );
}
