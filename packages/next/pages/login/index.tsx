import { withTranslation } from 'next-i18next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@styles/main.module.sass';
import { ChangeEvent, useState } from 'react';
import { setup } from '../../lib/csrf';
import useT from '../../lib/hooks/useT';
import useLogin from '../../lib/hooks/useLogin';
import authMiddleware from '../../lib/middlewares/authMiddleware';

export default function LoginPage() {
  const t = useT();
  const [errorMsg, setErrorMsg] = useState('');
  const [agent, setAgent] = useState({
    email: '',
    password: '',
  });
  const handleLogin = useLogin(setErrorMsg);

  const handleInput = ({ target: { value, id } }: ChangeEvent<HTMLInputElement>) => {
    if (id in agent) {
      setAgent({ ...agent, [id]: value });
    }
  };

  return (
    <main>
      <Head>
        <title>Login</title>
      </Head>
      <h1 style={{ margin: '1rem' }}>{t('login.title')}</h1>
      <div className={styles.login}>
        <label htmlFor="email">
          {t('login.email')}
          <input type="text" id="email" value={agent.email} onChange={handleInput} />
        </label>
        <label htmlFor="password">
          {t('login.password')}
          <input type="password" id="password" value={agent.password} onChange={handleInput} />
        </label>
        <div className={styles['login-actions']}>
          <Link href="/registro" passHref>
            <a>
              <p>{t('login.signup')}</p>
            </a>
          </Link>
          <Link href="/recuperar-senha" passHref>
            <a>
              <p>{t('login.passwordRecovery')}</p>
            </a>
          </Link>
        </div>
        <button type="button" onClick={() => handleLogin(agent.email, agent.password)}>{t('login.loginBtn')}</button>
      </div>
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
      {errorMsg.length > 0 && <p>{errorMsg}</p>}
    </main>
  );
}

export const getServerSideProps = setup(authMiddleware);

export const Login = withTranslation('common')(LoginPage);
