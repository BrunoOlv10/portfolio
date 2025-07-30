import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Project, ProjectDetails, ProjectScreen } from '../../shared/models/project.model';
import { PROJECT_DETAILS } from '../../shared/constants/project-details.data';

@Component({
  selector: 'app-project-details',
  imports: [],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss',
})
export class ProjectDetailsComponent {
  @Input() project!: Project;
  @Output() close = new EventEmitter<void>();

  @ViewChild('cardsContainer', { static: true }) cardsContainer!: ElementRef<HTMLDivElement>;

  currentProject!: ProjectDetails;
  selectedScreen!: ProjectScreen;

  atStart = true;
  atEnd = false;

  projectDetails = PROJECT_DETAILS;

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
    this.currentProject = this.projectDetails.find(p => p.title === this.project.type)!;
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
}
