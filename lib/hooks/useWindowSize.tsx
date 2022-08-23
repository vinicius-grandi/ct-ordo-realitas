import { useEffect, useState } from 'react';

const useWindowsSize = () => {
  const [windowSize, setWindowSize] = useState(0);

  const handleResize = () => {
    setWindowSize(window.innerWidth);
  };

  useEffect(() => {
    setWindowSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  return windowSize;
};

export default useWindowsSize;
