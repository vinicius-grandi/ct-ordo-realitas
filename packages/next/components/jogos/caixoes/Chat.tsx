import { useState } from 'react';
import useT from '../../../lib/hooks/useT';

export default function Chat() {
  const t = useT();
  const [messages, setMessages] = useState([]);

  return (
    <div>
      <p>{t('caixoes.chat.newDevil')}</p>
      <p>{t('caixoes.chat.discussionTime')}</p>
      <div>
        <input type="text" />
        <button type="button" aria-label={t<string>('caixoes.chat.sendMessage')}>
          ➤
        </button>
      </div>
    </div>
  );
}
