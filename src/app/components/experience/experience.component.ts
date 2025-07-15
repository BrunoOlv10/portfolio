import { Component, ElementRef, ViewChild } from '@angular/core';
import { fadeSlideUp, expandCollapse } from '../../shared/animations/animations';
import { EXPERIENCES } from '../../shared/constants/experience-data';
import { Experience } from '../../shared/models/experience.model';

@Component({
  selector: 'app-experience',
  imports: [],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
  animations: [fadeSlideUp, expandCollapse],
})
export class ExperienceComponent {
  @ViewChild('experienceSection') experienceSection!: ElementRef<HTMLDivElement>;

  showElements = false;

  observer!: IntersectionObserver;

  lastScrollTop = 0;
  isScrollingDown = false;
  
  experiences: Experience[] = EXPERIENCES;

  isOpen = false;

  ngOnInit() {
    window.addEventListener('scroll', this.handleScroll, true);
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

    this.observer.observe(this.experienceSection.nativeElement);
  }

  handleScroll = () => {
    const scrollTop = window.scrollY;
    this.isScrollingDown = scrollTop > this.lastScrollTop;
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  toggleDescription() {
    this.isOpen = !this.isOpen;
  }
}
