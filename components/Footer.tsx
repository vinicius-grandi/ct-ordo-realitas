import { NextPage } from 'next';
import styles from '../styles/main.module.sass';

const Footer: NextPage = () => (
  <footer id={styles.footer}>
    <p>APOIE-ME</p>
    <p>
      PIX
      <span>: microminusss@gmail.com</span>
    </p>
  </footer>
);

export default Footer;
