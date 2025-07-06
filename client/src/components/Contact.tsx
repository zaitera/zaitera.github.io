import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { PersonalInfo } from '../types';

export default function Contact() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);

  useEffect(() => {
    fetch('/src/data/personal.json')
      .then(res => res.json())
      .then(data => setPersonalInfo(data))
      .catch(err => console.error('Error loading personal info:', err));
  }, []);

  if (!personalInfo) {
    return (
      <section id="contact" className="py-16 bg-background">
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
    <section id="contact" className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">Contact</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you have questions, ideas to share, or just want to connect — I'm always interested in meaningful conversations.
          </p>
          
          <div className="inline-flex items-center space-x-6 p-6 bg-muted/30 rounded-xl">
            <div className="text-center">
              <a 
                href={`mailto:${personalInfo.email}`}
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
              <a href={`mailto:${personalInfo.email}`}>
                <Mail className="mr-2 h-4 w-4" />
                Email
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}