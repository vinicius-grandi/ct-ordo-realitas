import type { NextPage } from 'next';
import variables from '../styles/variables.module.sass';

const Home: NextPage = () => <h1>{variables.primaryColor}</h1>;

export default Home;
