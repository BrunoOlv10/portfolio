export interface ProjectScreen {
  title: string;
  image: string;
  description: string;
}

export interface Project {
  title: string;
  accessUrl: string;
  codeUrl: string;
  screens: ProjectScreen[];
}