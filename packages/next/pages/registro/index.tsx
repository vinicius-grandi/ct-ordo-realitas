import { useState } from 'react';
import { withTranslation } from 'next-i18next';
import Head from 'next/head';
import { setup } from '../../lib/csrf';
import useT from '../../lib/hooks/useT';
import authMiddleware from '../../lib/middlewares/authMiddleware';
import AuthForm from '../../components/auth/AuthForm';
import ErrorMsg from '../../components/login/ErrorMsg';
import useSignUp from '../../lib/hooks/useSignUp';

export default function LoginPage() {
  const t = useT();
  const [errorMsg, setErrorMsg] = useState('');
  const handleSignUp = useSignUp(setErrorMsg);

  return (
    <main>
      <Head>
        <title>Registro</title>
      </Head>
      <h1 style={{ margin: '1rem' }}>{t('registro.title')}</h1>
      <AuthForm handleAuth={handleSignUp} authRoute="registro" />
      <ErrorMsg errorMsg={errorMsg} setErrorMsg={setErrorMsg} />
    </main>
  );
}

export const getServerSideProps = setup(authMiddleware);

export const Login = withTranslation('common')(LoginPage);
