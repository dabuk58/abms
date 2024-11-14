import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-microsoft-login-button',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './microsoft-login-button.component.html',
  styleUrl: './microsoft-login-button.component.scss',
})
export class MicrosoftLoginButtonComponent {}
