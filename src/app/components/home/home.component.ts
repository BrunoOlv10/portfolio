import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  fullText = '<Bruno Oliveira />';
  displayedText = '';
  index = 0;
  typingSpeed = 150;
  pauseDuration = 3000;
  deleting = false;

  ngOnInit(): void {
    this.startTyping();
  }

  startTyping(): void {
    if (this.deleting) {
      if (this.index > 0) {
        this.index--;
        this.displayedText = this.fullText.substring(0, this.index);
        setTimeout(() => this.startTyping(), this.typingSpeed / 2);
      } else {
        this.deleting = false;
        setTimeout(() => this.startTyping(), 1000);
      }
    } else {
      if (this.index < this.fullText.length) {
        this.displayedText += this.fullText.charAt(this.index);
        this.index++;
        setTimeout(() => this.startTyping(), this.typingSpeed);
      } else {
        setTimeout(() => {
          this.deleting = true;
          this.startTyping();
        }, this.pauseDuration);
      }
    }
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);

    if (!element) return;

    const isMobile = window.innerWidth <= 600;

    const isMedium = window.innerWidth <= 1200;

    let offset: number;

    if (isMobile) {
      offset = -70;
    } else if (isMedium) {
      offset = -110;
    } else {
      offset = -200;
    }

    const y = element.getBoundingClientRect().top + window.scrollY + offset;

    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  }
}
