import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  @ViewChild('cardsContainer', { static: true }) cardsContainer!: ElementRef<HTMLDivElement>;

  atStart = true;
  atEnd = false;

  ngAfterViewInit() {
    this.checkScroll();
  }
   
  projects = [
    {
      title: 'Exemplo 1',
      image: 'assets/projects/furia/tela-infos.png',
      technologies: ['Angular', 'TypeScript', 'C#', 'SQL Server'],
      detailsUrl: '#',
      accessUrl: '#'
    },
    {
      title: 'Exemplo 2',
      image: 'assets/projects/furia/tela-infos.png',
      technologies: ['React', 'JavaScript', 'Python', 'MySQL'],
      detailsUrl: '#',
      accessUrl: '#'
    },
    {
      title: 'Exemplo 3',
      image: 'assets/projects/furia/tela-infos.png',
      technologies: ['Vue', 'TypeScript', 'Java'],
      detailsUrl: '#',
      accessUrl: '#'
    },
    {
      title: 'Exemplo 4',
      image: 'assets/projects/furia/tela-infos.png',
      technologies: ['Angular', 'JavaScript', 'C#', 'MySQL'],
      detailsUrl: '#',
      accessUrl: '#'
    },
    {
      title: 'Exemplo 5',
      image: 'assets/projects/furia/tela-infos.png',
      technologies: ['Angular', 'JavaScript', 'C#', 'MySQL'],
      detailsUrl: '#',
      accessUrl: '#'
    },
  ];

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
