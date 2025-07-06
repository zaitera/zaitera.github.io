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

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
    page_path: url,
    page_title: title || document.title,
    page_location: window.location.href
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

// Track contact form submissions
export const trackContactSubmission = (method: string) => {
  trackEvent('submit', 'contact', method);
};

// Track social media clicks
export const trackSocialClick = (platform: string) => {
  trackEvent('click', 'social', platform);
};

// Track section views (for scroll tracking)
export const trackSectionView = (sectionName: string) => {
  trackEvent('view', 'section', sectionName);
};
