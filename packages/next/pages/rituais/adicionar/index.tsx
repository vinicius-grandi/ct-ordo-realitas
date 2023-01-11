import { DragEvent, useRef } from 'react';
import Image from 'next/image';
import styles from '@styles/main.module.sass';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import api from '@ct-ordo-realitas/app/firebase/serverApp';
import NewRitualForm from '../../../components/rituals/adicionar/NewRitualForm';
import useResetBackground from '../../../lib/hooks/useResetBackground';

export default function NewRitualPage() {
  useResetBackground();
  const ref = useRef<HTMLInputElement>(null);

  const preventDefaultDrag = (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
  };

  const handleDrop = (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
    if (ref.current) {
      ref.current.files = ev.dataTransfer.files;
      const changeEvent = new Event('change', {
        bubbles: true,
      });
      ref.current.dispatchEvent(changeEvent);
    }
  };

  return (
    <div
      className={styles['add-new-ritual-bg']}
      onDragOver={preventDefaultDrag}
      onDragEnter={preventDefaultDrag}
      onDrop={handleDrop}
    >
      <Head>
        <title>Rituais - Adicionar Novo Ritual - CTOR</title>
      </Head>
      <h1 className={styles['debian-title']}>Rituais - Adicionar novo Ritual</h1>
      <NewRitualForm ref={ref} />
      <button type="button" className={styles['rituais-home-btn']}>
        <Link href="/" passHref>
          <a>
            <Image src="/images/logo.svg" height={100} width={100} alt="home button" />
          </a>
        </Link>
      </button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  if (req.cookies.session && (await api.isUserAdmin(req.cookies.session))) {
    return {
      props: {},
    };
  }
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
};

export const AddNewRitual = NewRitualPage;
