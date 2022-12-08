import { useRouter } from 'next/router';

export default function useQueryParameter(parameter: string) {
  const router = useRouter();
  const value = router.query[parameter] as string;
  return value;
}
