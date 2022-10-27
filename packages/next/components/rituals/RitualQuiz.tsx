import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getRituals } from '@ct-ordo-realitas/app/firebase/clientApp';
import useT from '../../lib/hooks/useT';

type Ritual = {
  name: string;
  imagePath: string;
  type: string;
};

export default function RitualQuiz({ selectedElements }: { selectedElements: string[] }) {
  const t = useT();
  const [rituals, setRituals] = useState<Ritual[]>([]);
  useEffect(() => {
    async function getData() {
      const promiseData = selectedElements.map((elem) => getRituals(elem));
      const querySnapshotArr = await Promise.all(promiseData);
      const res: Ritual[] = [];
      querySnapshotArr.forEach((qs) => qs.docs.forEach((doc) => res.push(doc.data() as Ritual)));
      setRituals(res);
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
          <li key={`ritual-${idx + 1}`}>
            <Image src={ritual.imagePath} width={100} height={100} alt="unknown ritual" />
            <input type="text" placeholder={t<string>('rituais.ritualQuiz.ritualPlaceholder')} />
          </li>
        ))}
      </ul>
    </div>
  );
}
