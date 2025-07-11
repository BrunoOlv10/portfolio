import { Component, ElementRef, ViewChild } from '@angular/core';
import { fadeSlideUp } from '../../shared/animations/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  animations: [fadeSlideUp],
})
export class AboutComponent {
  @ViewChild('aboutSection') aboutSection!: ElementRef<HTMLDivElement>;

  showElements = false;

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      this.showElements = entry.isIntersecting;
    });

    observer.observe(this.aboutSection.nativeElement);
  }

  copyEmail(event: MouseEvent): void {
    const button = event.currentTarget as HTMLButtonElement;
    const emailButton = button.closest(".email-button");

    if (!emailButton) return;

    const email = "bruno.olvslv@gmail.com";

    navigator.clipboard.writeText(email).then(() => {
        emailButton.classList.add("copied");

        setTimeout(() => {
            emailButton.classList.remove("copied");
        }, 2000);
    });
  }
}
