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
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div>
          <p style={{ fontFamily, verticalAlign: 'middle' }}>
            <span style={{ verticalAlign: 'sub' }}>
              <Image src="/images/coffee.svg" height={30} width={30} alt="os cinco" layout="fixed" />
            </span>
            {' '}
            Me pague um cafezin:
          </p>
          <p style={{ fontFamily }}>
            Pix
            <span> - microminusss@gmail.com</span>
          </p>
        </div>
        <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <Link href="admin/login">
            <div>
              <Image src="/images/os-cinco.webp" height={80} width={80} alt="os cinco" layout="fixed" />
            </div>
          </Link>
        </button>
      </div>
      <a href="https://github.com/vinicius-grandi/ct-ordo-realitas" target="_blank" rel="noreferrer">
        <span style={{ verticalAlign: 'sub' }}>
          <Image src="/images/github-icon.svg" height={30} width={30} alt="os cinco" layout="fixed" />
        </span>
        {' '}
        Código Fonte
      </a>
    </footer>
  );
};

export default Footer;
