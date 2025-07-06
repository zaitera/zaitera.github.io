import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';
import { EducationData } from '../types';

export default function Education() {
  const [educationData, setEducationData] = useState<EducationData | null>(null);

  useEffect(() => {
    fetch('/src/data/education.json')
      .then(res => res.json())
      .then(data => setEducationData(data))
      .catch(err => console.error('Error loading education data:', err));
  }, []);

  if (!educationData) {
    return (
      <section data-section="education" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/2 mx-auto mb-8"></div>
            <div className="max-w-4xl mx-auto">
              <div className="h-48 bg-muted rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section data-section="education" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Education & Research</h2>
        </div>
        <div className="max-w-4xl mx-auto">
          <Card className="bg-muted/50 border border-border">
            <CardContent className="p-8">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-foreground mb-2">{educationData.degree}</h3>
                  <p className="text-primary font-medium text-lg mb-2">{educationData.institution}</p>
                  <p className="text-muted-foreground mb-4">{educationData.location}</p>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">{educationData.researchFocus.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {educationData.researchFocus.description}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">{educationData.teachingExperience.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {educationData.teachingExperience.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
