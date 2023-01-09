import { useState } from 'react';
import { withTranslation } from 'next-i18next';
import Head from 'next/head';
import { setup } from '../../lib/csrf';
import useT from '../../lib/hooks/useT';
import authMiddleware from '../../lib/middlewares/authMiddleware';
import AuthForm from '../../components/auth/AuthForm';
import AlternativeAuth from '../../components/auth/AlternativeAuth';
import useLogin from '../../lib/hooks/useLogin';
import ErrorMsg from '../../components/login/ErrorMsg';

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
      <AuthForm handleAuth={handleLogin} authRoute="login" />
      <AlternativeAuth authRoute="login" />
      <ErrorMsg errorMsg={errorMsg} setErrorMsg={setErrorMsg} />
    </main>
  );
}

export const getServerSideProps = setup(authMiddleware);

export const Login = withTranslation('common')(LoginPage);
