import { useEffect, useState } from 'react';

const useWindowsSize = (
  setPopup: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const [windowSize, setWindowSize] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1000) setPopup(false);
      setWindowSize(window.innerWidth);
    };
    setWindowSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setPopup]);

  return windowSize;
};

export default useWindowsSize;
