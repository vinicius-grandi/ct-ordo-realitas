import { ref, onValue } from 'firebase/database';
import { db } from '../clientApp';

const roomsRef = ref(db, 'rooms');
const getRoomRef = (room: string) => ref(db, `rooms/${room}`);

const getRoom = (room = '', roomHandler: (val: any) => void) =>
  onValue(getRoomRef(room), (snapshot) => {
    const data = snapshot.val();
    roomHandler(data);
  }, (e) => {
    console.log(e.message);
  });

const getRooms = (roomsHandler: (val: any) => void) =>
  onValue(roomsRef, (snapshot) => {
    const data = snapshot.val();
    roomsHandler(data);
  });

export default {
  getRooms,
  getRoom,
};
