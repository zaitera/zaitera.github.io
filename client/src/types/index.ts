export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  location: string;
  social: {
    github: string;
    linkedin: string;
    instagram: string;
  };
  company: {
    name: string;
    website: string;
    blog: string;
  };
}

export interface AboutData {
  title: string;
  description: string;
  professionalJourney: {
    title: string;
    content: string[];
  };
  mission: {
    title: string;
    content: string;
  };
  achievements: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

export interface ExpertiseItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: 'primary' | 'accent';
  metrics?: string;
  technologies?: string[];
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  skills: string[];
  color: 'primary' | 'accent';
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image: string;
  metrics: Array<{
    icon: string;
    value: string;
  }>;
  technologies: string[];
  link: string;
}

export interface EducationData {
  degree: string;
  institution: string;
  location: string;
  researchFocus: {
    title: string;
    description: string;
  };
  teachingExperience: {
    title: string;
    description: string;
  };
}

export interface AwardItem {
  id: string;
  title: string;
  organization: string;
  description: string;
  icon: string;
}
