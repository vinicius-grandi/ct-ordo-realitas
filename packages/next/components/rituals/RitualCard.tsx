import Image from 'next/image';
import { useEffect, useState, forwardRef } from 'react';
import latinize from 'latinize';
import styles from '@styles/main.module.sass';
import useT from '../../lib/hooks/useT';
import type { Ritual } from './RitualQuiz';

const RitualCard = forwardRef<
HTMLInputElement,
{
  ritual: Ritual;
  handleActualScore:() => void;
  getNextInput: (input: HTMLInputElement) => HTMLInputElement
}
>(({ ritual, handleActualScore, getNextInput }, ref) => {
      const t = useT();
      const [currRitualName, setCurrRitualName] = useState('');
      const isInputEqualActual =
    latinize(currRitualName.toLowerCase()) === latinize(ritual.name.toLowerCase());
      const [isFirstVerification, setIsFirstVerification] = useState(true);
      useEffect(() => {
        if (isInputEqualActual && isFirstVerification) {
          setIsFirstVerification(false);
          handleActualScore();
        }
      }, [handleActualScore, isFirstVerification, isInputEqualActual]);
      return (
        <li
          className={styles['ritual-card']}
          style={{ outline: isInputEqualActual ? '3px solid #227c10' : 'none' }}
        >
          {isInputEqualActual && <h2>{ritual.name}</h2>}
          <Image
            src={ritual.imagePath}
            width={145}
            height={155}
            layout="fixed"
            alt={
          isInputEqualActual ? `${ritual.name} ritual` : `${t('rituais.ritualQuiz.cardAlt')} ritual`
        }
            onError={(ev) => {
              const { currentTarget } = ev;
              currentTarget.alt = ritual.name;
            }}
          />
          <input
            type="text"
            value={currRitualName}
            onChange={(ev) => {
              setCurrRitualName(ev.target.value);
              if (ev.target.value === ritual.name) {
                getNextInput(ev.target).focus();
              }
            }}
            spellCheck
            ref={ref}
            placeholder={t<string>('rituais.ritualQuiz.ritualPlaceholder')}
            disabled={isInputEqualActual}
          />
        </li>
      );
    });

export default RitualCard;
