import { withTranslation } from 'next-i18next';
import getStaticProps from '@components/withTranslationProps';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import api from '@ct-ordo-realitas/app/firebase/clientApp';
import styles from '@styles/main.module.sass';

function AdminLoginPage() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const [agent, setAgent] = useState({
    username: '',
    password: '',
  });

  const handleInput = ({ target: { id, value } }: ChangeEvent<HTMLInputElement>) => {
    if (id in agent) {
      setAgent({ ...agent, [id]: value });
    }
  };

  const handleLogin = async () => {
    const response = await api.loginWithEmailAndPassword(agent.username, agent.password);
    if (response.status === 200) {
      await router.push('/rituais/adicionar');
      return null;
    }
    return setErrorMsg('authentication failure');
  };

  useEffect(() => {
    document.body.style.background = 'url(\'/images/admin-bg.gif\')';
  });

  return (
    <div className={styles['admin-login-container']}>
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

export { getStaticProps };

export const AdminLogin = withTranslation('common')(AdminLoginPage);

export default AdminLoginPage;
