import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Project, ProjectDetails, ProjectScreen } from '../../shared/models/project.model';

@Component({
  selector: 'app-project-details',
  imports: [],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss',
})
export class ProjectDetailsComponent {
  @Input() project!: Project;
  @Output() close = new EventEmitter<void>();

  currentProject!: ProjectDetails;
  selectedScreen!: ProjectScreen;

  @ViewChild('cardsContainer', { static: true }) cardsContainer!: ElementRef<HTMLDivElement>;
  atStart = true;
  atEnd = false;

  projectDatas = [
    {
      title: 'Exemplo 1',
      accessUrl: '#',
      codeUrl: '#',
      screens: [
        {
          title: 'Login',
          image: 'assets/projects/furia/tela-infos.png',
          description: 'Tela de login com autenticação...'
        },
        {
          title: 'Home',
          image: 'assets/projects/furia/tela-infos.png',
          description: 'Página inicial com chat...'
        },
      ]
    },
    {
      title: 'Exemplo 2',
      accessUrl: '#',
      codeUrl: '#',
      screens: [
        {
          title: 'Login',
          image: 'assets/projects/furia/tela-infos.png',
          description: 'Tela de login com autenticação...'
        },
        {
          title: 'Home',
          image: 'assets/projects/furia/tela-infos.png',
          description: 'Página inicial com chat...'
        },
      ]
    },
    {
      title: 'Exemplo 3',
      accessUrl: '#',
      codeUrl: '#',
      screens: [
        {
          title: 'Login',
          image: 'assets/projects/furia/tela-infos.png',
          description: 'Tela de login com autenticação...'
        },
        {
          title: 'Home',
          image: 'assets/projects/furia/tela-infos.png',
          description: 'Página inicial com chat...'
        },
      ]
    },
    {
      title: 'Exemplo 4',
      accessUrl: '#',
      codeUrl: '#',
      screens: [
        {
          title: 'Login',
          image: 'assets/projects/furia/tela-infos.png',
          description: 'Tela de login com autenticação...'
        },
        {
          title: 'Home',
          image: 'assets/projects/furia/tela-infos.png',
          description: 'Página inicial com chat...'
        },
      ]
    },
    {
      title: 'Exemplo 5',
      accessUrl: '#',
      codeUrl: '#',
      screens: [
        {
          title: 'Login',
          image: 'assets/projects/furia/tela-infos.png',
          description: 'Tela de login com autenticação...'
        },
        {
          title: 'Home',
          image: 'assets/projects/furia/tela-infos.png',
          description: 'Página inicial com chat...'
        },
      ]
    },
  ];

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.checkScroll();
    });

    this.cardsContainer.nativeElement.addEventListener('scroll', () => this.checkScroll());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['project']) {
      this.loadProjectDetails();
    }
  }

  loadProjectDetails() {
    this.currentProject = this.projectDatas.find(p => p.title === this.project.title)!;
    this.selectedScreen = this.currentProject.screens[0];

    setTimeout(() => {
      this.checkScroll();
    });
  }

  onClose() {
    this.close.emit();
  }

  getCardScrollDistance(): number {
    const container = this.cardsContainer.nativeElement;
    const card = container.querySelector('.card') as HTMLElement;

    const cardWidth = card.offsetWidth;
    const containerStyle = getComputedStyle(container);
    const gap = parseFloat(containerStyle.gap) || 0;

    return cardWidth + gap;
  }

  scrollLeft() {
    const distance = this.getCardScrollDistance();
    this.cardsContainer.nativeElement.scrollBy({ left: -distance, behavior: 'smooth' });
    this.waitForScrollEnd();
  }

  scrollRight() {
    const distance = this.getCardScrollDistance();
    this.cardsContainer.nativeElement.scrollBy({ left: distance, behavior: 'smooth' });
    this.waitForScrollEnd();
  }

  checkScroll() {
    const container = this.cardsContainer.nativeElement;
    const scrollLeft = container.scrollLeft;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    const tolerance = 5;

    this.atStart = scrollLeft <= tolerance;
    this.atEnd = scrollLeft >= maxScrollLeft - tolerance;

    const cards = container.querySelectorAll('.card');
    let closestCardIndex = 0;
    let minDistance = Infinity;

    const containerLeft = container.getBoundingClientRect().left;

    cards.forEach((card, index) => {
      const rect = (card as HTMLElement).getBoundingClientRect().left;
      const distanceFromLeft = Math.abs(rect - containerLeft);
      if (distanceFromLeft < minDistance) {
        closestCardIndex = index;
        minDistance = distanceFromLeft;
      }
    });

    const newScreen = this.currentProject.screens[closestCardIndex];
    if (newScreen && newScreen !== this.selectedScreen) {
      this.selectedScreen = newScreen;
    }
  }

  waitForScrollEnd() {
    const container = this.cardsContainer.nativeElement;
    let lastPosition = container.scrollLeft;
    let stableCounter = 0;

    const check = () => {
      const currentPosition = container.scrollLeft;

      if (Math.abs(currentPosition - lastPosition) < 1) {
        stableCounter++;
      } else {
        stableCounter = 0;
      }

      lastPosition = currentPosition;

      if (stableCounter >= 3) {
        this.checkScroll();
      } else {
        requestAnimationFrame(check);
      }
    };

    requestAnimationFrame(check);
  }
}
