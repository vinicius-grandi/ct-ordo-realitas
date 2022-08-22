import { NextPage } from 'next';
import Image from 'next/image';
import mainCss from '../styles/main.module.sass';

const Header: NextPage = () => (
  <header id={mainCss.header}>
    <Image src="/images/logo.svg" height={100} width={100} />
    <Image src="/images/burger.svg" height={40} width={40} />
  </header>
);

export default Header;
