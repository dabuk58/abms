import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-google-login-button',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './google-login-button.component.html',
  styleUrl: './google-login-button.component.scss',
})
export class GoogleLoginButtonComponent {}
