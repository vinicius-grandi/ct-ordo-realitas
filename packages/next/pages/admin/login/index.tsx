import { withTranslation } from 'next-i18next';
import { ChangeEvent, useEffect, useState } from 'react';
import serverApi from '@ct-ordo-realitas/app/firebase/serverApp';
import Head from 'next/head';
import styles from '@styles/main.module.sass';
import { NextApiRequest } from 'next/types';
import { setup } from '../../../lib/csrf';
import useLogin from '../../../lib/hooks/useLogin';

function AdminLoginPage() {
  const [componentDidMount, setComponentDidMount] = useState(false);
  const [errorMsg, setStatusMsg] = useState('');
  const [agent, setAgent] = useState({
    username: '',
    password: '',
  });
  const handleLogin = useLogin(setStatusMsg);

  const handleInput = ({ target: { id, value } }: ChangeEvent<HTMLInputElement>) => {
    if (id in agent) {
      setAgent({ ...agent, [id]: value });
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
      <button type="button" onClick={() => handleLogin(agent.username, agent.password)} className={styles['admin-login-btn']}>
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
