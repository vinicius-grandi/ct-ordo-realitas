import styles from '@styles/main.module.sass';

export default function ErrorMsg({
  errorMsg,
  setErrorMsg,
}: { errorMsg: string; setErrorMsg: React.Dispatch<React.SetStateAction<string>> }) {
  return errorMsg.length > 0 ? (
    <div className={styles['login-error-msg']}>
      <p>
        {errorMsg}
      </p>
      <button type="button" onClick={() => setErrorMsg('')}>X</button>
    </div>
  )
    : <p />;
}
