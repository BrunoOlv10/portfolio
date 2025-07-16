import { Component, ElementRef, ViewChild } from '@angular/core';
import { Service } from '../../shared/models/service.model';
import { SERVICES } from '../../shared/constants/service.data';
import { fadeSlideUp } from '../../shared/animations/animations';

@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
  animations: [fadeSlideUp],
})
export class ServicesComponent {
  @ViewChild('serviceSection') serviceSection!: ElementRef<HTMLDivElement>;

  showElements = false;

  observer!: IntersectionObserver;

  initialCheck = false;

  lastScrollTop = 0;
  isScrollingDown = false;
  
  services: Service[] = SERVICES;

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

    this.observer.observe(this.serviceSection.nativeElement);

    this.initialCheck = true;
    this.observer.takeRecords();
    this.initialCheck = false;
  }

  handleScroll = () => {
    const scrollTop = window.scrollY;
    this.isScrollingDown = scrollTop > this.lastScrollTop;
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);

    if (!element) return;

    const offset = -150;

    const y = element.getBoundingClientRect().top + window.scrollY + offset;

    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  }
}
