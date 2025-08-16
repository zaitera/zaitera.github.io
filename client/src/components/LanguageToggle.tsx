import React from 'react';
import {useLanguage} from '../contexts/LanguageContext';
import {useTranslations} from '../hooks/useTranslations';
import {Button} from '@/components/ui/button';

export const LanguageToggle: React.FC = () => {
    const {language, setLanguage} = useLanguage();
    const {t} = useTranslations();

    return (
        <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <Button
                variant={language === 'en' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('en')}
                className="text-xs px-2 py-1"
            >
                EN
            </Button>
            <Button
                variant={language === 'ar' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('ar')}
                className="text-xs px-2 py-1"
            >
                ع
            </Button>
        </div>
    );
};
