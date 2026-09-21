export interface PersonalInfo {
  name: string;
  codename: string;
  tagline: string;
  role: string;
  age: number;
  studentId: string;
  department: string;
  semester: string;
  university: string;
  presentAddress: string;
  permanentAddress: string;
  nationality: string;
  bioParagraph1: string;
  bioParagraph2: string;
  avatarUrl: string;
}

export interface InterestSkill {
  id: string;
  name: string;
  icon: string;
  status: 'Interested' | 'Learning' | 'Exploring';
  description: string;
  focusAreas: string[];
}

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  isSimulation?: boolean;
  simulationPlatform?: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  demoUrl: string;
  features?: string[];
  isUserAdded?: boolean;
  uploadedAt?: string;
  repoStars?: number;
  repoLanguage?: string;
  attachedFiles?: Array<{
    name: string;
    size: number;
    type: string;
    dataUrl?: string;
  }>;
}

export interface JourneyActivity {
  id: string;
  title: string;
  roleOrType: string;
  organization: string;
  period: string;
  description: string;
  badge: string;
  active?: boolean;
}

export interface Competition {
  id: string;
  name: string;
  type: string;
  description: string;
}

export interface FavoriteCategory {
  category: 'anime' | 'webSeries' | 'movies' | 'cartoons';
  label: string;
  icon: string;
  items: Array<{
    id: string;
    title: string;
    note?: string;
    genre?: string;
  }>;
}

export interface Hobby {
  id: string;
  name: string;
  iconName: string;
  tagline: string;
  description: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  handlePlaceholder: string;
  iconName: string;
}

export interface VisionStage {
  step: number;
  stage: string;
  summary: string;
  detail: string;
}
