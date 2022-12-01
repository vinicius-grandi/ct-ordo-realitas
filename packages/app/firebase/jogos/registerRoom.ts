import { db } from '../serverApp';

export default function registerRoom(name: string, uid: string) {
  const user = db.ref(`${uid}`);
  const rooms = user.child('rooms');
  rooms.update({
    [name]: 0,
  });
}
