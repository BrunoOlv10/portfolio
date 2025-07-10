import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
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
