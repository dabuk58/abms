import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { LoaderEnum } from '../../enums/loader.enum';
import { AuthService } from '../../services/auth.service';
import { LoaderService } from '../../services/loader.service';
import { OverlayLoaderComponent } from '../overlay-loader/overlay-loader.component';
import { GoogleLoginButtonComponent } from './google-login-button/google-login-button.component';
import { MicrosoftLoginButtonComponent } from './microsoft-login-button/microsoft-login-button.component';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [
    GoogleLoginButtonComponent,
    MicrosoftLoginButtonComponent,
    OverlayLoaderComponent,
    AsyncPipe,
  ],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss',
})
export class LoginModalComponent implements OnInit {
  isLoading$!: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private dialogRef: DynamicDialogRef,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.loaderService.isActive(LoaderEnum.LOGIN);
  }

  loginMicrosoft(): void {
    this.loaderService.setActive(LoaderEnum.LOGIN);
    this.authService.loginMicrosoft(this.dialogRef);
  }
}
