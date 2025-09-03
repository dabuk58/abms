import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslatePipe, DividerModule, Button],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  onGit(): void {
    window.open('https://github.com/dabuk58/abms', '_blank');
  }
  onLinkedin(): void {
    window.open('https://www.linkedin.com/in/j-deska', '_blank');
  }
}
