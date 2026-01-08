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

  showAnimation = false;
  showFullText = false;
  visiblePopup: string | null = null;
  copiedKey: string | null = null;

  lastScrollTop = 0;
  isScrollingDown = false;

  private observer!: IntersectionObserver;

  initialCheck = false;

  email = "bruno.olvslv@gmail.com";
  whatsapp = "+55 (11) 97675-4965";

  ngOnInit() {
    window.addEventListener('scroll', this.handleScroll, true);
  }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver((entries) => {
      const entry = entries[0];

      if (entry.isIntersecting && this.isScrollingDown) {
        this.showAnimation = true;
      }

      if (!entry.isIntersecting && !this.isScrollingDown) {
        this.showAnimation = false;
      }
    });

    this.observer.observe(this.aboutSection.nativeElement);

    this.initialCheck = true;
    this.observer.takeRecords();
    this.initialCheck = false;
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.handleScroll, true);
    this.observer?.disconnect();
  }

  handleScroll = () => {
    const scrollTop = window.scrollY;

    this.isScrollingDown = scrollTop > this.lastScrollTop;
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  toggleCopyPopup(key: string) {
    this.visiblePopup = this.visiblePopup === key ? null : key;
  }

  copyPopup(value: string, key: string) {
    navigator.clipboard.writeText(value).then(() => {
      this.copiedKey = key;
      
      setTimeout(() => {
        if (this.copiedKey === key) {
          this.copiedKey = null;
          this.visiblePopup = null;
        }
      }, 2000);
    });
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (target.closest('.copy-container')) {
      return;
    }

    this.visiblePopup = null;
    this.copiedKey = null;
  }

  toggleText() {
    this.showFullText = !this.showFullText;
  }
}
