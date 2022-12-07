import { db } from '../../serverApp';

export default async function registerRoom(name: string, uid: string) {
  const rooms = db.ref(`${uid}/rooms/${name}`);
  await rooms.set(0);
}
