import { useRouter } from 'next/router';
import { loginAndGetToken, loginWithPopup } from '@ct-ordo-realitas/app/firebase/clientApp';
import React from 'react';
import { useAuth } from '../../contexts/auth';

type HandleClickOverload = {
  (type: 'google'): void;
  (email: string, password: string): void;
};

export default function useLogin(seterrorMsg: React.Dispatch<React.SetStateAction<string>>, route = '/') {
  const { setIsUserAuthenticated } = useAuth();
  const router = useRouter();
  const handleClick: HandleClickOverload = async (typeOrEmail?: string, password?: string) => {
    try {
      let idToken = '';
      switch (typeOrEmail) {
        case 'google':
          idToken = (await loginWithPopup()).idToken;
          break;
        default:
          idToken = (await loginAndGetToken(typeOrEmail as string, password as string)).idToken;
          break;
      }
      const body = new FormData();
      body.append('idToken', idToken as string);
      await fetch('../api/login', {
        method: 'post',
        body,
      });
      setIsUserAuthenticated(true);
      await router.push(route);
    } catch (error) {
      seterrorMsg('login error');
    }
  };
  return handleClick;
}
