import {useState} from 'react';
import {useTheme} from './ThemeProvider';
import {useTranslations} from '../hooks/useTranslations';
import {useLanguage} from '../contexts/LanguageContext';
import {LanguageToggle} from './LanguageToggle';
import {Button} from '@/components/ui/button';
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet';
import {Menu, Moon, Sun} from 'lucide-react';

export default function Navigation() {
    const {theme, toggleTheme} = useTheme();
    const {isRTL} = useLanguage();
    const {t, translations} = useTranslations();
    const [isOpen, setIsOpen] = useState(false);

    const navigationItems = [
        {href: '#about', label: t('navigation.about')},
        {href: '#expertise', label: t('navigation.expertise')},
        {href: '#experience', label: t('navigation.experience')},
        {href: '#contact', label: t('navigation.contact')},
    ];

    const handleNavClick = (href: string) => {
        setIsOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({behavior: 'smooth'});
        }
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <img
                            src="/logo-light.png"
                            alt="Abdullah Zaiter Logo"
                            className={`h-10 w-10 ${isRTL ? 'ml-4' : 'mr-4'} dark:hidden`}
                        />
                        <img
                            src="/logo-dark.png"
                            alt="Abdullah Zaiter Logo"
                            className={`h-10 w-10 ${isRTL ? 'ml-4' : 'mr-4'} hidden dark:block`}
                        />
                        <span
                            className="text-xl font-bold text-primary leading-none">{translations.personal?.name || 'Abdullah Zaiter'}</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className={`hidden md:flex ${isRTL ? 'space-x-reverse space-x-8' : 'space-x-8'}`}>
                        {navigationItems.map((item) => (
                            <button
                                key={item.href}
                                onClick={() => handleNavClick(item.href)}
                                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                        <LanguageToggle/>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            className="bg-muted hover:bg-muted/80"
                        >
                            {theme === 'dark' ? (
                                <Sun className="h-5 w-5"/>
                            ) : (
                                <Moon className="h-5 w-5"/>
                            )}
                        </Button>

                        {/* Mobile Menu */}
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden bg-muted">
                                    <Menu className="h-5 w-5"/>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side={isRTL ? 'left' : 'right'}>
                                <div className="flex flex-col space-y-4 mt-8">
                                    <LanguageToggle/>
                                    {navigationItems.map((item) => (
                                        <button
                                            key={item.href}
                                            onClick={() => handleNavClick(item.href)}
                                            className={`py-2 text-muted-foreground hover:text-primary transition-colors duration-200 ${isRTL ? 'text-right' : 'text-left'}`}
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    );
}
