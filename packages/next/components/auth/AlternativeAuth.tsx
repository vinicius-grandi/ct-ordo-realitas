import styles from '@styles/main.module.sass';
import { useState } from 'react';
import Image from 'next/image';
import useLogin from '../../lib/hooks/useLogin';
import ErrorMsg from '../login/ErrorMsg';
import useT from '../../lib/hooks/useT';

export default function AlternativeAuth({ authRoute }: { authRoute: 'login' | 'registro' }) {
  const [errorMsg, setErrorMsg] = useState('');
  const handleLogin = useLogin(setErrorMsg);
  const t = useT();
  return (
    <>
      <div className={styles['login-alternative']}>
        <p>
          {t(`${authRoute}.${authRoute}With`)}
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
    </>
  );
}
