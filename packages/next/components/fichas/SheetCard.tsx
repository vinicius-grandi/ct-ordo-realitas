import Image from 'next/image';
import type { Sheet } from '../../pages/fichas';

export default function SheetCard({ info }: { info: Sheet }) {
  return (
    <div>
      <span>{info.vd}</span>
      <Image src={info.imagePath} height={50} width={50} alt={info.name} />
      <h2>{info.name}</h2>
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
      <p>
        autor:
        {' '}
        {info.author}
      </p>
      <button type="button">-VD</button>
      <button type="button">+VD</button>
    </div>
  );
}
