import { Component, HostListener } from '@angular/core';

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

  email = "bruno.olvslv@gmail.com";
  whatsapp = "+55 (11) 97675-4965";

  visiblePopup: string | null = null;
  copiedKey: string | null = null;

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
      offset = -120;
    } else if (isMedium) {
      offset = -150;
    } else {
      offset = -170;
    }

    const y = element.getBoundingClientRect().top + window.scrollY + offset;

    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
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
