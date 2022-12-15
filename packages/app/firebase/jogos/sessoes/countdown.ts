import { onValue, ref, runTransaction, serverTimestamp } from 'firebase/database';
import { db } from '../../clientApp';

export default async function countdown(
  setRemainingSeconds: (remainingSeconds: string) => void,
  session: string,
  setCountdownPhase: (phase: string) => void
) {
  let serverLatency = 0;
  const timeStampSubscribe = setServerLatency();

  const countdownRef = ref(db, `countdowns/${session}`);
  const countdownSubscribe = onValue(countdownRef, (snapshot) => {
    const { seconds, startAt, phase } = snapshot.val();
    setCountdownPhase(phase);
    const interval = setInterval(() => {
      const timeLeft = seconds * 1000 - (Date.now() - startAt - serverLatency);
      if (timeLeft < 0) {
        clearInterval(interval);
        setNewCountdown();
        setRemainingSeconds('0');
      } else {
        const remainingSeconds = `${Math.floor(timeLeft / 1000)}`;
        setRemainingSeconds(remainingSeconds);
      }
    }, 1000);
  });

  return [timeStampSubscribe, countdownSubscribe];

  function setServerLatency() {
    return onValue(ref(db, '.info/serverTimeOffset'), (snap) => {
      serverLatency = snap.val();
    });
  }

  function setNewCountdown() {
    runTransaction(
      countdownRef,
      (currentCountdown) => {
        const currentTimeLeft =
          currentCountdown.seconds * 1000 - (Date.now() - currentCountdown.startAt - serverLatency);
        const setNewPhase = (newPhase: 'votingTime' | 'discussionTime') => {
          if (currentTimeLeft <= 0) {
            return {
              seconds: newPhase === 'votingTime' ? 30 : 180,
              phase: newPhase,
              startAt: serverTimestamp(),
            };
          }
        };
        if (currentCountdown.phase === 'discussionTime') {
          return setNewPhase('votingTime');
        }
        if (currentCountdown.phase === 'votingTime') {
          return setNewPhase('discussionTime');
        }
      },
      {
        applyLocally: false,
      }
    )
      .then(() => {})
      .catch((r) => console.log(r));
  }
}
