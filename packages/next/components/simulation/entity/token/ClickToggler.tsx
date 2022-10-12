import { handleTargets, selectIsSelectionMode } from '@ct-ordo-realitas/app/redux/battlefieldSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function ClickToggler({ eid, children }: { eid: string, children: JSX.Element }) {
  const isSelectionMode = useSelector(selectIsSelectionMode);
  const dispatch = useDispatch();
  const conditionalDispatch = () => {
    if (isSelectionMode) {
      dispatch(handleTargets({ eid }));
      console.log('teste');
    }
  };

  return (
    <div
      onClick={() => conditionalDispatch()}
      role="button"
      tabIndex={0}
      onKeyDown={(ev) => {
        const key = ev.key.toLowerCase();
        if (key === 'space' || key === 'enter') {
          conditionalDispatch();
        }
      }}
    >
      <div style={{ pointerEvents: isSelectionMode ? 'none' : 'initial' }}>
        {children}
      </div>
    </div>
  );
}
