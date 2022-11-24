import { withTranslation } from 'next-i18next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '@styles/main.module.sass';
import { useState } from 'react';
import { setup } from '../../lib/csrf';
import useT from '../../lib/hooks/useT';
import useLogin from '../../lib/hooks/useLogin';
import authMiddleware from '../../lib/middlewares/authMiddleware';
import ErrorMsg from '../../components/login/ErrorMsg';
import LoginForm from '../../components/login/LoginForm';

export default function LoginPage() {
  const t = useT();
  const [errorMsg, setErrorMsg] = useState('');
  const handleLogin = useLogin(setErrorMsg);

  return (
    <main>
      <Head>
        <title>Login</title>
      </Head>
      <h1 style={{ margin: '1rem' }}>{t('login.title')}</h1>
      <LoginForm />
      <div className={styles['login-alternative']}>
        <p>
          {t('login.loginWith')}
          :
        </p>
        <button
          type="button"
          style={{ background: 'none', border: 'none' }}
          onClick={() => handleLogin('google')}
        >
          <div style={{ width: '150px', position: 'relative', height: '100px' }}>
            <Image
              src="/images/btn_google_signin_light_focus_web@2x.png"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </button>
      </div>
      <ErrorMsg errorMsg={errorMsg} setErrorMsg={setErrorMsg} />
    </main>
  );
}

export const getServerSideProps = setup(authMiddleware);

export const Login = withTranslation('common')(LoginPage);
