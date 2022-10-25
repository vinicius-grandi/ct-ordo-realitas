import {
  handleTargets,
  selectIsSelectionMode,
  selectTargets,
} from '@ct-ordo-realitas/app/redux/battlefieldSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function ClickToggler({ eid, children }: { eid: string; children: JSX.Element }) {
  const isSelectionMode = useSelector(selectIsSelectionMode);
  const targets = useSelector(selectTargets);
  const dispatch = useDispatch();
  const isTargetSelected = targets.findIndex((id) => id === eid) > -1;
  const conditionalDispatch = () => {
    if (isSelectionMode) {
      dispatch(handleTargets({ eid }));
    }
  };

  return (
    <div
      onClick={() => conditionalDispatch()}
      role="button"
      tabIndex={0}
      style={{
        cursor: !isSelectionMode ? 'initial' : 'pointer',
        backgroundColor: isTargetSelected ? 'gray' : 'initial',
        width: 'fit-content',
        margin: 'auto',
      }}
      onKeyDown={(ev) => {
        const key = ev.key.toLowerCase();
        if (key === 'space' || key === 'enter') {
          conditionalDispatch();
        }
      }}
    >
      <div style={{ pointerEvents: isSelectionMode ? 'none' : 'initial' }}>{children}</div>
    </div>
  );
}
