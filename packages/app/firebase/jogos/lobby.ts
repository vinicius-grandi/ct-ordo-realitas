import { ref, onValue } from 'firebase/database';
import { db } from '../clientApp';

const roomsRef = ref(db, 'rooms');

const getRooms = (roomsHandler: (val: any) => void) => onValue(roomsRef, (snapshot) => {
  const data = snapshot.val();
  roomsHandler(data);
});

export default {
  getRooms,
}
