import Image from 'next/image';
import styles from '@styles/main.module.sass';
import { useEffect } from 'react';
import CloseButton from '../../CloseButton';
import { EntityConfig } from '../Shortcut';

export default function EntityHeader({
  handleChange,
  handleOverlay,
  entity,
}: {
  handleChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  handleOverlay: () => void;
  entity: EntityConfig;
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'initial';
    };
  }, []);
  return (
    <div className={styles['name-tab']}>
      <span>
        <Image src="/images/user-icon.svg" width={50} height={50} alt="user-icon" />
        {entity.tipo === 'player' ? 'monstro' : 'jogador'}
      </span>
      <input type="text" value={entity.nome} name="nome" onChange={handleChange} />
      <CloseButton handleClose={handleOverlay} />
    </div>
  );
}
