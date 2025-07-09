import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ExperienceItem } from '../types';
import { useTranslations } from '../hooks/useTranslations';
import { useLanguage } from '../contexts/LanguageContext';

export default function Experience() {
  const { translations, t, loading } = useTranslations();
  const { isRTL } = useLanguage();
  const experienceData = translations.experience;
  const [showAll, setShowAll] = useState(false);

  if (loading || !experienceData) {
    return (
      <section id="experience" data-section="experience" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/2 mx-auto mb-8"></div>
            <div className="space-y-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-48 bg-muted rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const visibleItems = showAll ? experienceData.items : experienceData.items.slice(0, 3);

  return (
    <section id="experience" data-section="experience" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{experienceData.title}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {experienceData.description}
          </p>
        </div>
        <div className="space-y-8">
          {visibleItems.map((item: ExperienceItem) => {
            return (
              <Card key={item.id} className="bg-muted/50 border border-border">
                <CardContent className="p-8">
                  <div className={`flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
                    <div className="mb-4 lg:mb-0">
                      <h3 className="text-2xl font-semibold text-foreground">{item.title}</h3>
                      <p className="text-primary font-medium text-lg">{item.company}</p>
                      <p className="text-muted-foreground">{item.location}</p>
                    </div>
                    <div className={`${isRTL ? 'text-left' : 'text-right'}`}>
                      <p className="text-muted-foreground font-medium">{item.period}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {item.description}
                  </p>
                  <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : ''}`}>
                    {item.skills?.map((skill: string, index: number) => (
                      <Badge key={index} variant="default" className="text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {experienceData.items.length > 3 && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-medium"
            >
              {showAll ? (
                <>
                  <ChevronUp className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {t('experience.showLess')}
                </>
              ) : (
                <>
                  <ChevronDown className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {t('experience.showMore')}
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
