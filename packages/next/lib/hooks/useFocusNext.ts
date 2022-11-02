import {
  useCallback,
  useRef,
  KeyboardEvent,
} from 'react';

type Ref = (((input: HTMLInputElement) => void));

const useFocusNext: () => [Ref, (input: HTMLInputElement) => HTMLInputElement] = () => {
  const inputs = useRef<HTMLInputElement[]>([]);

  const getNextInput = (input: HTMLInputElement) => {
    const idx = inputs.current.indexOf(input) + 1;
    const nextNonDisabledInput = inputs.current.slice(idx).find((i) => i.disabled !== true);
    return nextNonDisabledInput === undefined ? inputs.current[0] : nextNonDisabledInput;
  };

  const handler: any = useCallback((ev: KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === 'Enter' && ev.currentTarget.type !== 'button') {
      const nextInput = getNextInput(ev.currentTarget);
      nextInput.focus();
      ev.preventDefault();
    }
  }, []);

  return [useCallback(
    (input: HTMLInputElement) => {
      if (!input) return;
      const elementAlreadyExist = inputs.current.includes(input);
      if (!elementAlreadyExist) {
        input.addEventListener('keydown', handler);
        inputs.current.push(input);
      }
    },
    [handler],
  ), getNextInput];
};

export default useFocusNext;
