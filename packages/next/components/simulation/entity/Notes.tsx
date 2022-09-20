import type { InputChangeEvent } from '../Entity';
import type { EntityConfig } from '../Shortcut';

export default function Notes(
  { entity, handleChange }: { entity: EntityConfig; handleChange: (ev: InputChangeEvent) => void },
) {
  return (
    <div>
      <h2>Notas</h2>
      <textarea
        name="notas"
        value={entity.notas}
        cols={20}
        rows={10}
        onChange={handleChange}
      />
    </div>
  );
}
