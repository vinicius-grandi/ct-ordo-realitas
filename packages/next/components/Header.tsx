import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import useWindowsSize from '../lib/hooks/useWindowSize';
import styles from '../styles/main.module.sass';
import CloseButton from './CloseButton';
import Menu from './header/Menu';

const Header: NextPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const windowsSize = useWindowsSize(setShowPopup);
  const handleClose = () => setShowPopup(!showPopup);

  return (
    <header id={styles.header}>
      <button type="button">
        <Link href="/">
          <a>
            <Image src="/images/logo.svg" height={100} width={100} alt="ordo realitas" />
          </a>
        </Link>
      </button>
      {windowsSize > 1000 && <Menu />}
      <button
        id="menubutton"
        onClick={() => setShowPopup(true)}
        type="button"
        aria-haspopup="true"
        aria-controls="menu"
        aria-label="menu-button"
      >
        <Image src="/images/burger.svg" height={40} width={40} alt="burger menu button" />
      </button>
      {windowsSize < 1000 && showPopup && (
        <>
          <Menu id="menu" role="menu" aria="menubutton" handleClose={handleClose} />
          <CloseButton handleClose={() => handleClose()} />
        </>
      )}
    </header>
  );
};

export default Header;
