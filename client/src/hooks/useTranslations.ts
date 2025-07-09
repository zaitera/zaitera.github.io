import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

// Import English translations statically
import { personal as enPersonal } from '../data/en/personal';
import { about as enAbout } from '../data/en/about';
import { experience as enExperience } from '../data/en/experience';
import { education as enEducation } from '../data/en/education';
import { expertise as enExpertise } from '../data/en/expertise';
import { projects as enProjects } from '../data/en/projects';
import { awards as enAwards } from '../data/en/awards';
import { translations as enUITranslations } from '../data/en/ui';

// Import Arabic translations statically
import { personal as arPersonal } from '../data/ar/personal';
import { about as arAbout } from '../data/ar/about';
import { experience as arExperience } from '../data/ar/experience';
import { education as arEducation } from '../data/ar/education';
import { expertise as arExpertise } from '../data/ar/expertise';
import { projects as arProjects } from '../data/ar/projects';
import { awards as arAwards } from '../data/ar/awards';
import { translations as arUITranslations } from '../data/ar/ui';

interface TranslationData {
  [key: string]: any;
}

const translationData = {
  en: {
    personal: enPersonal,
    about: enAbout,
    experience: enExperience,
    education: enEducation,
    expertise: enExpertise,
    projects: enProjects,
    awards: enAwards,
    ui: enUITranslations.ui
  },
  ar: {
    personal: arPersonal,
    about: arAbout,
    experience: arExperience,
    education: arEducation,
    expertise: arExpertise,
    projects: arProjects,
    awards: arAwards,
    ui: arUITranslations.ui
  }
};

export const useTranslations = () => {
  const { language } = useLanguage();
  const [translations, setTranslations] = useState<TranslationData>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simply set the translations based on the current language
    setTranslations(translationData[language] || translationData.en);
  }, [language]);

  // Helper function to get nested translation values
  const t = (key: string): string => {
    const keys = key.split('.');
    let value = translations.ui; // Start from the ui object
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return { translations, t, loading };
};
