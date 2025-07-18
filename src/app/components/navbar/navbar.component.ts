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

    const nav = document.querySelector('app-navbar nav');
    const navbarHeight = (nav as HTMLElement)?.offsetHeight || 0;

    const rect = element.getBoundingClientRect();

    const needAnimation = rect.top > window.innerHeight;

    const dynamicOffset = needAnimation ? 100 : 150;

    const elementTop = element.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: elementTop - navbarHeight - dynamicOffset,
      behavior: 'smooth'
    });
  }
}