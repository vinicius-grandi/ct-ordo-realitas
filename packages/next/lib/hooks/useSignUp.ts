import api from '@ct-ordo-realitas/app/firebase/clientApp';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/auth';

export type HandleSignup = {
  (email: string, password: string): void;
};

export default function useSignUp(seterrorMsg: React.Dispatch<React.SetStateAction<string>>, route = '/') {
  const { setIsUserAuthenticated } = useAuth();
  const router = useRouter();
  const handleClick: HandleSignup = async (email, password) => {
    try {
      const { idToken } = await api.signUpWithEmailAndPassword(email, password);
      const body = new FormData();
      body.append('idToken', idToken);
      await fetch('../api/login', {
        method: 'post',
        body,
      });
      setIsUserAuthenticated(true);
      await router.push(route);
    } catch (error) {
      if (error instanceof Error) {
        seterrorMsg((error.message.match(/(?<=\(auth\/).*(?=\))/ig) ?? [''])[0]);
      }
    }
  };
  return handleClick;
}
