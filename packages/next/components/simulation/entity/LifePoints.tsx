import styles from '@styles/main.module.sass';
import type { InputChangeEvent } from '../Entity';
import type { EntityConfig } from '../Shortcut.d';

export default function LifePoints({
  entity,
  handleChange,
}: {
  entity: EntityConfig;
  handleChange: (ev: InputChangeEvent) => void;
}) {
  return (
    <div className={styles['life-points-tab']}>
      <h2>Pontos de Vida</h2>
      <input type="number" name="pv" value={entity.pv} onChange={handleChange} />
    </div>
  );
}
