import { KeyboardEvent, useCallback, useRef } from 'react';

const useFocusNext = () => {
  const elements = useRef<HTMLInputElement[]>([]);

  const handler: any = (ev: KeyboardEvent<HTMLInputElement>) => {
    const idx = elements.current.indexOf(ev.currentTarget);
    const limit = (idx + 1) % elements.current.length;
    if (ev.key === 'Enter') {
      elements.current[limit].focus();
    }
  };

  return useCallback((element: HTMLInputElement) => {
    if (!element) return;
    const elementAlreadyExist = elements.current.includes(element);
    if (!elementAlreadyExist) {
      element.addEventListener('keydown', handler);
      elements.current.push(element);
    }
  }, []);
};

export default useFocusNext;
