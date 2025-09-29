import {ExternalLink, Github, Instagram, Linkedin, Rss} from 'lucide-react';
import {useTranslations} from '../hooks/useTranslations';
import {useLanguage} from '../contexts/LanguageContext';
import {trackSocialClick, trackExternalLink} from '../lib/analytics';

export default function Footer() {
    const {translations, t, loading} = useTranslations();
    const {isRTL} = useLanguage();
    const personalInfo = translations.personal;

    const handleNavClick = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({behavior: 'smooth'});
        }
    };

    const handleZaitechClick = () => {
        trackExternalLink(personalInfo?.company?.website || '', personalInfo?.company?.name);
        window.open(personalInfo?.company?.website, '_blank', 'noopener,noreferrer');
    };

    const services = [
        {href: '#expertise', label: t('footer.services.consultancy') || 'Technical Consultancy'},
        {href: '#expertise', label: t('footer.services.mentorship') || 'Mentorship Programs'},
        {href: '#expertise', label: t('footer.services.training') || 'Advanced Training'},
    ];

    if (loading || !personalInfo) {
        return (
            <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse">
                        <div className="grid md:grid-cols-4 gap-8">
                            <div className="md:col-span-2">
                                <div className="h-6 bg-gray-800 rounded w-1/2 mb-4"></div>
                                <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-800 rounded w-2/3"></div>
                            </div>
                            <div className="h-32 bg-gray-800 rounded"></div>
                            <div className="h-32 bg-gray-800 rounded"></div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }

    return (
        <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`grid md:grid-cols-4 gap-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <div className="md:col-span-2">
                        <h3 className="text-2xl font-bold text-primary mb-4">{personalInfo.name}</h3>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            {t('footer.description')}{' '}
                            <span
                                onClick={handleZaitechClick}
                                className="cursor-pointer text-gray-200 hover:text-primary transition-all duration-300 group inline-flex items-center font-medium"
                            >
                {personalInfo.company?.name}
                                <ExternalLink
                                    className={`h-3 w-3 opacity-70 group-hover:opacity-100 group-hover:text-primary transition-all duration-300 ${isRTL ? 'mr-1 scale-x-[-1]' : 'ml-1'}`}/>
              </span>
                            .
                            <br/>{t('footer.specialization')}
                        </p>
                        <div className={`flex ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                            <a
                                href={`https://github.com/${personalInfo.social?.github}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-primary transition-colors duration-200"
                                onClick={() => trackSocialClick('GitHub')}
                            >
                                <Github className="h-6 w-6"/>
                            </a>
                            <a
                                href={`https://linkedin.com/in/${personalInfo.social?.linkedin}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-primary transition-colors duration-200"
                                onClick={() => trackSocialClick('LinkedIn')}
                            >
                                <Linkedin className="h-6 w-6"/>
                            </a>
                            <a
                                href={personalInfo.company?.blog}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-primary transition-colors duration-200"
                                onClick={() => trackExternalLink(personalInfo.company?.blog || '', 'Blog')}
                            >
                                <Rss className="h-6 w-6"/>
                            </a>
                            <a
                                href={`https://instagram.com/${personalInfo.social?.instagram}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-primary transition-colors duration-200"
                                onClick={() => trackSocialClick('Instagram')}
                            >
                                <Instagram className="h-6 w-6"/>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">{t('footer.services.title')}</h4>
                        <ul className="space-y-2 text-gray-300">
                            {services.map((service, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => handleNavClick(service.href)}
                                        className={`hover:text-primary transition-colors duration-200 ${isRTL ? 'text-right' : 'text-left'}`}
                                    >
                                        {service.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-400">
                        © 2025 {personalInfo.name}. {t('footer.rights')}
                    </p>
                </div>
            </div>
        </footer>
    );
}
