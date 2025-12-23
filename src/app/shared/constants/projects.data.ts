import { Project } from '../models/project.model';

export const PROJECTS: Project[] = [
    {
      type: 'Cadastro CNPJ Localize',
      topic: 'Projeto Full-Stack',
      image: 'assets/images-projects/localize-cadastro-cnpj/default.png',
      technologies: ['Angular', 'SCSS', 'TypeScript', 'C#', 'MySQL'],
      accessUrl: '#',
      darkFilter: true,
    },
    {
      type: 'Extração de Dados Revio',
      topic: 'Web Scraping',
      image: 'assets/images-projects/revio-web-scraping/default-screen.png',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Python'],
      accessUrl: 'https://revio-desafio-produtos.vercel.app',
      darkFilter: true,
    },
    {
      type: 'Chat com IA Furia',
      topic: 'Chatbot',
      image: 'assets/images-projects/furia-esports-chat/default-screen-options.png',
      technologies: ['Angular', 'SCSS', 'TypeScript', 'Python'],
      accessUrl: '#',
    },
    {
      type: 'Extração de Dados Saúde',
      topic: 'Web Scraping',
      image: 'assets/images-projects/buscador-operadoras/default-screen.png',
      technologies: ['Vue', 'CSS', 'JavaScript', 'Python', 'MySQL'],
      accessUrl: '#',
      darkFilter: true,
    },
];