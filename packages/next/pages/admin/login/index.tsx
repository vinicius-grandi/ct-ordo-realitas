import { withTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import api, { logout } from '@ct-ordo-realitas/app/firebase/clientApp';
import serverApi from '@ct-ordo-realitas/app/firebase/serverApp';
import Head from 'next/head';
import styles from '@styles/main.module.sass';
import { NextApiRequest } from 'next/types';
import { setup } from '../../../lib/csrf';
import { useAuth } from '../../../contexts/auth';

function AdminLoginPage() {
  const router = useRouter();
  const [componentDidMount, setComponentDidMount] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [agent, setAgent] = useState({
    username: '',
    password: '',
  });
  const { setIsUserAuthenticated } = useAuth();

  const handleInput = ({ target: { id, value } }: ChangeEvent<HTMLInputElement>) => {
    if (id in agent) {
      setAgent({ ...agent, [id]: value });
    }
  };

  const handleLogin = async () => {
    try {
      const response = await api.loginAndGetToken(agent.username, agent.password);
      if (response.status !== 200) {
        return setErrorMsg('authentication failure');
      }
      const body = new FormData();
      body.append('idToken', response.idToken as string);
      await fetch('../api/login', {
        method: 'post',
        body,
      });
      setErrorMsg('authentication successful');
      await logout();
      await router.push('/rituais/adicionar');
      return setIsUserAuthenticated(true);
    } catch (_) {
      return setErrorMsg('authentication failure');
    }
  };

  useEffect(() => {
    let initialBg = '';
    if (!componentDidMount) {
      setComponentDidMount(true);
      initialBg = document.body.style.getPropertyValue('background');
    }
    document.body.style.background = "url('/images/admin-bg.gif')";
    return () => {
      document.body.style.background = initialBg;
    };
  }, [componentDidMount]);

  return (
    <div className={styles['admin-login-container']}>
      <Head>
        <title>Admin Login - CTOR</title>
      </Head>
      <h1 className={styles['admin-login-title']}>authentication</h1>
      <div className={styles['admin-login-form']}>
        <label htmlFor="username">
          <span>Username:</span>
          <input type="text" id="username" value={agent.username} onChange={handleInput} />
        </label>
        <label htmlFor="password">
          <span>Password:</span>
          <input type="password" id="password" value={agent.password} onChange={handleInput} />
        </label>
      </div>
      {errorMsg.length > 0 && <p>{errorMsg}</p>}
      <button type="button" onClick={handleLogin} className={styles['admin-login-btn']}>
        login
      </button>
    </div>
  );
}

export const AdminLogin = withTranslation('common')(AdminLoginPage);

export const getServerSideProps = setup(
  async (req: NextApiRequest) => {
    if (req.cookies.session && (await serverApi.isUserAdmin(req.cookies.session))) {
      return {
        redirect: {
          destination: '/rituais/adicionar',
          permanent: false,
        },
      };
    }
    return { props: {} };
  },
);

export default AdminLoginPage;
