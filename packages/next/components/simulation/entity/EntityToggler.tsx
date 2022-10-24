import { handleEntities } from '@ct-ordo-realitas/app/redux/battlefieldSlice';
import { useDispatch } from 'react-redux';

export default function EntityToggler() {
  const dispatch = useDispatch();
  return (
    <div>
      <button type="button" aria-label="previous target" onClick={() => dispatch(handleEntities({ nextOrPrev: 'prev' }))}>
        {'<'}
      </button>
      <button type="button" aria-label="next target" onClick={() => dispatch(handleEntities({ nextOrPrev: 'next' }))}>
        {'>'}
      </button>
    </div>
  );
}
