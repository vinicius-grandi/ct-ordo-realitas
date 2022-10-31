import { useEffect, useState } from 'react';
// import api from '@ct-ordo-realitas/app/firebase/clientApp';
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
  useEffect(() => {
    async function getData() {
      // const promiseData = selectedElements.map((elem) => api.getRituals(elem));
      // const querySnapshotArr = await Promise.all(promiseData);
      // const res: Ritual[] = [];
      // querySnapshotArr.forEach(
      //   (querySnapshot) => querySnapshot.forEach((doc) => res.push(doc.data() as Ritual)),
      // );
      // setRituals(res);
      setRituals([{
        imagePath: '',
        name: 'Cinerária',
        type: 'blood',
      }]);
    }
    void getData();
  }, [selectedElements]);
  const tips = t('rituals.ritualQuiz.tips', true);
  return (
    <div>
      <h1>{t('rituais.ritualQuiz.title')}</h1>
      <ul>
        {Array.isArray(tips) && tips.map((tip, idx) => <li key={`tip-${idx + 1}`}>{tip}</li>)}
      </ul>
      <ul>
        {rituals.map((ritual, idx) => (
          <RitualCard key={`ritual-${idx + 1}`} ritual={ritual} handleActualScore={handleActualScore} />
        ))}
      </ul>
      <button
        type="button"
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
