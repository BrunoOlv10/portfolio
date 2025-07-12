import { Component, HostListener } from '@angular/core';
import { SKILLS_ICONS } from '../../shared/constants/skills-icons';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  icons = SKILLS_ICONS;

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

  get repeatedIcons(): string[] {
    const arr: string[] = [];
    for (let i = 0; i < this.repeatCount; i++) {
      arr.push(...this.icons);
    }
    return arr;
  }
}