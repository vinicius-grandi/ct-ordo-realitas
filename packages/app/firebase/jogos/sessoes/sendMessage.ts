import { push, ref, serverTimestamp } from 'firebase/database';
import { db } from '../../clientApp';

export default function sendMessage({
  session,
  message,
  player,
}: {
  session: string;
  message: string;
  player: string;
}) {
  const messagesRef = ref(db, `messages/${session}`);
  push(messagesRef, {
    message,
    player,
    timestamp: serverTimestamp(),
  });
}
