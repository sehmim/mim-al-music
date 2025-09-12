import { useEffect, useRef, useState } from 'react';

export const useHighlight = <T extends HTMLElement = HTMLDivElement>(options?: IntersectionObserverInit) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHighlighted(entry.isIntersecting);
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: '-10% 0px -10% 0px', // Only trigger when element is in the middle portion of viewport
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options]);

  return { ref, isHighlighted };
};
