import {Button} from '@/components/ui/button';
import {Mail} from 'lucide-react';
import {useTranslations} from '../hooks/useTranslations';
import {useLanguage} from '../contexts/LanguageContext';
import {trackContactInteraction} from '../lib/analytics';

export default function Contact() {
    const {translations, t, loading} = useTranslations();
    const {isRTL} = useLanguage();
    const personalInfo = translations.personal;

    if (loading || !personalInfo) {
        return (
            <section id="contact" data-section="contact" className="py-16 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-muted rounded w-1/2 mx-auto mb-8"></div>
                        <div className="h-64 bg-muted rounded max-w-2xl mx-auto"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="contact" data-section="contact" className="py-16 bg-background">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">{t('contact.title')}</h2>
                    <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                        {t('contact.subtitle')}
                    </p>

                    <div
                        className={`inline-flex items-center p-6 bg-muted/30 rounded-xl ${isRTL ? 'space-x-reverse space-x-6' : 'space-x-6'}`}>
                        <div className="text-center">
                            <a
                                href={`mailto:${personalInfo.email}`}
                                onClick={() => trackContactInteraction('email')}
                                className="text-lg text-primary hover:text-primary/80 font-medium transition-colors"
                            >
                                {personalInfo.email}
                            </a>
                        </div>

                        <Button
                            asChild
                            variant="outline"
                            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                            <a
                                href={`mailto:${personalInfo.email}`}
                                onClick={() => trackContactInteraction('email')}
                            >
                                <Mail className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`}/>
                                {t('contact.email')}
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}