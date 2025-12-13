import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProjectDetailsComponent } from '../project-details/project-details.component';
import { Project, ProjectCarousel } from '../../shared/models/project.model';
import { CommonModule } from '@angular/common';
import { fadeSlideUp, fadeInZoomUp } from '../../shared/animations/animations';
import { PROJECTS } from '../../shared/constants/projects.data';
import { PROJECT_DETAILS } from '../../shared/constants/project-details.data';

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

  showElements = false;

  observer!: IntersectionObserver;

  initialCheck = false;

  animate = false;
  lastScrollTop = 0;
  isScrollingDown = false;

  projects: ProjectCarousel[] = [];
  
  imageModalSrc: string | null = null;

  private intervalId: any = null;
  private rotateInterval = 5000;
   
  ngOnInit() {
    window.addEventListener('scroll', this.handleScroll, true);

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.imageModalSrc) {
        this.closeImage();
      }
    });

    this.projects = PROJECTS.map(p => {
      const details = PROJECT_DETAILS.find(d => d.title === p.type);
      const screens = details?.screens?.length ? details.screens : [{ title: p.type, image: p.image, darkFilter: p.darkFilter }];

      return {
        ...p,
        screens,
        currentIndex: 0
      };
    });

    this.startAutoCarousel();
  }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver((entries) => {
      const entry = entries[0];

      if (entry.isIntersecting && this.isScrollingDown) {
        this.showElements = true;
      }

      if (!entry.isIntersecting && !this.isScrollingDown) {
        this.showElements = false;
      }
    });

    if (this.projectsSection?.nativeElement) {
      this.observer.observe(this.projectsSection.nativeElement);
    }

    this.initialCheck = true;
    this.observer.takeRecords();
    this.initialCheck = false;

    if (this.cardsContainer?.nativeElement) {
      this.cardsContainer.nativeElement.addEventListener('scroll', () => this.checkScroll());
    }
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    window.removeEventListener('scroll', this.handleScroll, true);
  }

  startAutoCarousel() {
    this.intervalId = setInterval(() => {
      this.projects.forEach(project => {
        if (project.screens.length <= 1) return;

        this.animate = false;

        requestAnimationFrame(() => {
          project.currentIndex =
            (project.currentIndex + 1) % project.screens.length;

          this.animate = true;
        });
      });
    }, this.rotateInterval);
  }

  handleScroll = () => {
    const scrollTop = window.scrollY;
    this.isScrollingDown = scrollTop > this.lastScrollTop;
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  trackProject(index: number, project: Project): string {
    return project.type;
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
  }

  scrollRight() {
    const distance = this.getCardScrollDistance();
    this.cardsContainer.nativeElement.scrollBy({ left: distance, behavior: 'smooth' });
  }

  checkScroll() {
    const container = this.cardsContainer.nativeElement;
    const scrollLeft = container.scrollLeft;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    const tolerance = 5;

    this.atStart = scrollLeft <= tolerance;
    this.atEnd = scrollLeft >= maxScrollLeft - tolerance;
  }

  openImage(imageUrl: string) {
    this.imageModalSrc = imageUrl;
  }

  closeImage() {
    this.imageModalSrc = null;
  }
}