import { onValue, ref } from 'firebase/database';
import { db } from '../../clientApp';

export default async function countdown(fn: (remainingSeconds: string) => void, session: string) {
  const countdownRef = ref(db, `countdowns/${session}`);
  let serverTimeOffset = 0;
  const timeStampSubscribe = onValue(ref(db, '.info/serverTimeOffset'), (snap) => {
    serverTimeOffset = snap.val();
  });
  const countdownSubscribe = onValue(countdownRef, (snapshot) => {
    const { seconds, startAt } = snapshot.val();
    const interval = setInterval(() => {
      const timeLeft = seconds * 1000 - (Date.now() - startAt - serverTimeOffset);
      if (timeLeft < 0) {
        clearInterval(interval);
        fn('0');
      } else {
        const remainingSeconds = `${Math.floor(timeLeft / 1000)}`;
        console.log(remainingSeconds);
        fn(remainingSeconds);
      }
    }, 1000);
  });
  return [timeStampSubscribe, countdownSubscribe];
}
