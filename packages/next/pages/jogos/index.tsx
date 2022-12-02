import { withTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import lobby from '@ct-ordo-realitas/app/firebase/jogos/lobby';
import styles from '@styles/main.module.sass';
import NewRoomModal from '../../components/jogos/NewRoomOverlay';
import { getStaticProps } from '../../components/withTranslationProps';
import useT from '../../lib/hooks/useT';
import { FullRoom } from './salas/[room]';
import Rooms from '../../components/jogos/Rooms';

export default function JogosPage() {
  const t = useT();
  const [showModal, setShowModal] = useState(false);
  const [rooms, setRooms] = useState<FullRoom[]>([]);
  const handleModal = () => setShowModal(!showModal);
  useEffect(() => {
    const unsubscribe = lobby.getRooms((data) => {
      setRooms(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <main>
      <Rooms rooms={rooms} />
      <button type="button" onClick={handleModal} className={styles['jogos-new-room-btn']}>
        {t('jogos.newRoom')}
      </button>
      {showModal && <NewRoomModal handleClose={handleModal} />}
    </main>
  );
}

export const Jogos = withTranslation('common')(JogosPage);

export { getStaticProps };
