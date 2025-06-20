import { Component } from '@angular/core';
import { SkillsComponent } from '../skills/skills.component';

@Component({
  selector: 'app-home',
  imports: [SkillsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
