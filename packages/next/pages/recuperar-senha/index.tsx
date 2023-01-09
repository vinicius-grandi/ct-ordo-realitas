import { resetPassword } from '@ct-ordo-realitas/app/firebase/clientApp';
import styles from '@styles/main.module.sass';
import { FormEvent, useState } from 'react';
import getStaticProps from '../../components/withTranslationProps';

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      setStatusMsg('Código enviado!');
    } catch (err) {
      if (err instanceof Error) {
        setStatusMsg(err.message);
      }
    }
  };
  return (
    <main className={styles['recuperar-senha']}>
      <h1>Recuperar Senha</h1>
      {statusMsg.length > 0 && <p>{statusMsg}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          email:
          <input type="email" id="email" onChange={(ev) => setEmail(ev.target.value)} />
        </label>
        <button type="submit">Enviar</button>
      </form>
    </main>
  );
}

export { getStaticProps };
