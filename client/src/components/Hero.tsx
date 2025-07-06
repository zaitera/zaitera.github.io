import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Folder, Github, Linkedin, Instagram, MapPin, User, Rss } from 'lucide-react';
import { PersonalInfo } from '../types';
import { trackButtonClick, trackSocialClick } from '../lib/analytics';
import avatarImage from '@assets/az-talk_1749424545263.jpg';

export default function Hero() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);

  useEffect(() => {
    fetch('/src/data/personal.json')
      .then(res => res.json())
      .then(data => setPersonalInfo(data))
      .catch(err => console.error('Error loading personal info:', err));
  }, []);

  if (!personalInfo) {
    return (
      <section className="pt-20 pb-16 bg-gradient-to-br from-muted/50 to-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-muted rounded w-1/2 mb-8"></div>
            <div className="flex gap-4">
              <div className="h-12 bg-muted rounded w-32"></div>
              <div className="h-12 bg-muted rounded w-32"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const handleContactClick = () => {
    trackButtonClick('get_in_touch', 'hero');
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProjectsClick = () => {
    trackButtonClick('view_projects', 'hero');
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSocialClick = (platform: string, url: string) => {
    trackSocialClick(platform);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-muted/50 to-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Avatar Section - Now at the top */}
          <div className="mb-8 animate-float">
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-primary/60 to-primary/80 rounded-2xl shadow-2xl transform rotate-3 opacity-20"></div>
              <div className="absolute inset-0 w-80 h-80 bg-gradient-to-tr from-accent/40 to-accent/60 rounded-2xl shadow-2xl transform -rotate-3 opacity-20"></div>
              <div className="absolute inset-0 w-80 h-80 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
                <img 
                  src={avatarImage} 
                  alt="Abdullah Zaiter"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content Section - Now below the avatar */}
          <div className="max-w-4xl animate-slide-up">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Senior Consultant & Founder of Zaitech
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {personalInfo.bio}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                onClick={handleContactClick}
                className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              >
                <Mail className="h-5 w-5 mr-2" />
                Get In Touch
              </Button>
              <Button 
                variant="outline"
                onClick={handleProjectsClick}
                className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-medium"
              >
                <Folder className="h-5 w-5 mr-2" />
                View Projects
              </Button>
            </div>
            <div className="flex items-center justify-center space-x-6">
              <a 
                href={`https://github.com/${personalInfo.social.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                onClick={() => trackSocialClick('GitHub')}
              >
                <Github className="h-6 w-6" />
              </a>
              <a 
                href={`https://linkedin.com/in/${personalInfo.social.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                onClick={() => trackSocialClick('LinkedIn')}
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a 
                href={personalInfo.company.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                onClick={() => trackSocialClick('Blog')}
              >
                <Rss className="h-6 w-6" />
              </a>
              <a 
                href={`https://instagram.com/${personalInfo.social.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                onClick={() => trackSocialClick('Instagram')}
              >
                <Instagram className="h-6 w-6" />
              </a>
              <span className="text-muted-foreground">|</span>
              <span className="text-muted-foreground flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {personalInfo.location}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
