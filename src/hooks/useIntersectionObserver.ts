import { useEffect, useRef, type RefObject } from 'react';

export function useIntersectionObserver(
  options: IntersectionObserverInit = { threshold: 0.15 }
): RefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Handle stagger children
          const staggerContainer = entry.target.querySelector('.stagger-children');
          if (staggerContainer) {
            staggerContainer.classList.add('visible');
          }
          // Handle section-hidden elements
          entry.target.querySelectorAll('.section-hidden').forEach((section) => {
            section.classList.add('section-visible');
            section.classList.remove('section-hidden');
          });
          // If the target itself has section-hidden
          if (entry.target.classList.contains('section-hidden')) {
            entry.target.classList.add('section-visible');
            entry.target.classList.remove('section-hidden');
          }
        }
      });
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold]);

  return ref;
}
