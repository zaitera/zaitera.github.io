// Google Analytics utility functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Initialize Google Analytics
export const initGA = (measurementId: string) => {
  if (typeof window === 'undefined' || !measurementId) return;

  window.gtag = window.gtag || function() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    page_title: document.title,
    page_location: window.location.href,
    send_page_view: true
  });
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  });
};

// Track button clicks
export const trackButtonClick = (buttonName: string, section?: string) => {
  trackEvent('click', 'engagement', `${section ? section + '_' : ''}${buttonName}`);
};

// Track social media clicks
export const trackSocialClick = (platform: string) => {
  trackEvent('click', 'social', platform);
};

// Track section views (for scroll tracking)
export const trackSectionView = (sectionName: string) => {
  trackEvent('view', 'section', sectionName);
};

// Setup intersection observer for section tracking
export const setupSectionTracking = () => {
  if (typeof window === 'undefined') return;

  const sections = document.querySelectorAll('section[data-section]');
  const trackedSections = new Set<string>();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          const sectionName = entry.target.getAttribute('data-section');
          if (sectionName && !trackedSections.has(sectionName)) {
            trackedSections.add(sectionName);
            trackSectionView(sectionName);
          }
        }
      });
    },
    {
      threshold: 0.5,
      rootMargin: '0px 0px -20% 0px'
    }
  );

  sections.forEach((section) => observer.observe(section));
};
