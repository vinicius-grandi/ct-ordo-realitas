import { ref, onValue } from 'firebase/database';
import { db } from '../clientApp';

const getRoomRef = (room: string) => ref(db, `rooms/${room}`);

const getRoom = (room = '', roomHandler: (val: any) => void) =>
  onValue(getRoomRef(room), (snapshot) => {
    const data = snapshot.val();
    roomHandler(data);
  });

const getRooms = (roomsHandler: (val: any) => void) =>
  onValue(ref(db, 'rooms'), (snapshot) => {
    const data = snapshot.exists() ? Object.values(snapshot.val()) : [];
    roomsHandler(data);
  });

export default {
  getRooms,
  getRoom,
};
