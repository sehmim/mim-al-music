import { useEffect, useRef, useState } from 'react';

export const useHighlight = <T extends HTMLElement = HTMLDivElement>(options?: IntersectionObserverInit) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only highlight when the center 50% of the element is visible
        const rect = entry.boundingClientRect;
        const viewportHeight = window.innerHeight;
        const elementHeight = rect.height;
        
        // Calculate if the center 50% of the element is in the viewport
        const elementTop = rect.top;
        const elementBottom = rect.bottom;
        const elementCenter = elementTop + (elementHeight / 2);
        const center50Top = elementCenter - (elementHeight * 0.25); // Top 25% from center
        const center50Bottom = elementCenter + (elementHeight * 0.25); // Bottom 25% from center
        
        const isCenter50Visible = center50Top >= 0 && center50Bottom <= viewportHeight;
        setIsHighlighted(entry.isIntersecting && isCenter50Visible);
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
        rootMargin: '-25% 0px -25% 0px', // Only trigger when element is in the center 50% of viewport
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
