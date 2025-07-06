import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import * as Icons from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectsData {
  title: string;
  description: string;
  items: ProjectItem[];
}

export default function Projects() {
  const [projectsData, setProjectsData] = useState<ProjectsData | null>(null);

  useEffect(() => {
    fetch('/src/data/projects.json')
      .then(res => res.json())
      .then(data => setProjectsData(data))
      .catch(err => console.error('Error loading projects data:', err));
  }, []);

  if (!projectsData) {
    return (
      <section id="projects" data-section="projects" className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/2 mx-auto mb-8"></div>
            <div className="grid lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-96 bg-muted rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" data-section="projects" className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{projectsData.title}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {projectsData.description}
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {projectsData.items.map((project) => (
            <Card key={project.id} className="bg-card hover:shadow-xl transition-shadow duration-300 border border-border border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 ml-4">
                    <div className="w-6 h-6 bg-primary rounded-sm"></div>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {project.metrics.map((metric, index) => {
                    // Convert kebab-case to PascalCase for icon names
                    const iconName = metric.icon.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join('');
                    const IconComponent = (Icons[iconName as keyof typeof Icons] || Icons.Star) as React.ComponentType<{ className?: string }>;
                    return (
                      <div key={index} className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                        <IconComponent className="h-5 w-5 text-primary" />
                        <span className="font-medium text-sm">{metric.value}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
