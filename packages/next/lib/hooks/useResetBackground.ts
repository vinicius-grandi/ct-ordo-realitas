import { useEffect } from 'react';

export default function useResetBackground() {
  useEffect(() => {
    document.body.style.background = "url('/images/add-new-ritual-bg.jpg')";
    document.body.style.backgroundPosition = '90% 100%';
    document.body.style.backgroundSize = 'auto';
    return () => {
      document.body.style.background = 'url("images/background.png")';
    };
  });
}
