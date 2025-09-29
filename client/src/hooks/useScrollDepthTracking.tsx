import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

export const useScrollDepthTracking = () => {
  useEffect(() => {
    let maxScrollDepth = 0;
    const trackingPoints = [25, 50, 75, 100];
    const trackedPoints = new Set<number>();

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollPercent = Math.round((scrollTop / scrollHeight) * 100);

      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;

        // Track milestone percentages
        trackingPoints.forEach(point => {
          if (scrollPercent >= point && !trackedPoints.has(point)) {
            trackEvent('scroll_depth', 'engagement', `${point}%`, point);
            trackedPoints.add(point);
          }
        });
      }
    };

    const throttledHandleScroll = throttle(handleScroll, 500);
    window.addEventListener('scroll', throttledHandleScroll);

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, []);
};

// Simple throttle function
function throttle(func: Function, wait: number) {
  let timeout: NodeJS.Timeout | null = null;
  return function executedFunction(...args: any[]) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
  };
}