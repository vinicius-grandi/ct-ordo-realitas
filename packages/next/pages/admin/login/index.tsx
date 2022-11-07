import { withTranslation } from 'next-i18next';
import getStaticProps from '@components/withTranslationProps';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import api from '@ct-ordo-realitas/app/firebase/clientApp';

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

  return (
    <div>
      <h1>authentication</h1>
      <label htmlFor="username">
        Username
        <input type="text" id="username" value={agent.username} onChange={handleInput} />
      </label>
      <label htmlFor="password">
        Password
        <input type="password" id="password" value={agent.password} onChange={handleInput} />
      </label>
      {errorMsg.length > 0 && <p>{errorMsg}</p>}
      <button type="button" onClick={handleLogin}>
        login
      </button>
    </div>
  );
}

export { getStaticProps };

export const AdminLogin = withTranslation('common')(AdminLoginPage);

export default AdminLoginPage;
