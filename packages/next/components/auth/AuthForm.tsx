import { useState } from 'react';
import styles from '@styles/main.module.sass';
import Image from 'next/image';
import Link from 'next/link';
import { HandleLogin } from '../../lib/hooks/useLogin';
import useT from '../../lib/hooks/useT';
import useAgent from '../../lib/hooks/useAgent';
import { HandleSignup } from '../../lib/hooks/useSignUp';

const ShowHidePassword = ({
  setIsPasswordVisible,
  isPasswordVisible,
}: {
  isPasswordVisible: boolean;
  setIsPasswordVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const t = useT();
  return (
    <button
      type="button"
      aria-controls="password"
      aria-expanded={isPasswordVisible}
      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
      title={`${isPasswordVisible ? t('login.hide') : t('login.show')} password`}
      id={styles['toggle-password']}
    >
      <Image src={`/images/eye${isPasswordVisible ? '-slash' : ''}.png`} layout="fill" />
    </button>
  );
};

export default function AuthForm({
  authRoute,
  handleAuth,
}: {
  authRoute: 'registro' | 'login';
  handleAuth: HandleLogin | HandleSignup;
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const t = useT();
  const [agent, handleInput] = useAgent();
  const isLoginRoute = authRoute === 'login';

  return (
    <form
      className={styles.login}
      onSubmit={(ev) => {
        ev.preventDefault();
        handleAuth(agent.email, agent.password);
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
          {isLoginRoute && (
            <ShowHidePassword
              setIsPasswordVisible={setIsPasswordVisible}
              isPasswordVisible={isPasswordVisible}
            />
          )}
        </div>
      </label>
      {!isLoginRoute && (
        <label htmlFor="confirmPassword">
          {t('registro.confirmPassword')}
          <input
            type="password"
            id="confirmPassword"
            value={agent.confirmPassword}
            onChange={handleInput}
            required
          />
        </label>
      )}
      {isLoginRoute && (
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
      )}
      <button type="submit">{t(`${authRoute}.${authRoute}Btn`)}</button>
    </form>
  );
}
