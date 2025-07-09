import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const isRTL = language === 'ar';

  // Helper function to get language from URL
  const getLanguageFromURL = (): Language | null => {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang') as Language;
    return (langParam === 'en' || langParam === 'ar') ? langParam : null;
  };

  // Helper function to update URL with language parameter
  const updateURLWithLanguage = (lang: Language) => {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url.toString());
  };

  useEffect(() => {
    // Priority: URL parameter > localStorage > default 'en'
    const urlLanguage = getLanguageFromURL();
    const savedLanguage = localStorage.getItem('language') as Language;
    
    if (urlLanguage) {
      // URL parameter takes priority
      setLanguage(urlLanguage);
    } else if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      // Use saved language and update URL
      setLanguage(savedLanguage);
      updateURLWithLanguage(savedLanguage);
    } else {
      // Default to 'en' and update URL
      setLanguage('en');
      updateURLWithLanguage('en');
    }

    // Listen for URL changes (back/forward navigation)
    const handlePopState = () => {
      const newUrlLanguage = getLanguageFromURL();
      if (newUrlLanguage && newUrlLanguage !== language) {
        setLanguage(newUrlLanguage);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    // Save language to localStorage
    localStorage.setItem('language', language);
    
    // Update URL parameter
    updateURLWithLanguage(language);
    
    // Update document direction and language
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        isRTL,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
