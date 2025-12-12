export interface ProjectScreen {
  title: string;
  image: string;
  description?: string;
  darkFilter?: boolean;
}

export interface Project {
  type: string;
  topic: string;
  image: string;
  technologies: string[];
  accessUrl: string;
  darkFilter?: boolean;
  screens?: ProjectScreen[];
  currentIndex?: number;
  isFading?: boolean;
}

export interface ProjectDetails {
  title: string;
  accessUrl: string;
  codeUrl: string;
  screens: ProjectScreen[];
  observation?: string;
}