import { ChangeEvent, useState } from 'react';
import styles from '@styles/main.module.sass';
import Image from 'next/image';
import Link from 'next/link';
import useLogin from '../../lib/hooks/useLogin';
import useT from '../../lib/hooks/useT';
import ErrorMsg from './ErrorMsg';

export default function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [agent, setAgent] = useState({
    email: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const handleLogin = useLogin(setErrorMsg);
  const t = useT();

  const handleInput = ({ target: { value, id } }: ChangeEvent<HTMLInputElement>) => {
    if (id in agent) {
      setAgent({ ...agent, [id]: value });
    }
  };
  return (
    <>
      <form
        className={styles.login}
        onSubmit={(ev) => {
          ev.preventDefault();
          handleLogin(agent.email, agent.password);
        }}
      >
        <label htmlFor="email">
          {t('login.email')}
          <input type="email" id="email" value={agent.email} onChange={handleInput} required />
        </label>
        <label htmlFor="password" style={{ position: 'relative' }}>
          {t('login.password')}
          <div style={{ position: 'relative', display: 'flex' }}>
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              id="password"
              value={agent.password}
              onChange={handleInput}
              style={{ flexBasis: '100%' }}
            />
            <button
              type="button"
              aria-controls="password"
              aria-expanded={isPasswordVisible}
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              title={`${isPasswordVisible ? t('login.hide') : t('login.show')} password`}
              id={styles['toggle-password']}
            >
              <Image
                src={`/images/eye${isPasswordVisible ? '-slash' : ''}.png`}
                width={24}
                height={24}
                layout="fill"
              />
            </button>
          </div>
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
        <button type="submit">{t('login.loginBtn')}</button>
      </form>
      <ErrorMsg errorMsg={errorMsg} setErrorMsg={setErrorMsg} />
    </>
  );
}
