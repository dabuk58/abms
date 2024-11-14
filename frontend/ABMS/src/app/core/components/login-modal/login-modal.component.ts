import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from '../../services/auth.service';
import { GoogleLoginButtonComponent } from './google-login-button/google-login-button.component';
import { MicrosoftLoginButtonComponent } from './microsoft-login-button/microsoft-login-button.component';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [GoogleLoginButtonComponent, MicrosoftLoginButtonComponent],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss',
})
export class LoginModalComponent {
  constructor(
    private authService: AuthService,
    private dialogRef: DynamicDialogRef
  ) {}

  loginMicrosoft(): void {
    this.authService.loginMicrosoft(this.dialogRef);
  }
}
