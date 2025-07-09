import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import * as Icons from 'lucide-react';
import { ExpertiseItem } from '../types';
import { useTranslations } from '../hooks/useTranslations';
import { useLanguage } from '../contexts/LanguageContext';

export default function CoreExpertise() {
  const { translations, loading } = useTranslations();
  const { isRTL } = useLanguage();
  const expertiseData = translations.expertise;

  if (loading || !expertiseData) {
    return (
      <section id="expertise" data-section="expertise" className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/2 mx-auto mb-8"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-64 bg-muted rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="expertise" data-section="expertise" className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{expertiseData.title}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {expertiseData.description}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {expertiseData.items.map((item: ExpertiseItem) => {
            // Convert kebab-case to PascalCase for icon names
            const iconName = item.icon.split('-').map((word: string) => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join('');
            const IconComponent = (Icons[iconName as keyof typeof Icons] || Icons.Star) as React.ComponentType<{ className?: string }>;
            const iconColorClass = item.color === 'primary' ? 'text-primary' : 'text-primary';
            const bgColorClass = item.color === 'primary' ? 'bg-primary/10' : 'bg-primary/10';
            
            return (
              <Card key={item.id} className="bg-card hover:shadow-xl transition-shadow duration-300 border border-border">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className={`w-12 h-12 ${bgColorClass} rounded-lg flex items-center justify-center mb-4`}>
                      <IconComponent className={`h-6 w-6 ${iconColorClass}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className={`text-muted-foreground text-sm leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                      {item.description}
                    </p>
                  </div>
                  {item.metrics && (
                    <div className="text-sm text-primary font-medium">
                      {item.metrics}
                    </div>
                  )}
                  {item.technologies && (
                    <div className={`flex flex-wrap gap-1 mt-4 ${isRTL ? 'justify-end' : ''}`}>
                      {item.technologies.map((tech: string, index: number) => (
                        <Badge key={index} variant="default" className="text-xs bg-primary/10 text-primary hover:bg-primary/20">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
