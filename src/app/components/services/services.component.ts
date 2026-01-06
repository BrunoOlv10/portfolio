import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
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

  showAnimation = false;

  observer!: IntersectionObserver;

  initialCheck = false;

  lastScrollTop = 0;
  isScrollingDown = false;

  email = "bruno.olvslv@gmail.com";
  whatsapp = "+55 (11) 97675-4965";

  visiblePopup: string | null = null;
  copiedKey: string | null = null;
  
  services: Service[] = SERVICES;

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
}