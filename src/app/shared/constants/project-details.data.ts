import { ProjectDetails } from '../models/project.model';

export const PROJECT_DETAILS: ProjectDetails[] = [
    {
      title: 'Revio Web Scraping',
      accessUrl: 'https://revio-desafio-produtos.vercel.app',
      codeUrl: 'https://github.com/BrunoOlv10/revio-desafio-produtos',
      observation: 'Ao acessar a aplicação pelo botão "Acessar", o carregamento inicial dos dados pode levar até 1 minuto, pois está hospedado em um serviço gratuito.',
      screens: [
        {
          title: 'Início',
          image: 'assets/images-projects/revio-web-scraping/default-screen.png',
          description: 'Desenvolvi um projeto de Web Scraping, com o objetivo de extrair dados de produtos de um e-commerce específico, processar essas informações e apresentá-las em uma interface web. Além disso, implementei a opção de exportar os dados visualizados para arquivos Excel e CSV.',
          darkFilter: true,
        },
        {
          title: 'Filtros',
          image: 'assets/images-projects/revio-web-scraping/filters.png',
          description: 'A interface permite listar produtos, aplicar filtros por preço, marca, tipo e nota, além de ordenar por avaliação ou preço.',
          darkFilter: true,
        },
        {
          title: 'Ordenação e Exportação',
          image: 'assets/images-projects/revio-web-scraping/order-export.png',
          description: 'Também implementei a funcionalidade de exportação dos dados visualizados para arquivos Excel e CSV, mantendo os filtros e ordenação aplicados pelo usuário.',
          darkFilter: true,
        },
      ]
    },
    {
      title: 'Furia Esports Chat',
      accessUrl: 'assets/images-projects/furia-esports-chat/furia-chat-preview.mp4',
      codeUrl: 'https://github.com/BrunoOlv10/furia-experiencia-conversacional',
      observation: 'Como a interação é feita por meio de inteligência artificial, algumas informações podem conter erros. Por isso, é recomendável validar os dados apresentados.',
      screens: [
        {
          title: 'Início',
          image: 'assets/images-projects/furia-esports-chat/default-screen.png',
          description: 'Criei um chat interativo sobre a FURIA Esports. Ao iniciar o chat, o usuário é recebido com a mensagem: "Olá, guerreiro(a)! Seja bem-vindo ao chat de fãs da FURIA.". A partir disso, ele pode interagir com a inteligência artificial e escolher entre diferentes opções para explorar mais sobre o universo da FURIA.'
        },
        {
          title: 'Opções',
          image: 'assets/images-projects/furia-esports-chat/default-screen-options.png',
          description: 'O chat funciona de forma dinâmica e em tempo real. Assim que o usuário digita algo, são exibidas 6 opções de interação: História da FURIA, Nossos Times, Últimos Jogos, Lojinha da Pantera (direciona o usuário para a loja oficial), Esports News e Criadores de Conteúdo.'
        },
      ]
    },
    {
      title: 'Buscador Operadoras',
      accessUrl: 'assets/images-projects/buscador-operadoras/buscador-operadoras-preview.mp4',
      codeUrl: 'https://github.com/BrunoOlv10/intuitive-care-teste-tecnico',
      observation: 'ANS é a sigla do órgão que regula os planos de saúde no Brasil.',
      screens: [
        {
          title: 'Início',
          image: 'assets/images-projects/buscador-operadoras/default-screen.png',
          description: 'Desenvolvi uma aplicação que permite realizar buscas pelo nome de operadoras de saúde. Ao pesquisar, o usuário recebe os registros correspondentes, contendo: razão social, nome fantasia, número de registro e data de registro na ANS. A resposta também exibe informações complementares, como o total de resultados encontrados, o número de páginas disponíveis e a página atual. Além disso, é possível navegar entre as páginas e escolher quantos resultados exibir por página, dentro do limite disponível.',
          darkFilter: true,
        },
      ]
    },
];