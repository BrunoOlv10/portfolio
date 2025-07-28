import { Project } from '../models/project.model';

export const PROJECTS: Project[] = [
    {
      title: 'Revio Web Scraping',
      image: 'assets/images-projects/revio-web-scraping/default-screen.png',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Python'],
      accessUrl: 'https://revio-desafio-produtos.vercel.app',
      darkFilter: true,
    },
    {
      title: 'Furia Esports Chat',
      image: 'assets/images-projects/furia-esports-chat/default-screen-options.png',
      technologies: ['Angular', 'TypeScript', 'SCSS', 'Python'],
      accessUrl: 'assets/images-projects/furia-esports-chat/furia-chat-preview.mp4'
    },
    {
      title: 'Buscador Operadoras',
      image: 'assets/images-projects/buscador-operadoras/default-screen.png',
      technologies: ['Vue', 'JavaScript', 'Python', 'MySQL'],
      accessUrl: 'assets/images-projects/buscador-operadoras/buscador-operadoras-preview.mp4',
      darkFilter: true,
    },
];