import { loginWithPopup } from '@ct-ordo-realitas/app/firebase/clientApp';
import { withTranslation, i18n } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuth } from '../../contexts/auth';
import { setup } from '../../lib/csrf';
import useT from '../../lib/hooks/useT';

export default function LoginPage() {
  const t = useT();
  const [errorMsg, seterrorMsg] = useState('');
  const { setIsUserAuthenticated } = useAuth();
  const router = useRouter();
  const handleClick = async () => {
    try {
      const { idToken } = await loginWithPopup();
      const body = new FormData();
      body.append('idToken', idToken as string);
      await fetch('../api/login', {
        method: 'post',
        body,
      });
      setIsUserAuthenticated(true);
      await router.push('/');
    } catch (error) {
      seterrorMsg('google login error');
    }
  };

  return (
    <main>
      <Head>
        <title>Login</title>
      </Head>
      <h1>{t('login.title')}</h1>
      <label htmlFor="email">
        {t('login.email')}
        <input type="text" id="email" />
      </label>
      <label htmlFor="password">
        {t('login.password')}
        <input type="text" id="password" />
      </label>
      <Link href="/registro">
        <p>{t('login.signup')}</p>
      </Link>
      <Link href="/registro">
        <p>{t('login.recoveryPassword')}</p>
      </Link>
      <button type="button">{t('login.loginBtn')}</button>
      <p>
        {t('login.loginWith')}
        :

      </p>
      <button type="button" style={{ background: 'none', border: 'none' }} onClick={handleClick}>
        <div style={{ width: '150px', position: 'relative', height: '100px' }}>
          <Image
            src="/images/btn_google_signin_light_focus_web@2x.png"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </button>
      {errorMsg.length > 0 && <p>{errorMsg}</p>}
    </main>
  );
}

export const getServerSideProps = setup(
  async (req: any) => {
    if (req.cookies.session) {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      };
    }
    if (process.env.NODE_ENV === 'development') {
      await i18n?.reloadResources();
    }
    const props = { ...(await serverSideTranslations(req.locale ?? 'pt', ['common'])) };
    return {
      props,
    };
  },
);

export const Login = withTranslation('common')(LoginPage);
