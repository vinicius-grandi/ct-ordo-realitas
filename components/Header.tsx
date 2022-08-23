import { NextPage } from 'next';
import Image from 'next/image';
import useWindowsSize from '../lib/hooks/useWindowSize';
import mainCss from '../styles/main.module.sass';

const Header: NextPage = () => {
  const windowsSize = useWindowsSize();
  return (
    <header id={mainCss.header}>
      <button type="button">
        <Image src="/images/logo.svg" height={100} width={100} />
      </button>
      { windowsSize > 1000 && (
        <ul>
          <li>simulação</li>
          <li>ocultista</li>
          <li>combatente</li>
          <li>especialista</li>
        </ul>
      ) }
      <button type="button" role="menu">
        <Image src="/images/burger.svg" height={40} width={40} />
      </button>
    </header>
  );
};

export default Header;
