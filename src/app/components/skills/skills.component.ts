import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  icons: string[] = [
    'devicon-html5-plain colored',
    'devicon-css3-plain colored',
    'devicon-angularjs-plain colored',
    'devicon-javascript-plain colored',
    'devicon-typescript-plain colored',
    'devicon-csharp-plain colored',
    'devicon-python-plain colored',
    'devicon-microsoftsqlserver-plain colored',
    'devicon-mysql-plain colored',
    'devicon-jasmine-original colored'
  ];

  repeatCount = 1;

  ngOnInit() {
    this.calculateRepeatCount();
  }

  @HostListener('window:resize')
  onResize() {
    this.calculateRepeatCount();
  }

  calculateRepeatCount() {
    const iconWidth = 30 + 30;
    const screenWidth = window.innerWidth;
    const minWidthNeeded = screenWidth * 2;
    const iconsPerRow = this.icons.length * iconWidth;
    this.repeatCount = Math.ceil(minWidthNeeded / iconsPerRow);
  }
}