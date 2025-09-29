// Google Analytics utility functions
declare global {
    interface Window {
        gtag: (...args: any[]) => void;
        dataLayer: any[];
    }
}

export const GA_MEASUREMENT_ID = 'G-N39NQHPF0J';

// Track page views
export const trackPageView = (url: string, title?: string) => {
    if (typeof window === 'undefined' || !window.gtag) return;

    window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
        page_title: title,
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

// Track external link clicks
export const trackExternalLink = (url: string, linkText?: string) => {
    trackEvent('click', 'external_link', linkText || url);
};

// Track contact interactions
export const trackContactInteraction = (method: 'email' | 'form' | 'social', platform?: string) => {
    trackEvent('contact', 'interaction', platform ? `${method}_${platform}` : method);
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
