export interface Project {
  title: string;
  image: string;
  technologies: string[];
  accessUrl: string;
}

export interface ProjectScreen {
  title: string;
  image: string;
  description: string;
}

export interface ProjectDetails {
  title: string;
  accessUrl: string;
  codeUrl: string;
  screens: ProjectScreen[];
}