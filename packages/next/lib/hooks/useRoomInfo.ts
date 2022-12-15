import { Room } from '@ct-ordo-realitas/app/firebase/jogos/salas/createRoom';
import lobby from '@ct-ordo-realitas/app/firebase/jogos/salas/lobby';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useRoomName from './useRoomName';

export type FullRoom = Partial<Room> & {
  room: string;
  redirect?: boolean;
  gameType: 'deathRooms' | 'devilCoffins' | 'masqueradeBall';
  players: {
    [key in string]: string;
  };
};

export default function useRoomInfo(): [FullRoom, React.Dispatch<React.SetStateAction<FullRoom>>] {
  const router = useRouter();
  const [roomInfo, setRoomInfo] = useState<FullRoom>({
    room: '',
    gameType: 'deathRooms',
    host: '',
    name: '',
    players: {},
  });
  const room = useRoomName();
  useEffect(() => {
    const unsubscribe = lobby.getRoom(room, async (data) => {
      if (data !== null && data.redirect) {
        await router.push(`../sessoes/${room}`);
      }
      setRoomInfo(data);
    });

    return () => {
      unsubscribe();
    };
  }, [room, router]);

  return [roomInfo, setRoomInfo];
}
