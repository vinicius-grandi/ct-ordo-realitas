import { useRouter } from 'next/router';

export default function useRoomName() {
  const router = useRouter();
  const room = router.query.room as string;
  return room;
}
