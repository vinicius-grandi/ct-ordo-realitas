import Image from 'next/image';
import styles from '@styles/main.module.sass';
import type { Sheet } from '../../pages/fichas';

export default function SheetCard({ info }: { info: Sheet }) {
  return (
    <div className={styles['sheet-card']}>
      <p className={styles['sheet-card-vd']}>
        VD
        {' '}
        <span>{info.vd}</span>
      </p>
      <a href={`https://fichasop.com/sessao/personagem/?token=${info.token}`} target="_blank" rel="noopener noreferrer">
        <div className={styles['sheet-card-external-link']}>
          <Image src="/images/external-link.png" height={50} width={50} alt="external link" />
        </div>
      </a>
      <Image src={info.imagePath} height={50} width={50} alt={info.name} />
      <h2>{info.name}</h2>
      <div className={styles['sheet-card-row']} style={{ justifyContent: 'space-around' }}>
        <div className={styles['sheet-card-attributes']}>
          <p>
            FOR:
            {' '}
            <span>{info.for}</span>
          </p>
          <p>
            agi:
            {' '}
            <span>{info.agi}</span>
          </p>
          <p>
            pre:
            {' '}
            <span>{info.pre}</span>
          </p>
          <p>
            vig:
            {' '}
            <span>{info.vig}</span>
          </p>
          <p>
            int:
            {' '}
            <span>{info.int}</span>
          </p>
        </div>
        <p>
          autor:
          <br />
          <span><strong>{info.author}</strong></span>
        </p>
      </div>
      <div className={styles['sheet-card-row']}>
        <button type="button" className={styles['sheet-card-button']}>-VD</button>
        <button type="button" className={styles['sheet-card-button']}>+VD</button>
      </div>
    </div>
  );
}
