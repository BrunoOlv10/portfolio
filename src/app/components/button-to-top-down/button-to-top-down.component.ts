import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-button-to-top-down',
  imports: [CommonModule],
  templateUrl: './button-to-top-down.component.html',
  styleUrl: './button-to-top-down.component.scss'
})
export class ButtonToTopDownComponent {
  showTopButton = false;
  showDownButton = true;

  private footerElement: Element | null = null;

  ngOnInit() {
    this.footerElement = document.querySelector('app-footer');

    this.checkElementVisibility();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkElementVisibility();
  }

  private checkElementVisibility() {
    const windowHeight = window.innerHeight;

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
   
    this.showTopButton = scrollPosition > 0;

    if (this.footerElement) {
      const footerRect = this.footerElement.getBoundingClientRect();
      this.showDownButton = !(footerRect.top < windowHeight && footerRect.bottom > 0);
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToBottom() {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }
}