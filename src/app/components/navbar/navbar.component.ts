import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);

    if (!element) return;

    const offset = -350;

    const y = element.getBoundingClientRect().top + window.scrollY + offset;

    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  }
}