import { useEffect, useState, RefObject } from 'react';

interface ScrollAnimationState {
  progress: number;
  isInView: boolean;
}

export function useScrollAnimation(
  ref: RefObject<HTMLElement | null>,
  options: { threshold?: number; rootMargin?: string } = {}
): ScrollAnimationState {
  const [state, setState] = useState<ScrollAnimationState>({
    progress: 0,
    isInView: false,
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setState((prev) => ({ ...prev, isInView: entry.isIntersecting }));
      },
      {
        threshold: options.threshold ?? 0.1,
        rootMargin: options.rootMargin ?? '0px',
      }
    );

    observer.observe(element);

    const handleScroll = () => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;

      // Calculate progress based on element position in viewport
      // 0 = top of element at bottom of viewport
      // 1 = bottom of element at top of viewport
      const start = windowHeight;
      const end = -elementHeight;
      const current = rect.top;

      const progress = Math.max(0, Math.min(1, (start - current) / (start - end)));

      setState((prev) => ({ ...prev, progress }));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref, options.threshold, options.rootMargin]);

  return state;
}
