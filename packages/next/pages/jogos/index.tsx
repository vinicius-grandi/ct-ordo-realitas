import { withTranslation } from 'next-i18next';
import { useState } from 'react';
import NewRoomModal from '../../components/jogos/NewRoomOverlay';
import useT from '../../lib/hooks/useT';

export default function JogosPage() {
  const t = useT();
  const [showModal, setShowModal] = useState(false);
  const handleModal = () => setShowModal(!showModal);

  return (
    <main>
      <button type="button" onClick={handleModal}>{t('jogos.newRoom')}</button>
      {showModal && <NewRoomModal />}
    </main>
  );
}

export const Jogos = withTranslation('common')(JogosPage);
