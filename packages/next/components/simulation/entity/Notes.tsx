import React from 'react';
import { selectEntity } from '@ct-ordo-realitas/app/redux/battlefieldSlice';
import { useSelector } from 'react-redux';
import type { InputChangeEvent } from '../Entity';
import useT from '../../../lib/hooks/useT';

function Notes({
  eid,
  handleChange,
}: {
  eid: string;
  handleChange: (ev: InputChangeEvent) => void;
}) {
  const entity = useSelector(selectEntity(eid));
  const t = useT();
  return (
    <div>
      <h2>{t('simulacao.overlay.notes')}</h2>
      <textarea name="notes" value={entity.notes} cols={20} rows={10} onChange={handleChange} />
    </div>
  );
}

export default React.memo(Notes);
