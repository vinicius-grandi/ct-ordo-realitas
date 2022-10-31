import Image from 'next/image';
import { useEffect, useState } from 'react';
import latinize from 'latinize';
import useT from '../../lib/hooks/useT';
import type { Ritual } from './RitualQuiz';

export default function RitualCard(
  { ritual, handleActualScore }: { ritual: Ritual; handleActualScore: () => void },
) {
  const t = useT();
  const [currRitualName, setCurrRitualName] = useState('');
  const isInputEqualActual = latinize(
    currRitualName.toLowerCase(),
  ) === latinize(ritual.name.toLowerCase());
  const [isFirstVerification, setIsFirstVerification] = useState(true);
  useEffect(() => {
    if (isInputEqualActual && isFirstVerification) {
      setIsFirstVerification(false);
      handleActualScore();
    }
  }, [handleActualScore, isFirstVerification, isInputEqualActual]);
  return (
    <li>
      {isInputEqualActual && <h2>{ritual.name}</h2>}
      <Image src={ritual.imagePath} width={100} height={100} alt="unknown ritual" />
      <input
        type="text"
        value={currRitualName}
        onChange={(ev) => setCurrRitualName(ev.target.value)}
        spellCheck
        placeholder={t<string>('rituais.ritualQuiz.ritualPlaceholder')}
        disabled={isInputEqualActual}
      />
    </li>
  );
}
