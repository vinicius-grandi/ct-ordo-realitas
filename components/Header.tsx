import { NextPage } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import useWindowsSize from '../lib/hooks/useWindowSize';
import mainCss from '../styles/main.module.sass';
import Menu from './header/Menu';

const Header: NextPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const windowsSize = useWindowsSize(setShowPopup);

  return (
    <header id={mainCss.header}>
      <button type="button">
        <Image src="/images/logo.svg" height={100} width={100} alt="ordo realitas" />
      </button>
      { windowsSize > 1000 && <Menu /> }
      {!showPopup && (
      <button
        id="menubutton"
        onClick={() => setShowPopup(true)}
        type="button"
        aria-haspopup="true"
        aria-controls="menu"
        aria-label="menu-button"
      >
        <Image
          src="/images/burger.svg"
          height={40}
          width={40}
          alt="burger menu button"
        />
      </button>
      )}
      { windowsSize < 1000 && showPopup && (
        <>
          <Menu id="menu" role="menu" aria="menubutton" />
          <button type="button" onClick={() => setShowPopup(false)}>X</button>
        </>
      )}
    </header>
  );
};

export default Header;
