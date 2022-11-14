import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../styles/main.module.sass';

const Footer: NextPage = () => {
  const [isFontOutroLado, setIsFontOutroLado] = useState(false);
  const fontFamily = isFontOutroLado
    ? '"outro-lado-regular", sans-serif'
    : '"Vazirmatn", sans-serif';
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsFontOutroLado(!isFontOutroLado);
      setTimeout(() => setIsFontOutroLado(false), 500);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [isFontOutroLado]);
  return (
    <footer id={styles.footer}>
      <div>
        <p style={{ fontFamily }}>APOIE-ME</p>
        <p style={{ fontFamily }}>
          PIX
          <span>: microminusss@gmail.com</span>
        </p>
      </div>
      <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
        <Link href="admin/login">
          <Image src="/images/os-cinco.webp" height={80} width={80} alt="os cinco" layout="fixed" />
        </Link>
      </button>
    </footer>
  );
};

export default Footer;
