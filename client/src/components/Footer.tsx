import { useEffect, useState } from 'react';
import { Github, Linkedin, Instagram, Rss } from 'lucide-react';
import { PersonalInfo } from '../types';

export default function Footer() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);

  useEffect(() => {
    fetch('/src/data/personal.json')
      .then(res => res.json())
      .then(data => setPersonalInfo(data))
      .catch(err => console.error('Error loading personal info:', err));
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    { href: '#expertise', label: 'Technical Consultancy' },
    { href: '#expertise', label: 'Mentorship Programs' },
    { href: '#expertise', label: 'Advanced Training' },
  ];



  if (!personalInfo) {
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
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-primary mb-4">{personalInfo.name}</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Senior Consultant & Founder of {personalInfo.company.name}. Specializing in scalable solutions, team leadership, and technical mentorship.
            </p>
            <div className="flex space-x-4">
              <a 
                href={`https://github.com/${personalInfo.social.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors duration-200"
              >
                <Github className="h-6 w-6" />
              </a>
              <a 
                href={`https://linkedin.com/in/${personalInfo.social.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors duration-200"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a 
                href={personalInfo.company.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors duration-200"
              >
                <Rss className="h-6 w-6" />
              </a>
              <a 
                href={`https://instagram.com/${personalInfo.social.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors duration-200"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              {services.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavClick(service.href)}
                    className="hover:text-primary transition-colors duration-200 text-left"
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
            © 2025 {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
