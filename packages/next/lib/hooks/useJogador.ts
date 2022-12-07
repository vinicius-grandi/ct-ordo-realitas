import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

type QueryParameter = string | string[] | undefined;

export default function useJogador(
  setErrMsg: (m: string) => void,
): [QueryParameter, React.Dispatch<React.SetStateAction<QueryParameter>>] {
  const router = useRouter();
  const room = router.query.room as string;
  const [jogador, setJogador] = useState(router.query.jogador);

  useEffect(() => {
    async function setPlayer() {
      const data = new FormData();
      data.append('player', (jogador as string) ?? '');
      data.append('room', room ?? '');
      const response = await fetch('../../api/rooms/join', {
        method: 'post',
        body: data,
      });

      if (response.status !== 200) {
        const { message } = await response.json();
        return setErrMsg(message);
      }
      return setErrMsg('');
    }
    if (jogador) {
      void setPlayer();
    }
  }, [jogador, room, setErrMsg]);

  return [jogador, setJogador];
}
