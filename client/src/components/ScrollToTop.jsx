import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollToPageTop = () => {
      try {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'auto'
        });
      } catch {
        window.scrollTo(0, 0);
      }
    };

    const animationFrameId =
      window.requestAnimationFrame(scrollToPageTop);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [pathname]);

  return null;
}