import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { expandCollapse, fadeSlideUp } from '../../shared/animations/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  animations: [fadeSlideUp, expandCollapse],
})
export class AboutComponent {
  @ViewChild('aboutSection') aboutSection!: ElementRef<HTMLDivElement>;

  showElements = false;

  observer!: IntersectionObserver;

  initialCheck = false;

  lastScrollTop = 0;
  isScrollingDown = false;

  isEmailVisible = false;

  showFullText = false;

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

    this.observer.observe(this.aboutSection.nativeElement);

    this.initialCheck = true;
    this.observer.takeRecords();
    this.initialCheck = false;
  }

  handleScroll = () => {
    const scrollTop = window.scrollY;
    this.isScrollingDown = scrollTop > this.lastScrollTop;
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
  const target = event.target as HTMLElement;

    if (!this.aboutSection?.nativeElement.querySelector('.email-container')?.contains(target)) {
      this.isEmailVisible = false;
    }
  }

  copyEmail(event: MouseEvent): void {
    const button = event.currentTarget as HTMLButtonElement;
    const emailButton = button.closest(".email-button");

    if (!emailButton) return;

    const email = "bruno.olvslv@gmail.com";

    navigator.clipboard.writeText(email).then(() => {
        emailButton.classList.add("copied")

        setTimeout(() => {
            emailButton.classList.remove("copied");
            this.isEmailVisible = false;
        }, 2000);

    });
  }

  toggleEmail(event: Event) {
    event.preventDefault();
    this.isEmailVisible = !this.isEmailVisible;
  }

  toggleText() {
    this.showFullText = !this.showFullText;
  }
}
