import React from 'react';
import { selectEntity } from '@ct-ordo-realitas/app/redux/battlefieldSlice';
import { useSelector } from 'react-redux';
import type { InputChangeEvent } from '../Entity';

function Notes(
  { eid, handleChange }: { eid: string; handleChange: (ev: InputChangeEvent) => void },
) {
  const entity = useSelector(selectEntity(eid));
  return (
    <div>
      <h2>Notas</h2>
      <textarea
        name="notes"
        value={entity.notes}
        cols={20}
        rows={10}
        onChange={handleChange}
      />
    </div>
  );
}

export default React.memo(Notes);
