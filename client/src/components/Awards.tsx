import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import { AwardItem } from '../types';

interface AwardsData {
  title: string;
  description: string;
  items: AwardItem[];
}

export default function Awards() {
  const [awardsData, setAwardsData] = useState<AwardsData | null>(null);

  useEffect(() => {
    fetch('/src/data/awards.json')
      .then(res => res.json())
      .then(data => setAwardsData(data))
      .catch(err => console.error('Error loading awards data:', err));
  }, []);

  if (!awardsData) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/2 mx-auto mb-8"></div>
            <div className="grid md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-64 bg-muted rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{awardsData.title}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {awardsData.description}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {awardsData.items.map((award) => (
            <Card key={award.id} className="bg-card hover:shadow-xl transition-shadow duration-300 border border-border text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{award.title}</h3>
                <p className="text-primary font-medium mb-2">{award.organization}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {award.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
