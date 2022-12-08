import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import getMessages from '@ct-ordo-realitas/app/firebase/jogos/sessoes/getMessages';
import sendMessage from '@ct-ordo-realitas/app/firebase/jogos/sessoes/sendMessage';
import styles from '@styles/main.module.sass';
import useQueryParameter from '../../../lib/hooks/useQueryParameter';
import useT from '../../../lib/hooks/useT';

type Message = {
  player: string;
  message: string;
  timestamp: number;
};

const Messages = ({ messages }: { messages: Message[] }) => {
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const elem = divRef.current;
    if (elem !== null) {
      elem.scrollTop = elem.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={styles['sessao-chat']} ref={divRef}>
      {messages.map((messageObj, idx) => (
        <div key={`${messageObj.player}-${idx + 1}`}>
          <p>
            <strong>
              {messageObj.player}
              :
            </strong>
            {' '}
            {messageObj.message}
          </p>
        </div>
      ))}
    </div>
  );
};

export default function Chat({ player }: { player: string }) {
  const t = useT();
  const [messages, setMessages] = useState<Message[]>([]);
  const session = useQueryParameter('session');

  useEffect(() => {
    const unsubscribe = getMessages(session, (msgs) => setMessages(msgs));

    return () => unsubscribe();
  }, [session]);

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const target = ev.target as HTMLFormElement;
    const input = target.elements[0] as HTMLInputElement;

    sendMessage({
      message: input.value,
      player,
      session,
    });

    input.value = '';
  };

  return (
    <>
      <Messages messages={messages} />
      <form onSubmit={handleSubmit} className={styles['sessao-chat-form']}>
        <input type="text" />
        <button type="submit">
          {t<string>('jogos.chat.sendMessage')}
        </button>
      </form>
    </>
  );
}
