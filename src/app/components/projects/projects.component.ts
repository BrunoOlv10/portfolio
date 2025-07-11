import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProjectDetailsComponent } from '../project-details/project-details.component';
import { Project } from '../../shared/models/project.model';
import { CommonModule } from '@angular/common';
import { fadeSlideUp, fadeInZoomUp } from '../../shared/animations/animations';

@Component({
  selector: 'app-projects',
  imports: [ProjectDetailsComponent, CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  animations: [fadeSlideUp, fadeInZoomUp],
})

export class ProjectsComponent {
  @ViewChild('projectsSection') projectsSection!: ElementRef<HTMLDivElement>;
  @ViewChild('cardsContainer') cardsContainer!: ElementRef<HTMLDivElement>;

  atStart = true;
  atEnd = false;
  selectedProject: Project | null = null;

  showCards = false;
   
  projects: Project[] = [
    {
      title: 'Exemplo 1',
      image: 'assets/projects/furia/tela-infos.png',
      technologies: ['Angular', 'TypeScript', 'C#', 'SQL Server'],
      accessUrl: '#'
    },
    {
      title: 'Exemplo 2',
      image: 'assets/projects/furia/tela-infos.png',
      technologies: ['React', 'JavaScript', 'Python', 'MySQL'],
      accessUrl: '#'
    },
    {
      title: 'Exemplo 3',
      image: 'assets/projects/furia/tela-infos.png',
      technologies: ['Vue', 'TypeScript', 'Java'],
      accessUrl: '#'
    },
    {
      title: 'Exemplo 4',
      image: 'assets/projects/furia/tela-infos.png',
      technologies: ['Angular', 'JavaScript', 'C#', 'MySQL'],
      accessUrl: '#'
    },
    {
      title: 'Exemplo 5',
      image: 'assets/projects/furia/tela-infos.png',
      technologies: ['Angular', 'JavaScript', 'C#', 'MySQL'],
      accessUrl: '#'
    },
  ];

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      this.showCards = entry.isIntersecting;

      if (entry.isIntersecting) {
        setTimeout(() => this.checkScroll(), 0);
      }
    });

    observer.observe(this.projectsSection.nativeElement);
  }

  trackProject(index: number, project: Project): string {
    return project.title;
  }

  openProjectDetails(project: any) {
    this.selectedProject = project;
  }

  closeProjectDetails() {
    this.selectedProject = null;
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