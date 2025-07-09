import { Card, CardContent } from '@/components/ui/card';
import * as Icons from 'lucide-react';
import { useTranslations } from '../hooks/useTranslations';
import { useLanguage } from '../contexts/LanguageContext';
import { AboutData } from '../types';

export default function About() {
  const { translations, loading, t } = useTranslations();
  const { isRTL } = useLanguage();
  const aboutData = translations.about;

  if (loading || !aboutData) {
    return (
      <section id="about" data-section="about" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/2 mx-auto mb-8"></div>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
              </div>
              <div className="h-64 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" data-section="about" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{aboutData.title}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {aboutData.description}
          </p>
        </div>
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${isRTL ? 'lg:grid-cols-reverse' : ''}`}>
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">{aboutData.professionalJourney.title}</h3>
              {aboutData.professionalJourney.content.map((paragraph: string, index: number) => (
                <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <Card className="bg-muted/50">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-foreground mb-6">{t('about.achievements')}</h3>
              <div className="space-y-4">
                {aboutData.achievements.map((achievement: any, index: number) => {
                  // Convert kebab-case to PascalCase for icon names
                  const iconName = achievement.icon.split('-').map((word: string) => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join('');
                  const IconComponent = (Icons[iconName as keyof typeof Icons] || Icons.Star) as React.ComponentType<{ className?: string }>;
                  return (
                    <div key={index} className={`flex items-start ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                      <IconComponent className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground">{achievement.title}</p>
                        <p className="text-muted-foreground text-sm">{achievement.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
